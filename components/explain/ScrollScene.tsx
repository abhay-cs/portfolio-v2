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
 * Scrollytelling block with two layouts:
 *  - Desktop (md+): a single sticky illustration on the right, a tall scrolling
 *    column of steps on the left. Each `<Step>` reports its in-view state and
 *    drives a shared `SceneContext` consumed by the illustration.
 *  - Mobile: one illustration card per step, stacked top-to-bottom. Each card
 *    fixes its scene context to that step so the highlight matches the text
 *    directly above/below it, no sticky positioning required.
 */
export function ScrollScene<TScene>({
  scenes,
  illustration,
  children,
  className,
}: Props<TScene>) {
  const [activeIdx, setActiveIdx] = useState(0);
  const desktopActive = scenes[activeIdx] ?? scenes[0] ?? null;

  const childArr = Children.toArray(children).filter(isValidElement);

  const desktopSteps = childArr.map((child, i) =>
    cloneElement(child as StepChild, {
      __index: i,
      __onActive: (idx: number) => setActiveIdx(idx),
    }),
  );

  const desktopCtx = useMemo<SceneContextValue>(
    () => ({ active: desktopActive }),
    [desktopActive],
  );

  return (
    <>
      {/* Desktop: sticky illustration, scrolling steps */}
      <SceneContext.Provider value={desktopCtx}>
        <div
          className={`hidden md:grid md:grid-cols-2 md:gap-16 ${className ?? ""}`}
        >
          <div className="md:order-2">
            <div className="md:sticky md:top-24">
              <div className="overflow-hidden rounded-3xl border border-ink/10 bg-ink/[0.03] p-6 ring-1 ring-ink/[0.03]">
                {illustration}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[60vh] pb-[40vh] pt-[10vh] md:order-1">
            {desktopSteps}
          </div>
        </div>
      </SceneContext.Provider>

      {/* Mobile: one illustration card per step, scene fixed per row */}
      <div
        className={`flex flex-col gap-10 md:hidden ${className ?? ""}`}
      >
        {childArr.map((child, i) => {
          const scene = scenes[i] ?? scenes[0] ?? null;
          return (
            <div key={i} className="flex flex-col gap-4">
              <SceneContext.Provider value={{ active: scene }}>
                <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-ink/10 bg-ink/[0.03] p-4 ring-1 ring-ink/[0.03]">
                  {illustration}
                </div>
              </SceneContext.Provider>
              {child}
            </div>
          );
        })}
      </div>
    </>
  );
}
