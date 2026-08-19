import Link from "next/link";
import { Users, Lightbulb, BookOpen, MessagesSquare } from "lucide-react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "AI Education",
  description:
    "Practical AI orientation for individuals and small teams. Understand how modern AI works, what is realistic today, and sensible first steps — without hype.",
  path: "/services/education",
});

const audiences = [
  "Individuals who want to understand AI properly",
  "Small business owners and managers",
  "Teams that need a shared baseline before deciding on tools or projects",
];

const gains = [
  "A grounded understanding of how current AI (LLMs) actually works",
  "Clarity on what is realistic today versus what is still limited",
  "Practical orientation on tools, setups, and first steps",
];

const coreTopics = [
  "How large language models work (plain-language overview)",
  "Current capabilities and real limitations",
  "Chat interfaces vs custom applications — what the difference means in practice",
  "How to evaluate tools and avoid common dead ends",
  "Recommended ways to get started (subscriptions and tools)",
];

const deeperTopics = [
  "Local vs cloud options and when each makes sense",
  "Simple AI-assisted coding and automation workflows",
  "Basic deployment options (including VPS)",
];

const formats = [
  {
    title: "1-to-1 orientation sessions",
    description: "Focused conversation matched to your background and questions.",
    icon: MessagesSquare,
  },
  {
    title: "Small-group sessions",
    description: "A shared baseline for a few people who need to decide together.",
    icon: Users,
  },
  {
    title: "Short focused workshops",
    description: "Compact sessions on practical topics — depth matched to the group.",
    icon: BookOpen,
  },
];

export default function EducationServices() {
  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
          AI Education
        </h1>
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6">
          Orientation, not a course
        </p>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          A briefing for people who will decide what to do next — owners,
          managers, and small teams who need a shared, unhyped picture of
          current AI before buying tools or starting a project.
        </p>
        <p className="text-base text-slate-600 max-w-3xl mx-auto leading-relaxed mt-4">
          You leave with a short written orientation note: what applies to you,
          what to ignore, and sensible first steps. Not a certificate. Not a
          vendor list to implement that week.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <section className="glass p-6 md:p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-slate-100 rounded-lg text-slate-700">
              <Users className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Who it is for</h2>
          </div>
          <ul className="space-y-3">
            {audiences.map((item) => (
              <li
                key={item}
                className="flex items-start text-sm text-slate-700 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-2 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass p-6 md:p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-slate-100 rounded-lg text-slate-700">
              <Lightbulb className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              What participants will gain
            </h2>
          </div>
          <ul className="space-y-3">
            {gains.map((item) => (
              <li
                key={item}
                className="flex items-start text-sm text-slate-700 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-2 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="glass p-6 md:p-8 mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Topics typically covered
        </h2>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Decision-level topics first. Depth matched to the group — not a fixed
          curriculum or certification track.
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
          {coreTopics.map((item) => (
            <li
              key={item}
              className="flex items-start text-sm text-slate-700 leading-relaxed"
            >
              <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-2 mt-1.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <h3 className="text-sm font-semibold text-slate-800 mb-2">
          If the group wants more depth
        </h3>
        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
          For operators and technically curious owners — included when it helps
          the decision, not as a default curriculum.
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
          {deeperTopics.map((item) => (
            <li
              key={item}
              className="flex items-start text-sm text-slate-700 leading-relaxed"
            >
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2 mt-1.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
          Formats
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {formats.map((format) => {
            const Icon = format.icon;
            return (
              <div
                key={format.title}
                className="glass p-6 flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-3 bg-slate-100 rounded-lg text-slate-700 w-fit mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {format.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {format.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="glass p-8 md:p-12 text-center mb-8 border-l-4 border-slate-500 md:border-l-0">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Ready for a clear starting point?
        </h2>
        <p className="text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed">
          Get in touch if you want a practical orientation session or workshop.
          Duration and focus are agreed case by case — typically a session or a
          short workshop, in English, in Hong Kong or remote.
        </p>
        <p className="text-slate-500 text-sm mb-8 max-w-2xl mx-auto leading-relaxed">
          When you want clarity on a concrete use case or system, we also offer{" "}
          <Link
            href="/services/ai"
            className="text-accent-dark font-medium underline underline-offset-2 hover:text-slate-800"
          >
            AI Consulting
          </Link>
          — but Education stands on its own.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact?topic=education"
            className="inline-block bg-brand text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-dark hover:scale-105 transition-all"
          >
            Ask about a session
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
        Looking for a quick probe of AI ideas in your processes instead? Try{" "}
        <Link
          href="/explore"
          className="text-brand font-medium underline underline-offset-2 hover:text-brand-dark"
        >
          Explore
        </Link>
        — a free guided conversation of about three minutes.
      </p>
    </div>
  );
}
