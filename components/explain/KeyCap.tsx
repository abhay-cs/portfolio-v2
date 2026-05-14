"use client";

import { motion } from "framer-motion";
import { SPRING } from "@/lib/spring";

export function KeyCap({
  label,
  pressed = false,
  width = "auto",
}: {
  label: string;
  pressed?: boolean;
  width?: number | "auto";
}) {
  return (
    <motion.span
      className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-ink/15 bg-cream px-2.5 font-mono text-xs text-ink shadow-[0_2px_0_rgb(var(--color-ink)/0.12)] ring-1 ring-ink/5 not-prose"
      style={{ width: width === "auto" ? undefined : width }}
      animate={{
        y: pressed ? 1 : 0,
        boxShadow: pressed
          ? "0 0 0 rgb(var(--color-ink) / 0.12)"
          : "0 2px 0 rgb(var(--color-ink) / 0.12)",
        backgroundColor: pressed
          ? "rgb(var(--color-accent) / 0.12)"
          : "rgb(var(--color-cream) / 1)",
      }}
      transition={SPRING}
    >
      {label}
    </motion.span>
  );
}
