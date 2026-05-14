import type { ReactNode } from "react";

type Tone = "info" | "warn" | "note";

const TONE_CLASS: Record<Tone, string> = {
  info: "border-accent/25 bg-accent/[0.06] text-ink/85",
  warn: "border-amber-500/40 bg-amber-500/[0.08] text-ink/85",
  note: "border-ink/15 bg-ink/[0.04] text-ink/80",
};

const LABEL: Record<Tone, string> = {
  info: "Note",
  warn: "Heads up",
  note: "Aside",
};

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: Tone;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside
      className={`my-6 rounded-2xl border px-5 py-4 not-prose text-sm leading-relaxed ${TONE_CLASS[tone]}`}
      role="note"
    >
      <p className="text-[10px] uppercase tracking-[0.22em] text-accent">
        {title ?? LABEL[tone]}
      </p>
      <div className="mt-1 text-ink/85">{children}</div>
    </aside>
  );
}
