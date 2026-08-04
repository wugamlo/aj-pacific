# AJ Pacific

Business website for **AJ Pacific** — AI consulting and controlling / performance services (Hong Kong), live at [dev.aj-pacific.com](https://dev.aj-pacific.com).

## Architecture

```
Mac (edit website/next-app)
    ↓  rsync  (see docs/DEPLOYMENT.md)
VPS /opt/ajpacific/next-app
    ↓  Docker (npm run dev, volume mount)
Nginx Proxy Manager (SSL) → Internet
```

## Repository layout

```
aj-pacific/
├── README.md
├── docs/
│   ├── DEPLOYMENT.md                      # How to deploy (authoritative)
│   ├── CHANGELOG-AI-alignment-2026-08.md  # Aug 2026 content rework
│   └── EXPLORE-AI-OPPORTUNITIES.md        # /explore feature status + backlog
├── requirements/
│   └── AJ_Pacific_Website_AI_Alignment_Spec.md
├── scripts/
│   └── deploy-next-app.sh                 # Working Mac → VPS deploy
├── deploy.sh                              # LEGACY git deploy — do not use from this Mac
└── website/
    ├── docker-compose.yml
    ├── README.md                          # Server manifesto / VPS ops
    ├── next-app/                          # Next.js application (source of truth for content)
    └── website-content/                   # Legacy static site
```

## Deploy (current, verified)

From repo root on the Mac:

```bash
./scripts/deploy-next-app.sh
# optional: force container restart
./scripts/deploy-next-app.sh --restart
```

This rsyncs `website/next-app/` to `root@192.119.88.199:/opt/ajpacific/next-app/`, excluding `node_modules`, `.next`, and env files so server secrets stay put.

**Full details, discoveries, and troubleshooting:** [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

> **Note:** Root `deploy.sh` is a leftover git-based flow (other host path for SSH keys). It is **not** the supported path from this workspace.

## Local development

```bash
cd website/next-app
cp .env.example .env.local   # add VENICE_API_KEY for chat
npm install
npm run dev
# → http://localhost:3000
```

## Live sites

| URL | Purpose |
|-----|---------|
| https://dev.aj-pacific.com | Primary Next.js site |
| https://dev.aj-pacific.com/explore | AI Opportunity Exploration (guided flow) |
| http://192.119.88.199:81 | Nginx Proxy Manager admin |

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

## Docker services (on VPS)

| Service | Port | Description |
|---------|------|-------------|
| next-app | 3000 | Next.js application |
| website | (internal) | Legacy static nginx |
| nginx-proxy-manager | 80, 443, 81 | SSL + routing |

## Secrets

- Never commit `.env`, `.env.local`, PEMs, or NPM data (`website/data/`, `website/letsencrypt/`).
- Root `.gitignore` covers these.
- Chat and Explore APIs use `VENICE_API_KEY` / `VENICE_BASE_URL` (see `website/next-app/.env.example`).
