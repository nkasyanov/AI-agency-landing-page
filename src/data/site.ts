/**
 * Единая конфигурация бренда и контактов.
 * ВАЖНО: замените плейсхолдеры на реальные данные перед запуском в production.
 */
export const siteConfig = {
  name: "NEXAFLOW",
  legalName: "NEXAFLOW — AI Automation Agency",
  tagline: "AI Automation Agency",
  description:
    "Разрабатываем ИИ-агентов и автоматизируем бизнес-процессы: продажи, поддержка, CRM, интеграции и корпоративные AI-workflow.",
  /** Замените на реальный контакт перед публикацией. */
  email: "hello@example.com",
  /** Замените на реальный Telegram-аккаунт агентства. */
  telegram: "https://t.me/your_agency",
  telegramLabel: "@your_agency",
  url: "https://example.com", // замените на боевой домен
} as const;

export const navLinks = [
  { label: "Решения", href: "#solutions" },
  { label: "Услуги", href: "#services" },
  { label: "Кейсы", href: "#cases" },
  { label: "Процесс работы", href: "#process" },
  { label: "FAQ", href: "#faq" },
] as const;
