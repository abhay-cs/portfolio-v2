import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  kicker?: string;
  title: string;
  tagline?: string;
  meta?: ReactNode;
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
};

/**
 * Shared chrome for both /work case studies and /writing posts.
 * Wraps MDX content in a prose container styled by tailwind typography.
 */
export function ArticleShell({
  kicker,
  title,
  tagline,
  meta,
  backHref = "/work",
  backLabel = "Back to work",
  children,
}: Props) {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-24 pt-10 md:px-8">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-ink/55 hover:text-accent"
      >
        <span aria-hidden>&larr;</span>
        {backLabel}
      </Link>

      <header className="mt-8">
        {kicker ? (
          <p className="text-[10px] uppercase tracking-[0.22em] text-accent">{kicker}</p>
        ) : null}
        <h1 className="mt-2 font-display text-4xl tracking-tight text-ink md:text-5xl">
          {title}
        </h1>
        {tagline ? <p className="mt-3 text-lg text-ink/75">{tagline}</p> : null}
        {meta ? <div className="mt-4 text-sm text-ink/55">{meta}</div> : null}
      </header>

      <div className="prose prose-lg mt-12 max-w-none">{children}</div>
    </article>
  );
}
