import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#08090C",
        surface: "#101218",
        ink: "#F5F7FA",
        muted: "#989EAA",
        accent: {
          DEFAULT: "#8B5CF6",
          soft: "#A78BFA",
        },
        cyanish: "#67E8F9",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(139, 92, 246, 0.45)",
        "glow-sm": "0 0 24px -6px rgba(139, 92, 246, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
