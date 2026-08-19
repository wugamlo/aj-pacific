import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { CONTACT_EMAIL } from "@/lib/copy";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "Terms for using the AJ Pacific website, Explore, and the site assistant.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="py-12 max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
        Terms of Service
      </h1>
      <p className="text-slate-500 text-sm mb-8">
        AJ Pacific (H.K.) Limited · Last updated August 2026
      </p>

      <div className="space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            This website
          </h2>
          <p>
            These pages describe how AJ Pacific (H.K.) Limited works. They are
            not a proposal, an offer of employment, or professional advice for
            your specific situation. A paid engagement starts only if we agree
            it in writing after a conversation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Explore and the site assistant
          </h2>
          <p>
            Explore and the assistant are indicative discovery tools. Summaries
            and suggested ideas are not an Opportunity Scan, not a substitute
            for a conversation with us, and not a guarantee of results. Do not
            rely on them as the sole basis for a business or technology
            decision.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Illustrative situations
          </h2>
          <p>
            Examples on this site, including{" "}
            <Link
              href="/services/ai/where-ai-helps"
              className="text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              Where practical AI helps
            </Link>
            , are illustrative. They are not case studies of named clients.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Availability
          </h2>
          <p>
            We may change or withdraw pages and tools without notice. We do not
            warrant uninterrupted access.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Contact</h2>
          <p>
            Questions:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              {CONTACT_EMAIL}
            </a>
            . See also our{" "}
            <Link
              href="/privacy"
              className="text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
