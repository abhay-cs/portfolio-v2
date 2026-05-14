"use client";

import { motion } from "framer-motion";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";
import { useMemo } from "react";
import { Chart } from "@/components/explain/Chart";
import { AxisBottom, AxisLeft } from "@/components/explain/Axis";
import { SPRING } from "@/lib/spring";

export type Point = { x: number; y: number };

type Props = {
  data: Point[];
  width?: number;
  height?: number;
  /** Optional fitted line: y = slope * x + intercept */
  fit?: { slope: number; intercept: number };
  showResiduals?: boolean;
  xLabel?: string;
  yLabel?: string;
};

export function ScatterPlot({
  data,
  width = 560,
  height = 360,
  fit,
  showResiduals = false,
  xLabel,
  yLabel,
}: Props) {
  const xDomain = useMemo(() => {
    const [lo, hi] = extent(data, (d) => d.x);
    return [lo ?? 0, hi ?? 1] as [number, number];
  }, [data]);
  const yDomain = useMemo(() => {
    const [lo, hi] = extent(data, (d) => d.y);
    return [lo ?? 0, hi ?? 1] as [number, number];
  }, [data]);

  return (
    <Chart width={width} height={height}>
      {({ innerWidth, innerHeight }) => {
        const x = scaleLinear()
          .domain(xDomain)
          .range([0, innerWidth])
          .nice();
        const y = scaleLinear()
          .domain(yDomain)
          .range([innerHeight, 0])
          .nice();

        const fitLine = fit
          ? {
              x1: x(xDomain[0]),
              y1: y(fit.slope * xDomain[0] + fit.intercept),
              x2: x(xDomain[1]),
              y2: y(fit.slope * xDomain[1] + fit.intercept),
            }
          : null;

        return (
          <>
            <AxisLeft scale={y} />
            <AxisBottom scale={x} innerHeight={innerHeight} />
            {showResiduals && fit
              ? data.map((d, i) => {
                  const yhat = fit.slope * d.x + fit.intercept;
                  return (
                    <motion.line
                      key={`r-${i}`}
                      x1={x(d.x)}
                      x2={x(d.x)}
                      initial={false}
                      animate={{ y1: y(d.y), y2: y(yhat) }}
                      transition={SPRING}
                      stroke="rgb(var(--color-accent) / 0.4)"
                      strokeWidth={1}
                      strokeDasharray="2 2"
                    />
                  );
                })
              : null}
            {fitLine ? (
              <motion.line
                initial={false}
                animate={fitLine}
                transition={SPRING}
                stroke="rgb(var(--color-accent) / 1)"
                strokeWidth={2}
                strokeLinecap="round"
              />
            ) : null}
            {data.map((d, i) => (
              <motion.circle
                key={i}
                initial={false}
                animate={{ cx: x(d.x), cy: y(d.y) }}
                transition={SPRING}
                r={4}
                fill="rgb(var(--color-ink) / 0.85)"
                stroke="rgb(var(--color-cream) / 1)"
                strokeWidth={1.5}
              />
            ))}
            {xLabel ? (
              <text
                x={innerWidth / 2}
                y={innerHeight + 32}
                textAnchor="middle"
                className="fill-ink/70 text-xs"
              >
                {xLabel}
              </text>
            ) : null}
            {yLabel ? (
              <text
                transform={`translate(-30, ${innerHeight / 2}) rotate(-90)`}
                textAnchor="middle"
                className="fill-ink/70 text-xs"
              >
                {yLabel}
              </text>
            ) : null}
          </>
        );
      }}
    </Chart>
  );
}
