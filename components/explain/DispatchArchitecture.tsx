"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SPRING } from "@/lib/spring";
import { useActiveScene } from "@/components/explain/ScrollScene";

export type DispatchScene =
  | "api"
  | "scheduler"
  | "workers"
  | "kafka"
  | "dlq";

type Props = {
  scene?: DispatchScene;
};

// Layout constants — vertical stack so labels stay legible in the
// narrow illustration column of ScrollScene.
const VIEW_W = 340;
const VIEW_H = 500;
const TILE_X = 20;
const TILE_W = 300;
const TILE_H = 64;
const ROW_GAP = 20;

const ROWS: Array<{
  id: DispatchScene;
  name: string;
  sub: string;
  // connector below the row
  link?: {
    label: string;
    kind: "sync" | "event" | "fail";
  };
}> = [
  {
    id: "api",
    name: "API",
    sub: "REST · auth · rate limit · idempotency",
    link: { label: "enqueue", kind: "sync" },
  },
  {
    id: "scheduler",
    name: "Scheduler",
    sub: "Redis sorted set · retry · DLQ route",
    link: { label: "dispatch", kind: "sync" },
  },
  {
    id: "workers",
    name: "Worker pool",
    sub: "claim · run · heartbeat · circuit-break",
    link: { label: "events", kind: "event" },
  },
  {
    id: "kafka",
    name: "Kafka event bus",
    sub: "job.enqueued · started · completed · failed",
    link: { label: "terminal fail", kind: "fail" },
  },
  {
    id: "dlq",
    name: "Dead-letter queue",
    sub: "manual retry endpoint",
  },
];

const HEADER_Y = 12;
const HEADER_H = 26;
const FIRST_TILE_Y = HEADER_Y + HEADER_H + 16; // 54

function rowY(idx: number) {
  return FIRST_TILE_Y + idx * (TILE_H + ROW_GAP);
}

/**
 * Paper-style architecture diagram for DispatchIQ.
 * Vertical stack of the five service tiles (api, scheduler, workers, kafka,
 * dlq), each a clean row with title + subtitle. Reads the active scene from
 * ScrollScene's context so scrollytelling can dim non-active rows and
 * brighten the focused one.
 */
export function DispatchArchitecture({ scene: sceneProp }: Props = {}) {
  const ctxScene = useActiveScene<DispatchScene>();
  const scene = sceneProp ?? ctxScene ?? null;
  const reduce = useReducedMotion();

  const op = (id: DispatchScene) =>
    scene === null || scene === id ? 1 : 0.28;
  const opStatic = scene === null ? 1 : 0.32;
  const transition = reduce ? { duration: 0 } : SPRING;

  return (
    <div className="not-prose">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="DispatchIQ architecture: API, scheduler, worker pool, Kafka event bus, dead-letter queue stacked top to bottom."
        className="h-auto w-full"
      >
        <defs>
          <marker
            id="diq-arrow"
            markerWidth="9"
            markerHeight="9"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L0,8 L8,4 z" className="fill-ink/60" />
          </marker>
          <marker
            id="diq-arrow-accent"
            markerWidth="9"
            markerHeight="9"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L0,8 L8,4 z" className="fill-accent" />
          </marker>
        </defs>

        {/* Observability header strip */}
        <motion.g animate={{ opacity: opStatic }} transition={transition}>
          <rect
            x={TILE_X + 30}
            y={HEADER_Y}
            width={TILE_W - 60}
            height={HEADER_H}
            rx="9"
            className="fill-ink/[0.04] stroke-ink/20"
            strokeWidth="1.2"
          />
          <text
            x={VIEW_W / 2}
            y={HEADER_Y + 17}
            textAnchor="middle"
            className="fill-ink/70 font-mono text-[11px] font-semibold uppercase tracking-[0.18em]"
          >
            observability
          </text>
        </motion.g>

        {/* "from clients" caption above API */}
        <motion.g animate={{ opacity: opStatic }} transition={transition}>
          <text
            x={VIEW_W / 2}
            y={FIRST_TILE_Y - 4}
            textAnchor="middle"
            className="fill-ink/45 font-mono text-[10px] uppercase tracking-[0.18em]"
          >
            ↑ HTTP from clients
          </text>
        </motion.g>

        {/* Rows */}
        {ROWS.map((row, i) => {
          const y = rowY(i);
          return (
            <g key={row.id}>
              <ServiceRow
                x={TILE_X}
                y={y}
                w={TILE_W}
                h={TILE_H}
                name={row.name}
                sub={row.sub}
                opacity={op(row.id)}
                transition={transition}
              />
              {row.link ? (
                <Connector
                  yStart={y + TILE_H + 2}
                  yEnd={rowY(i + 1) - 4}
                  label={row.link.label}
                  kind={row.link.kind}
                  opacity={opStatic}
                  transition={transition}
                />
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ServiceRow({
  x,
  y,
  w,
  h,
  name,
  sub,
  opacity,
  transition,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  sub: string;
  opacity: number;
  transition: { duration?: number } | object;
}) {
  return (
    <motion.g animate={{ opacity }} transition={transition}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="12"
        className="fill-accent/10 stroke-accent/45"
        strokeWidth="1.4"
      />
      <text
        x={x + w / 2}
        y={y + 26}
        textAnchor="middle"
        className="fill-accent font-mono text-[13px] font-semibold uppercase tracking-[0.16em]"
      >
        {name}
      </text>
      <text
        x={x + w / 2}
        y={y + 48}
        textAnchor="middle"
        className="fill-ink/70 text-[11px]"
      >
        {sub}
      </text>
    </motion.g>
  );
}

function Connector({
  yStart,
  yEnd,
  label,
  kind,
  opacity,
  transition,
}: {
  yStart: number;
  yEnd: number;
  label: string;
  kind: "sync" | "event" | "fail";
  opacity: number;
  transition: { duration?: number } | object;
}) {
  const cx = VIEW_W / 2;
  const dashed = kind !== "sync";
  const accent = kind === "fail";
  const strokeClass = accent
    ? "stroke-accent/70"
    : kind === "event"
      ? "stroke-ink/40"
      : "stroke-ink/55";
  const labelFill = accent ? "fill-accent" : "fill-ink/55";
  const marker = accent ? "url(#diq-arrow-accent)" : "url(#diq-arrow)";

  return (
    <motion.g animate={{ opacity }} transition={transition}>
      <line
        x1={cx}
        y1={yStart}
        x2={cx}
        y2={yEnd}
        className={strokeClass}
        strokeWidth="1.5"
        strokeDasharray={dashed ? "4 4" : undefined}
        markerEnd={marker}
      />
      <text
        x={cx + 14}
        y={(yStart + yEnd) / 2 + 4}
        className={`${labelFill} font-mono text-[10px] uppercase tracking-[0.14em]`}
      >
        {label}
      </text>
    </motion.g>
  );
}
