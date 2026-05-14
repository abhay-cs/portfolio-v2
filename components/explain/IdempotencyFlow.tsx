"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SPRING } from "@/lib/spring";

type Phase = 0 | 1 | 2 | 3 | 4;

const STEP_MS = 900;

/**
 * IdempotencyFlow — animates a duplicate request landing on `SET NX` in Redis
 * and short-circuiting to the cached result. Auto-plays once when scrolled
 * into view; a Replay button re-runs the sequence.
 */
export function IdempotencyFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", once: true });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(0);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    if (!inView && replay === 0) return;
    if (reduce) {
      setPhase(4);
      return;
    }
    setPhase(0);
    const timers: number[] = [];
    ([1, 2, 3, 4] as Phase[]).forEach((p, i) => {
      timers.push(
        window.setTimeout(() => setPhase(p), (i + 1) * STEP_MS),
      );
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, reduce, replay]);

  return (
    <div ref={ref} className="p-6 not-prose">
      <div className="grid grid-cols-[1fr_auto_1.1fr_auto_1fr] items-center gap-x-2 gap-y-4">
        {/* Row 1 — first request runs */}
        <Card label="Request A" sub="Idem-Key: k-42" active={phase >= 1} />
        <Arrow active={phase >= 1} />
        <Card
          label="Redis SET NX"
          sub="stored ✓"
          active={phase >= 1}
          accent
        />
        <Arrow active={phase >= 2} />
        <Card
          label="Worker runs"
          sub="result cached"
          active={phase >= 2}
          success={phase >= 2}
        />

        {/* Row 2 — duplicate short-circuits */}
        <Card
          label="Request A (retry)"
          sub="Idem-Key: k-42"
          active={phase >= 3}
        />
        <Arrow active={phase >= 3} />
        <Card
          label="Redis SET NX"
          sub="returns: exists"
          active={phase >= 3}
          accent
        />
        <Arrow active={phase >= 4} />
        <Card
          label="Cached result"
          sub="no re-run"
          active={phase >= 4}
          success={phase >= 4}
        />
      </div>

      <div className="mt-5 flex items-center justify-end">
        <button
          type="button"
          onClick={() => setReplay((k) => k + 1)}
          className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink transition-colors hover:bg-ink/[0.04]"
        >
          Replay
        </button>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-ink/55">
        The retry never reaches the worker — Redis already holds the key, so we
        return the cached result. A TTL on the key bounds the dedupe window so
        replays after, say, 24h are treated as fresh work.
      </p>
    </div>
  );
}

function Card({
  label,
  sub,
  active,
  accent,
  success,
}: {
  label: string;
  sub: string;
  active: boolean;
  accent?: boolean;
  success?: boolean;
}) {
  const tone = success
    ? "border-emerald-500/40 bg-emerald-500/[0.08]"
    : accent
      ? "border-accent/45 bg-accent/[0.08]"
      : "border-ink/15 bg-ink/[0.04]";
  return (
    <motion.div
      initial={false}
      animate={{ opacity: active ? 1 : 0.35, y: active ? 0 : 4 }}
      transition={SPRING}
      className={`rounded-2xl border px-3 py-2 text-center ${tone}`}
    >
      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
        {label}
      </div>
      <div className="mt-1 text-[10px] leading-tight text-ink/55">{sub}</div>
    </motion.div>
  );
}

function Arrow({ active }: { active: boolean }) {
  return (
    <motion.span
      initial={false}
      animate={{ opacity: active ? 1 : 0.2 }}
      transition={SPRING}
      className="px-1 text-lg leading-none text-ink/55"
      aria-hidden
    >
      &rarr;
    </motion.span>
  );
}
