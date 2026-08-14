"use client";

import type { ImpactEffort, OpportunitySummary } from "./types";

const LEVEL_RANK: Record<ImpactEffort, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

function DotMeter({
  label,
  value,
  tone = "brand",
}: {
  label: string;
  value: ImpactEffort;
  tone?: "brand" | "accent";
}) {
  const filled = LEVEL_RANK[value];
  const on = tone === "accent" ? "bg-accent" : "bg-brand";
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <span className="inline-flex items-center gap-1" aria-hidden>
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={`h-2 w-2 rounded-full ${n <= filled ? on : "bg-slate-200"}`}
          />
        ))}
      </span>
      <span className="sr-only">
        {label}: {value}
      </span>
      <span className="text-xs font-semibold capitalize text-slate-700">
        {value}
      </span>
    </div>
  );
}

interface SummaryCardsProps {
  summary: OpportunitySummary;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  const featureFirst = summary.opportunities.length >= 3;

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-2xl shadow-lg shadow-brand/10 ring-1 ring-brand/15">
        <div className="px-5 py-4 md:px-6 bg-gradient-to-r from-brand-dark via-brand to-brand-light">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75 mb-1">
            Summary ready
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Here’s what we can see so far
          </h2>
        </div>
        <p className="bg-white px-5 py-2.5 md:px-6 text-sm text-slate-500 leading-relaxed">
          Indicative ideas from this conversation — not a full Opportunity Scan.
        </p>
      </div>

      <blockquote className="relative rounded-2xl bg-white border border-slate-200/80 shadow-lg px-6 py-6 md:px-10 md:py-8">
        <span
          className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-accent"
          aria-hidden
        />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-dark mb-3">
          In short
        </p>
        <p className="text-lg md:text-xl text-slate-800 leading-relaxed font-medium">
          {summary.companyContext}
        </p>
      </blockquote>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Possible opportunity areas
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {summary.opportunities.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className={`relative overflow-hidden glass p-5 md:p-6 flex flex-col h-full ${
                featureFirst && index === 0
                  ? "md:col-span-2 border-t-2 border-t-accent"
                  : ""
              }`}
            >
              <span
                className="pointer-events-none absolute -right-1 -top-3 text-6xl md:text-7xl font-bold text-brand/[0.07] tabular-nums select-none"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <h4 className="relative text-lg md:text-xl font-bold text-slate-900 leading-snug mb-5 pr-12">
                {item.title}
              </h4>

              <div
                className={`relative grid gap-4 flex-1 ${
                  featureFirst && index === 0 ? "md:grid-cols-2 md:gap-8" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-slate-600 mb-2 pb-1.5 border-b border-slate-200">
                    Today
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {item.problem}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-brand mb-2 pb-1.5 border-b border-brand/25">
                    Possible
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {item.aiApproach}
                  </p>
                </div>
              </div>

              <div className="relative flex flex-wrap gap-x-5 gap-y-2 mt-5 pt-4 border-t border-slate-100">
                <DotMeter label="Impact" value={item.impact} tone="brand" />
                <DotMeter label="Effort" value={item.effort} tone="accent" />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-brand/40 bg-brand/[0.06] px-6 py-5 md:px-8 md:py-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark mb-2">
          Suggested next step
        </h3>
        <p className="text-slate-800 leading-relaxed">
          {summary.suggestedNextStep}
        </p>
        <p className="text-xs text-slate-500 mt-3">
          Indicative ideas for discussion — not a full Opportunity Scan or formal
          assessment.
        </p>
      </div>
    </div>
  );
}

/** Plain-text version for clipboard copy. */
export function summaryToPlainText(summary: OpportunitySummary): string {
  const lines: string[] = [
    "AJ Pacific — AI Opportunity Exploration",
    "",
    "What we heard",
    summary.companyContext,
    "",
    "Possible opportunity areas",
  ];

  summary.opportunities.forEach((o, i) => {
    lines.push("");
    lines.push(`${i + 1}. ${o.title}`);
    lines.push(`   Today: ${o.problem}`);
    lines.push(`   Possible: ${o.aiApproach}`);
    lines.push(`   Impact: ${o.impact} | Effort: ${o.effort}`);
  });

  lines.push("");
  lines.push("Suggested next step");
  lines.push(summary.suggestedNextStep);
  lines.push("");
  lines.push(
    "Note: Indicative ideas for discussion — not a full Opportunity Scan."
  );

  return lines.join("\n");
}
