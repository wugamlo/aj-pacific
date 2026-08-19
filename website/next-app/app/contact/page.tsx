import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import {
  CONTACT_EMAIL,
  CONTACT_FORM_URL,
  EMAIL_PREPARE_HINTS,
  OPPORTUNITY_CALL,
  mailtoHref,
} from "@/lib/copy";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Write to AJ Pacific in Hong Kong. Book a free AI Opportunity Call, a controlling conversation, or a practical orientation session.",
  path: "/contact",
});

const topics = {
  ai: {
    title: OPPORTUNITY_CALL.title,
    lead: `${OPPORTUNITY_CALL.duration} A focused conversation about how work happens in your organisation, and where practical AI may — or may not — help.`,
    subject: "AI Opportunity Call",
  },
  controlling: {
    title: "A controlling conversation",
    lead: "Free, 45–60 minutes, no obligation. A focused conversation about how you currently plan, report, and explain the numbers.",
    subject: "Controlling conversation",
  },
  education: {
    title: "AI Education",
    lead: "A practical orientation session or workshop — typically a session or a short workshop, in English, in Hong Kong or remote. Duration and focus agreed case by case.",
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
  const mailto = mailtoHref(selected?.subject);

  return (
    <div className="py-12 max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-center">
        {selected ? selected.title : "Get in touch"}
      </h1>
      <p className="text-lg text-slate-600 leading-relaxed text-center mb-10">
        {selected
          ? selected.lead
          : "Write a few lines about your situation. We will reply by email and, if it fits, suggest a free 45–60 minute conversation. No obligation."}
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
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-3">
          {OPPORTUNITY_CALL.who} {OPPORTUNITY_CALL.next}
        </p>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-3">
          {OPPORTUNITY_CALL.leaveWith}
        </p>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
          We do not start from a tool recommendation.
        </p>
        <p className="text-sm font-semibold text-slate-800 mb-2">
          What to include in the email
        </p>
        <ul className="space-y-1.5 mb-6">
          {EMAIL_PREPARE_HINTS.map((item) => (
            <li
              key={item}
              className="flex items-start text-sm text-slate-700 leading-relaxed"
            >
              <span className="w-1.5 h-1.5 bg-brand rounded-full mr-2 mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <a
          href={mailto}
          className="mt-2 inline-block bg-brand text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-dark hover:scale-105 transition-all"
        >
          Email {CONTACT_EMAIL}
        </a>
      </div>

      <div className="text-center mb-10">
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-2">
          Prefer a short form instead?
        </p>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 max-w-md mx-auto">
          Optional. It asks for your name, email, and a short description of
          your situation. Hosted on Google Forms.
        </p>
        <a
          href={CONTACT_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-slate-200 font-bold hover:bg-slate-50 transition-all"
        >
          Open the optional form
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
