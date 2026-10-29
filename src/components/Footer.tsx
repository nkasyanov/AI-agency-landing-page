import Link from "next/link";
import Logo from "@/components/Logo";
import { navLinks, siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-surface/40">
      <div className="mx-auto max-w-container px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Бренд */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              AI-агентство: разрабатываем ИИ-агентов и автоматизацию бизнес-процессов —
              от продаж и поддержки до интеграций корпоративных систем.
            </p>
          </div>

          {/* Навигация */}
          <nav aria-label="Навигация в подвале">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted/70">
              Навигация
            </h2>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="#quiz" className="text-sm text-muted transition-colors hover:text-ink">
                  Квиз автоматизации
                </Link>
              </li>
            </ul>
          </nav>

          {/* Контакты */}
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted/70">
              Контакты
            </h2>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  Telegram: {siteConfig.telegramLabel}
                </a>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted transition-colors hover:text-ink">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/privacy#consent" className="text-sm text-muted transition-colors hover:text-ink">
                  Обработка персональных данных
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-muted/70 sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.legalName}. Все права защищены.
          </p>
          <p>
            Контакты на этой странице являются плейсхолдерами до подтверждения
            реальных данных агентства.
          </p>
        </div>
      </div>
    </footer>
  );
}
