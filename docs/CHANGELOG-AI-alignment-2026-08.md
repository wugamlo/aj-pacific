# Changelog — AI Offering Alignment (August 2026)

**Spec:** `requirements/AJ_Pacific_Website_AI_Alignment_Spec.md` (v1.1)  
**Intent:** Align AJ Pacific’s website AI offering with a clear, professional structure complementary to SAS Beratung GmbH, without overstating the partnership.  
**Extra decisions (beyond the written spec):**

1. **Keep deep sub-pages** (`/services/ai`, `/services/controlling`) for now  
2. **AI first** in navigation, homepage pillars, About personas, and Services page order  
3. **Rework chat system prompt** to match the new offering  
4. **Secrets hygiene** via `.gitignore` + `.env.example` (no production Next build yet)

**Deployed to:** https://dev.aj-pacific.com (rsync of `next-app` to VPS; see `docs/DEPLOYMENT.md`)

---

## Summary of product changes

### Positioning

| Before | After |
|--------|--------|
| “Your Partner in Finance & AI” with Finance-first framing | **AI & Finance** emphasis; same partnership tone |
| AI as six somewhat tool-heavy offerings | **Four clear AI services** aligned with SAS concepts |
| No European partner mention | Light **SAS Beratung GmbH** collaboration notes |
| Chat prompt listed old 6 AI products + experimental trading | Prompt matches four services + Opportunity Call + SAS |

### AI service architecture (canonical)

1. **AI Opportunity Scan** — diagnosis, use-case landscape, benefit/effort, prioritized roadmap  
2. **AI Strategy & Roadmap** — goals, governance, roles, implementation plan  
3. **AI Process Automation & Agents** — document intelligence/RAG, agents, workflows  
4. **AI Implementation & Enablement** — hands-on build + training + knowledge transfer  

**Entry offer:** **AI Opportunity Call** (45–60 min, no obligation) → `/contact`

**Removed from public AI deep page:** separate “Education & Training” product card as its own track, OpenClaw/Agent Zero marketing chips, experimental automated investment / trading offering.

---

## Files changed

### Pages & layout

| File | Change |
|------|--------|
| `website/next-app/app/page.tsx` | Hero subcopy; **AI Consulting** first pillar; Finance + Personal Partnership; supporting line under cards; title order AI & Finance |
| `website/next-app/app/layout.tsx` | Metadata title/description; Services dropdown **AI first**, labels updated |
| `website/next-app/app/services/page.tsx` | Full restructure: intro → AI (4 cards) → SAS note → Opportunity Call → Controlling block → engage note; links to deep pages kept |
| `website/next-app/app/services/ai/page.tsx` | Rewritten to four services + SAS note + Opportunity Call CTA |
| `website/next-app/app/services/controlling/page.tsx` | Experience badge “25 Years” (content structure unchanged) |
| `website/next-app/app/about/page.tsx` | AI persona first; expanded How We Work (4 steps); European Collaboration section; copy updates |
| `website/next-app/components/Footer.tsx` | Tagline “Your partner in AI & Finance” |

### Chat

| File | Change |
|------|--------|
| `website/next-app/app/api/chat/route.ts` | New system prompt: four AI services, Opportunity Call, controlling secondary, SAS partnership (modest), engagement path; removed stale taxonomy; dropped unused `Readable` import |

### Secrets / repo hygiene

| File | Change |
|------|--------|
| `.gitignore` (repo root) | Ignore `.env*`, PEMs, NPM `data/` / `letsencrypt/`, sqlite, keys, build artifacts |
| `website/next-app/.env.example` | Documents `VENICE_API_KEY` and `VENICE_BASE_URL` only |

### Docs (this work)

| File | Change |
|------|--------|
| `docs/DEPLOYMENT.md` | How deploy actually works; discoveries; rsync procedure |
| `docs/CHANGELOG-AI-alignment-2026-08.md` | This file |
| `scripts/deploy-next-app.sh` | Repeatable rsync deploy from Mac |
| `README.md` | Points at docs and current deploy path |

**Unchanged on purpose:** Contact page (Google Form), production Docker build, git remote setup, NPM config, deep routes retained.

---

## Page-level checklist vs spec

| Spec item | Status |
|-----------|--------|
| Homepage hero + pillars + optional AI supporting line | Done (AI pillar first) |
| Services: AI structure + partnership + optional engage note | Done (AI section first; Controlling second) |
| Four AI services content | Done on `/services` and `/services/ai` |
| About: Technology & AI, How We Work steps, partnership | Done (AI card first) |
| AI Opportunity Call | Done on Services + AI deep page |
| Contact major changes | Not required — skipped |
| Chat / system prompt alignment | Done |
| AI Opportunity Exploration page (`/explore`) | Done (v1a) — see `docs/EXPLORE-AI-OPPORTUNITIES.md`; lead submit still open |
| Prefer single Services page only | **Deferred** — deep pages kept by choice |

---

## Success criteria (from spec)

After the update, a visitor should quickly answer:

- What does AJ Pacific offer in AI? → Four named services  
- How is it structured? → Scan → Strategy → Automation/Agents → Implementation/Enablement  
- Typical starting point? → Opportunity Scan / AI Opportunity Call  
- European partner? → SAS Beratung GmbH (Germany), linked to sas-ki-beratung.com  

---

## Follow-ups (not in this release)

- Soften/strengthen SAS wording after stakeholder review  
- Privacy Policy / Terms real pages (footer still `#`)  
- Git init + optional restore of git-based deploy  
- Production `next build` / `npm start`  
- Stale markdown under `next-app/` (e.g. AI_ASSISTANT_IMPLEMENTATION.md still says chat is non-functional) — optional cleanup  
