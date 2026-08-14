import Link from "next/link";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Write to AJ Pacific in Hong Kong. Ask about an AI Opportunity Call, a controlling conversation, or a practical orientation session.",
  path: "/contact",
});

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd3SEUmj85HkL51ejeqS3rufhPMIg3sWwq6O8myhpJFpYOz0Q/viewform";

const EMAIL = "info@aj-pacific.com";

const topics = {
  ai: {
    title: "AI Opportunity Call",
    lead: "A focused 45–60 minute conversation about how work happens in your organisation, and where practical AI may — or may not — help. No obligation.",
    subject: "AI Opportunity Call",
  },
  controlling: {
    title: "A controlling conversation",
    lead: "A focused 45–60 minute conversation about how you currently plan, report, and explain the numbers. No obligation.",
    subject: "Controlling conversation",
  },
  education: {
    title: "AI Education",
    lead: "A practical orientation session or workshop — duration and focus agreed case by case. For people and small teams who want to understand AI before acting.",
    subject: "AI Education",
  },
} as const;

type TopicKey = keyof typeof topics;

function isTopic(value: string | undefined): value is TopicKey {
  return value === "ai" || value === "controlling" || value === "education";
}

export default function Contact({
  searchParams,
}: {
  searchParams?: { topic?: string };
}) {
  const topic = isTopic(searchParams?.topic) ? searchParams.topic : undefined;
  const selected = topic ? topics[topic] : undefined;
  const mailto = selected
    ? `mailto:${EMAIL}?subject=${encodeURIComponent(selected.subject)}`
    : `mailto:${EMAIL}`;

  return (
    <div className="py-12 max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-center">
        {selected ? selected.title : "Get in touch"}
      </h1>
      <p className="text-lg text-slate-600 leading-relaxed text-center mb-10">
        {selected
          ? selected.lead
          : "Write a few lines about your situation. We will reply by email and, if it fits, suggest a 45–60 minute conversation. No obligation."}
      </p>

      <div className="glass p-6 md:p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          What we usually talk about
        </h2>
        <ul className="space-y-3 text-slate-700 text-sm md:text-base leading-relaxed">
          <li>
            <Link
              href="/contact?topic=ai"
              className="font-semibold text-slate-900 hover:text-brand underline-offset-2 hover:underline"
            >
              AI Opportunity Call
            </Link>
            {" — "}
            processes, friction, and whether AI is the right next step.
          </li>
          <li>
            <Link
              href="/contact?topic=controlling"
              className="font-semibold text-slate-900 hover:text-brand underline-offset-2 hover:underline"
            >
              Controlling conversation
            </Link>
            {" — "}
            KPIs, planning, and the monthly story behind the numbers.
          </li>
          <li>
            <Link
              href="/contact?topic=education"
              className="font-semibold text-slate-900 hover:text-brand underline-offset-2 hover:underline"
            >
              AI Education
            </Link>
            {" — "}
            a grounded orientation before any project.
          </li>
        </ul>
      </div>

      <div className="glass p-6 md:p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          What happens next
        </h2>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
          We read what you send and reply by email. If a conversation makes
          sense, we suggest a time. We do not hand you to a junior team, and we
          do not start from a tool recommendation.
        </p>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          The simplest path is email.
        </p>
        <a
          href={mailto}
          className="mt-6 inline-block bg-brand text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-dark hover:scale-105 transition-all"
        >
          Email {EMAIL}
        </a>
        <p className="mt-4 text-sm text-slate-500">
          Or write to{" "}
          <a
            href={mailto}
            className="text-slate-700 underline underline-offset-2 hover:text-brand"
          >
            {EMAIL}
          </a>
          .
        </p>
      </div>

      <div className="text-center mb-10">
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
          Prefer a short form instead?
        </p>
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-slate-200 font-bold hover:bg-slate-50 transition-all"
        >
          Open the form
        </a>
      </div>

      <p className="text-center text-slate-500 text-sm leading-relaxed mb-10">
        Not sure what to ask yet? Try{" "}
        <Link
          href="/explore"
          className="text-brand font-medium underline underline-offset-2 hover:text-brand-dark"
        >
          Explore
        </Link>
        {" — "}
        a free guided conversation of about three minutes. No signup.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/services"
          className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-slate-200 font-bold hover:bg-slate-50 transition-all"
        >
          ← Back to Services
        </Link>
        <Link
          href="/"
          className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-slate-200 font-bold hover:bg-slate-50 transition-all"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
