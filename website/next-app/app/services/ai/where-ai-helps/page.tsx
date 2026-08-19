import Link from "next/link";
import {
  FileSearch,
  Mail,
  BookOpen,
  NotebookPen,
  LineChart,
  Server,
  type LucideIcon,
} from "lucide-react";
import { pageMetadata } from "@/lib/site";
import WhereAiHelpsHeroGraphic from "@/components/where-ai-helps/WhereAiHelpsHeroGraphic";

export const metadata = pageMetadata({
  title: "Where practical AI helps",
  description:
    "Illustrative situations of everyday process friction where practical AI can help smaller organisations — documents, email, knowledge, meetings, reporting, and routine checks.",
  path: "/services/ai/where-ai-helps",
});

/** Static illustrative situations (not personalised recommendations). */
type Situation = {
  id: string;
  title: string;
  situation: string;
  friction: string;
  aiAngle: string;
  notThis: string;
  icon: LucideIcon;
};

const situations: Situation[] = [
  {
    id: "documents-versions",
    title: "Documents and versions",
    situation:
      "Contracts, policies, proposals, and older file versions are spread across email, shared drives, and personal folders — often with inconsistent names and duplicates.",
    friction:
      "People spend time searching, asking colleagues, open the wrong version, or recreate work that already exists.",
    aiAngle:
      "A document intelligence / retrieval setup that helps surface the most relevant file, version, or clause from a simple question — with a clear link back to the source — and light support for spotting likely duplicates or outdated copies.",
    notThis:
      "Not a full document management system replacement or migration on day one.",
    icon: FileSearch,
  },
  {
    id: "email-triage",
    title: "Email and request triage",
    situation:
      "Incoming requests arrive by email: support questions, internal asks, supplier messages, simple customer inquiries.",
    friction:
      "Important messages get buried, similar questions are answered repeatedly, and drafting replies takes time.",
    aiAngle:
      "An assistant that helps classify incoming messages, draft first-reply suggestions, and surface previous answers to similar requests — always with a human in the loop.",
    notThis: "Not fully autonomous email handling.",
    icon: Mail,
  },
  {
    id: "process-knowledge",
    title: "“How do we usually do this?” knowledge questions",
    situation:
      "Process knowledge lives in people’s heads, old chat threads, scattered notes, or outdated documents.",
    friction:
      "New team members, temporary cover, or busy experts get interrupted with the same questions.",
    aiAngle:
      "A retrieval setup over internal notes and approved documents that can answer common “how do we do this?” questions and point to the source.",
    notThis:
      "Not a replacement for ownership of critical process knowledge.",
    icon: BookOpen,
  },
  {
    id: "meeting-followups",
    title: "Meeting notes to follow-ups",
    situation:
      "Meetings produce notes, decisions, and open points that then need to be turned into tasks or follow-up messages.",
    friction:
      "Notes stay incomplete, action items are unclear, and follow-up is delayed or forgotten.",
    aiAngle:
      "An assistant that turns rough notes into a structured summary with decisions, open points, and draft follow-up text for review.",
    notThis:
      "Not automatic task assignment without human confirmation.",
    icon: NotebookPen,
  },
  {
    id: "reporting-month-end",
    title: "Reporting and month-end friction",
    situation:
      "Controllers and managers pull numbers from spreadsheets, ERP extracts, and email threads to explain variances or prepare a short management update.",
    friction:
      "Time goes into assembling the story rather than judging the numbers; the same explanations are rewritten every cycle.",
    aiAngle:
      "Support that drafts a first-pass variance narrative or status note from tables and bullet points you already have — for human review and editing before anything is shared.",
    notThis:
      "Not automated accounting, closing the books, or replacing professional judgement on the figures.",
    icon: LineChart,
  },
  {
    id: "routine-checks",
    title: "Routine server and service checks",
    situation:
      "Someone regularly checks whether services are up, whether disk space is okay, whether backups ran, or whether routine logs look normal.",
    friction:
      "These checks are repetitive, easy to postpone, and often only done properly after something already went wrong.",
    aiAngle:
      "A monitoring / assistant setup that summarises routine checks, flags unusual patterns, and drafts a short status note for review.",
    notThis:
      "Not unattended infrastructure management or autonomous incident response.",
    icon: Server,
  },
];

export default function WhereAiHelpsPage() {
  return (
    <div className="py-12">
      {/* Hero */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand mb-3">
          AI Consulting
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          Where practical AI helps
        </h1>
        <div className="flex justify-center mb-8" aria-hidden>
          <WhereAiHelpsHeroGraphic className="w-full max-w-md h-auto opacity-95" />
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          Everyday process friction where practical AI can help — especially in
          smaller organisations.{" "}
          <span className="font-medium text-slate-800">Illustrative only</span>
          , not case studies or a personalised recommendation.
        </p>
      </div>

      {/* Situation cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {situations.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.id}
              id={item.id}
              className="glass p-6 md:p-8 flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="p-3 bg-brand/10 rounded-lg text-brand shrink-0">
                  <Icon className="w-6 h-6" aria-hidden />
                </div>
                <h2 className="text-xl font-bold text-slate-900 leading-snug pt-1">
                  {item.title}
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-relaxed flex-grow">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
                    Common situation
                  </h3>
                  <p className="text-slate-700">{item.situation}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
                    What creates friction
                  </h3>
                  <p className="text-slate-700">{item.friction}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-brand mb-1.5">
                    A practical AI angle
                  </h3>
                  <p className="text-slate-700">{item.aiAngle}</p>
                </div>
              </div>

              <p className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500 italic leading-relaxed">
                <span className="not-italic font-medium text-slate-600">
                  What this is not:{" "}
                </span>
                {item.notThis}
              </p>
            </article>
          );
        })}
      </div>

      {/* Closer */}
      <p className="text-center text-slate-500 text-sm max-w-2xl mx-auto mb-10 leading-relaxed">
        We start with your process and goals — not with a tool recommendation.
        Sometimes the best first step is clearer ownership or a simpler
        workflow, not AI. For ideas tailored to what you tell us, use Explore.
      </p>

      {/* CTAs */}
      <div className="glass p-8 md:p-12 text-center border-l-4 border-brand md:border-l-0">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          See what might apply to you
        </h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Prefer a short guided conversation about your own processes, or a
          free Opportunity Call with us? Both are free and without obligation.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/explore"
            className="inline-block bg-brand text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-dark hover:scale-105 transition-all"
          >
            Explore AI Opportunities
          </Link>
          <Link
            href="/contact?topic=ai"
            className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-gray-200 font-bold hover:bg-slate-50 transition-all"
          >
            Book an Opportunity Call
          </Link>
          <Link
            href="/services/ai"
            className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-gray-200 font-bold hover:bg-slate-50 transition-all"
          >
            ← AI Consulting
          </Link>
        </div>
      </div>
    </div>
  );
}
