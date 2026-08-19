import Link from "next/link";
import { Cpu, TrendingUp } from "lucide-react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "AJ Pacific (H.K.) Limited is two experienced consultants in Hong Kong — technology and AI, and finance and controlling — working directly with small and mid-sized organisations.",
  path: "/about",
});

const cardClass =
  "bg-white rounded-2xl shadow-lg p-8 border border-slate-200/80 hover:shadow-xl transition-shadow duration-300";

const practices = [
  {
    role: "Technology & AI",
    experience: "25 years in technology",
    focus:
      "Business intelligence, enterprise systems, and practical AI — from strategy through hands-on implementation of automation, agents, and document intelligence.",
    strengths: [
      "AI opportunity assessment & strategy",
      "Process automation & custom agents",
      "Document intelligence & RAG",
      "Training and team enablement",
    ],
    accent: "ai" as const,
    icon: Cpu,
  },
  {
    role: "Finance & Controlling",
    experience: "25 years in finance",
    focus:
      "Controlling and financial accounting — the measures, plans, and monthly story that keep leadership decisions grounded. Same process-first habit as the AI work: understand how you steer today, then change only what helps.",
    strengths: [
      "KPI design & implementation",
      "Cost optimisation",
      "Budgeting & forecasting",
      "Variance analysis & reporting",
    ],
    accent: "finance" as const,
    icon: TrendingUp,
  },
];

const weDoNot = [
  "Staff projects with a rotating junior team",
  "Start from a tool or vendor recommendation",
  "Pretend AI is always the answer",
  "Run your finance function",
  "Publish client names",
];

export default function About() {
  return (
    <div className="relative py-12 max-w-6xl mx-auto" key="about-company-v3">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="gradient-blob blob-green w-96 h-96 -top-20 -right-20 animate-float-slow" />
        <div className="gradient-blob blob-gold w-72 h-72 top-1/3 -left-10 animate-float-delayed" />
      </div>

      <div>
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Who We Are
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed mb-4">
            AJ Pacific (H.K.) Limited is{" "}
            <strong className="text-slate-900">two experienced consultants</strong>{" "}
            based in Hong Kong. We work as partners with our clients — not as a
            large firm with rotating juniors. You work with us directly.
          </p>
          <p className="text-slate-600 leading-relaxed">
            One practice is finance and controlling. The other is technology and
            AI. Together we help organisations improve how they decide, automate,
            and perform — with practical solutions and lasting value.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {practices.map((practice) => {
            const Icon = practice.icon;
            const isAi = practice.accent === "ai";
            return (
              <section key={practice.role} className={cardClass}>
                <div className="flex items-start gap-5 mb-6">
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                      isAi
                        ? "bg-gradient-to-br from-accent to-accent-dark"
                        : "bg-gradient-to-br from-brand to-brand-light"
                    }`}
                    aria-hidden
                  >
                    <Icon className="w-9 h-9 text-white" />
                  </div>
                  <div className="min-w-0 pt-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-1">
                      Practice
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
                      {practice.role}
                    </h2>
                    <p
                      className={`text-sm font-semibold mt-1 ${
                        isAi ? "text-accent-dark" : "text-brand"
                      }`}
                    >
                      {practice.experience}
                    </p>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed mb-6">
                  {practice.focus}
                </p>

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">
                  Focus areas
                </p>
                <ul className="space-y-2">
                  {practice.strengths.map((item) => (
                    <li
                      key={item}
                      className="flex items-start text-sm text-slate-700"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-2 mt-1.5 shrink-0 ${
                          isAi ? "bg-accent-dark" : "bg-brand"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <div className={`${cardClass} mb-8`}>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">How We Work</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            We work <strong>with</strong> you, not <strong>for</strong> you —
            building solutions side by side. No buzzword decks. No black-box
            handovers. You get direct access to both practices when the work
            spans finance and technology.
          </p>
          <ol className="space-y-3 mb-6">
            {[
              {
                step: "1. Understand",
                text: "We listen to your goals, constraints, and how work actually happens today — before any discussion of tools or AI.",
              },
              {
                step: "2. Assess",
                text: "We identify realistic, high-impact opportunities and also where AI is not the right answer. On an AI engagement this is typically a short written scan: processes, friction, benefit versus effort, and a clear recommendation.",
              },
              {
                step: "3. Design",
                text: "We agree a pragmatic roadmap and clear responsibilities.",
              },
              {
                step: "4. Build & Transfer",
                text: "We implement and enable your team so you can run and extend the solution independently — a working system plus knowledge transfer, not a black box.",
              },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-3">
                <span className="font-semibold text-brand shrink-0 text-sm min-w-[8.5rem]">
                  {item.step}
                </span>
                <span className="text-slate-700 text-sm">{item.text}</span>
              </li>
            ))}
          </ol>
          <p className="text-slate-600 text-sm leading-relaxed">
            Whether the starting point is an AI opportunity or a controlling
            challenge, we explore, decide, and deliver together.
          </p>
        </div>

        <div className={`${cardClass} mb-8`}>
          <h3 className="text-lg font-bold text-slate-900 mb-3">
            What we do not do
          </h3>
          <ul className="space-y-2">
            {weDoNot.map((item) => (
              <li
                key={item}
                className="flex items-start text-sm text-slate-700 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full mr-2 mt-1.5 shrink-0 bg-slate-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${cardClass} mb-8`}>
          <h3 className="text-lg font-bold text-slate-900 mb-3">
            How we are set up
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            AJ Pacific (H.K.) Limited is based in Hong Kong. We work with
            organisations across Asia, and with European partners when that is
            useful.
          </p>
        </div>

        <div className={`${cardClass} mb-12`}>
          <h3 className="text-lg font-bold text-slate-900 mb-3">
            European Collaboration
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            We collaborate with{" "}
            <span className="font-medium text-slate-800">SAS Beratung GmbH</span>{" "}
            in Germany (
            <a
              href="https://sas-ki-beratung.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:text-brand-dark underline underline-offset-2"
            >
              sas-ki-beratung.com
            </a>
            ), a specialized AI and process consulting firm for mid-sized
            companies. That partnership supports cross-border work across Asia
            and Europe when clients need both local presence and European process
            expertise.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/services"
            className="inline-block bg-brand text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-dark hover:scale-105 transition-all"
          >
            See Our Services
          </Link>
          <Link
            href="/contact"
            className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-slate-200 font-bold hover:bg-slate-50 transition-all"
          >
            Book an Opportunity Call
          </Link>
        </div>
      </div>
    </div>
  );
}
