"use client";

import { useEffect, useState } from "react";

type Mode = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

function readStored(): Mode {
  if (typeof window === "undefined") return "system";
  try {
    const t = window.localStorage.getItem(STORAGE_KEY);
    if (t === "light" || t === "dark") return t;
  } catch {
    /* no-op */
  }
  return "system";
}

function systemPref(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function apply(next: Mode) {
  const root = document.documentElement;
  if (next === "system") {
    delete root.dataset.theme;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* no-op */
    }
    return;
  }
  root.dataset.theme = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* no-op */
  }
}

/**
 * Theme toggle. First load follows the OS preference; clicking pins
 * an explicit light/dark choice in localStorage. A long-press
 * (Shift+click on desktop) reverts to "follow system".
 */
export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("system");
  const [systemMode, setSystemMode] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(readStored());
    setSystemMode(systemPref());
    setMounted(true);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemMode(mq.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function handleClick(e: React.MouseEvent) {
    if (e.shiftKey) {
      apply("system");
      setMode("system");
      return;
    }
    const effective = mode === "system" ? systemMode : mode;
    const next: Mode = effective === "dark" ? "light" : "dark";
    apply(next);
    setMode(next);
  }

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-ink/[0.03] text-ink/75"
      >
        <span className="block h-4 w-4 opacity-0" />
      </button>
    );
  }

  const effective = mode === "system" ? systemMode : mode;
  const isDark = effective === "dark";
  const label = isDark
    ? "Switch to light theme"
    : "Switch to dark theme";
  const title =
    mode === "system"
      ? `${isDark ? "Dark" : "Light"} (auto · shift-click to keep)`
      : `${isDark ? "Dark" : "Light"} · shift-click for auto`;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={title}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-ink/[0.03] text-ink/75 ring-1 ring-ink/[0.02] transition-colors hover:bg-ink/[0.06] hover:text-ink"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      {mode === "system" ? (
        <span
          aria-hidden
          className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-accent/70 ring-2 ring-cream"
        />
      ) : null}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <line x1="12" y1="2.5" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="21.5" />
        <line x1="2.5" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="21.5" y2="12" />
        <line x1="5.2" y1="5.2" x2="6.9" y2="6.9" />
        <line x1="17.1" y1="17.1" x2="18.8" y2="18.8" />
        <line x1="5.2" y1="18.8" x2="6.9" y2="17.1" />
        <line x1="17.1" y1="6.9" x2="18.8" y2="5.2" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
