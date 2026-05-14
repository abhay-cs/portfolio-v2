import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "rgb(var(--color-cream) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "rgb(var(--color-ink) / 0.85)",
            "--tw-prose-headings": "rgb(var(--color-ink) / 1)",
            "--tw-prose-lead": "rgb(var(--color-ink) / 0.75)",
            "--tw-prose-links": "rgb(var(--color-accent) / 1)",
            "--tw-prose-bold": "rgb(var(--color-ink) / 1)",
            "--tw-prose-counters": "rgb(var(--color-ink) / 0.6)",
            "--tw-prose-bullets": "rgb(var(--color-ink) / 0.3)",
            "--tw-prose-hr": "rgb(var(--color-ink) / 0.1)",
            "--tw-prose-quotes": "rgb(var(--color-ink) / 0.85)",
            "--tw-prose-quote-borders": "rgb(var(--color-accent) / 0.3)",
            "--tw-prose-captions": "rgb(var(--color-ink) / 0.55)",
            "--tw-prose-code": "rgb(var(--color-ink) / 1)",
            "--tw-prose-pre-code": "rgb(var(--color-ink) / 0.9)",
            "--tw-prose-pre-bg": "rgb(var(--color-ink) / 0.04)",
            "--tw-prose-th-borders": "rgb(var(--color-ink) / 0.2)",
            "--tw-prose-td-borders": "rgb(var(--color-ink) / 0.1)",
            "--tw-prose-invert-body": "rgb(var(--color-ink) / 0.85)",
            "--tw-prose-invert-headings": "rgb(var(--color-ink) / 1)",
            "--tw-prose-invert-links": "rgb(var(--color-accent) / 1)",
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            "h1, h2, h3, h4": {
              fontFamily: "var(--font-display), Georgia, serif",
              letterSpacing: "-0.01em",
              fontWeight: "500",
            },
            a: {
              textDecoration: "none",
              borderBottom: "1px solid rgb(var(--color-accent) / 0.3)",
              transition: "border-color 150ms ease",
            },
            "a:hover": {
              borderBottomColor: "rgb(var(--color-accent) / 0.8)",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            code: {
              fontWeight: "400",
              backgroundColor: "rgb(var(--color-ink) / 0.06)",
              padding: "0.125rem 0.375rem",
              borderRadius: "0.375rem",
              fontSize: "0.9em",
            },
            pre: {
              borderRadius: "1rem",
              border: "1px solid rgb(var(--color-ink) / 0.08)",
              padding: "1rem 1.25rem",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              borderRadius: "0",
              fontSize: "0.875em",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
