import type { Metadata } from "next";
import { ArticleShell } from "@/components/article/ArticleShell";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "DispatchIQ — case study",
  description:
    "A distributed job queue in Python, then rewritten in Go. Priority queue, retries, idempotency, event bus, observability.",
};

export default function DispatchIQPage() {
  return (
    <ArticleShell
      kicker="Case study · in progress"
      title="DispatchIQ"
      tagline="Building a distributed job queue end-to-end. Python prototype first to nail the data model and failure modes, then a Go rewrite for the goroutine + gRPC story."
      meta={
        <div className="flex items-center gap-3">
          <DispatchMark />
          <span>Python · PostgreSQL · Redis · Kafka · (Go later)</span>
        </div>
      }
      backHref="/work"
      backLabel="Back to work"
    >
      <Content />
    </ArticleShell>
  );
}

function DispatchMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      aria-hidden
      className="h-7 w-7"
    >
      <rect
        x="3"
        y="3"
        width="22"
        height="22"
        rx="6"
        className="fill-accent/15 stroke-accent/60"
        strokeWidth="1.3"
      />
      <circle cx="9" cy="14" r="2" className="fill-accent" />
      <circle cx="14" cy="14" r="2" className="fill-accent/70" />
      <circle cx="19" cy="14" r="2" className="fill-accent/40" />
    </svg>
  );
}
