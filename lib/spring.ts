import type { Transition } from "framer-motion";

/** Global spring tuning — matches product spec */
export const SPRING: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
};
