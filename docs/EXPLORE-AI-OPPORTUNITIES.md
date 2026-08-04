# AI Opportunity Exploration (`/explore`)

**Status:** v1a live on [dev.aj-pacific.com/explore](https://dev.aj-pacific.com/explore) (August 2026)  
**Intent:** Guided discovery of practical AI opportunities → structured summary cards. Lead capture (submit summary + contact) is **not** in this release.

---

## Goal

Add a simple guided AI conversation that helps visitors explore possible AI opportunities in their processes. At the end they see a structured summary (2–4 opportunity areas) and can copy it or book an Opportunity Call.

**Core principle:** Keep implementation simple — no multi-agent systems, no long-term server memory, no document upload in v1.

---

## Current status (v1a) — shipped

| Area | Status | Notes |
|------|--------|--------|
| Route `/explore` | Done | Full-page experience |
| Hybrid guided flow | Done | Stages: Context → Processes → Priority → Summary |
| Stage progress UI | Done | Step indicator + stage hints |
| Free-text answers | Done | Streaming replies via Venice |
| Suggested answer chips | Done | Stage-specific quick replies |
| Generate summary | Done | Unlocks after **3** user answers |
| Summary as structured data | Done | JSON → opportunity cards |
| Summary cards UI | Done | Context, 2–4 opportunities, impact/effort, next step |
| Copy summary | Done | Clipboard plain-text export |
| Book Opportunity Call CTA | Done | Links to `/contact` |
| Start over | Done | Resets session state |
| Privacy copy on page | Done | Exploration only; turns not stored permanently on server |
| Session-only history | Done | React state only (no `localStorage`) |
| Backend system prompts | Done | Interview + summarize prompts injected server-side |
| API key security | Done | `VENICE_API_KEY` only on server (same as chat) |
| Separate from site chat | Done | `/api/explore` + FAB hidden on `/explore` |
| Nav / entry points | Done | Nav **Explore**, footer, Services, AI services CTAs |
| Scroll UX | Done | Chat-panel-only scroll; no page jump on load or chips |
| Live deploy | Done | Rsync to VPS; tested on production |

### Product decisions locked for v1a

| Decision | Choice |
|----------|--------|
| Route name | `/explore` |
| Flow style | Hybrid (stages + free text + optional chips) |
| Summary format | Structured data, displayed as cards |
| Lead / form submit | **Deferred to v1b** |
| AI provider | Existing Venice connection (`deepseek-v4-flash-0731`) |

---

## Architecture (as implemented)

```
Browser  /explore
    │
    ├─ interview turns  →  POST /api/explore  { action: "chat", messages }
    │                         → Venice stream (SSE)
    │
    └─ Generate summary →  POST /api/explore  { action: "summarize", messages }
                              → Venice JSON  → OpportunitySummary cards
```

- Conversation history is held **only in the browser** for the current visit.
- System prompts are **not** exposed to the client; the API injects them on every request.
- No vector DB, RAG, file upload, or user accounts.

### Key files

| Path | Role |
|------|------|
| `website/next-app/app/explore/page.tsx` | Page shell + metadata |
| `website/next-app/app/api/explore/route.ts` | Chat stream + summarize; system prompts |
| `website/next-app/components/explore/ExploreExperience.tsx` | Main client UI / flow |
| `website/next-app/components/explore/StageProgress.tsx` | Progress steps |
| `website/next-app/components/explore/SummaryCards.tsx` | Cards + plain-text copy helper |
| `website/next-app/components/explore/types.ts` | Types, stages, chips, opening message |
| `website/next-app/components/ChatWidget.tsx` | Hides FAB when `pathname === '/explore'` |

### Summary data shape

```ts
type OpportunitySummary = {
  companyContext: string;
  opportunities: Array<{
    title: string;
    problem: string;
    aiApproach: string;
    impact: "low" | "medium" | "high";
    effort: "low" | "medium" | "high";
  }>; // typically 2–4
  suggestedNextStep: string;
};
```

---

## Outstanding (not in v1a)

### v1b — Lead submission (highest priority next)

| Item | Notes |
|------|--------|
| Submit form on summary | Name, email, company, optional message + generated summary |
| Delivery channel | **Not decided** — need dedicated path (email API e.g. Resend/Postmark, or Formspree). Current `/contact` is a **Google Forms iframe** and is a poor fit for programmatic summary + contact |
| Do not use | Google Form URL prefill for long summaries (fragile / length limits) |
| Privacy | Submitted lead **is** sent to AJ Pacific (by design); keep conversation turns non-persistent server-side |

### Hardening / product polish (optional next)

| Item | Notes |
|------|--------|
| Rate limiting | Public `/api/explore` has no IP/session rate limit yet |
| System prompt tuning | Interview + summary quality after real visitor feedback |
| Chip / stage copy | Refine labels and stage hints |
| Min answers / unlock rules | Currently fixed at 3; may adjust |
| Analytics | Events: started, answer N, summary generated, copy, contact click |
| Email visitor a copy | Optional after lead submit |
| Rate / abuse honeypot | On future lead form |
| Mobile nav density | “Explore” added to top nav; watch small-screen crowding |

### Explicitly out of scope (for now)

- User login / accounts  
- Saving past conversations server-side  
- Document or file analysis / upload  
- Complex multi-agent workflows  
- Fine-tuning  
- RAG / vector database  
- Replacing the site-wide Q&A `ChatWidget` (it remains for general questions)

---

## How to test

**Live:** https://dev.aj-pacific.com/explore  

**Local:**

```bash
cd website/next-app
# VENICE_API_KEY in .env.local (same as site chat)
npm run dev
# → http://localhost:3000/explore
```

**Smoke checklist**

1. Page loads at top (no auto scroll to bottom)  
2. Answer via chip or text; page scroll position stable; only chat panel scrolls  
3. After 3 answers, **Generate summary** enabled  
4. Cards render; **Copy summary** works; **Book an Opportunity Call** → `/contact`  
5. FAB chat widget **not** visible on `/explore`  
6. **Start over** resets cleanly  

**Deploy:** `./scripts/deploy-next-app.sh` (see [DEPLOYMENT.md](./DEPLOYMENT.md))

---

## Relationship to AI offering

| Public offering | Explore feature role |
|-----------------|----------------------|
| AI Opportunity Scan (paid/service) | Full structured assessment — **not** what `/explore` replaces |
| AI Opportunity Call | Primary CTA after summary (`/contact`) |
| `/explore` | Low-friction **indicative** ideas; teaser for Scan/Call |

Copy on the page and in summary cards states that results are for discussion only, not a full Opportunity Scan.

---

## Changelog (feature)

| Date | Change |
|------|--------|
| 2026-08 | v1a implemented: page, API, hybrid flow, summary cards, CTAs, nav/footer links |
| 2026-08 | Deployed to VPS; scroll UX fix (chat-panel-only; no initial page scroll) |
| — | v1b lead submit — outstanding |
