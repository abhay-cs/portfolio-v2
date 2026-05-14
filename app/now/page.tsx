import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { NOW_BUILDING, NOW_READING, NOW_THINKING } from "@/lib/now-content";

export default function NowPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-10 md:px-8">
      <ScrollReveal>
        <SectionHeading
          as="h1"
          className="font-display text-4xl tracking-tight text-ink md:text-5xl"
          text="Right now"
        />
        <p className="mt-4 text-ink/70">
          {/* TODO: Refresh monthly */}
          A lightweight snapshot of focus — no analytics, no performance theater.
        </p>
      </ScrollReveal>

      <div className="mt-14 space-y-12">
        <ScrollReveal>
          <SectionHeading
            as="h2"
            className="font-display text-2xl text-ink"
            text="Building"
          />
          <p className="mt-3 text-lg leading-relaxed text-ink/85">{NOW_BUILDING}</p>
        </ScrollReveal>

        <ScrollReveal>
          <SectionHeading as="h2" className="font-display text-2xl text-ink" text="Reading" />
          <p className="mt-3 text-lg leading-relaxed text-ink/85">{NOW_READING}</p>
        </ScrollReveal>

        <ScrollReveal>
          <SectionHeading as="h2" className="font-display text-2xl text-ink" text="Thinking" />
          <p className="mt-3 text-lg leading-relaxed text-ink/85">{NOW_THINKING}</p>
        </ScrollReveal>
      </div>
    </div>
  );
}
