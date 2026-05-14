"use client";

import type { ReactNode } from "react";

export type ChartMargin = { top: number; right: number; bottom: number; left: number };

export const DEFAULT_MARGIN: ChartMargin = { top: 16, right: 16, bottom: 36, left: 40 };

export type ChartFrame = {
  width: number;
  height: number;
  margin: ChartMargin;
  innerWidth: number;
  innerHeight: number;
};

/**
 * Base SVG chart wrapper. Provides padding/margins via render-prop so child
 * primitives (axes, marks) can layout against the inner box.
 */
export function Chart({
  width,
  height,
  margin = DEFAULT_MARGIN,
  className,
  children,
}: {
  width: number;
  height: number;
  margin?: ChartMargin;
  className?: string;
  children: (frame: ChartFrame) => ReactNode;
}) {
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);
  const frame: ChartFrame = { width, height, margin, innerWidth, innerHeight };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`block h-auto w-full select-none ${className ?? ""}`}
      role="img"
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>{children(frame)}</g>
    </svg>
  );
}
