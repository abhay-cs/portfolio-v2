"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { EXPERIENCE } from "@/lib/experience";
import { LINKEDIN_URL } from "@/lib/siteContact";

export function HomeExperience() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 pb-24 pt-4 md:px-8"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-3xl">
        <ScrollReveal>
          <SectionHeading
            id="experience-heading"
            as="h2"
            className="font-display text-3xl text-ink md:text-4xl"
            text="Experience"
          />
        </ScrollReveal>

        <div className="mt-10 flex flex-col gap-6">
          {EXPERIENCE.map((job) => (
            <ScrollReveal key={job.id}>
              <article className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-5 ring-1 ring-ink/5 md:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                  <h3 className="font-display text-xl text-ink">{job.company}</h3>
                  <p className="shrink-0 text-sm text-ink/55">{job.period}</p>
                </div>
                <p className="mt-1 text-sm font-medium text-accent">{job.title}</p>
                {job.location ? (
                  <p className="mt-0.5 text-sm text-ink/50">{job.location}</p>
                ) : null}
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/80">
                  {job.highlights.map((line, i) => (
                    <li key={`${job.id}-${i}`}>{line}</li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-8">
          <p className="text-sm text-ink/65">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
            >
              See full history on LinkedIn
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
