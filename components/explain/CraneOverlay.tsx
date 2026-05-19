"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { SPRING } from "@/lib/spring";
import { KeyCombo } from "@/components/explain/KeyCombo";
import { useActiveScene } from "@/components/explain/ScrollScene";

export type CraneScene = "press" | "type" | "save" | "history";

const TYPED_THOUGHT = "Email Maya about Friday — try the late slot";

export function CraneOverlay({ scene: sceneProp }: { scene?: CraneScene } = {}) {
  const ctxScene = useActiveScene<CraneScene>();
  const scene: CraneScene = sceneProp ?? ctxScene ?? "press";
  const reduce = useReducedMotion();
  const overlayVisible = scene === "type" || scene === "save";

  return (
    <div className="relative flex min-h-[320px] flex-col items-center justify-center gap-6 not-prose">
      <div className="absolute inset-x-0 top-2 flex justify-center">
        <KeyCombo
          keys={["Cmd", "Shift", "Space"]}
          pressed={scene === "press" || scene === "type"}
        />
      </div>

      <AnimatePresence mode="wait">
        {overlayVisible ? (
          <motion.div
            key="overlay"
            className="mt-12 w-full max-w-md rounded-[22px] border border-[#1A00E6]/20 bg-cream p-4 shadow-xl ring-1 ring-[#1A00E6]/10"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.97 }}
            transition={SPRING}
          >
            <div className="mb-3 flex items-center gap-2">
              <Image
                src="/crane/app-icon.png"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 rounded-sm opacity-90"
              />
              <span className="text-[11px] uppercase tracking-[0.18em] text-ink/55">
                Drop your thought…
              </span>
            </div>
            <div className="rounded-lg border border-ink/10 bg-ink/[0.03] px-3 py-2 font-mono text-sm">
              <Typewriter text={TYPED_THOUGHT} active={scene === "type"} />
              <CursorBlink show={scene === "type"} />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-ink/55">
              <span>{scene === "save" ? "Saved" : "Press Enter"}</span>
              <KeyCombo keys={["Enter"]} pressed={scene === "save"} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {scene === "press" ? (
        <motion.p
          className="mt-12 text-center text-sm text-ink/55"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={SPRING}
        >
          Hit the hotkey from anywhere.
        </motion.p>
      ) : null}
    </div>
  );
}

function Typewriter({ text, active }: { text: string; active: boolean }) {
  return (
    <motion.span
      key={active ? "typing" : "done"}
      initial={false}
      animate={{ width: active || !active ? "auto" : 0 }}
      className="inline-block whitespace-nowrap text-ink/85"
    >
      {active ? <TypeReveal text={text} /> : text}
    </motion.span>
  );
}

function TypeReveal({ text }: { text: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{text}</>;
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.05 }}
    >
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.025, duration: 0.05 }}
        >
          {c}
        </motion.span>
      ))}
    </motion.span>
  );
}

function CursorBlink({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span
      aria-hidden
      className="ml-0.5 inline-block w-[0.5ch] translate-y-[2px] text-accent animate-cursor-blink"
    >
      |
    </span>
  );
}
