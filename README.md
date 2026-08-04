# AJ Pacific

Business website for **AJ Pacific** — AI consulting and controlling / performance services (Hong Kong), live at [dev.aj-pacific.com](https://dev.aj-pacific.com).

## Architecture

```
Source (website/next-app)
    ↓  deploy script (rsync of app source)
Hosted Next.js app (Docker)
    ↓
Reverse proxy + TLS → Internet
```

## Repository layout

```
aj-pacific/
├── README.md
├── docs/
│   ├── DEPLOYMENT.md                      # Deploy / ops notes
│   ├── CHANGELOG-AI-alignment-2026-08.md  # Aug 2026 content rework
│   └── EXPLORE-AI-OPPORTUNITIES.md        # /explore feature status + backlog
├── requirements/
│   └── AJ_Pacific_Website_AI_Alignment_Spec.md
├── scripts/
│   └── deploy-next-app.sh                 # App deploy helper
├── deploy.sh                              # Legacy deploy script (not the primary path)
└── website/
    ├── docker-compose.yml                 # Local / host stack definition
    ├── README.md                          # Additional server notes
    ├── next-app/                          # Next.js application
    └── website-content/                   # Legacy static site
```

## Deploy

From the repo root (with deploy host configured in your environment):

```bash
./scripts/deploy-next-app.sh
# optional: clear caches / restart more aggressively
./scripts/deploy-next-app.sh --full
```

The script syncs `website/next-app/` to the configured remote path and excludes `node_modules`, `.next`, and env files so secrets stay on the host only.

Set target via environment variables (not committed):

| Variable | Purpose |
|----------|---------|
| `DEPLOY_HOST` | SSH target for deploy (e.g. `user@your-host`) |
| `DEPLOY_PATH` | Remote app directory |

Defaults in the script are for the project maintainer; override them for your own host.

**Details:** [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Local development

```bash
cd website/next-app
cp .env.example .env.local   # add API keys for chat / explore
npm install
npm run dev
# → http://localhost:3000
```

## Live site

| URL | Purpose |
|-----|---------|
| https://dev.aj-pacific.com | Primary Next.js site |
| https://dev.aj-pacific.com/explore | AI Opportunity Exploration (guided flow) |

## Recent content work (Aug 2026)

AI offering restructured to four services (Opportunity Scan → Strategy → Automation/Agents → Implementation/Enablement), **AI-first** navigation and messaging, SAS Beratung partnership notes, AI Opportunity Call, and updated chat system prompt. Deep pages `/services/ai` and `/services/controlling` retained.

See [docs/CHANGELOG-AI-alignment-2026-08.md](docs/CHANGELOG-AI-alignment-2026-08.md) and the requirements spec.

## AI Opportunity Exploration (`/explore`)

**v1a is live:** hybrid guided conversation → structured opportunity summary cards → copy summary / book Opportunity Call. Conversation is session-only in the browser; site assistant FAB is hidden on this page.

| | |
|--|--|
| **Shipped** | Page, `/api/explore`, stages + chips, streaming interview, JSON summary cards, privacy copy, nav/footer/CTA links, scroll UX fix |
| **Outstanding (v1b)** | Submit summary + contact details (dedicated email/Formspree path — not Google Form prefill); optional rate limiting, prompt polish, analytics |

Full status, architecture, file map, and backlog: [docs/EXPLORE-AI-OPPORTUNITIES.md](docs/EXPLORE-AI-OPPORTUNITIES.md)

## Docker services (reference)

Typical stack defined in `website/docker-compose.yml`:

| Service | Role |
|---------|------|
| next-app | Next.js application |
| website | Legacy static nginx (optional) |
| nginx-proxy-manager | TLS and reverse proxy |

Exact host ports and paths depend on your deployment environment.

## Secrets

- Never commit `.env`, `.env.local`, PEMs, or proxy-manager runtime data (`website/data/`, `website/letsencrypt/`).
- Root `.gitignore` covers these.
- Chat and Explore APIs expect `VENICE_API_KEY` / `VENICE_BASE_URL` (see `website/next-app/.env.example`).
