import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { WRITING_POSTS } from "@/lib/writing";

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-10 md:px-8">
      <ScrollReveal>
        <SectionHeading
          as="h1"
          className="font-display text-4xl tracking-tight text-ink md:text-5xl"
          text="Writing archive"
        />
        <p className="mt-4 text-ink/70">
          {/* TODO: Intro blurb for the writing section */}
          Short essays on tools, motion, and the texture of everyday software.
        </p>
      </ScrollReveal>

      <ul className="mt-12 space-y-6">
        {WRITING_POSTS.map((post) => (
          <ScrollReveal key={post.title}>
            <li className="flex flex-col gap-1 border-b border-ink/10 pb-4 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="text-sm uppercase tracking-[0.16em] text-ink/45">{post.date}</p>
              {post.href ? (
                <a className="font-display text-xl text-ink hover:text-accent" href={post.href}>
                  {post.title}
                </a>
              ) : (
                <p className="font-display text-xl text-ink">{post.title}</p>
              )}
            </li>
          </ScrollReveal>
        ))}
      </ul>
    </div>
  );
}
