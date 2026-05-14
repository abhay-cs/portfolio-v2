"use client";

import { KeyCap } from "@/components/explain/KeyCap";

export function KeyCombo({
  keys,
  pressed = false,
}: {
  keys: string[];
  pressed?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 not-prose">
      {keys.map((k, i) => (
        <span key={`${k}-${i}`} className="inline-flex items-center gap-1.5">
          <KeyCap label={k} pressed={pressed} />
          {i < keys.length - 1 ? <span className="text-ink/40">+</span> : null}
        </span>
      ))}
    </span>
  );
}
