import Link from "next/link";
import { Bot, GraduationCap, LineChart } from "lucide-react";
import { DEFAULT_DESCRIPTION, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "AJ Pacific | Your Partner in AI & Finance",
  description: DEFAULT_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

const pathways = [
  {
    href: "/services/education",
    title: "AI Education",
    description:
      "Practical orientation for people and small teams who want to understand AI before taking action.",
    icon: GraduationCap,
    iconBg: "bg-gradient-to-br from-slate-600 to-slate-800",
    ctaClass: "text-slate-700",
  },
  {
    href: "/services/ai",
    title: "AI Consulting",
    description:
      "From opportunity scan to working automation, agents, and implementation.",
    icon: Bot,
    iconBg: "bg-gradient-to-br from-accent to-accent-light",
    ctaClass: "text-accent-dark",
  },
  {
    href: "/services/controlling",
    title: "Controlling & Performance",
    description:
      "How you plan, report, and explain the numbers — so leadership can decide with a clear picture.",
    icon: LineChart,
    iconBg: "bg-gradient-to-br from-brand to-brand-light",
    ctaClass: "text-brand",
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Soft ambient blobs — upper half only, low opacity */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="gradient-blob blob-green w-[28rem] h-[28rem] -top-24 -left-16 animate-float-slow" />
        <div className="gradient-blob blob-gold w-80 h-80 top-32 right-0 animate-float-delayed" />
        <div className="gradient-blob blob-teal w-72 h-72 top-1/3 left-1/3 animate-float" />
      </div>

      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="max-w-5xl w-full">
          {/* Main Hero Card */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16 mb-8 border border-slate-200/80 hover:shadow-3xl transition-shadow duration-300 overflow-hidden">
            <div className="relative z-10">
              <img
                src="/images/ajp-logo.jpg"
                alt="AJ Pacific Logo"
                className="mx-auto h-24 w-auto mb-12 md:h-32 lg:h-40 drop-shadow-2xl"
              />
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
                Your Partner in <br />
                <span className="text-accent-dark">AI</span> &{" "}
                <span className="text-brand">Finance</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-700 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
                Practical AI and financial controlling for small and mid-sized
                companies — from orientation to working solutions.
                <br className="hidden sm:block" />
                We help you move clearly and step by step.
              </p>

              {/* Primary Explore banner — high-energy entry point */}
              <Link
                href="/explore"
                className="group relative block w-full max-w-2xl mx-auto overflow-hidden rounded-2xl bg-gradient-to-r from-brand-dark via-brand to-brand-light p-[1px] shadow-xl shadow-brand/25 hover:shadow-2xl hover:shadow-brand/35 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative rounded-[15px] bg-gradient-to-br from-brand-dark via-brand to-[#00b85c] px-6 py-5 md:px-8 md:py-6 text-left">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-30"
                    aria-hidden
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 120% at 100% 0%, rgba(255,255,255,0.35) 0%, transparent 55%)",
                    }}
                  />
                  <div className="relative flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.14em] text-white/75 mb-1">
                        Free · No signup · ~3 min
                      </p>
                      <p className="text-lg md:text-xl font-bold text-white leading-snug">
                        Explore AI opportunities in 3 minutes
                      </p>
                      <p className="mt-1.5 text-sm text-white/85 leading-relaxed max-w-md">
                        A short guided conversation that surfaces practical ideas
                        for your processes.
                      </p>
                    </div>
                    <span
                      className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white group-hover:bg-white group-hover:text-brand transition-colors"
                      aria-hidden
                    >
                      <svg
                        className="w-6 h-6 group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href="/services"
                className="mt-5 inline-block text-slate-700 font-semibold hover:text-brand transition-colors underline-offset-4 hover:underline"
              >
                View our services
              </Link>
            </div>
          </div>

          {/* Three pathways — same pillars as /services */}
          <div className="grid md:grid-cols-3 gap-6">
            {pathways.map((path) => {
              const Icon = path.icon;
              return (
                <Link
                  key={path.href}
                  href={path.href}
                  className="group bg-white rounded-xl shadow-lg p-6 border border-slate-200/80 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-left flex flex-col h-full"
                >
                  <div
                    className={`w-14 h-14 rounded-xl ${path.iconBg} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {path.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed flex-grow">
                    {path.description}
                  </p>
                  <span
                    className={`mt-4 inline-flex items-center text-sm font-semibold ${path.ctaClass}`}
                  >
                    Learn more
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Who we work with + location */}
          <div className="mt-8 max-w-2xl mx-auto bg-white rounded-xl border border-slate-200/80 shadow-sm px-6 py-5 space-y-3">
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              We work with small and mid-sized organisations (and individuals
              who want a practical starting point). Direct, focused, and
              realistic about what is achievable.
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Based in Hong Kong. Open to work across Asia and with European
              partners when useful.
            </p>
          </div>
        </div>
      </div>

      {/* Hong Kong — visual anchor; full location copy lives in supporting block */}
      <div className="relative mt-16 -mx-4">
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
          <img
            src="/images/hongkong-bg.jpg"
            alt="Hong Kong Harbor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-8 left-8 md:left-16 text-white drop-shadow-md">
            <p className="text-lg md:text-xl font-light opacity-95">Based in</p>
            <p className="text-3xl md:text-4xl font-bold">Hong Kong</p>
          </div>
        </div>
      </div>
    </div>
  );
}
