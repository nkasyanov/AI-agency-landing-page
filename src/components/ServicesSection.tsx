"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { services } from "@/data/content";
import { cardIn, stagger } from "@/lib/motion";

export default function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6">
        <SectionHeading
          eyebrow="Услуги"
          title="Что мы можем автоматизировать"
          description="От первого ответа клиенту до сквозных процессов между вашими системами."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((s) => (
            <motion.article
              key={s.title}
              variants={cardIn}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group flex flex-col rounded-2xl border border-white/[0.07] bg-surface/50 p-6 transition-colors hover:border-accent/30 sm:p-7"
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-soft transition-colors group-hover:border-accent/40 group-hover:text-cyanish">
                  <s.icon size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
              </div>

              <p className="text-sm leading-relaxed text-muted">{s.description}</p>

              <ul className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-5">
                {s.tasks.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check size={15} className="mt-0.5 shrink-0 text-cyanish" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>

              <Link
                href="#form"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-soft transition-colors hover:text-cyanish focus-visible:text-cyanish"
              >
                Обсудить решение
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                <span className="sr-only"> — перейти к форме заявки</span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
