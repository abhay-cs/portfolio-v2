"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SPRING } from "@/lib/spring";
import type { Project } from "@/lib/projects";

export function ProjectExpandOverlay({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/20 px-4 py-10 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={SPRING}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-expanded-title"
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-accent/15 bg-cream p-7 text-ink shadow-2xl ring-1 ring-ink/5"
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={SPRING}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-accent">Selected work</p>
            <h2 id="project-expanded-title" className="mt-2 font-display text-3xl tracking-tight">
              {project.name}
            </h2>
            <p className="mt-3 text-sm text-ink/75">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-accent">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-accent/20 bg-accent/[0.06] px-3 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <a
                className="rounded-full bg-accent px-5 py-2 text-paper shadow-sm transition-shadow hover:shadow-md"
                href={project.href}
              >
                Open project
              </a>
              <button
                type="button"
                className="rounded-full border border-ink/15 px-5 py-2 text-ink transition-colors hover:bg-ink/[0.04]"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
