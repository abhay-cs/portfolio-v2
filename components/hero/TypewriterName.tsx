"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SPRING } from "@/lib/spring";

type Props = {
  /** TODO: Your display name */
  fullName: string;
  /** ms per character — spec asks ~100ms */
  msPerChar?: number;
  onComplete?: () => void;
};

export function TypewriterName({ fullName, msPerChar = 100, onComplete }: Props) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? fullName : "");

  useEffect(() => {
    if (reduce) {
      setShown(fullName);
      onComplete?.();
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(fullName.slice(0, i));
      if (i >= fullName.length) {
        window.clearInterval(id);
        onComplete?.();
      }
    }, msPerChar);
    return () => window.clearInterval(id);
  }, [fullName, msPerChar, onComplete, reduce]);

  const done = shown.length === fullName.length;

  return (
    <span className="inline-flex items-baseline">
      <span className="font-display tracking-tight">{shown}</span>
      <span
        className="ml-0.5 inline-block w-[0.55ch] text-accent translate-y-px"
        aria-hidden
      >
        <span className={done ? "animate-cursor-blink" : "opacity-100"}>|</span>
      </span>
    </span>
  );
}

type TaglineProps = {
  children: string;
  show: boolean;
};

export function FadeTagline({ children, show }: TaglineProps) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.p
          key="tagline"
          className="mt-4 max-w-xl text-lg text-ink/80 md:text-xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={SPRING}
        >
          {children}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}
