import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import ServicesSection from "@/components/ServicesSection";
import WorkflowDemo from "@/components/WorkflowDemo";
import ResultsSection from "@/components/ResultsSection";
import CasesSection from "@/components/CasesSection";
import ProcessSection from "@/components/ProcessSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import LeadQuiz from "@/components/LeadQuiz";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/** JSON-LD структурированные данные (SEO) */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "NEXAFLOW — AI Automation Agency",
  description:
    "Разрабатываем ИИ-агентов и автоматизируем бизнес-процессы: продажи, поддержка, CRM, интеграции и корпоративные AI-workflow.",
  url: "https://example.com",
  areaServed: "RU",
  availableLanguage: ["ru", "en"],
  knowsAbout: [
    "AI-агенты",
    "Автоматизация бизнес-процессов",
    "Интеграция CRM",
    "n8n",
    "Make",
    "REST API и Webhooks",
  ],
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Блок 2 — первый экран */}
        <HeroSection />

        {/* Блок 3 — ценность и преимущества */}
        <BenefitsSection />

        {/* Блок 4 — услуги */}
        <ServicesSection />

        {/* Блок 5 — интерактивная схема автоматизации */}
        <div id="workflow" className="scroll-mt-20">
          <WorkflowDemo />
        </div>

        {/* Блок 6 — бизнес-эффект */}
        <div id="results" className="scroll-mt-20">
          <ResultsSection />
        </div>

        {/* Блок 7 — кейсы */}
        <CasesSection />

        {/* Блок 8 — этапы работы */}
        <ProcessSection />

        {/* Блок 9 — технологии и интеграции */}
        <IntegrationsSection />

        {/* Блок 10 — квиз */}
        <LeadQuiz />

        {/* Блок 11 — FAQ */}
        <FAQSection />

        {/* Блоки 12 + форма заявки */}
        <ContactSection />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
