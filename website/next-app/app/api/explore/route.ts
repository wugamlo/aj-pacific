import { NextRequest, NextResponse } from "next/server";

const INTERVIEW_SYSTEM_PROMPT = `You are the AJ Pacific AI Opportunity Guide — a practical interviewer helping visitors explore where AI could create business value. You are NOT a general chatbot about the website.

## Context about AJ Pacific (use sparingly)
- Hong Kong–based AI consulting + finance/controlling
- Entry path: AI Opportunity Scan / AI Opportunity Call (45–60 min, no obligation) → /contact
- Strengths: process automation, document intelligence, agents, hands-on implementation, financial understanding
- Never invent clients, case studies, pricing, or guarantees
- Never mention Grok, Venice, DeepSeek, or underlying models. Call yourself the "Opportunity Guide" if needed.

## Interview style (strict)
1. Ask **exactly one** clear question per reply.
2. Keep replies short: 2–4 sentences max before the question.
3. Guide through these themes (in order, skip if already answered):
   - Organization context (industry, size/role if useful)
   - Processes that are manual, slow, document-heavy, or error-prone
   - Priority outcomes (time, quality, insight, scale, customer experience)
   - Constraints if mentioned (data readiness, team capacity) — optional
4. Do **not** dump a full service catalog. Do **not** recommend specific vendors.
5. Stay practical and professional — no AI hype.
6. After you have enough signal for 2–4 opportunity areas (typically after 3+ substantive user answers), say you have enough to draft opportunity ideas and invite them to click **Generate summary**. Do not invent the full multi-card summary in chat unless they clearly ask for ideas immediately.
7. If the user goes off-topic, gently steer back to processes and opportunities.

## Language
- English by default. Match the visitor if they write in another language.`;

const SUMMARY_SYSTEM_PROMPT = `You are the AJ Pacific AI Opportunity Guide. Based on the conversation, produce a structured summary of realistic AI opportunity areas.

## Rules
- Base ideas only on what the user said. Do not invent company facts.
- Produce 2–4 opportunities (prefer 3 when possible).
- Each opportunity must be practical (process-level), not vague "use AI more".
- impact and effort must be exactly one of: "low" | "medium" | "high"
- suggestedNextStep should point toward a short AI Opportunity Call / Opportunity Scan with AJ Pacific — no pressure, no pricing.
- Never mention underlying models. No fake case studies.

## Output format (strict)
Return ONLY valid JSON matching this schema, with no markdown fences and no extra text:

{
  "companyContext": "1-2 sentences summarizing what you understood about their situation",
  "opportunities": [
    {
      "title": "short title",
      "problem": "1-2 sentences on the pain/process issue",
      "aiApproach": "1-2 sentences on a practical AI approach",
      "impact": "low|medium|high",
      "effort": "low|medium|high"
    }
  ],
  "suggestedNextStep": "1-2 sentences on a sensible next step"
}`;

