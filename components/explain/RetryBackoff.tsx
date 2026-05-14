"use client";

import { useMemo, useRef, useState } from "react";
import { Slider } from "@/components/explain/Slider";

const ATTEMPTS = 6; // initial + 5 retries

function delayMs(
  n: number,
  baseMs: number,
  maxMs: number,
  jitter: boolean,
  factors: number[],
) {
  const ideal = Math.min(baseMs * Math.pow(2, n), maxMs);
  if (!jitter) return ideal;
  const f = factors[n] ?? 0.5;
  return ideal * (0.75 + f * 0.5);
}

function formatMs(ms: number) {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

/**
 * RetryBackoff — timeline of attempts with exponential backoff and jitter.
 * Each attempt circle is placed proportional to its cumulative time on the
 * timeline. Sliders for base and max delay, toggle for jitter, and a "Roll
 * jitter" button for visitors who want to see how randomness fans retries
 * out across the dead-letter horizon.
 */
export function RetryBackoff() {
  const [baseMs, setBaseMs] = useState(250);
  const [maxMs, setMaxMs] = useState(8000);
  const [jitter, setJitter] = useState(true);
  const seedRef = useRef(0);
  const [factors, setFactors] = useState<number[]>(() => seededFactors(0));

  const delays = useMemo(
    () =>
      Array.from({ length: ATTEMPTS - 1 }, (_, n) =>
        delayMs(n, baseMs, maxMs, jitter, factors),
      ),
    [baseMs, maxMs, jitter, factors],
  );

  const cum = useMemo(() => {
    const arr = [0];
    delays.forEach((d) => arr.push(arr[arr.length - 1] + d));
    return arr;
  }, [delays]);

  const total = cum[cum.length - 1] || 1;
  const W = 480;
  const H = 130;
  const padL = 24;
  const padR = 84;
  const innerW = W - padL - padR;
  const cy = 58;
  const x = (t: number) => padL + (t / total) * innerW;

  function rollJitter() {
    seedRef.current += 1;
    setFactors(seededFactors(seedRef.current));
  }

  return (
    <div className="p-6 not-prose">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
        {/* Baseline */}
        <line
          x1={padL}
          x2={W - padR}
          y1={cy}
          y2={cy}
          className="stroke-ink/20"
          strokeWidth="1.4"
          strokeDasharray="2 5"
        />

        {/* Attempts */}
        {cum.map((t, i) => {
          const cx = x(t);
          const last = i === cum.length - 1;
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r="11"
                className={
                  last
                    ? "fill-accent/15 stroke-accent"
                    : "fill-cream stroke-accent/60"
                }
                strokeWidth="1.4"
              />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                className="fill-accent font-mono text-[10px] font-semibold"
              >
                {i + 1}
              </text>
              <text
                x={cx}
                y={cy - 18}
                textAnchor="middle"
                className="fill-ink/55 text-[9px] uppercase tracking-[0.14em]"
              >
                attempt
              </text>
              {/* Inter-attempt delay label */}
              {i < cum.length - 1 ? (
                <text
                  x={(cx + x(cum[i + 1])) / 2}
                  y={cy + 30}
                  textAnchor="middle"
                  className="fill-ink/65 font-mono text-[10px]"
                >
                  {formatMs(delays[i])}
                </text>
              ) : null}
            </g>
          );
        })}

        {/* Arrow to DLQ */}
        <line
          x1={x(cum[cum.length - 1]) + 12}
          x2={W - padR + 4}
          y1={cy}
          y2={cy}
          className="stroke-accent/55"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />

        {/* DLQ terminal */}
        <rect
          x={W - padR + 4}
          y={cy - 16}
          width={72}
          height={32}
          rx="8"
          className="fill-accent/10 stroke-accent/55"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <text
          x={W - padR + 40}
          y={cy + 4}
          textAnchor="middle"
          className="fill-accent text-[10px] font-semibold uppercase tracking-[0.16em]"
        >
          DLQ
        </text>
      </svg>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Slider
          label="Base delay"
          min={100}
          max={2000}
          step={50}
          value={baseMs}
          onChange={setBaseMs}
          format={(v) => `${v}ms`}
        />
        <Slider
          label="Max delay"
          min={1000}
          max={30000}
          step={500}
          value={maxMs}
          onChange={setMaxMs}
          format={(v) => `${(v / 1000).toFixed(1)}s`}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setJitter((j) => !j)}
          className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
            jitter
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-ink/15 text-ink hover:bg-ink/[0.04]"
          }`}
          aria-pressed={jitter}
        >
          Jitter {jitter ? "on" : "off"}
        </button>
        <button
          type="button"
          onClick={rollJitter}
          disabled={!jitter}
          className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink transition-colors hover:bg-ink/[0.04] disabled:opacity-40 disabled:hover:bg-transparent"
        >
          Roll jitter
        </button>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-ink/55">
        Delay after attempt <span className="font-mono text-ink/75">n</span> is{" "}
        <span className="font-mono text-ink/75">
          min(base · 2<sup>n</sup>, max)
        </span>
        {jitter
          ? ", scaled by ±25% jitter so a thundering herd doesn't retry in lockstep."
          : ". Toggle jitter on to see how randomness fans the retries out."}
      </p>
    </div>
  );
}

/** Deterministic pseudo-random factors so initial render matches across SSR. */
function seededFactors(seed: number): number[] {
  const out: number[] = [];
  let s = (seed + 1) * 9301 + 49297;
  for (let i = 0; i < ATTEMPTS - 1; i += 1) {
    s = (s * 9301 + 49297) % 233280;
    out.push(s / 233280);
  }
  return out;
}
