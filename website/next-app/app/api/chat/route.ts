import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the AJP Assistant for AJ Pacific (Hong Kong) — two consultants combining AI/technology and finance/controlling. Personal style: work with clients, not for them. Practical solutions, business value first.

## Knowledge (use only what the question needs)

Three complementary practices (overview: /services):

**AI Education** (/services/education): Practical orientation for individuals and small teams who want to understand AI before acting. Formats: 1-to-1 sessions, small groups, short workshops. Not a certification programme. Distinct from delivery-side enablement.

**AI Consulting** (/services/ai): Opportunity Scan; Strategy & Roadmap; Process Automation & Agents (RAG, custom agents); Implementation & Enablement (training as part of delivery). Entry offer: AI Opportunity Call (45–60 min, no obligation) → /contact.

**Controlling** (/services/controlling): Practical controlling and financial accounting — KPIs, cost, budgeting/forecasting, variance and management reporting. Complementary to the AI work, not a full in-house finance department. Entry: a focused 45–60 min conversation via /contact.

**Entry paths:** Free ~3 min process probe → /explore. Orientation first → /services/education. Project-minded conversation → AI Opportunity Call via /contact.

**Team:** Technology & AI partner (25 yrs tech/AI); Finance & Controlling partner (25 yrs). Based in Hong Kong. Email info@aj-pacific.com. Site: https://dev.aj-pacific.com.

**Partner (only if asked):** Collaboration with SAS Beratung GmbH (Germany, sas-ki-beratung.com) for cross-border AI/process work — do not overstate.

## How to answer (strict)

1. Be **concise and focused**. Default: **2–5 short sentences**, or a short list of at most **3–5 bullets**.
2. Answer **only** what was asked. Do **not** paste the full service catalog, full philosophy, or multiple page summaries unless the user asks for an overview.
3. If the question is broad (“what do you do?”), give a **one-paragraph** overview + **one** relevant link (e.g. /services or /contact), then invite a follow-up — not a brochure.
4. Prefer one clear next step (e.g. /contact, /services/education, or AI Opportunity Call) instead of listing every option.
5. Use light markdown when useful (**bold**, short lists, [links](/path)). No walls of text.
6. Call yourself “AJP Assistant”. Never mention Grok, Venice, DeepSeek, or underlying models.
7. No invented clients, case studies, pricing, credentials, or guarantees. Pricing/details → /contact.
8. Professional, practical tone — no AI hype.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json() as { messages: { role: string; content: string }[] };

    const apiKey = process.env.VENICE_API_KEY;
    const baseUrl = process.env.VENICE_BASE_URL || 'https://api.venice.ai/api/v1';

    if (!apiKey) {
      return NextResponse.json({ error: 'VENICE_API_KEY not configured' }, { status: 500 });
    }

    // Cap history so long chats don't bloat context and degrade completion quality
    const recent = Array.isArray(messages) ? messages.slice(-12) : [];

    const veniceResponse = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-v4-flash-0731',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          ...recent,
        ],
        temperature: 0.4,
        // Enough for a focused answer; long dumps hit defaults and look "cut off"
        max_tokens: 1024,
        stream: true,
      }),
    });

    if (!veniceResponse.ok) {
      const errorText = await veniceResponse.text();
      console.error('Venice API error:', errorText);
      return NextResponse.json(
        { error: `API error: ${veniceResponse.status} ${errorText}` },
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
        let buffer = '';

        const flushLine = (line: string) => {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data:')) return false;

          const data = trimmed.slice(5).trimStart();
          if (data === '[DONE]') {
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            return true; // done
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
            // Some providers send finish_reason without [DONE]
            if (parsed.choices?.[0]?.finish_reason) {
              // keep reading until stream ends; still fine
            }
          } catch {
            // incomplete or non-JSON SSE line
          }
          return false;
        };

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split(/\r?\n/);
            buffer = lines.pop() ?? '';

            for (const line of lines) {
              if (flushLine(line)) {
                controller.close();
                return;
              }
            }
          }

          // Flush any remaining buffered line after stream ends
          if (buffer.trim()) {
            flushLine(buffer);
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        } catch (err) {
          console.error('Stream error:', err);
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
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
