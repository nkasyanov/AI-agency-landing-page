"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { benefits } from "@/data/content";
import { cardIn, stagger } from "@/lib/motion";

export default function BenefitsSection() {
  return (
    <section id="solutions" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6">
        <SectionHeading
          eyebrow="Ценность"
          title="Бизнес работает. Даже когда команда отдыхает"
          description="Автоматизация забирает на себя рутину — люди занимаются задачами, где действительно нужны."
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((b) => (
            <motion.li
              key={b.title}
              variants={cardIn}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group relative rounded-2xl border border-white/[0.07] bg-surface/50 p-6 transition-colors hover:border-accent/30"
            >
              {/* Свечение при наведении */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(320px circle at 50% 0%, rgba(139,92,246,0.12), transparent 70%)",
                }}
              />
              <span className="relative mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-soft transition-colors group-hover:border-accent/40 group-hover:text-cyanish">
                <b.icon size={20} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="relative text-base font-semibold text-ink">{b.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
