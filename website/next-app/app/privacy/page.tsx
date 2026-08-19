import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { CONTACT_EMAIL } from "@/lib/copy";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How AJ Pacific handles information you send through this website, Explore, the site assistant, email, and the optional contact form.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="py-12 max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
        Privacy Policy
      </h1>
      <p className="text-slate-500 text-sm mb-8">
        AJ Pacific (H.K.) Limited · Last updated August 2026
      </p>

      <div className="space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Who we are
          </h2>
          <p>
            This site is operated by AJ Pacific (H.K.) Limited, Hong Kong. For
            questions, write to{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            We do not create accounts
          </h2>
          <p>
            There is no signup. Using Explore, the site assistant, or the public
            pages does not create a client file.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Explore
          </h2>
          <p className="mb-3">
            Explore is a short guided conversation. The transcript stays in your
            browser for this visit only (it is not written to{" "}
            <span className="font-medium">localStorage</span> and is gone if you
            close the tab or start over).
          </p>
          <p>
            To generate replies and the opportunity summary, the messages you
            type are sent to our server and then to the language-model provider
            we use to run the guide. We do not keep those turns as a permanent
            record or a client file. A summary becomes part of our correspondence
            only if you email it to us.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Site assistant
          </h2>
          <p>
            The chat widget on other pages answers questions about this website.
            Messages are sent to our server and the same kind of language-model
            provider. A copy of the thread may stay in your browser (
            <span className="font-medium">localStorage</span>) so the widget can
            reopen on this device. You can clear it from the widget. We do not
            treat that thread as a client file.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Email and the optional form
          </h2>
          <p className="mb-3">
            If you write to {CONTACT_EMAIL}, we use what you send to reply and,
            if it fits, to arrange a conversation. That correspondence is
            handled as ordinary business email.
          </p>
          <p>
            The optional contact form is hosted by Google Forms. What you submit
            is processed under Google’s terms as well as ours. Use email if you
            prefer not to use that form.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Server logs
          </h2>
          <p>
            Like most websites, the host may record technical logs (for example
            IP address, time, and requested page) for security and operations.
            We do not use those logs to build marketing profiles.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            What we ask you not to send
          </h2>
          <p>
            Please do not paste secrets, personal data of other people, or
            confidential documents into Explore or the site assistant. For
            sensitive material, use email and say so in the first line.
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm text-slate-500">
        See also{" "}
        <Link
          href="/terms"
          className="text-brand underline underline-offset-2 hover:text-brand-dark"
        >
          Terms of Service
        </Link>
        .
      </p>
    </div>
  );
}
