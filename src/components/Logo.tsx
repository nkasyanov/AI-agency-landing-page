import { useId } from "react";
import { siteConfig } from "@/data/site";

/** Минималистичный знак агентства: узел с расходящимися связями */
export default function Logo({ withText = true }: { withText?: boolean }) {
  // Уникальный id градиента на каждый экземпляр — чтобы не дублировать id в DOM
  const uid = useId();
  const gradId = `logo-grad-${uid.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="24" height="24" rx="7" stroke={`url(#${gradId})`} strokeWidth="1.4" />
        <circle cx="13" cy="13" r="3" fill="#8B5CF6" />
        <path
          d="M13 4v4M13 18v4M4 13h4M18 13h4"
          stroke="#67E8F9"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="26" y2="26">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#67E8F9" stopOpacity="0.7" />
          </linearGradient>
        </defs>
      </svg>
      {withText && (
        <span className="text-sm font-semibold tracking-[0.18em] text-ink">
          {siteConfig.name}
        </span>
      )}
    </span>
  );
}
