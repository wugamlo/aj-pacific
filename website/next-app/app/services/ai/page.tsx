import Link from "next/link";
import { Search, Map, Bot, Wrench } from "lucide-react";
import { pageMetadata } from "@/lib/site";
import { OPPORTUNITY_CALL } from "@/lib/copy";

export const metadata = pageMetadata({
  title: "AI Consulting",
  description:
    "Practical AI consulting from opportunity scan to strategy, automation, agents, and hands-on implementation for small and mid-sized organisations.",
  path: "/services/ai",
});

const aiServices = [
  {
    id: "opportunity-scan",
    title: "AI Opportunity Scan",
    description:
      "A structured assessment that begins with your current processes and only then evaluates where AI can create the highest value.",
    items: [
      "Understanding of key processes and friction points",
      "Use-case landscape",
      "Benefit / effort evaluation",
      "Prioritized roadmap",
    ],
    note: "You leave with a short written note: the processes we understood, where friction sits, two to four opportunity areas with benefit versus effort, and a clear recommendation — including when AI is not the next step.",
    icon: Search,
  },
  {
    id: "strategy-roadmap",
    title: "AI Strategy & Roadmap",
    description:
      "Development of a clear, business-aligned AI strategy. We define goals, guidelines, governance principles, roles, and a realistic implementation plan that fits your organisation and resources.",
    items: [
      "Business-aligned goals & guidelines",
      "Governance principles",
      "Roles and ownership",
      "Realistic implementation plan",
    ],
    note: "You leave with a one-page roadmap: goals, ownership, and what not to start yet.",
    icon: Map,
  },
  {
    id: "automation-agents",
    title: "AI Process Automation & Agents",
    description:
      "Design and implementation of intelligent automation that reduces manual effort and improves information availability.",
    items: [
      "Document intelligence & RAG systems",
      "Custom AI assistants and agents",
      "Workflow automation",
      "Knowledge management support",
    ],
    note: "You leave with a working assistant or workflow on a named process — not a generic chatbot.",
    icon: Bot,
  },
  {
    id: "implementation-enablement",
    title: "AI Implementation & Enablement",
    description:
      "Hands-on delivery of AI solutions combined with training and knowledge transfer. We build working systems and ensure your team can operate and further develop them independently.",
    items: [
      "Hands-on solution delivery",
      "Training workshops",
      "Knowledge transfer",
      "Team enablement for independent operation",
    ],
    note: "You leave with a system your team can run, plus training so they can extend it. For orientation before projects, see AI Education.",
    icon: Wrench,
  },
];

export default function AIServices() {
  return (
    <div className="py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          AI Consulting
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Practical AI focused on business value. We start with your processes
          and goals — not with a tool recommendation. Particular strength in
          process automation, document intelligence, and custom agents.
        </p>
      </div>

      <p className="text-center text-slate-600 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
        Most work starts with a scan. Strategy, automation, and implementation
        only follow if the scan says they should.
      </p>

      {/* Four service cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {aiServices.map((service) => {
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
                  {service.id === "implementation-enablement" ? (
                    <>
                      You leave with a system your team can run, plus training so
                      they can extend it. For orientation before projects, see{" "}
                      <Link
                        href="/services/education"
                        className="text-accent-dark not-italic font-medium underline underline-offset-2 hover:text-slate-800"
                      >
                        AI Education
                      </Link>
                      .
                    </>
                  ) : (
                    service.note
                  )}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-center text-slate-500 text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
        A clear understanding of the process is often the most important first
        step — sometimes more valuable than any immediate automation.
      </p>

      {/* Bridge to illustrative situations */}
      <div className="glass px-6 py-5 md:px-8 md:py-6 mb-12 max-w-3xl mx-auto text-center">
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-3">
          Six typical situations — illustrative, not case studies.
        </p>
        <Link
          href="/services/ai/where-ai-helps"
          className="inline-flex items-center gap-1.5 text-brand font-semibold hover:text-brand-dark underline underline-offset-2"
        >
          Where practical AI helps
          <span aria-hidden>→</span>
        </Link>
      </div>

      {/* Entry offer + CTA */}
      <div className="glass p-8 md:p-12 text-center mb-8 border-l-4 border-brand md:border-l-0">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          {OPPORTUNITY_CALL.title}
        </h2>
        <p className="text-slate-600 mb-4 max-w-2xl mx-auto leading-relaxed">
          {OPPORTUNITY_CALL.duration} {OPPORTUNITY_CALL.who}
        </p>
        <p className="text-slate-600 mb-4 max-w-2xl mx-auto leading-relaxed">
          {OPPORTUNITY_CALL.leaveWith}
        </p>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          {OPPORTUNITY_CALL.next} {OPPORTUNITY_CALL.prepare}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact?topic=ai"
            className="inline-block bg-brand text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-dark hover:scale-105 transition-all"
          >
            Book a free Opportunity Call
          </Link>
          <Link
            href="/explore"
            className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-gray-200 font-bold hover:bg-slate-50 transition-all"
          >
            Or explore in 3 minutes
          </Link>
          <Link
            href="/services"
            className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-gray-200 font-bold hover:bg-slate-50 transition-all"
          >
            ← Back to Services
          </Link>
        </div>
      </div>

      <div className="glass px-6 py-6 md:px-8 md:py-7 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          European Collaboration
        </h2>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-3">
          We work closely with our European partner{" "}
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
          ). Together we combine practical AI implementation and financial
          expertise with deep process analysis and governance experience — useful
          for local work in Asia and for cross-border projects that need
          European process discipline.
        </p>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
          The partnership is especially valuable when clear process
          understanding needs to come before any technology decision.
        </p>
      </div>
    </div>
  );
}
