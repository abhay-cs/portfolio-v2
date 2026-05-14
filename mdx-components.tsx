import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/explain/Callout";
import { Figure } from "@/components/explain/Figure";
import { CodeFence } from "@/components/explain/CodeFence";
import { Equation } from "@/components/explain/Equation";
import { ScrollScene } from "@/components/explain/ScrollScene";
import { Step } from "@/components/explain/Step";
import { Slider } from "@/components/explain/Slider";
import { ScatterPlot } from "@/components/explain/ScatterPlot";
import { KeyCap } from "@/components/explain/KeyCap";
import { KeyCombo } from "@/components/explain/KeyCombo";
import { CraneOverlay } from "@/components/explain/CraneOverlay";
import { DropList } from "@/components/explain/DropList";
import { DispatchArchitecture } from "@/components/explain/DispatchArchitecture";
import { PriorityQueueViz } from "@/components/explain/PriorityQueueViz";
import { RetryBackoff } from "@/components/explain/RetryBackoff";
import { IdempotencyFlow } from "@/components/explain/IdempotencyFlow";

/**
 * Components available in every .mdx file without explicit imports.
 * Includes both authoring primitives (Callout, Figure, CodeFence, Equation, Slider)
 * and chart/scrollytelling primitives (ScrollScene, Step, ScatterPlot).
 * Project-specific illustrations (CraneOverlay, DropList) are exposed too — add new
 * ones here as the library grows.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Callout,
    Figure,
    CodeFence,
    Equation,
    ScrollScene,
    Step,
    Slider,
    ScatterPlot,
    KeyCap,
    KeyCombo,
    CraneOverlay,
    DropList,
    DispatchArchitecture,
    PriorityQueueViz,
    RetryBackoff,
    IdempotencyFlow,
  };
}
