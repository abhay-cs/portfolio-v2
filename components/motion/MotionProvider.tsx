"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Site-wide framer-motion configuration. `reducedMotion="user"` means every
 * `motion.*` element automatically respects the OS-level
 * `prefers-reduced-motion: reduce` setting — animations snap to their final
 * state instead of springing into them. Non-framer-motion animations (e.g.
 * the typewriter interval) opt in separately via `useReducedMotion()`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
