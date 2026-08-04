import Link from "next/link";
import { Search, Map, Bot, Wrench } from "lucide-react";

const aiServices = [
  {
    id: "opportunity-scan",
    title: "AI Opportunity Scan",
    description:
      "A structured assessment that identifies where AI can create the highest value in your organization.",
    items: [
      "Use-case landscape",
      "Benefit / effort evaluation",
      "Prioritized roadmap",
    ],
    note: "Ideal starting point when you want clarity before investing further.",
    icon: Search,
  },
  {
    id: "strategy-roadmap",
    title: "AI Strategy & Roadmap",
    description:
      "Development of a clear, business-aligned AI strategy. We define goals, guidelines, governance principles, roles, and a realistic implementation plan that fits your organization and resources.",
    items: [
      "Business-aligned goals & guidelines",
      "Governance principles",
      "Roles and ownership",
      "Realistic implementation plan",
    ],
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
    icon: Wrench,
  },
];

export default function AIServices() {
  return (
    <div className="py-12">
      {/* Hero */}
      <div
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          AI Consulting
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Practical AI solutions focused on business value. We help you identify
          where AI creates the highest impact, design a realistic strategy, and
          implement working systems — with particular strength in process
          automation, document intelligence, and custom agents.
        </p>
      </div>

      {/* Four service cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {aiServices.map((service, index) => {
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

      {/* Partnership — solid card (no OpenClaw / tool chips) */}
      <div
        className="glass px-6 py-5 mb-12"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
          European Collaboration
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          In collaboration with our European partner{" "}
          <span className="font-medium text-slate-800">SAS Beratung GmbH</span> in
          Germany (
          <a
            href="https://sas-ki-beratung.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:text-brand-dark underline underline-offset-2"
          >
            sas-ki-beratung.com
          </a>
          ), we combine practical AI implementation and financial expertise with
          deep process and governance experience. This allows us to support both
          local and cross-border AI initiatives.
        </p>
      </div>

      {/* Entry offer + CTA */}
      <div
        className="glass p-8 md:p-12 text-center mb-8 border-l-4 border-brand md:border-l-0"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          AI Opportunity Call
        </h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          A focused 45–60 minute conversation to explore your current situation and
          identify potential high-value AI opportunities. No obligation. Designed
          to give you clarity on next steps.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/explore"
            className="inline-block bg-brand text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-dark hover:scale-105 transition-all"
          >
            Explore AI Opportunities
          </Link>
          <Link
            href="/contact"
            className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-gray-200 font-bold hover:bg-slate-50 transition-all"
          >
            Book an Opportunity Call
          </Link>
          <Link
            href="/services"
            className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-gray-200 font-bold hover:bg-slate-50 transition-all"
          >
            ← Back to Services
          </Link>
        </div>
      </div>

      <p className="text-center text-slate-500 text-sm max-w-xl mx-auto">
        We start with understanding your processes and goals — not with a tool
        recommendation. Pragmatic, independent, and focused on measurable
        improvement.
      </p>
    </div>
  );
}
