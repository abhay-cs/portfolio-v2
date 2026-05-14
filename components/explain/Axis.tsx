"use client";

import type { ScaleLinear } from "d3-scale";

type Props = {
  scale: ScaleLinear<number, number>;
  ticks?: number;
  format?: (v: number) => string;
};

export function AxisBottom({
  scale,
  innerHeight,
  ticks = 5,
  format = (v) => `${v}`,
}: Props & { innerHeight: number }) {
  const tickValues = scale.ticks(ticks);
  const [x0, x1] = scale.range();
  return (
    <g transform={`translate(0, ${innerHeight})`} className="text-ink/55">
      <line x1={x0} x2={x1} stroke="currentColor" strokeOpacity={0.25} />
      {tickValues.map((v) => {
        const x = scale(v);
        return (
          <g key={v} transform={`translate(${x}, 0)`}>
            <line y2={4} stroke="currentColor" strokeOpacity={0.45} />
            <text
              y={18}
              textAnchor="middle"
              className="fill-current font-mono text-[10px]"
            >
              {format(v)}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function AxisLeft({
  scale,
  ticks = 5,
  format = (v) => `${v}`,
}: Props) {
  const tickValues = scale.ticks(ticks);
  const [y0, y1] = scale.range();
  return (
    <g className="text-ink/55">
      <line y1={y0} y2={y1} stroke="currentColor" strokeOpacity={0.25} />
      {tickValues.map((v) => {
        const y = scale(v);
        return (
          <g key={v} transform={`translate(0, ${y})`}>
            <line x2={-4} stroke="currentColor" strokeOpacity={0.45} />
            <text
              x={-8}
              dy="0.32em"
              textAnchor="end"
              className="fill-current font-mono text-[10px]"
            >
              {format(v)}
            </text>
          </g>
        );
      })}
    </g>
  );
}
