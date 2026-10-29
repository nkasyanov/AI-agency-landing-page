"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  UserCheck,
  BrainCircuit,
  ClipboardList,
  Users,
  Send,
  BellRing,
  Play,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

/**
 * Интерактивная схема цепочки автоматизации (Блок 5).
 * Демонстрация автономна: анимация прохождения данных — локальная,
 * без обращения к внешним сервисам.
 */

const steps = [
  {
    icon: UserCheck,
    title: "Клиент оставляет заявку",
    detail:
      "Обращение попадает из формы, мессенджера или почты в единую точку входа.",
  },
  {
    icon: BrainCircuit,
    title: "ИИ анализирует запрос",
    detail:
      "Модель определяет намерение клиента, тон и срочность, выделяет ключевые детали.",
  },
  {
    icon: ClipboardList,
    title: "Система проверяет данные",
    detail:
      "Контакты нормализуются, дубликаты отсеиваются, данные обогащаются из подключённых источников.",
  },
  {
    icon: Users,
    title: "Интеграция создаёт сделку в CRM",
    detail:
      "Через API карточка лида появляется в CRM со всей историей и атрибутами.",
  },
  {
    icon: Send,
    title: "Клиент получает ответ",
    detail:
      "Персонализированное сообщение уходит в тот же канал — быстро и по правилам вашего бренда.",
  },
  {
    icon: BellRing,
    title: "Менеджер уведомлён о лиде",
    detail:
      "Ответственный получает готовый лид с контекстом диалога и рекомендацией по следующему шагу.",
  },
];

export default function WorkflowDemo() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [demoRunning, setDemoRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runDemo = useCallback(() => {
    if (demoRunning) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setDemoRunning(true);
    if (reduce) {
      // Для prefers-reduced-motion показываем результат сразу
      setActive(steps.length - 1);
      setDemoRunning(false);
      return;
    }
    steps.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setActive(i), i * 900),
      );
    });
    timers.current.push(
      setTimeout(() => {
        setDemoRunning(false);
      }, steps.length * 900),
    );
  }, [demoRunning, reduce]);

  return (
    <section className="relative py-20 sm:py-28">
      {/* фоновая подсветка блока */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-[420px] max-w-4xl rounded-full bg-accent/[0.05] blur-[130px]"
      />
      <div className="relative mx-auto max-w-container px-4 sm:px-6">
        <SectionHeading
          eyebrow="Как это работает"
          title="От ручных процессов — к интеллектуальной системе"
          description="Наведите на шаг схемы или запустите демонстрацию, чтобы увидеть путь заявки от клиента до менеджера."
        />

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={runDemo}
            disabled={demoRunning}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-6 text-sm font-medium text-ink shadow-glow-sm transition-all hover:border-accent/70 hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Play size={16} aria-hidden="true" />
            {demoRunning ? "Демонстрация идёт…" : "Посмотреть, как это работает"}
          </button>
        </div>

        {/* Схема: вертикальный таймлайн (все экраны) */}
        <Reveal>
          <ol className="relative mx-auto mt-12 max-w-3xl space-y-3">
            {/* соединительная линия */}
            <li aria-hidden="true" className="absolute bottom-8 left-[27px] top-8 w-px bg-white/10 sm:left-[31px]" />
            {steps.map((s, i) => {
              const isActive = active === i;
              const isDone = active !== null && active > i;
              return (
                <motion.li
                  key={s.title}
                  animate={{
                    scale: isActive && !reduce ? 1.015 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => !demoRunning && setActive(i)}
                  onFocus={() => !demoRunning && setActive(i)}
                  onClick={() => setActive(active === i ? null : i)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isActive}
                  aria-label={`${i + 1}. ${s.title}`}
                  className={`relative flex cursor-pointer list-none items-start gap-4 rounded-2xl border p-4 outline-none transition-colors duration-300 sm:gap-5 sm:p-5 focus-visible:border-accent/50 ${
                    isActive
                      ? "border-accent/40 bg-accent/[0.07] shadow-glow-sm"
                      : "border-white/[0.07] bg-surface/50 hover:border-white/15"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`relative z-10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-300 sm:h-10 sm:w-10 ${
                      isActive || isDone
                        ? "border-accent bg-accent text-white"
                        : "border-white/15 bg-base text-muted"
                    }`}
                  >
                    {isDone ? "✓" : i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2.5">
                      <s.icon
                        size={17}
                        strokeWidth={1.7}
                        aria-hidden="true"
                        className={isActive ? "text-cyanish" : "text-muted"}
                      />
                      <h3 className="text-sm font-semibold text-ink sm:text-base">
                        {s.title}
                      </h3>
                    </div>
                    {/* Краткое описание: видно при фокусе/hover/тапе */}
                    <motion.p
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        height: isActive ? "auto" : 0,
                      }}
                      transition={{ duration: reduce ? 0 : 0.25 }}
                      className="overflow-hidden text-sm leading-relaxed text-muted"
                    >
                      <span className="block pt-2">{s.detail}</span>
                    </motion.p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </Reveal>

        <p className="mt-8 text-center text-xs text-muted/70">
          Демонстрационная схема. Анимация выполняется локально в браузере и не
          обращается к внешним сервисам.
        </p>
      </div>
    </section>
  );
}
