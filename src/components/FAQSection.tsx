"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { faqItems } from "@/data/faq";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Частые вопросы" />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="divide-y divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-surface/50 px-2 sm:px-6">
            {faqItems.map((item, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={item.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span className={`text-base font-medium transition-colors ${isOpen ? "text-ink" : "text-muted hover:text-ink"}`}>
                        {item.q}
                      </span>
                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className={`shrink-0 text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-accent-soft" : ""}`}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-button-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-10 text-sm leading-relaxed text-muted">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-sm text-muted">
            Не нашли ответ?{" "}
            <Link href="#form" className="font-medium text-accent-soft hover:text-cyanish">
              Задайте вопрос в форме заявки
            </Link>{" "}
            — ответим честно.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
