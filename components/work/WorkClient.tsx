"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectExpandOverlay } from "@/components/work/ProjectExpandOverlay";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { SPRING } from "@/lib/spring";
import type { Project, ProjectTag } from "@/lib/projects";

const FILTERS: { id: ProjectTag | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "app", label: "App" },
  { id: "experiment", label: "Experiments" },
];

export function WorkClient({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectTag | "all">("all");
  const [expanded, setExpanded] = useState<Project | null>(null);

  const visible = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.tags.includes(filter));
  }, [filter, projects]);

  const showFilters = projects.length > 1;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6 md:gap-10">
        <ScrollReveal className="order-2 max-w-2xl flex-1 sm:order-1">
          <SectionHeading
            as="h1"
            className="font-display text-4xl tracking-tight text-ink md:text-5xl"
            text="Selected work"
          />
          <p className="mt-4 text-ink/75">
            {/* TODO: Personal intro for work index */}
            A small index of recent things — sites, apps, and quiet experiments.
          </p>
        </ScrollReveal>

        <div className="group relative order-1 shrink-0 self-start sm:order-2">
          <Image
            src="/dogcow.png"
            alt="Dogcow — the classic Mac mascot"
            width={320}
            height={320}
            priority
            unoptimized
            className="h-28 w-28 select-none [image-rendering:pixelated] sm:h-36 sm:w-36 md:h-52 md:w-52 lg:h-60 lg:w-60"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -left-3 top-2 -translate-x-full translate-y-0 rounded-full bg-ink/90 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-cream opacity-0 shadow-sm transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:opacity-100"
          >
            moof! moof!
          </span>
        </div>
      </div>

      {showFilters ? (
        <ScrollReveal className="mt-10">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <motion.button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    active
                      ? "border-accent bg-accent text-paper shadow-sm"
                      : "border-ink/15 text-ink hover:border-accent/40 hover:bg-ink/[0.03]"
                  }`}
                  whileTap={{ scale: 0.96 }}
                  transition={SPRING}
                >
                  {f.label}
                </motion.button>
              );
            })}
          </div>
        </ScrollReveal>
      ) : null}

      <div
        className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${showFilters ? "mt-12" : "mt-10"}`}
      >
        {visible.map((project) => (
          <ScrollReveal key={project.id}>
            <ProjectCard project={project} onOpen={() => setExpanded(project)} />
          </ScrollReveal>
        ))}
      </div>

      <ProjectExpandOverlay project={expanded} onClose={() => setExpanded(null)} />
    </div>
  );
}
