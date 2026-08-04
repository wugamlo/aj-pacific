import Link from "next/link";
import { Bot, TrendingUp } from "lucide-react";

/**
 * Overview only — detail lives on /services/ai and /services/controlling.
 * AI card first for consistent positioning.
 */
const pillars = [
  {
    href: "/services/ai",
    title: "AI Consulting",
    tagline: "From opportunity scan to working systems",
    description:
      "Practical AI for real business impact: structured opportunity assessment, strategy and roadmap, process automation and agents, and hands-on implementation with enablement of your team.",
    highlights: [
      "AI Opportunity Scan",
      "Strategy & Roadmap",
      "Automation & Agents",
      "Implementation & Enablement",
    ],
    cta: "Explore AI Services",
    accent: "ai" as const,
    icon: Bot,
  },
  {
    href: "/services/controlling",
    title: "Controlling & Performance",
    tagline: "Financial clarity that drives decisions",
    description:
      "Data-driven controlling and performance management: KPIs, cost optimization, budgeting and forecasting, variance analysis, and reporting that leadership can act on.",
    highlights: [
      "KPI design & implementation",
      "Cost optimization",
      "Budgeting & forecasting",
      "Variance analysis",
    ],
    cta: "Explore Controlling Services",
    accent: "finance" as const,
    icon: TrendingUp,
  },
];

export default function Services() {
  return (
    <div className="py-12" key="services-overview-v2">
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Our Services
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-lg">
          Two complementary practices under one partnership: practical AI and
          financial controlling. Choose a path to see how we work in detail.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-14">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const isAi = pillar.accent === "ai";
          return (
            <Link
              key={pillar.href}
              href={pillar.href}
              className="group glass p-8 md:p-10 flex flex-col h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-md ${
                  isAi
                    ? "bg-gradient-to-br from-accent to-accent-dark"
                    : "bg-gradient-to-br from-brand to-brand-light"
                }`}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>

              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isAi ? "text-accent-dark" : "text-brand"
                }`}
              >
                {pillar.tagline}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                {pillar.title}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                {pillar.description}
              </p>

              <ul className="space-y-2 mb-8">
                {pillar.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center text-sm text-slate-700"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-2 shrink-0 ${
                        isAi ? "bg-accent-dark" : "bg-brand"
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <span
                className={`mt-auto inline-flex items-center font-semibold ${
                  isAi ? "text-accent-dark" : "text-brand"
                }`}
              >
                {pillar.cta}
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>
          );
        })}
      </div>

      <div className="glass max-w-3xl mx-auto p-6 md:p-8 text-center mb-12">
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Not sure where to start?
        </h3>
        <p className="text-slate-600 text-sm md:text-base mb-5 leading-relaxed">
          Try a short guided exploration of AI opportunities in your processes,
          or book an AI Opportunity Call — no obligation.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/explore"
            className="inline-block bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark hover:scale-105 transition-all text-sm"
          >
            Explore Opportunities
          </Link>
          <Link
            href="/contact"
            className="inline-block bg-white text-slate-900 px-6 py-3 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-all text-sm"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-slate-200 font-bold hover:bg-brand hover:text-white hover:border-brand-dark hover:scale-105 transition-all"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
