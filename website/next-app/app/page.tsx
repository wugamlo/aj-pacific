import Link from "next/link";
import { Bot, Briefcase, Handshake } from "lucide-react";

export default function Home() {
  return (
    <div className="relative">
      {/* Soft ambient blobs — upper half only, low opacity */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="gradient-blob blob-green w-[28rem] h-[28rem] -top-24 -left-16 animate-float-slow" />
        <div className="gradient-blob blob-gold w-80 h-80 top-32 right-0 animate-float-delayed" />
        <div className="gradient-blob blob-teal w-72 h-72 top-1/3 left-1/3 animate-float" />
      </div>

      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="max-w-5xl w-full">
          {/* Main Hero Card */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16 mb-8 border border-slate-200/80 hover:shadow-3xl transition-shadow duration-300 overflow-hidden">
            <div className="relative z-10">
              <img
                src="/images/ajp-logo.jpg"
                alt="AJ Pacific Logo"
                className="mx-auto h-24 w-auto mb-12 md:h-32 lg:h-40 drop-shadow-2xl"
              />
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
                Your Partner in <br />
                <span className="text-accent-dark">AI</span> &{" "}
                <span className="text-brand">Finance</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-700 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
                Practical AI and financial controlling — from clear
                prioritisation to working systems.
                <br className="hidden sm:block" />
                We work alongside you, not as distant consultants.
              </p>

              <div className="flex flex-col items-center gap-3">
                <Link
                  href="/explore"
                  className="bg-brand text-white px-8 py-4 rounded-xl shadow-lg font-bold hover:bg-brand-dark hover:shadow-xl hover:scale-105 transition-all text-base md:text-lg"
                >
                  Explore AI opportunities in 3 minutes
                </Link>
                <p className="text-sm text-slate-500 max-w-md">
                  A short guided conversation that surfaces practical ideas for
                  your processes. No signup required.
                </p>
                <Link
                  href="/services"
                  className="mt-1 text-slate-700 font-semibold hover:text-brand transition-colors underline-offset-4 hover:underline"
                >
                  View our services
                </Link>
              </div>
            </div>
          </div>

          {/* Opportunity Guide callout */}
          <div className="mb-8 max-w-2xl mx-auto bg-white rounded-xl border border-brand/20 shadow-md px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Curious where AI could actually help in your company?
            </p>
            <Link
              href="/explore"
              className="shrink-0 inline-flex items-center justify-center bg-brand/10 text-brand px-5 py-2.5 rounded-lg font-bold hover:bg-brand hover:text-white transition-all min-h-[44px]"
            >
              Try the Opportunity Guide
            </Link>
          </div>

          {/* Feature Cards — AI first */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200/80 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center mb-4">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                AI Consulting
              </h3>
              <p className="text-slate-600">
                From opportunity assessment to working agents and automation —
                practical AI that improves processes and decision-making.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200/80 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand to-brand-light flex items-center justify-center mb-4">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Finance Expertise
              </h3>
              <p className="text-slate-600">
                25 years in controlling, reporting, and financial strategy —
                let&apos;s tackle your challenges together.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200/80 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand to-brand-light flex items-center justify-center mb-4">
                <Handshake className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Personal Partnership
              </h3>
              <p className="text-slate-600">
                We work with you, not for you — building solutions side by side.
              </p>
            </div>
          </div>

          {/* Supporting line — solid surface + darker text for contrast */}
          <div className="mt-8 max-w-2xl mx-auto bg-white rounded-xl border border-slate-200/80 shadow-sm px-6 py-4">
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              We help companies move from AI interest to AI results — with clear
              prioritization, realistic roadmaps, and hands-on implementation.
            </p>
          </div>
        </div>
      </div>

      {/* Hong Kong — lighter overlay so the page does not drop into a dark band */}
      <div className="relative mt-16 -mx-4">
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
          <img
            src="/images/hongkong-bg.jpg"
            alt="Hong Kong Harbor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-8 left-8 md:left-16 text-white drop-shadow-md">
            <p className="text-lg md:text-xl font-light opacity-95">Based in</p>
            <p className="text-3xl md:text-4xl font-bold">Hong Kong</p>
          </div>
        </div>
      </div>
    </div>
  );
}
