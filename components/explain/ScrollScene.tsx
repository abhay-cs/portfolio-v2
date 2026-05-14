"use client";

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

type SceneContextValue = { active: unknown };

const SceneContext = createContext<SceneContextValue>({ active: null });

/**
 * Read the currently active scene from the nearest ScrollScene.
 * Illustrations rendered inside ScrollScene's `illustration` slot can call
 * this to react to step changes without being passed scene as a prop.
 */
export function useActiveScene<T>(): T | null {
  return useContext(SceneContext).active as T | null;
}

type StepInternalProps = {
  __index?: number;
  __onActive?: (index: number) => void;
};

type StepChild = ReactElement<StepInternalProps>;

type Props<TScene> = {
  scenes: TScene[];
  illustration: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Sticky illustration on the right (top on mobile), step list on the left.
 * The illustration is a static ReactNode; child components inside it read the
 * active scene via `useActiveScene()`. Each `<Step>` child reports its
 * viewport state and advances the active scene index.
 */
export function ScrollScene<TScene>({
  scenes,
  illustration,
  children,
  className,
}: Props<TScene>) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = scenes[activeIdx] ?? scenes[0] ?? null;

  const enriched = Children.toArray(children)
    .filter(isValidElement)
    .map((child, i) =>
      cloneElement(child as StepChild, {
        __index: i,
        __onActive: (idx: number) => setActiveIdx(idx),
      }),
    );

  const ctx = useMemo<SceneContextValue>(() => ({ active }), [active]);

  return (
    <SceneContext.Provider value={ctx}>
      <div className={`grid gap-12 md:grid-cols-2 md:gap-16 ${className ?? ""}`}>
        <div className="md:order-2">
          <div className="md:sticky md:top-24">
            <div className="overflow-hidden rounded-3xl border border-ink/10 bg-ink/[0.03] p-6 ring-1 ring-ink/[0.03]">
              {illustration}
            </div>
          </div>
        </div>
        <div className="md:order-1 flex flex-col gap-[60vh] pt-[10vh] pb-[40vh]">
          {enriched}
        </div>
      </div>
    </SceneContext.Provider>
  );
}