type Message = { role: string; content: string };

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      messages?: Message[];
      action?: "chat" | "summarize";
    };

    const messages = Array.isArray(body.messages) ? body.messages : [];
    const action = body.action === "summarize" ? "summarize" : "chat";

    const apiKey = process.env.VENICE_API_KEY;
    const baseUrl = process.env.VENICE_BASE_URL || "https://api.venice.ai/api/v1";

    if (!apiKey) {
      return NextResponse.json(
        { error: "VENICE_API_KEY not configured" },
        { status: 500 }
      );
    }

    // Cap history to keep latency and quality stable
    const recent = messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-16)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

    if (action === "summarize") {
      return handleSummarize(apiKey, baseUrl, recent);
    }

    return handleChat(apiKey, baseUrl, recent);
  } catch (error) {
    console.error("Explore API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function handleChat(apiKey: string, baseUrl: string, recent: Message[]) {
  const veniceResponse = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-v4-flash-0731",
      messages: [
        { role: "system", content: INTERVIEW_SYSTEM_PROMPT },
        ...recent,
      ],
      temperature: 0.5,
      max_tokens: 512,
      stream: true,
    }),
  });

  if (!veniceResponse.ok) {
    const errorText = await veniceResponse.text();
    console.error("Venice API error (explore chat):", errorText);
    return NextResponse.json(
      { error: `API error: ${veniceResponse.status}` },
      { status: 500 }
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = veniceResponse.body?.getReader();
      if (!reader) {
        controller.close();
        return;
      }

      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      let buffer = "";

      const flushLine = (line: string) => {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data:")) return false;

        const data = trimmed.slice(5).trimStart();
        if (data === "[DONE]") {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          return true;
        }

        try {
          const parsed = JSON.parse(data);
          const delta =
            parsed.choices?.[0]?.delta?.content ??
            parsed.choices?.[0]?.message?.content ??
            parsed.content;
          if (delta) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`)
            );
          }
        } catch {
          // incomplete SSE line
        }
        return false;
      };

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (flushLine(line)) {
              controller.close();
              return;
            }
          }
        }

        if (buffer.trim()) {
          flushLine(buffer);
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        console.error("Explore stream error:", err);
      } finally {
        try {
          controller.close();
        } catch {
          // already closed
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

async function handleSummarize(apiKey: string, baseUrl: string, recent: Message[]) {
  const veniceResponse = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-v4-flash-0731",
      messages: [
        { role: "system", content: SUMMARY_SYSTEM_PROMPT },
        ...recent,
        {
          role: "user",
          content:
            "Based on our conversation so far, generate the structured opportunity summary JSON now.",
        },
      ],
      temperature: 0.35,
      max_tokens: 1400,
      stream: false,
    }),
  });

  if (!veniceResponse.ok) {
    const errorText = await veniceResponse.text();
    console.error("Venice API error (explore summarize):", errorText);
    return NextResponse.json(
      { error: `API error: ${veniceResponse.status}` },
      { status: 500 }
    );
  }

  const data = (await veniceResponse.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const raw = data.choices?.[0]?.message?.content?.trim() ?? "";
  const summary = parseSummaryJson(raw);

  if (!summary) {
    console.error("Failed to parse explore summary JSON:", raw.slice(0, 500));
    return NextResponse.json(
      {
        error: "Could not parse summary. Please try again.",
        rawPreview: raw.slice(0, 200),
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ summary });
}

function parseSummaryJson(raw: string) {
  const cleaned = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  // Prefer first JSON object in the string
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;

  try {
    const parsed = JSON.parse(cleaned.slice(start, end + 1));
    if (!isValidSummary(parsed)) return null;
    return normalizeSummary(parsed);
  } catch {
    return null;
  }
}

function isValidSummary(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (typeof v.companyContext !== "string") return false;
  if (!Array.isArray(v.opportunities) || v.opportunities.length < 1) return false;
  if (typeof v.suggestedNextStep !== "string") return false;
  return true;
}

function normalizeSummary(raw: Record<string, unknown>) {
  const levels = new Set(["low", "medium", "high"]);
  const opportunities = (raw.opportunities as unknown[])
    .slice(0, 4)
    .map((item) => {
      const o = (item && typeof item === "object" ? item : {}) as Record<
        string,
        unknown
      >;
      const impact =
        typeof o.impact === "string" && levels.has(o.impact.toLowerCase())
          ? o.impact.toLowerCase()
          : "medium";
      const effort =
        typeof o.effort === "string" && levels.has(o.effort.toLowerCase())
          ? o.effort.toLowerCase()
          : "medium";
      return {
        title: String(o.title ?? "Opportunity").slice(0, 120),
        problem: String(o.problem ?? "").slice(0, 500),
        aiApproach: String(o.aiApproach ?? "").slice(0, 500),
        impact,
        effort,
      };
    })
    .filter((o) => o.title && (o.problem || o.aiApproach));

  return {
    companyContext: String(raw.companyContext).slice(0, 600),
    opportunities:
      opportunities.length >= 2
        ? opportunities
        : opportunities.length === 1
          ? opportunities
          : [
              {
                title: "Further discovery needed",
                problem:
                  "There was not enough detail yet to prioritize concrete opportunities.",
                aiApproach:
                  "A short AI Opportunity Call can clarify processes and high-value starting points.",
                impact: "medium",
                effort: "low",
              },
            ],
    suggestedNextStep: String(raw.suggestedNextStep).slice(0, 400),
  };
}
