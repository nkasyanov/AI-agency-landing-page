import { NextResponse } from "next/server";
import { leadSchema, type LeadApiResponse } from "@/lib/leadSchema";

/**
 * POST /api/lead — приём заявок с лендинга.
 *
 * Режимы работы (определяются переменными окружения на сервере):
 *
 *  1. DEMO (по умолчанию, если LEAD_WEBHOOK_URL не задан):
 *     данные проходят полную серверную валидацию, но никуда не
 *     пересылаются. Клиент получает { ok: true, mode: "demo" } и
 *     честно показывает демонстрационный статус (без ложного успеха).
 *
 *  2. WEBHOOK (LEAD_WEBHOOK_URL задан):
 *     валидированная заявка пересылается на внешний endpoint —
 *     CRM, n8n/Make webhook, Telegram-бота через бэкенд-прослойку и т.п.
 *     Секретные ключи хранятся только в серверных переменных окружения
 *     и никогда не попадают в клиентский код.
 *
 * Пример подключения (.env.local):
 *   LEAD_WEBHOOK_URL="https://hooks.example.com/leads"
 *   LEAD_WEBHOOK_SECRET="< optional bearer token >"
 */

// Node runtime — нужен для серверного fetch к webhook
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Простейшая защита от «флуда» с одного IP в памяти инстанса (не распределённая). */
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000; // 1 минута
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

/** Ограничение размера тела, чтобы не грузить сервер. */
const MAX_BODY_BYTES = 16 * 1024;

async function readJsonBody(req: Request): Promise<unknown | null> {
  const text = await req.text();
  if (text.length > MAX_BODY_BYTES) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function POST(req: Request): Promise<NextResponse<LeadApiResponse>> {
  // Rate limit по IP
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = (forwarded?.split(",")[0]?.trim() ?? "unknown").slice(0, 64);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Слишком много попыток. Подождите минуту и попробуйте снова." },
      { status: 429 },
    );
  }

  const raw = await readJsonBody(req);
  if (raw === null) {
    return NextResponse.json(
      { ok: false, error: "Некорректный формат данных заявки." },
      { status: 400 },
    );
  }

  // Серверная валидация — независимо от клиента
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fields[key]) fields[key] = issue.message;
    }
    return NextResponse.json(
      {
        ok: false,
        error: "Некоторые поля заполнены неверно. Проверьте форму.",
        fields,
      },
      { status: 422 },
    );
  }

  const lead = parsed.data;
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  // Режим demo: backend-приёмник ещё не настроен
  if (!webhookUrl) {
    // В dev-среде полезно видеть заявки в логах сервера (без PII в продакшене)
    if (process.env.NODE_ENV === "development") {
      console.info("[/api/lead][demo] validated lead:", {
        name: lead.name,
        company: lead.company || "-",
      });
    }
    return NextResponse.json({ ok: true, mode: "demo" }, { status: 200 });
  }

  // Режим webhook: пересылка валидированной заявки внешнему приёмнику
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": "nexaflow-landing/1.0 (+api/lead)",
    };
    const secret = process.env.LEAD_WEBHOOK_SECRET;
    if (secret) headers.Authorization = `Bearer ${secret}`;

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        source: "landing",
        submittedAt: new Date().toISOString(),
        lead,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Приёмник заявок временно недоступен. Попробуйте позже или напишите нам в Telegram.",
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, mode: "webhook" }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Не удалось передать заявку. Попробуйте позже или напишите нам в Telegram.",
      },
      { status: 502 },
    );
  }
}

/** GET не поддерживается — подсказываем правильный метод. */
export async function GET(): Promise<NextResponse<LeadApiResponse>> {
  return NextResponse.json(
    { ok: false, error: "Метод не поддерживается. Отправляйте POST /api/lead." },
    { status: 405 },
  );
}
