import Link from "next/link";
import { Bot, GraduationCap, TrendingUp } from "lucide-react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Our Services",
  description:
    "Three complementary practices for small and mid-sized organisations: AI education and orientation, hands-on AI consulting, and financial controlling.",
  path: "/services",
});

/**
 * Overview only — detail lives on deep pages.
 * Order: Education → Consulting → Controlling (orientation before delivery).
 */
const pillars = [
  {
    href: "/services/education",
    title: "AI Education",
    tagline: "If you want a grounded briefing before any project",
    description:
      "Practical introduction for people and small teams who want to understand AI before taking action.",
    highlights: [
      "How current AI actually works",
      "Realistic capabilities and limits",
      "Tools, setups, and first steps",
      "1-to-1, small groups, workshops",
    ],
    cta: "Explore AI Education",
    accent: "education" as const,
    icon: GraduationCap,
  },
  {
    href: "/services/ai",
    title: "AI Consulting",
    tagline: "If you have friction and want a scan, a plan, or a working system",
    description:
      "From opportunity scan to working automation, agents, and implementation.",
    highlights: [
      "AI Opportunity Scan",
      "Strategy & Roadmap",
      "Automation & Agents",
      "Implementation & Enablement",
    ],
    cta: "Explore AI Consulting",
    accent: "ai" as const,
    icon: Bot,
  },
  {
    href: "/services/controlling",
    title: "Controlling & Performance",
    tagline: "If leadership cannot quite use the numbers you already produce",
    description:
      "Practical controlling and financial accounting — KPIs, planning, cost, and variance that leadership can use.",
    highlights: [
      "KPI design & implementation",
      "Cost optimisation",
      "Budgeting & forecasting",
      "Variance analysis & reporting",
    ],
    cta: "Explore Controlling Services",
    accent: "finance" as const,
    icon: TrendingUp,
  },
];

const accentStyles = {
  education: {
    iconBg: "bg-gradient-to-br from-slate-600 to-slate-800",
    tagline: "text-slate-600",
    dot: "bg-slate-600",
    cta: "text-slate-700",
  },
  ai: {
    iconBg: "bg-gradient-to-br from-accent to-accent-dark",
    tagline: "text-accent-dark",
    dot: "bg-accent-dark",
    cta: "text-accent-dark",
  },
  finance: {
    iconBg: "bg-gradient-to-br from-brand to-brand-light",
    tagline: "text-brand",
    dot: "bg-brand",
    cta: "text-brand",
  },
};

export default function Services() {
  return (
    <div className="py-12" key="services-overview-v3">
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Our Services
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-lg">
          We offer three complementary practices for small and mid-sized
          organisations: orientation in how AI works, hands-on AI consulting,
          and financial controlling. Individuals who want a practical starting
          point usually begin with AI Education.
        </p>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-base mt-3">
          Choose a path below to see how we work in more detail.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const styles = accentStyles[pillar.accent];
          return (
            <Link
              key={pillar.href}
              href={pillar.href}
              className="group glass p-7 md:p-8 flex flex-col h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-md ${styles.iconBg}`}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>

              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-2 ${styles.tagline}`}
              >
                {pillar.tagline}
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                {pillar.title}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 flex-grow text-sm md:text-base">
                {pillar.description}
              </p>

              <ul className="space-y-2 mb-8">
                {pillar.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center text-sm text-slate-700"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-2 shrink-0 ${styles.dot}`}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <span
                className={`mt-auto inline-flex items-center font-semibold ${styles.cta}`}
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
          Want ideas with no meeting? Try Explore. Want to understand AI first?
          See AI Education. Have a live situation? Book a free Opportunity Call.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/explore"
            className="inline-block bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark hover:scale-105 transition-all text-sm"
          >
            Explore in 3 minutes
          </Link>
          <Link
            href="/services/education"
            className="inline-block bg-white text-slate-900 px-6 py-3 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-all text-sm"
          >
            AI Education
          </Link>
          <Link
            href="/contact?topic=ai"
            className="inline-block bg-white text-slate-900 px-6 py-3 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-all text-sm"
          >
            Book an Opportunity Call
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
