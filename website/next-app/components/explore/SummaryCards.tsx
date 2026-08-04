"use client";

import type { ImpactEffort, OpportunitySummary } from "./types";

const levelStyles: Record<ImpactEffort, string> = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-amber-50 text-amber-800",
  high: "bg-brand/10 text-brand-dark",
};

function Badge({ label, value }: { label: string; value: ImpactEffort }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${levelStyles[value]}`}
    >
      <span className="text-slate-500 font-normal normal-case">{label}:</span>
      {value}
    </span>
  );
}

interface SummaryCardsProps {
  summary: OpportunitySummary;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <div className="space-y-6">
      <div className="glass p-5 md:p-6 border-l-4 border-brand">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-brand mb-2">
          What we heard
        </h3>
        <p className="text-slate-700 leading-relaxed">{summary.companyContext}</p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Possible opportunity areas
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {summary.opportunities.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="glass p-5 md:p-6 flex flex-col h-full"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-xs font-bold text-brand bg-brand/10 rounded-full w-7 h-7 flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <h4 className="text-base md:text-lg font-bold text-slate-900 flex-1 leading-snug">
                  {item.title}
                </h4>
              </div>
              <div className="space-y-3 text-sm flex-1">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
                    Problem
                  </p>
                  <p className="text-slate-700 leading-relaxed">{item.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
                    Possible AI approach
                  </p>
                  <p className="text-slate-700 leading-relaxed">{item.aiApproach}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                <Badge label="Impact" value={item.impact} />
                <Badge label="Effort" value={item.effort} />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="glass p-5 md:p-6 bg-slate-50">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
          Suggested next step
        </h3>
        <p className="text-slate-800 leading-relaxed">{summary.suggestedNextStep}</p>
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
    lines.push(`   Problem: ${o.problem}`);
    lines.push(`   Approach: ${o.aiApproach}`);
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
