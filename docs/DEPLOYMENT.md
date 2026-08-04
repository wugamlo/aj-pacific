# Deployment Guide — AJ Pacific Website

**Last updated:** August 2026

How the public site is built and how maintainers deploy app source. **Host-specific details** (IP, SSH user, absolute paths, admin URLs) live only in **local, gitignored** files — not in this document.

---

## Private vs public ops data

| Location | Committed? | Purpose |
|----------|------------|---------|
| `docs/DEPLOYMENT.md` (this file) | Yes | Generic procedure anyone can read |
| `.env.deploy.example` | Yes | Template for deploy targets |
| `.env.deploy` | **No** (gitignored) | Real `DEPLOY_HOST`, paths, container names |
| `docs/OPS.local.example.md` | Yes | Template for private runbook |
| `docs/OPS.local.md` | **No** (gitignored) | Your host layout, IPs, SSH notes |

**Yes — keeping setup-specific info in gitignored files is the right approach** for a public repo: the procedure stays in git; the fingerprint of your server does not.

```bash
cp .env.deploy.example .env.deploy          # then edit
cp docs/OPS.local.example.md docs/OPS.local.md   # then edit
```

---

## Live product URLs

| URL | Purpose |
|-----|---------|
| https://dev.aj-pacific.com | Primary Next.js site |
| https://dev.aj-pacific.com/explore | AI Opportunity Exploration |

---

## Architecture (generic)

```
Browser → reverse proxy + TLS
            → Next.js container (app source bind-mounted)
            → optional legacy static container
```

Typical layout on a host (names vary):

- Compose project with `next-app`, reverse proxy, optional static site
- App directory volume-mounted into the Next container
- Updating files under the remote app path is enough for hot reload when running `next dev`
- Full container restart only when the process does not pick up changes

Exact host paths and container names: see your `docs/OPS.local.md` / `.env.deploy`.

---

## Recommended deploy (rsync of `next-app` only)

### Prerequisites

- SSH key auth to the deploy host
- `.env.deploy` filled in (or `DEPLOY_HOST` / `DEPLOY_PATH` exported in the shell)
- Changes ready under `website/next-app/`
- Optional: local `npm run dev` smoke test

### Deploy command

From the **repo root**:

```bash
./scripts/deploy-next-app.sh           # sync + clear .next + restart Next
./scripts/deploy-next-app.sh --full    # also restart reverse-proxy container
./scripts/deploy-next-app.sh --sync-only
```

The script loads `.env.deploy` if present, then rsyncs `website/next-app/` to `${DEPLOY_HOST}:${DEPLOY_PATH}`, excluding:

- `node_modules`, `.next`
- `.env`, `.env.local`, `.env*.local`
- `.DS_Store`

**Do not** rsync `--delete` over the entire host project tree (proxy data, certs, logs). Sync **only** `next-app/`.

### After deploy

1. Open the live site in a private window (avoids stubborn browser cache)
2. Check `/`, `/services`, `/services/ai`, `/about`, `/explore`, chat widget (FAB should be **hidden** on `/explore`)
3. On `/explore`: page loads at top; chips scroll only the chat panel
4. If UI looks stale or hydration fails: `./scripts/deploy-next-app.sh --full`, wait 30–60s, hard-reload

See also: `website/next-app/HYDRATION_ERROR_FIX.md`

### Verify (public)

```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://dev.aj-pacific.com/explore
curl -sS https://dev.aj-pacific.com/explore | grep -o "Explore AI Opportunities" | head -1
```

Host-side `ssh` / `grep` checks: keep those commands in `docs/OPS.local.md`.

Feature status for explore: [EXPLORE-AI-OPPORTUNITIES.md](./EXPLORE-AI-OPPORTUNITIES.md)

---

## Secrets

- Never commit or rsync `.env.local`, private keys, or `website/data/` / `website/letsencrypt/`
- Server-side app env (e.g. `VENICE_API_KEY`) stays on the host; deploy excludes env files
- Template only: `website/next-app/.env.example`

---

## Local preview (no remote host)

```bash
cd website/next-app
cp .env.example .env.local   # fill API keys if testing chat / explore
npm install
npm run dev
# → http://localhost:3000
```

---

## Historical notes (non-sensitive)

These informed the current workflow; host specifics removed.

1. **Preferred path** is rsync of `next-app` via `scripts/deploy-next-app.sh`, not the legacy root `deploy.sh`.
2. **Legacy `deploy.sh`** assumed another environment (different SSH key path and git remote). It exits with instructions; do not use it as the primary deploy.
3. Running Next in **development mode** on the server is a temporary ops choice; switching to `npm run build && npm start` is a future improvement.
4. This monorepo is now the source of truth on GitHub; day-to-day content deploy remains rsync until a full git-based host pull is set up.

---

## What *not* to do

- Do not commit `.env.deploy`, `docs/OPS.local.md`, real env files, or cert material
- Do not publish VPS IPs, root SSH targets, or proxy admin URLs in the public tree
- Do not `docker compose down` casually on a shared host
- Do not sync proxy `data/` or `letsencrypt/` between machines via this repo

---

## Related files

| File | Role |
|------|------|
| `scripts/deploy-next-app.sh` | Rsync deploy helper (reads `.env.deploy`) |
| `.env.deploy.example` | Deploy env template |
| `docs/OPS.local.example.md` | Private ops runbook template |
| `deploy.sh` | Legacy stub — not the supported path |
| `website/docker-compose.yml` | Compose service definition |
| `website/README.md` | Generic stack overview |
| `docs/EXPLORE-AI-OPPORTUNITIES.md` | `/explore` feature status |
| `.gitignore` | Secrets, certs, private ops files |

---

## Future improvements

1. Single supported deploy path (retire legacy `deploy.sh` body)
2. Production Next build in compose when ready
3. Keep only app source in public git; never store live TLS private keys in the project folder
