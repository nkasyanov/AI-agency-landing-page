"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { siteConfig } from "@/data/site";

/**
 * Финальный CTA + форма заявки (Блок 12).
 */
export default function ContactSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Мягкое свечение фона */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-[10%] h-[460px] w-[820px] -translate-x-1/2 rounded-full bg-accent/[0.09] blur-[130px]"
          animate={reduce ? undefined : { opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[8%] right-[12%] h-[260px] w-[380px] rounded-full bg-cyanish/[0.06] blur-[110px]"
          animate={reduce ? undefined : { opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      <div className="relative mx-auto max-w-container px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            Какие процессы в вашем бизнесе можно автоматизировать{" "}
            <span className="bg-gradient-to-r from-accent-soft to-cyanish bg-clip-text text-transparent">
              уже сейчас?
            </span>
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.1 }}
            className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            Расскажите о задаче — предложим подходящее решение и определим
            следующие шаги. Первичный аудит процессов бесплатный.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.2 }}
            className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#form"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-7 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-accent-soft"
            >
              Обсудить мой проект
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href={siteConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-cyanish"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Или напишите нам в Telegram
            </a>
          </motion.div>
        </div>

        {/* Форма */}
        <motion.div
          id="form"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.15 }}
          className="mx-auto mt-14 max-w-2xl scroll-mt-28 rounded-2xl border border-white/[0.08] bg-surface/70 p-6 backdrop-blur-sm sm:p-9"
        >
          <h3 className="mb-1 text-xl font-semibold text-ink">Заявка на аудит</h3>
          <p className="mb-7 text-sm text-muted">
            Заполните форму — вернёмся с первичными рекомендациями. Поля со звёздочкой обязательны.
          </p>
          <LeadForm />
        </motion.div>
      </div>
    </section>
  );
}
