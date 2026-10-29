"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { leadSchema, type LeadValues, type LeadApiResponse } from "@/lib/leadSchema";
import { quizQuestions } from "@/data/quiz";

/**
 * Форма заявки (Блок 12 + шаг «контакты» после квиза).
 * Валидация — zod на клиенте; независимая серверная валидация — в /api/lead.
 * При отсутствии настроенного backend endpoint сервер возвращает mode: "demo"
 * и интерфейс честно показывает демонстрационный статус, а не ложный успех.
 */

type Status = "idle" | "submitting" | "success" | "demo" | "error";

function LeadFormInner({ initialMessage = "" }: { initialMessage?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      contact: "",
      company: "",
      message: initialMessage,
      consent: false,
    },
  });

  // Синхронизируем предзаполнение при изменении резюме квиза
  useEffect(() => {
    if (initialMessage) {
      setValue("message", initialMessage, { shouldDirty: false });
    }
  }, [initialMessage, setValue]);

  const onSubmit = async (values: LeadValues) => {
    if (isSubmitting) return; // защита от повторной отправки
    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      let data: Partial<LeadApiResponse> = {};
      try {
        data = await res.json();
      } catch {
        /* некорректный ответ сервера */
      }

      if (!res.ok) {
        setStatus("error");
        setServerError(data.error ?? "Сервер вернул ошибку. Попробуйте позже.");
        // Переносим серверные ошибки валидации на конкретные поля
        if (data.fields) {
          Object.entries(data.fields).forEach(([field, message]) => {
            if (field === "name" || field === "contact" || field === "company" || field === "message" || field === "consent") {
              setError(field, { type: "server", message });
            }
          });
        }
        return;
      }

      if (data.mode === "demo") {
        // Backend-приёмник ещё не подключён — честно показываем демо-режим
        setStatus("demo");
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("error");
      setServerError(
        "Не удалось отправить заявку (проблема с сетью). Напишите нам в Telegram: " +
          siteConfig.telegramLabel,
      );
    }
  };

  const inputCls =
    "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-muted/50 outline-none transition-colors focus:border-accent/60 focus:bg-white/[0.05]";

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.07] p-8 text-center"
            role="status"
          >
            <CheckCircle2 size={40} className="mx-auto mb-4 text-emerald-400" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-ink">Заявка отправлена</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Спасибо! Мы получили вашу заявку и свяжемся с вами по указанному
              контакту в ближайшее рабочее время.
            </p>
          </motion.div>
        ) : status === "demo" ? (
          <motion.div
            key="demo"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-cyanish/30 bg-cyanish/[0.06] p-8 text-center"
            role="status"
          >
            <CheckCircle2 size={40} className="mx-auto mb-4 text-cyanish" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-ink">
              Демонстрационный режим
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              Данные корректны и прошли валидацию, но приём заявок на сервере ещё
              не подключён — форма ничего никуда не отправила. Подключите
              endpoint <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">POST /api/lead</code>{" "}
              (CRM, Telegram-уведомления или webhook), либо напишите нам напрямую:{" "}
              <a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer" className="font-medium text-cyanish underline-offset-4 hover:underline">
                Telegram {siteConfig.telegramLabel}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-5 inline-flex h-10 items-center rounded-lg border border-white/15 px-5 text-sm text-ink transition-colors hover:bg-white/5"
            >
              Вернуться к форме
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="lead-name" className="mb-1.5 block text-sm font-medium text-ink">
                  Имя <span className="text-accent-soft">*</span>
                </label>
                <input
                  id="lead-name"
                  autoComplete="name"
                  placeholder="Как к вам обращаться"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "err-name" : undefined}
                  className={`${inputCls} ${errors.name ? "border-red-400/60" : "border-white/10"}`}
                  {...register("name")}
                />
                {errors.name && (
                  <p id="err-name" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                    <AlertCircle size={12} aria-hidden="true" /> {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lead-contact" className="mb-1.5 block text-sm font-medium text-ink">
                  Email или Telegram <span className="text-accent-soft">*</span>
                </label>
                <input
                  id="lead-contact"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@company.com или @username"
                  aria-invalid={errors.contact ? true : undefined}
                  aria-describedby={errors.contact ? "err-contact" : undefined}
                  className={`${inputCls} ${errors.contact ? "border-red-400/60" : "border-white/10"}`}
                  {...register("contact")}
                />
                {errors.contact && (
                  <p id="err-contact" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                    <AlertCircle size={12} aria-hidden="true" /> {errors.contact.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="lead-company" className="mb-1.5 block text-sm font-medium text-ink">
                Название компании{" "}
                <span className="text-xs font-normal text-muted">(необязательно)</span>
              </label>
              <input
                id="lead-company"
                autoComplete="organization"
                placeholder="Чтобы подготовиться к разговору"
                aria-invalid={errors.company ? true : undefined}
                aria-describedby={errors.company ? "err-company" : undefined}
                className={`${inputCls} ${errors.company ? "border-red-400/60" : "border-white/10"}`}
                {...register("company")}
              />
              {errors.company && (
                <p id="err-company" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle size={12} aria-hidden="true" /> {errors.company.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lead-message" className="mb-1.5 block text-sm font-medium text-ink">
                Задача или вопрос <span className="text-accent-soft">*</span>
              </label>
              <textarea
                id="lead-message"
                rows={5}
                placeholder="Какой процесс хотите автоматизировать? Какие инструменты уже используете?"
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "err-message" : undefined}
                className={`${inputCls} resize-y ${errors.message ? "border-red-400/60" : "border-white/10"}`}
                {...register("message")}
              />
              {errors.message && (
                <p id="err-message" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle size={12} aria-hidden="true" /> {errors.message.message}
                </p>
              )}
            </div>

            {/* Согласие на обработку данных */}
            <div>
              <label
                htmlFor="lead-consent"
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm transition-colors ${
                  errors.consent ? "border-red-400/50 bg-red-400/[0.04]" : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <input
                  id="lead-consent"
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#8B5CF6]"
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? "err-consent" : undefined}
                  {...register("consent")}
                />
                <span className="text-muted">
                  Я согласен на обработку персональных данных и принимаю{" "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-soft underline-offset-4 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    политику конфиденциальности
                  </Link>
                  .
                </span>
              </label>
              {errors.consent && (
                <p id="err-consent" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle size={12} aria-hidden="true" /> {errors.consent.message}
                </p>
              )}
            </div>

            {status === "error" && serverError && (
              <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-400/40 bg-red-400/[0.07] p-4 text-sm text-red-300">
                <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>{serverError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || status === "submitting"}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-8 text-sm font-semibold text-white shadow-glow transition-all hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  Отправляем…
                </>
              ) : (
                <>
                  <Send size={16} aria-hidden="true" />
                  Отправить заявку
                </>
              )}
            </button>

            <p className="text-xs leading-relaxed text-muted/70">
              Отправляя форму, вы соглашаетесь с обработкой указанных контактов
              исключительно для обратной связи по вашей заявке.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Экспортируемый компонент: форма рендерится сразу (полная SSR-разметка),
 * а «читатель URL» (useSearchParams) монтируется только на клиенте.
 * Причина: в статическом prerender-режиме Next.js отдаёт закешированный HTML
 * независимо от query-параметров, поэтому предзаполнение из квиза выполняется
 * на гидрации — страница при этом остаётся полностью статической (○ /),
 * без bailout на клиентский рендер и без ложного skeleton при отсутствии параметров.
 */
export default function LeadForm() {
  // На сервере рендерим форму без резюме квиза (полноценный SEO-HTML).
  if (typeof window === "undefined") {
    return <LeadFormInner />;
  }
  return <LeadFormWithQuizPrefill />;
}

/** Читает ответы квиза из URL (только клиент) и передаёт их форме как initialMessage. */
function LeadFormWithQuizPrefill() {
  const searchParams = useSearchParams();

  const quizSummary = (() => {
    // Шаг «контакты» квиза не является вопросом — его id нет в quizQuestions,
    // поэтому дополнительные параметры (например, contacts) тоже попадают в резюме.
    const labelFor = (key: string) =>
      quizQuestions.find((q) => q.id === key)?.question ??
      (key === "contacts" ? "Куда отправить рекомендации" : null);

    const lines: string[] = [];
    searchParams.forEach((value, key) => {
      if (!value.trim()) return;
      const label = labelFor(key);
      if (label) lines.push(`${label}: ${value}`);
    });
    return lines.length > 0 ? `Задача по итогам квиза:\n${lines.join("\n")}` : "";
  })();

  return <LeadFormInner key={quizSummary || "empty"} initialMessage={quizSummary} />;
}
