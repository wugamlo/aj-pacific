"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import StageProgress from "./StageProgress";
import SummaryCards, { summaryToPlainText } from "./SummaryCards";
import {
  ChatMessage,
  EXAMPLE_JOURNEYS,
  ExampleJourney,
  EXPLORE_STAGES,
  MIN_ANSWERS_FOR_SUMMARY,
  OPENING_MESSAGE,
  OpportunitySummary,
} from "./types";

type Phase = "interview" | "summary";

export default function ExploreExperience() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: OPENING_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("interview");
  const [summary, setSummary] = useState<OpportunitySummary | null>(null);
  const [copied, setCopied] = useState(false);
  /** Which example journey is loaded (if any); null when free-form or reset. */
  const [activeExampleId, setActiveExampleId] = useState<string | null>(null);
  /** Examples stay collapsed so the chat is the default path. */
  const [examplesOpen, setExamplesOpen] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  /** Avoid scrolling the chat (or page) until the visitor has engaged. */
  const hasEngagedRef = useRef(false);

  const userAnswerCount = messages.filter((m) => m.role === "user").length;
  const stageIndex = Math.min(userAnswerCount, EXPLORE_STAGES.length - 1);
  const currentStage = EXPLORE_STAGES[stageIndex];
  const canSummarize =
    userAnswerCount >= MIN_ANSWERS_FOR_SUMMARY && !isLoading && phase === "interview";
  /** Show example cards until the visitor starts typing or picks a journey. */
  const showExamples =
    phase === "interview" && !isLoading && userAnswerCount === 0 && !activeExampleId;

  /** Scroll only the chat panel — never the page window (scrollIntoView was pulling the whole page). */
  const scrollChatToBottom = (behavior: ScrollBehavior = "smooth") => {
    const el = chatScrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  };

  useEffect(() => {
    if (!hasEngagedRef.current || phase !== "interview") return;
    scrollChatToBottom("smooth");
  }, [messages, isLoading, phase]);

  const streamChatReply = async (history: ChatMessage[]) => {
    const response = await fetch("/api/explore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history, action: "chat" }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong. Please try again.");
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let assistantContent = "";
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    let lineBuffer = "";

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        lineBuffer += decoder.decode(value, { stream: true });
        const lines = lineBuffer.split(/\r?\n/);
        lineBuffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const data = trimmed.slice(5).trimStart();
          if (data === "[DONE]") {
            lineBuffer = "";
            break;
          }

          try {
            const parsed = JSON.parse(data) as { content?: string };
            if (parsed.content) {
              assistantContent += parsed.content;
              const snapshot = assistantContent;
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { role: "assistant", content: snapshot };
                return next;
              });
            }
          } catch {
            // skip incomplete JSON
          }
        }
      }
    }

    if (!assistantContent.trim()) {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: "Sorry — I did not get a response. Please try again.",
        };
        return next;
      });
    }
  };

  const sendMessage = async (text: string) => {
    const content = text.trim();
    if (!content || isLoading || phase !== "interview") return;

    hasEngagedRef.current = true;
    setActiveExampleId(null);
    setError(null);
    setIsLoading(true);

    const userMessage: ChatMessage = { role: "user", content };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");

    // Keep new messages visible inside the chat panel without moving the page.
    requestAnimationFrame(() => scrollChatToBottom("auto"));

    try {
      await streamChatReply(history);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      // Focus without scrolling the page (preventScroll where supported).
      inputRef.current?.focus({ preventScroll: true });
    }
  };

  const generateSummary = async () => {
    if (!canSummarize) return;

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/explore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, action: "summarize" }),
      });

      const data = (await response.json()) as {
        summary?: OpportunitySummary;
        error?: string;
      };

      if (!response.ok || !data.summary) {
        throw new Error(data.error || "Could not generate summary.");
      }

      setSummary(data.summary);
      setPhase("summary");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not generate summary. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadExampleJourney = (journey: ExampleJourney) => {
    if (isLoading || phase !== "interview") return;

    hasEngagedRef.current = true;
    setActiveExampleId(journey.id);
    setMessages(journey.messages);
    setInput("");
    setError(null);
    setSummary(null);
    setCopied(false);

    requestAnimationFrame(() => {
      scrollChatToBottom("auto");
    });
  };

  const startOver = () => {
    hasEngagedRef.current = false;
    setActiveExampleId(null);
    setExamplesOpen(false);
    setMessages([{ role: "assistant", content: OPENING_MESSAGE }]);
    setInput("");
    setError(null);
    setPhase("interview");
    setSummary(null);
    setCopied(false);
    setIsLoading(false);
    requestAnimationFrame(() => {
      const el = chatScrollRef.current;
      if (el) el.scrollTop = 0;
      inputRef.current?.focus({ preventScroll: true });
    });
  };

  const copySummary = async () => {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summaryToPlainText(summary));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy to clipboard.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header — keep lean so the chat is the focus */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          Explore AI Opportunities
        </h1>
        <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Answer a few questions about how work happens in your organisation.
          In a couple of minutes you&apos;ll get concrete, practical AI
          opportunity ideas — ready to discuss or take further.
        </p>
        <p className="mt-3 text-sm text-slate-500">
          Prefer to browse examples first?{" "}
          <Link
            href="/services/ai/opportunities"
            className="text-brand font-medium underline underline-offset-2 hover:text-brand-dark"
          >
            See example opportunities
          </Link>
        </p>
      </div>

      {activeExampleId && phase === "interview" && (
        <p className="text-xs text-center text-slate-500 mb-4">
          Example loaded — hit{" "}
          <span className="font-semibold text-slate-700">Generate summary</span>{" "}
          to see opportunity cards, or keep chatting to refine.
        </p>
      )}

      <div className="glass p-4 md:p-5 mb-6">
        <StageProgress
          activeIndex={stageIndex}
          summaryMode={phase === "summary"}
        />
        {phase === "interview" && (
          <p className="text-xs text-slate-500 mt-3 text-center md:text-left">
            {currentStage.hint}
          </p>
        )}
      </div>

      {phase === "interview" && (
        <>
          {/* Chat panel — primary visual focus of the page */}
          <div className="relative overflow-hidden flex flex-col mb-3 rounded-2xl border-2 border-brand/30 bg-white shadow-2xl shadow-brand/10 ring-1 ring-brand/10">
            <div className="px-4 py-3.5 border-b border-brand/15 flex items-center justify-between bg-gradient-to-r from-brand-dark via-brand to-brand-light">
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white"
                  aria-hidden
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </span>
                <div>
                  <span className="block text-sm font-bold text-white tracking-tight">
                    Opportunity Guide
                  </span>
                  <span className="block text-[11px] text-white/75">
                    Guided conversation · practical ideas
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={startOver}
                className="text-xs text-white/80 hover:text-white font-medium px-2.5 py-1.5 rounded-lg hover:bg-white/15 transition-colors min-h-[44px] md:min-h-0"
              >
                Start over
              </button>
            </div>

            <div
              ref={chatScrollRef}
              className="h-[min(52vh,420px)] overflow-y-auto overscroll-contain p-4 md:p-5 bg-gradient-to-b from-slate-50 to-white space-y-4"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-brand text-white"
                        : "bg-white text-slate-800 border border-slate-200 shadow-sm"
                    }`}
                  >
                    {msg.content || (isLoading && index === messages.length - 1 ? "…" : "")}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 shadow-sm px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chips */}
            {!isLoading && (
              <div className="px-4 pt-3 pb-1 border-t border-slate-200/80 bg-white">
                <p className="text-xs text-slate-400 mb-2">Quick answers (optional)</p>
                <div className="flex flex-wrap gap-2">
                  {currentStage.chips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => sendMessage(chip)}
                      className="text-xs md:text-sm px-3 py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:border-brand hover:text-brand hover:bg-brand/5 transition-colors min-h-[44px] md:min-h-0"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-slate-200/80 bg-white">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  placeholder={isLoading ? "Thinking…" : "Type your answer…"}
                  disabled={isLoading}
                  className="flex-grow px-4 py-3 rounded-lg border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/25 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500 min-h-[48px] shadow-sm"
                  style={{ backgroundColor: "#ffffff", color: "#1f2937" }}
                  aria-label="Your answer"
                />
                <button
                  type="button"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  className="bg-brand hover:bg-brand-dark disabled:bg-slate-300 text-white px-4 py-3 rounded-lg font-medium transition-all shadow-md shadow-brand/20 disabled:shadow-none disabled:cursor-not-allowed min-w-[48px] min-h-[48px] flex items-center justify-center"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Examples: secondary path — collapsed so chat stays primary */}
          {showExamples && (
            <div className="mb-4 rounded-xl border border-slate-200/90 bg-slate-50/80">
              <button
                type="button"
                onClick={() => setExamplesOpen((open) => !open)}
                className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left min-h-[44px] hover:bg-slate-100/80 transition-colors rounded-xl"
                aria-expanded={examplesOpen}
                aria-controls="example-journeys-panel"
              >
                <span className="text-sm text-slate-600">
                  <span className="text-slate-500">Not sure where to start?</span>{" "}
                  <span className="font-medium text-slate-800">Try an example</span>
                </span>
                <svg
                  className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${
                    examplesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {examplesOpen && (
                <div
                  id="example-journeys-panel"
                  className="px-3 pb-3 pt-0 border-t border-slate-200/70"
                >
                  <p className="text-xs text-slate-500 px-1 pt-2.5 pb-2">
                    Pre-fills a short conversation so you can generate a summary
                    without typing. Illustrative only.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {EXAMPLE_JOURNEYS.map((journey) => (
                      <button
                        key={journey.id}
                        type="button"
                        onClick={() => loadExampleJourney(journey)}
                        className="flex-1 text-left rounded-lg border border-slate-200 bg-white px-3 py-2.5 hover:border-brand/40 hover:bg-brand/[0.03] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 min-h-[44px]"
                      >
                        <span className="block text-sm font-semibold text-brand">
                          {journey.label}
                        </span>
                        <span className="block text-xs text-slate-500 mt-0.5 leading-snug">
                          {journey.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Generate summary */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
            <p className="text-sm text-slate-500">
              {canSummarize
                ? "Enough context to draft opportunity ideas."
                : `Answer a few more questions (${userAnswerCount}/${MIN_ANSWERS_FOR_SUMMARY}) to unlock a summary.`}
            </p>
            <button
              type="button"
              onClick={generateSummary}
              disabled={!canSummarize}
              className="inline-flex items-center justify-center bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark disabled:bg-slate-300 disabled:cursor-not-allowed transition-all min-h-[48px]"
            >
              {isLoading ? "Working…" : "Generate summary"}
            </button>
          </div>
        </>
      )}

      {phase === "summary" && summary && (
        <div className="space-y-6 mb-8">
          <SummaryCards summary={summary} />

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
            <button
              type="button"
              onClick={copySummary}
              className="inline-flex items-center justify-center bg-white text-slate-900 px-6 py-3 rounded-xl font-bold border border-slate-200 shadow-sm hover:bg-slate-50 transition-all min-h-[48px]"
            >
              {copied ? "Copied!" : "Copy summary"}
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark transition-all min-h-[48px]"
            >
              Book an Opportunity Call
            </Link>
            <button
              type="button"
              onClick={startOver}
              className="inline-flex items-center justify-center text-slate-600 px-6 py-3 rounded-xl font-medium hover:text-brand transition-colors min-h-[48px]"
            >
              Start over
            </button>
          </div>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-slate-200/80 space-y-3">
        <p className="text-center text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
          This exploration is for discovery only. Conversation turns are not
          stored permanently on our servers. You can copy the summary or book a
          call when you are ready. Indicative only — not a full Opportunity
          Scan.
        </p>
        <p className="text-center text-xs text-slate-400">
          Prefer a human conversation?{" "}
          <Link href="/contact" className="text-brand hover:underline">
            Contact us
          </Link>{" "}
          or learn about our{" "}
          <Link href="/services/ai" className="text-brand hover:underline">
            AI consulting services
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
