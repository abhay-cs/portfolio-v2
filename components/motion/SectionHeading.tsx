"use client";

import { motion } from "framer-motion";
import { SPRING } from "@/lib/spring";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
};

export function SectionHeading({ text, as: Tag = "h2", className, id }: Props) {
  const words = text.split(" ");

  return (
    <Tag className={className} id={id}>
      <span className="inline-flex flex-wrap gap-x-[0.3em]">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ ...SPRING, delay: i * 0.05 }}
          >
            <span className="inline-block">{word}</span>
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
