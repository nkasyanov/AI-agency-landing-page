"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, Inbox, ShieldCheck, Gauge } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { cardIn, stagger } from "@/lib/motion";

/**
 * Бизнес-эффект (Блок 6).
 * ВНИМАНИЕ: значения ниже — ДЕМО-пример для иллюстрации формата подачи.
 * Замените их на подтверждённые метрики ваших проектов или скройте блок.
 */

const directions = [
  {
    icon: Clock,
    title: "Меньше времени на рутину",
    text: "Повторяющиеся задачи переходят к автоматизации, команда занимается сложными случаями и развитием.",
  },
  {
    icon: Inbox,
    title: "Быстрее обработка обращений",
    text: "Первый ответ клиенту уходит сразу после обращения, а не тогда, когда до него дойдут руки.",
  },
  {
    icon: Gauge,
    title: "Меньше ручных операций и ошибок",
    text: "Данные вносятся один раз и синхронизируются системами — исчезают потери лидов и расхождения статусов.",
  },
];

/* Демонстрационные значения условной «ручной загрузки» процесса (условные единицы, пример) */
const demoComparison = [
  { label: "Время первого ответа", before: 85, after: 12 },
  { label: "Ручных операций на заявку", before: 90, after: 25 },
  { label: "Заявок без контроля", before: 70, after: 15 },
];

export default function ResultsSection() {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6">
        <SectionHeading
          eyebrow="Бизнес-эффект"
          title="Автоматизация должна приносить измеримую пользу"
          description="Мы фиксируем метрики до старта и после запуска — эффект должен быть виден в цифрах вашего процесса."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {directions.map((d) => (
            <motion.div
              key={d.title}
              variants={cardIn}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/[0.07] bg-surface/50 p-6 transition-colors hover:border-accent/30"
            >
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyanish">
                <d.icon size={18} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="text-base font-semibold text-ink">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* До / После */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/[0.07] bg-surface/50 p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-ink">
                Нагрузка процесса: до и после
              </h3>
              <span className="rounded-full border border-cyanish/30 bg-cyanish/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-cyanish">
                Пример · демо-значения
              </span>
            </div>

            <div className="mb-4 grid grid-cols-[1fr_auto] items-center gap-x-6 text-xs font-medium uppercase tracking-wider text-muted sm:grid-cols-[180px_1fr]">
              <span className="hidden sm:block">Показатель</span>
              <div className="col-start-1 flex gap-8 sm:col-start-2 sm:justify-end">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm bg-white/20" /> До автоматизации
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm bg-accent shadow-glow-sm" /> После автоматизации
                </span>
              </div>
            </div>

            <ul className="space-y-5">
              {demoComparison.map((row, i) => (
                <li key={row.label}>
                  <div className="mb-1.5 text-sm text-ink">{row.label}</div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                    <div className="flex-1">
                      <motion.div
                        className="h-2.5 rounded-full bg-white/15"
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${row.before}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: reduce ? 0 : i * 0.1 }}
                        role="img"
                        aria-label={`${row.label}: до автоматизации — ${row.before} условных единиц (пример)`}
                      />
                    </div>
                    <div className="flex-1">
                      <motion.div
                        className="h-2.5 rounded-full bg-gradient-to-r from-accent to-cyanish shadow-glow-sm"
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${row.after}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: reduce ? 0 : 0.2 + i * 0.1 }}
                        role="img"
                        aria-label={`${row.label}: после автоматизации — ${row.after} условных единиц (пример)`}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-muted/80">
              <ShieldCheck size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
              Это демонстрационная визуализация формата метрик, а не результат
              конкретного проекта. Реальные показатели измеряются на этапе аудита
              и фиксируются в критериях успеха.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
