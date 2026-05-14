"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";
import { SPRING } from "@/lib/spring";

type Props = {
  children: ReactNode;
  /** Injected by ScrollScene */
  __index?: number;
  /** Injected by ScrollScene */
  __onActive?: (index: number) => void;
};

export function Step({ children, __index = 0, __onActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (inView) __onActive?.(__index);
  }, [inView, __index, __onActive]);

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border border-ink/10 bg-cream p-6 ring-1 ring-ink/[0.02]"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={SPRING}
      animate={{ opacity: inView ? 1 : 0.55 }}
    >
      {children}
    </motion.div>
  );
}
