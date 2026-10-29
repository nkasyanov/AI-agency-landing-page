"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { quizQuestions } from "@/data/quiz";

/**
 * Квиз (Блок 10). После последних шагов формирует резюме и передаёт
 * ответы в форму заявки (#form на главной странице) через query-параметры —
 * отправка выполняется там же, где и реальная submission-логика.
 */

type Answers = Record<string, string[]>;

export default function LeadQuiz() {
  const reduce = useReducedMotion();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const total = quizQuestions.length + 1; // вопросы + экран резюме

  const isSummary = step === quizQuestions.length;
  const progress = Math.round(((step + 1) / total) * 100);

  const toggle = (qid: string, option: string, multi: boolean) => {
    setAnswers((prev) => {
      const cur = prev[qid] ?? [];
      if (multi) {
        return {
          ...prev,
          [qid]: cur.includes(option)
            ? cur.filter((v) => v !== option)
            : [...cur, option],
        };
      }
      return { ...prev, [qid]: [option] };
    });
  };

  const canContinue = useMemo(() => {
    if (isSummary) return true;
    const q = quizQuestions[step];
    return (answers[q.id]?.length ?? 0) > 0;
  }, [answers, step, isSummary]);

  const summaryLines = useMemo(() => {
    return quizQuestions.map((q) => ({
      question: q.question,
      answer: (answers[q.id] ?? []).join(", "),
    }));
  }, [answers]);

  const next = () => {
    if (!canContinue) return;
    setStep((s) => Math.min(s + 1, quizQuestions.length));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  /** Переход к форме с предзаполненными ответами квиза */
  const toForm = () => {
    const params = new URLSearchParams();
    quizQuestions.forEach((q) => {
      const val = (answers[q.id] ?? []).join(", ");
      if (val) params.set(q.id, val);
    });
    const qs = params.toString();
    // Якорь #form находится на главной странице (секция ContactSection)
    router.push(`/${qs ? `?${qs}` : ""}#form`);
  };

  const dir = reduce ? 0 : 40;

  return (
    <section id="quiz" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6">
        <SectionHeading
          eyebrow="5 вопросов"
          title="Найдём процессы, которые пора автоматизировать"
          description="Короткий квиз: за минуту соберём картину ваших задач и подготовим предварительные рекомендации."
        />

        <Reveal className="mx-auto mt-12 max-w-2xl">
          <div className="rounded-2xl border border-white/[0.08] bg-surface/60 p-6 shadow-glow-sm sm:p-8">
            {/* Прогресс */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-xs text-muted">
                <span>
                  Шаг {Math.min(step + 1, total)} из {total}
                </span>
                <span>{progress}%</span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Прогресс прохождения квиза"
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-cyanish"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: reduce ? 0 : 0.35 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!isSummary ? (
                <motion.div
                  key={quizQuestions[step].id}
                  initial={reduce ? false : { opacity: 0, x: dir }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -dir }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-lg font-semibold text-ink">
                    {quizQuestions[step].question}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {quizQuestions[step].multi
                      ? "Можно выбрать несколько вариантов"
                      : "Выберите один вариант"}
                  </p>

                  <ul className="mt-5 space-y-2.5" role="listbox" aria-label={quizQuestions[step].question}>
                    {quizQuestions[step].options.map((opt) => {
                      const selected = (answers[quizQuestions[step].id] ?? []).includes(opt);
                      return (
                        <li key={opt}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={selected}
                            onClick={() =>
                              toggle(quizQuestions[step].id, opt, quizQuestions[step].multi)
                            }
                            className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all ${
                              selected
                                ? "border-accent/60 bg-accent/[0.12] text-ink shadow-glow-sm"
                                : "border-white/[0.08] bg-white/[0.02] text-muted hover:border-white/20 hover:text-ink"
                            }`}
                          >
                            {opt}
                            <span
                              aria-hidden="true"
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                                selected
                                  ? "border-accent bg-accent text-white"
                                  : "border-white/20"
                              }`}
                            >
                              {selected && <Check size={13} strokeWidth={2.5} />}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ) : (
                <motion.div
                  key="summary"
                  initial={reduce ? false : { opacity: 0, x: dir }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -dir }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-ink">
                    Предварительное резюме задачи
                  </h3>
                  <dl className="mt-5 space-y-4">
                    {summaryLines.map((line) => (
                      <div
                        key={line.question}
                        className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
                      >
                        <dt className="text-xs uppercase tracking-wider text-muted/70">
                          {line.question}
                        </dt>
                        <dd className="mt-1 text-sm text-ink">{line.answer || "—"}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    Эти ответы будут переданы в форму заявки — останется указать
                    контакт, и мы изучим задачу для предварительных рекомендаций.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={toForm}
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-accent-soft"
                    >
                      Отправить заявку с этими ответами
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={back}
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 px-5 text-sm text-muted transition-colors hover:text-ink"
                    >
                      <ArrowLeft size={15} className="mr-1.5" aria-hidden="true" />
                      Назад
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Навигация по вопросам */}
            {!isSummary && (
              <div className="mt-7 flex items-center justify-between border-t border-white/[0.06] pt-6">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm text-muted transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-40"
                >
                  <ArrowLeft size={15} aria-hidden="true" />
                  Назад
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={!canContinue}
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white shadow-glow-sm transition-all hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {step === quizQuestions.length - 1 ? "Показать резюме" : "Далее"}
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
