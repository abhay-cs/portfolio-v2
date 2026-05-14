import type { ReactNode } from "react";

export function CodeFence({
  language,
  filename,
  children,
}: {
  language?: string;
  filename?: string;
  children: ReactNode;
}) {
  const label = filename ?? language;
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-ink/10 bg-ink/[0.04] not-prose">
      {label ? (
        <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-ink/55">
          <span>{label}</span>
          {language && filename ? <span>{language}</span> : null}
        </div>
      ) : null}
      <pre className="overflow-x-auto px-4 py-3 font-mono text-sm leading-relaxed text-ink/90">
        <code>{children}</code>
      </pre>
    </div>
  );
}
