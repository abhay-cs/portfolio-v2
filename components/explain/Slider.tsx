"use client";

import type { ChangeEvent } from "react";

export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  format = (v: number) => v.toFixed(2),
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  format?: (v: number) => string;
}) {
  const handle = (e: ChangeEvent<HTMLInputElement>) => onChange(parseFloat(e.target.value));
  return (
    <label className="block not-prose">
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] uppercase tracking-[0.2em] text-accent">{label}</span>
        <span className="font-mono text-sm text-ink/85">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handle}
        className="mt-2 w-full accent-accent"
      />
    </label>
  );
}
