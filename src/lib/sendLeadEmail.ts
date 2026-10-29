import nodemailer, { type Transporter } from "nodemailer";
import type { LeadValues } from "@/lib/leadSchema";

/**
 * Отправка заявок с лендинга на email через SMTP (nodemailer).
 *
 * Настройка через серверные переменные окружения (.env.local) —
 * пароли никогда не попадают в клиентский код:
 *
 *   SMTP_HOST="smtp.gmail.com"
 *   SMTP_PORT="465"                  // 465 (SSL) или 587 (STARTTLS)
 *   SMTP_SECURE="true"               // true для 465; для 587 можно не задавать
 *   SMTP_USER="you@gmail.com"
 *   SMTP_PASS="<app password>"       // для Gmail — «пароль приложения»
 *   LEAD_EMAIL_TO="leads@company.com"
 *   LEAD_EMAIL_FROM="NEXAFLOW Landing <you@gmail.com>"
 *   LEAD_EMAIL_REPLY_TO="hello@example.com" // optional
 */

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  if (!cachedTransporter) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    const secure =
      process.env.SMTP_SECURE !== undefined
        ? process.env.SMTP_SECURE === "true"
        : port === 465;

    cachedTransporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
  }
  return cachedTransporter;
}

/** Email настроен? Используется в /api/lead для выбора режима. */
export function isEmailConfigured(): boolean {
  return getTransporter() !== null && Boolean(process.env.LEAD_EMAIL_TO);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(lead: LeadValues, submittedAt: string): string {
  const rows: Array<[string, string]> = [
    ["Имя", lead.name],
    ["Контакт", lead.contact],
    ["Компания", lead.company?.trim() || "—"],
    ["Задача или вопрос", lead.message],
    ["Время получения", submittedAt],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 14px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:10px 14px;border:1px solid #e5e7eb;color:#111827;white-space:pre-wrap;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="utf-8"><title>Новая заявка с сайта NEXAFLOW</title></head>
<body style="margin:0;padding:24px;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;font-size:14px;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
    <div style="padding:18px 24px;background:#111827;color:#ffffff;">
      <h1 style="margin:0;font-size:18px;">Новая заявка с сайта</h1>
      <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">NEXAFLOW — AI Automation Agency</p>
    </div>
    <div style="padding:24px;">
      <table style="width:100%;border-collapse:collapse;">${tableRows}
      </table>
      <p style="margin:20px 0 0;font-size:12px;color:#6b7280;">
        Согласие на обработку данных получено через форму на сайте.
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildEmailText(lead: LeadValues, submittedAt: string): string {
  return [
    "Новая заявка с сайта NEXAFLOW",
    "".padEnd(40, "-"),
    `Имя: ${lead.name}`,
    `Контакт: ${lead.contact}`,
    `Компания: ${lead.company?.trim() || "—"}`,
    `Задача или вопрос:\n${lead.message}`,
    `Время получения: ${submittedAt}`,
    "".padEnd(40, "-"),
    "Согласие на обработку данных получено через форму на сайте.",
  ].join("\n");
}

/**
 * Отправляет заявку на email. Бросает ошибку при сбое доставки —
 * вызывающий код (/api/lead) сам решает, как её показывать клиенту.
 */
export async function sendLeadEmail(lead: LeadValues): Promise<void> {
  const transporter = getTransporter();
  const to = process.env.LEAD_EMAIL_TO;
  if (!transporter || !to) {
    throw new Error("Email-отправка не настроена (SMTP_HOST/SMTP_USER/SMTP_PASS/LEAD_EMAIL_TO)");
  }

  const from =
    process.env.LEAD_EMAIL_FROM ??
    process.env.SMTP_FROM ??
    `"NEXAFLOW Landing" <${process.env.SMTP_USER}>`;

  const replyTo = process.env.LEAD_EMAIL_REPLY_TO;
  const submittedAt = new Date().toLocaleString("ru-RU", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Moscow",
  });

  await transporter.sendMail({
    from,
    to,
    ...(replyTo ? { replyTo } : {}),
    subject: `Заявка с сайта: ${lead.name}${lead.company?.trim() ? ` (${lead.company.trim()})` : ""}`,
    text: buildEmailText(lead, submittedAt),
    html: buildEmailHtml(lead, submittedAt),
  });
}
