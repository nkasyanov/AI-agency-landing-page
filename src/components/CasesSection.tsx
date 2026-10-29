"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Cpu } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { cases } from "@/data/cases";
import { cardIn, stagger } from "@/lib/motion";

export default function CasesSection() {
  return (
    <section id="cases" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6">
        <SectionHeading
          eyebrow="Кейсы"
          title="Автоматизации, которые решают реальные задачи"
          description="Ниже — демонстрационные сценарии, показывающие типовой подход к решению задач. Это концепты, а не публичные проекты клиентов."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-5 lg:grid-cols-3"
        >
          {cases.map((c) => (
            <motion.article
              key={c.title}
              variants={cardIn}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="flex flex-col rounded-2xl border border-white/[0.07] bg-surface/50 p-6 transition-colors hover:border-accent/30 sm:p-7"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyanish/25 bg-cyanish/[0.07] px-3 py-1 text-[11px] font-medium text-cyanish">
                  <AlertTriangle size={12} aria-hidden="true" />
                  {c.tag}
                </span>
              </div>

              <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink">
                {c.title}
              </h3>

              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="font-medium uppercase tracking-wider text-muted/70 text-xs">
                    Проблема
                  </dt>
                  <dd className="mt-1 leading-relaxed text-muted">{c.problem}</dd>
                </div>
                <div>
                  <dt className="font-medium uppercase tracking-wider text-muted/70 text-xs">
                    Решение
                  </dt>
                  <dd className="mt-1 leading-relaxed text-muted">{c.solution}</dd>
                </div>
                <div>
                  <dt className="font-medium uppercase tracking-wider text-muted/70 text-xs">
                    Результат
                  </dt>
                  <dd className="mt-1 leading-relaxed text-ink/90">{c.result}</dd>
                </div>
              </dl>

              <div className="mt-auto pt-6">
                <div className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
                  {c.stack.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-muted"
                    >
                      <Cpu size={11} aria-hidden="true" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={cardIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <a
            href="#form"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-soft transition-colors hover:text-cyanish"
          >
            Хотите такой же подход к вашей задаче? Обсудим
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
