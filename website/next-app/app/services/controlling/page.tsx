import Link from "next/link";
import { Target, Coins, CalendarRange, GitCompare } from "lucide-react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Controlling & Performance",
  description:
    "Practical controlling and financial accounting for small and mid-sized organisations. KPIs, planning, cost, and variance — so leadership can see what the numbers actually say.",
  path: "/services/controlling",
});

const controllingServices = [
  {
    id: "kpi",
    title: "KPI Design & Implementation",
    description:
      "A small set of measures that leadership actually uses. We start from the decisions you need to make, then design the metrics, ownership, and reporting around them.",
    items: [
      "What should be measured — and what should not",
      "Definitions, owners, and sources",
      "A reporting rhythm that fits how you already work",
      "A simple picture leadership can read without a briefing",
    ],
    note: "Ideal starting point when reports exist but nobody quite trusts or uses them.",
    icon: Target,
  },
  {
    id: "cost",
    title: "Cost Optimisation",
    description:
      "Understand where money actually goes, then decide what is worth changing. The aim is a clearer cost picture — not a one-off cut that comes back next year.",
    items: [
      "Cost structure and drivers",
      "Where process, not price, is the leak",
      "Vendor and contract questions worth asking",
      "What to leave alone",
    ],
    icon: Coins,
  },
  {
    id: "budgeting",
    title: "Budgeting & Forecasting",
    description:
      "Planning that matches how the business actually moves. Annual budgets still matter; a lighter forecast often matters more between those cycles.",
    items: [
      "Annual budget that leadership can stand behind",
      "A rolling view that can be updated without a project",
      "A few scenarios instead of a single frozen number",
      "Budget versus actual, explained in plain language",
    ],
    icon: CalendarRange,
  },
  {
    id: "variance",
    title: "Variance Analysis & Reporting",
    description:
      "Why the numbers moved — written so a managing director can act, not so a file can be archived. We tighten the monthly story and cut reporting that does not help.",
    items: [
      "Monthly variance that answers “why”",
      "Root causes, not just line-item noise",
      "A short management pack instead of a data dump",
      "What to stop producing",
    ],
    note: "If a simpler report is the answer, we will say so — including when a new system is not.",
    icon: GitCompare,
  },
];

export default function ControllingServices() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          Controlling & Performance
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Practical controlling and financial accounting for small and mid-sized
          organisations. We start from how you currently plan, report, and
          explain the numbers — not from a new dashboard or system. The aim is
          a picture leadership can use: a few meaningful KPIs, a forecast you
          can update, and variance that says why, not only what.
        </p>
      </div>

      <div className="glass px-6 py-6 md:px-8 md:py-7 mb-12 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          The other half of how we work
        </h2>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-3">
          One of us comes from controlling and financial accounting. That is why
          this practice sits next to the AI work, not underneath it.
        </p>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
          The habit is the same as on the AI side: understand the process first,
          then change only what improves decisions. Sometimes the useful next
          step is a clearer monthly pack. Sometimes it is an AI-assisted draft
          of the variance story. Sometimes it is leaving the numbers alone.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {controllingServices.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="glass p-6 md:p-8 flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand/10 rounded-lg text-brand">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {service.title}
                </h3>
              </div>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow">
                {service.description}
              </p>
              <ul className="space-y-2 mb-4">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start text-sm text-slate-700"
                  >
                    <span className="w-1.5 h-1.5 bg-brand rounded-full mr-2 mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {service.note && (
                <p className="text-xs text-slate-500 italic border-t border-slate-100 pt-3">
                  {service.note}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-center text-slate-500 text-sm max-w-2xl mx-auto mb-12 leading-relaxed">
        A clear view of how you steer the business is often the most important
        first step — sometimes more valuable than another report.
      </p>

      <div className="glass p-8 md:p-12 text-center mb-8 border-l-4 border-brand md:border-l-0">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          A focused controlling conversation
        </h2>
        <p className="text-slate-600 mb-4 max-w-2xl mx-auto leading-relaxed">
          A 45–60 minute conversation about how you currently plan, report, and
          explain the numbers. No obligation.
        </p>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          We start with the pack you already produce — not with a tool
          recommendation. The aim is clarity: which measures matter, where
          reporting creates work without insight, and what is worth changing.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-block bg-brand text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-dark hover:scale-105 transition-all"
          >
            Get in Touch
          </Link>
          <Link
            href="/services/ai"
            className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-gray-200 font-bold hover:bg-slate-50 transition-all"
          >
            AI Consulting
          </Link>
          <Link
            href="/services"
            className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-gray-200 font-bold hover:bg-slate-50 transition-all"
          >
            ← Back to Services
          </Link>
        </div>
      </div>
    </div>
  );
}
