"use client";

import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { SPRING } from "@/lib/spring";

type Job = { id: string; priority: number; ts: number };

const INITIAL: Job[] = [
  { id: "j-21", priority: 5, ts: 1000 },
  { id: "j-22", priority: 5, ts: 1100 },
  { id: "j-23", priority: 3, ts: 1050 },
  { id: "j-24", priority: 8, ts: 1200 },
  { id: "j-25", priority: 5, ts: 1150 },
];

const score = (j: Job) => j.priority * 1e9 + j.ts;
const sortJobs = (arr: Job[]) =>
  [...arr].sort((a, b) => score(a) - score(b));

/**
 * PriorityQueueViz — animated horizontal row of jobs sorted by Redis sorted-set
 * score `priority * 1e9 + ts`. Lower score pops first, so lower priority number
 * == more urgent. The Framer LayoutGroup makes inserted jobs slide into place.
 */
export function PriorityQueueViz() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL);
  const idRef = useRef(26);
  const tsRef = useRef(1200);
  const reduce = useReducedMotion();
  const sorted = sortJobs(jobs);

  function addJob(priority: number) {
    tsRef.current += 50;
    const id = `j-${idRef.current++}`;
    setJobs((prev) => [...prev, { id, priority, ts: tsRef.current }]);
  }

  function reset() {
    idRef.current = 26;
    tsRef.current = 1200;
    setJobs(INITIAL);
  }

  return (
    <div className="p-6 not-prose">
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-ink/55">
        <span>&larr; Next out</span>
        <span>Most delayed &rarr;</span>
      </div>
      <LayoutGroup>
        <div className="flex flex-wrap gap-2">
          {sorted.map((j) => (
            <motion.div
              key={j.id}
              layout
              transition={reduce ? { duration: 0 } : SPRING}
              className={`flex min-w-[72px] flex-col items-center rounded-xl border px-3 py-2 text-center ${tone(j.priority)}`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/55">
                {j.id}
              </span>
              <span className="mt-1 text-sm font-semibold text-ink">
                p{j.priority}
              </span>
              <span className="mt-0.5 font-mono text-[10px] text-ink/50">
                {(score(j) / 1e9).toFixed(3)}
              </span>
            </motion.div>
          ))}
        </div>
      </LayoutGroup>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => addJob(1)}
          className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
        >
          + Critical (p1)
        </button>
        <button
          type="button"
          onClick={() => addJob(5)}
          className="rounded-full border border-ink/20 px-3 py-1.5 text-xs text-ink transition-colors hover:bg-ink/[0.04]"
        >
          + Normal (p5)
        </button>
        <button
          type="button"
          onClick={() => addJob(9)}
          className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/70 transition-colors hover:bg-ink/[0.04]"
        >
          + Low (p9)
        </button>
        <button
          type="button"
          onClick={reset}
          className="ml-auto rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/55 transition-colors hover:bg-ink/[0.04]"
        >
          Reset
        </button>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-ink/55">
        Score is <span className="font-mono text-ink/75">priority × 10<sup>9</sup> + timestamp</span>.
        Redis pops the smallest score first, so lower <span className="font-mono">p</span> numbers
        are more urgent. The timestamp tail prevents same-priority jobs from
        starving each other.
      </p>
    </div>
  );
}

function tone(priority: number) {
  if (priority <= 3) return "border-accent/45 bg-accent/10";
  if (priority <= 7) return "border-ink/15 bg-ink/[0.04]";
  return "border-ink/10 bg-ink/[0.02]";
}
