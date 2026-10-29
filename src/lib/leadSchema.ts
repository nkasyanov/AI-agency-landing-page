import { z } from "zod";

/**
 * Единая схема заявки — используется и на клиенте (LeadForm),
 * и на сервере (POST /api/lead) для независимой серверной валидации.
 */
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Укажите имя (минимум 2 символа)")
    .max(80, "Слишком длинное имя"),
  contact: z
    .string()
    .trim()
    .min(3, "Укажите email или Telegram")
    .max(160, "Слишком длинный контакт")
    .refine(
      (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ||
        /^@?[A-Za-z0-9_]{4,32}$/.test(v) ||
        /^\+?[0-9\s\-()]{7,15}$/.test(v),
      "Похоже, это не email, не Telegram и не телефон",
    ),
  company: z
    .string()
    .trim()
    .max(120, "Слишком длинное название")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Опишите задачу подробнее (минимум 10 символов)")
    .max(3000, "Максимум 3000 символов"),
  consent: z.boolean().refine((v) => v === true, {
    message: "Нужно согласие на обработку данных",
  }),
});

export type LeadValues = z.infer<typeof leadSchema>;

/** Ответ API: ok + mode ("webhook" | "demo") либо ошибка валидации. */
export interface LeadApiResponse {
  ok: boolean;
  mode?: "webhook" | "demo";
  error?: string;
  /** Поля, не прошедшие серверную валидацию */
  fields?: Record<string, string>;
}
