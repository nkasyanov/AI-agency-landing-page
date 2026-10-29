"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import AutomationVisualization from "@/components/AutomationVisualization";

export default function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:pb-28">
      {/* Фоновые эффекты первого экрана */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-20%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[140px]" />
        <div className="absolute right-[-10%] top-[30%] h-[320px] w-[420px] rounded-full bg-cyanish/[0.05] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-container items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* Текстовый блок */}
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-glow-sm" />
            AI Automation Agency · Building the future
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.1 }}
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl"
          >
            Ваш бизнес.{" "}
            <span className="bg-gradient-to-r from-accent-soft via-accent to-cyanish bg-clip-text text-transparent">
              На автопилоте.
            </span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.2 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            Разрабатываем ИИ-агентов и автоматизируем бизнес-процессы, чтобы ваша
            команда тратила меньше времени на рутину и больше — на рост бизнеса.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.3 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="#form"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-accent px-7 text-sm font-semibold text-white shadow-glow transition-all hover:bg-accent-soft hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Обсудить автоматизацию
            </Link>
            <Link
              href="#solutions"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/12 bg-white/[0.03] px-7 text-sm font-medium text-ink transition-colors hover:border-white/25 hover:bg-white/[0.06]"
            >
              Посмотреть решения
            </Link>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.45 }}
            className="mt-4 text-sm text-muted/80"
          >
            От идеи до работающей системы — под задачи вашего бизнеса.
          </motion.p>
        </div>

        {/* Визуализация AI-системы */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <AutomationVisualization />
        </motion.div>
      </div>
    </section>
  );
}
