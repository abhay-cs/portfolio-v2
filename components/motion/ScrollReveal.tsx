"use client";

import { motion } from "framer-motion";
import { SPRING } from "@/lib/spring";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function ScrollReveal({ children, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={SPRING}
    >
      {children}
    </motion.div>
  );
}
