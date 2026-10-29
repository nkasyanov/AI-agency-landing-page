/* Конфигурация квиза (Блок 10) */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  multi: boolean;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "target",
    question: "Что вы хотите автоматизировать?",
    multi: true,
    options: [
      "Продажи и обработку заявок",
      "Поддержку клиентов",
      "Маркетинг и контент",
      "Внутренние процессы",
      "Несколько направлений сразу",
    ],
  },
  {
    id: "tools",
    question: "Какими инструментами пользуется ваша команда?",
    multi: true,
    options: [
      "CRM",
      "Telegram или другие мессенджеры",
      "Таблицы и документы",
      "Собственные сервисы и API",
      "Пока нет единой системы",
    ],
  },
  {
    id: "scale",
    question: "Какой масштаб задачи?",
    multi: false,
    options: [
      "Небольшая автоматизация",
      "Один полноценный AI-агент",
      "Система из нескольких автоматизаций",
      "Пока нужна консультация",
    ],
  },
];
