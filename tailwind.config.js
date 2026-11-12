/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      // Mobile styles only below laptop; matches existing `mob:` / `laptop:` class pairs
      mob: { max: "1023px" },
      laptop: "1024px",
      laptopl: "1440px",
      desktop: "1280px",
    },
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        ink: {
          DEFAULT: "var(--color-ink)",
          muted: "var(--color-ink-muted)",
          soft: "var(--color-ink-soft)",
        },
        brand: {
          DEFAULT: "var(--color-brand)",
          strong: "var(--color-brand-strong)",
          soft: "var(--color-brand-soft)",
          mute: "var(--color-brand-mute)",
        },
        line: "var(--color-line)",
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      fontSize: {
        display: [
          "clamp(2rem, 1.2rem + 4vw, 6rem)",
          {
            lineHeight: "1.08",
            letterSpacing: "-0.03em",
            fontWeight: "700",
          },
        ],
        section: [
          "clamp(1.125rem, 1rem + 0.4vw, 1.5rem)",
          {
            lineHeight: "1.3",
            letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        title: [
          "clamp(1.25rem, 1.1rem + 0.6vw, 1.75rem)",
          {
            lineHeight: "1.25",
            letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        body: [
          "clamp(1.125rem, 1rem + 0.55vw, 1.5rem)",
          {
            lineHeight: "1.55",
            letterSpacing: "-0.01em",
            fontWeight: "400",
          },
        ],
        supporting: [
          "clamp(0.9375rem, 0.9rem + 0.2vw, 1.125rem)",
          {
            lineHeight: "1.5",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        nav: [
          "clamp(0.875rem, 0.85rem + 0.15vw, 1rem)",
          {
            lineHeight: "1.4",
            letterSpacing: "0",
            fontWeight: "500",
          },
        ],
        meta: [
          "0.8125rem",
          {
            lineHeight: "1.45",
            letterSpacing: "0.01em",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [],
};
