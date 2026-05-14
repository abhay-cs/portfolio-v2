"use client";

import katex from "katex";
import { useMemo } from "react";

export function Equation({
  tex,
  display = true,
  className,
}: {
  tex: string;
  display?: boolean;
  className?: string;
}) {
  const html = useMemo(
    () => katex.renderToString(tex, { displayMode: display, throwOnError: false }),
    [tex, display],
  );
  return display ? (
    <div
      className={`my-6 overflow-x-auto text-center not-prose ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <span
      className={`not-prose ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
