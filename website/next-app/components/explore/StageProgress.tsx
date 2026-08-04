"use client";

import { EXPLORE_STAGES } from "./types";

interface StageProgressProps {
  /** 0-based interview stage index; use EXPLORE_STAGES.length when showing summary */
  activeIndex: number;
  summaryMode?: boolean;
}

export default function StageProgress({
  activeIndex,
  summaryMode = false,
}: StageProgressProps) {
  const steps = [
    ...EXPLORE_STAGES.map((s) => s.title),
    "Summary",
  ];

  const current = summaryMode ? steps.length - 1 : Math.min(activeIndex, EXPLORE_STAGES.length - 1);

  return (
    <nav aria-label="Exploration progress" className="w-full">
      <ol className="flex flex-wrap items-center gap-2 md:gap-0 md:justify-between">
        {steps.map((label, index) => {
          const done = index < current;
          const active = index === current;
          return (
            <li key={label} className="flex items-center gap-2 md:flex-1">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    active
                      ? "bg-brand text-white"
                      : done
                        ? "bg-brand/15 text-brand-dark"
                        : "bg-slate-100 text-slate-400"
                  }`}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? "✓" : index + 1}
                </span>
                <span
                  className={`text-xs md:text-sm font-medium truncate ${
                    active
                      ? "text-slate-900"
                      : done
                        ? "text-slate-600"
                        : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`hidden md:block h-px flex-1 mx-2 ${
                    index < current ? "bg-brand/40" : "bg-slate-200"
                  }`}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
