import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";

/**
 * Страница «Политика конфиденциальности».
 * ВАЖНО: это шаблон-заготовка. Перед публикацией документ должен быть
 * проверен юристом и приведён в соответствие с законодательством вашей
 * юрисдикции и реальными операторскими данными (ИНН, адрес, ДПО).
 */

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Как сайт обрабатывает и защищает персональные данные, оставляемые в форме заявки.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Шапка */}
      <header className="border-b border-white/[0.06] bg-base/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-container items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            ← На главную
          </Link>
          <span className="text-sm font-semibold tracking-widest text-ink">
            {siteConfig.name}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Политика конфиденциальности
        </h1>
        <p className="mt-3 text-sm text-muted">
          Действует с момента публикации этой страницы. Замените формулировки
          на фактические перед запуском сайта.
        </p>

        <div className="prose-invert mt-10 space-y-10 text-[15px] leading-relaxed text-muted [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-ink [&_li]:mt-1.5 [&_p]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
          <section>
            <h2>1. Общие положения</h2>
            <p>
              Настоящая политика описывает порядок обработки персональных данных
              на сайте {siteConfig.legalName} («Сайт»). Используя формы обратной
              связи на Сайте, вы подтверждаете согласие с условиями, изложенными
              ниже.
            </p>
            <p>
              Оператор обрабатывает персональные данные с соблюдением
              принципов законности, цели обработки, защиты данных и их
              конфиденциальности.
            </p>
          </section>

          <section>
            <h2>2. Какие данные собираются</h2>
            <p>Через формы заявки и квиза Сайте могут собираться:</p>
            <ul>
              <li>имя (указанное вами в форме);</li>
              <li>контакт для обратной связи: email, Telegram или телефон;</li>
              <li>название компании (необязательное поле);</li>
              <li>содержание сообщения / ответы квиза, которые вы вводите;</li>
              <li>технические данные: IP-адрес, тип браузера — в объёме,
                необходимом для работы сервера и защиты от злоупотреблений.</li>
            </ul>
            <p>
              Сайт не собирает специальные категории персональных данных,
              биометрию и платёжные реквизиты.
            </p>
          </section>

          <section>
            <h2>3. Цели обработки</h2>
            <ul>
              <li>обратная связь по отправленной заявке и подготовка
                предварительных рекомендаций по автоматизации;</li>
              <li>идентификация автора обращения и предотвращение
                злоупотреблений формой (rate limiting);</li>
              <li>исполнение требований законодательства, если это применимо.</li>
            </ul>
            <p>
              Правовое основание — ваше согласие, выраженное отметкой в форме
              заявки.
            </p>
          </section>

          <section id="consent">
            <h2>4. Согласие на обработку персональных данных</h2>
            <p>
              Нажимая кнопку «Отправить заявку», вы свободно, своей волей и в
              своём интересе даёте согласие на обработку указанных персональных
              данных исключительно для обратной связи по вашей заявке.
            </p>
            <p>
              Согласие может быть отозвано в любой момент: напишите на{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent-soft underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>{" "}
              — данные будут удалены, обработка прекращена.
            </p>
          </section>

          <section>
            <h2>5. Хранение и защита</h2>
            <ul>
              <li>заявки передаются по HTTPS и хранятся ограниченное время,
                необходимое для обработки обращения;</li>
              <li>доступ к данным имеет только ограниченный круг сотрудников,
                обязанных соблюдать конфиденциальность;</li>
              <li>применяются технические меры защиты: контроль доступа,
                шифрование каналов передачи, ограничение частоты отправки
                формы;</li>
              <li>данные не продаются и не передаются третьим лицам, кроме
                случаев, прямо предусмотренных законом.</li>
            </ul>
          </section>

          <section>
            <h2>6. Cookie и аналитика</h2>
            <p>
              Если на Сайте подключаются сервисы аналитики или cookie-механизмы,
              их перечень и назначение будут добавлены в этот раздел до
              включения соответствующего кода. На текущий момент Сайт использует
              только функциональные механизмы, необходимые для его работы.
            </p>
          </section>

          <section>
            <h2>7. Контакты</h2>
            <p>
              Вопросы об обработке персональных данных:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent-soft underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>

          <section className="rounded-xl border border-amber-400/25 bg-amber-400/[0.05] p-4 text-sm text-amber-200/90">
            <h3 className="text-sm font-semibold text-amber-200">
              Предупреждение для владельца сайта
            </h3>
            <p className="mt-2 text-amber-100/80">
              Это типовой шаблон, а не юридическое заключение. Перед
              публикацией адаптируйте документ под вашу юрисдикцию (например,
              152-ФЗ для РФ / GDPR для ЕС), укажите реальные реквизиты
              оператора и ответственного за обработку данных и получите
              проверку юриста.
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-8">
          <Link
            href="/#form"
            className="inline-flex h-11 items-center rounded-xl bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-soft"
          >
            Вернуться к форме заявки
          </Link>
        </div>
      </main>
    </div>
  );
}
