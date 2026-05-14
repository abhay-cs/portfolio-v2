import type { ReactNode } from "react";

export function Figure({
  caption,
  children,
}: {
  caption?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="my-8 not-prose">
      <div className="overflow-hidden rounded-3xl border border-ink/10 bg-ink/[0.03] ring-1 ring-ink/[0.03]">
        {children}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-ink/55">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
