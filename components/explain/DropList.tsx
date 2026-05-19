"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SPRING } from "@/lib/spring";

type Drop = { id: string; text: string; kind: "text" | "link"; ts: string };

const SAMPLE: Drop[] = [
  {
    id: "d3",
    text: "Email Maya about Friday — try the late slot",
    kind: "text",
    ts: "just now",
  },
  {
    id: "d2",
    text: "https://linear.app/issue/CRN-204",
    kind: "link",
    ts: "2m ago",
  },
  {
    id: "d1",
    text: "Try a tag system for crane — maybe locally with mlx",
    kind: "text",
    ts: "11m ago",
  },
];

export function DropList({
  count = SAMPLE.length,
  searchQuery,
}: {
  count?: number;
  searchQuery?: string;
}) {
  const visible = SAMPLE.slice(0, count).filter((d) =>
    searchQuery ? d.text.toLowerCase().includes(searchQuery.toLowerCase()) : true,
  );
  return (
    <ul className="flex flex-col gap-2 not-prose" aria-label="Captured drops">
      <AnimatePresence initial={false}>
        {visible.map((drop) => (
          <motion.li
            key={drop.id}
            layout
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={SPRING}
            className="flex items-start gap-3 rounded-xl border border-ink/10 bg-cream px-3 py-2 ring-1 ring-ink/[0.02]"
          >
            <span
              className={`mt-1 inline-block h-2 w-2 shrink-0 rounded-full ${
                drop.kind === "link" ? "bg-accent" : "bg-ink/40"
              }`}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-ink/85">{drop.text}</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">
                {drop.kind} · {drop.ts}
              </p>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
      {visible.length === 0 ? (
        <li className="rounded-xl border border-dashed border-ink/15 px-3 py-4 text-center text-sm text-ink/45">
          No matches
        </li>
      ) : null}
    </ul>
  );
}
