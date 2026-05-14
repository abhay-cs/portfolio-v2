"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SPRING } from "@/lib/spring";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  onOpen: () => void;
};

export function ProjectCard({ project, onOpen }: Props) {
  const detailsClass =
    "rounded-full bg-accent/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-accent transition-colors hover:bg-accent hover:text-paper";

  return (
    <motion.article
      className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-cream p-6 ring-1 ring-ink/[0.02] transition-shadow hover:shadow-lg hover:ring-accent/15"
      whileHover={{ y: -2 }}
      transition={SPRING}
    >
      <p className="text-[10px] uppercase tracking-[0.22em] text-accent">Project</p>
      <h3 className="mt-2 font-display text-2xl tracking-tight text-ink">{project.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/75">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-accent/20 bg-accent/[0.06] px-2.5 py-0.5 text-xs text-accent"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-6 text-sm">
        {project.caseStudyHref ? (
          <Link href={project.caseStudyHref} className={detailsClass}>
            Read case study
          </Link>
        ) : (
          <button type="button" onClick={onOpen} className={detailsClass}>
            Details
          </button>
        )}
        <a
          href={project.href}
          className="rounded-full border border-ink/15 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:border-accent/40 hover:bg-ink/[0.03]"
        >
          Visit
        </a>
      </div>
    </motion.article>
  );
}
