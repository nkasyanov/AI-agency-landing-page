"use client";

import { motion } from "framer-motion";
import { Plug } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { integrations } from "@/data/content";
import { cardIn, stagger } from "@/lib/motion";

/** Технологии и интеграции (Блок 9). Текстовые обозначения — без логотипов-заимствований. */
export default function IntegrationsSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6">
        <SectionHeading
          eyebrow="Технологии"
          title="Интегрируем ИИ в вашу экосистему"
          description="Работаем с сервисами, которые уже используются в компании, и добавляем новые только при необходимости."
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3"
        >
          {integrations.map((name) => (
            <motion.li
              key={name}
              variants={cardIn}
              whileHover={{ y: -2 }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-surface/60 px-4 py-2.5 text-sm font-medium text-ink/90 transition-colors hover:border-accent/40 hover:text-ink"
            >
              <Plug size={14} className="text-muted" aria-hidden="true" />
              {name}
            </motion.li>
          ))}
        </motion.ul>

        <Reveal className="mt-10">
          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-muted">
            Подбираем стек под ваши задачи, существующую инфраструктуру и
            требования безопасности. Упоминание сервисов не означает официального
            партнёрства — мы интегрируемся через открытые API этих платформ.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
