import Link from "next/link";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with AJ Pacific in Hong Kong. Ask about AI education, consulting, controlling, or a practical next step for your organisation.",
  path: "/contact",
});

export default function Contact() {
  return (
    <div className="py-12 max-w-2xl mx-auto" key="contact-v2">
      <div
      >
        <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">Contact Us</h2>
        <p className="text-center text-slate-600 mb-12">
          Have a project in mind? Let's discuss how we can help you achieve your goals.
        </p>

        <div className="glass p-8 flex justify-center">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSd3SEUmj85HkL51ejeqS3rufhPMIg3sWwq6O8myhpJFpYOz0Q/viewform?embedded=true" 
            width="640" 
            height="813" 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            className="max-w-full"
            title="Contact Form"
          >
            Loading…
          </iframe>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-gray-200 font-bold hover:bg-brand hover:text-white hover:border-brand-dark hover:scale-105 transition-all"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
