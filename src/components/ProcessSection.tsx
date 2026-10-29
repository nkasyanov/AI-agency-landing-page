"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { processSteps } from "@/data/content";
import { cardIn, stagger } from "@/lib/motion";

/** Этапы работы (Блок 8): горизонтальная линия на десктопе, таймлайн на мобильны */
export default function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6">
        <SectionHeading
          eyebrow="Процесс работы"
          title="От задачи до работающей автоматизации"
          description="Прозрачные этапы: вы всегда понимаете, что происходит сейчас и что будет дальше."
        />

        <div className="relative mt-16">
          {/* Горизонтальная линия (десктоп) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
          />

          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-10 lg:grid-cols-5 lg:gap-6"
          >
            {processSteps.map((step) => (
              <motion.li
                key={step.num}
                variants={cardIn}
                className="group relative pl-0 lg:pl-0"
              >
                {/* номер этапа */}
                <div className="flex items-center gap-4 lg:block">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-base font-mono text-sm text-accent-soft shadow-glow-sm transition-colors group-hover:border-accent group-hover:text-ink lg:mb-6">
                    {step.num}
                  </span>
                  <h3 className="text-base font-semibold text-ink lg:mb-2 lg:text-lg">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted lg:mt-0">
                  {step.text}
                </p>
                {/* вертикальная линия (мобильная версия) */}
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-12 -bottom-10 w-px bg-white/10 lg:hidden"
                />
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
