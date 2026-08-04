# Deployment Guide — AJ Pacific Website

**Last verified:** August 2026 (Mac → RackNerd VPS)

This document describes how the live site is hosted, what broke in the old deploy path, and the **working method** used after the AI-alignment content update.

---

## Live environment

| Item | Value |
|------|--------|
| Live site | https://dev.aj-pacific.com |
| VPS | RackNerd, `192.119.88.199` (Ubuntu 22.04) |
| SSH | `root@192.119.88.199` (key auth from Mac Mini; default `~/.ssh` works) |
| App on server | `/opt/ajpacific/next-app/` |
| Compose project | `/opt/ajpacific/docker-compose.yml` |
| Next container | `ajpacific-next-app-1` (`node:20-alpine`) |
| Runtime mode | **Development** (`npm run dev`), volume-mounted source |
| Edge / SSL | Nginx Proxy Manager → container port 3000 |
| NPM admin | http://192.119.88.199:81 |

Stack (simplified):

```
Browser → NPM (80/443, Let's Encrypt)
            → ajpacific-next-app-1:3000  (Next.js, bind-mounted from ./next-app)
            → ajpacific-website-1        (legacy static nginx, optional)
```

Because `./next-app` is bind-mounted into the container, **updating files on the VPS under `/opt/ajpacific/next-app/` is enough** for the running app to see changes. Next.js often hot-reloads; a full container restart is only needed if the process fails to pick up changes.

---

## What we discovered (August 2026)

### 1. Local Mac workspace is not a git checkout of production

- Path: `/Users/pelvispalace/Projects/aj-pacific`
- **No `.git` directory** on the Mac copy used for this work
- Root `README.md` and `deploy.sh` still described a **git push → VPS** workflow that does not work from this workspace as-is

### 2. `deploy.sh` is outdated for this Mac

The script expected:

| Assumption | Reality on Mac (2026-08) |
|------------|---------------------------|
| Run from `website/` with a git repo | No local git; wrong cwd checks |
| SSH key at `/a0/root/.ssh/id_ed25519` | That path is from another environment (e.g. container/agent host), **not** this Mac |
| Remote: `git push vps master` | No `vps` remote configured locally |
| VPS: `git fetch` + `reset --hard` + `docker compose up` | VPS still has `/opt/git/ajpacific.git` and `/opt/ajpacific`, but the Mac side of git deploy was never set up here |

**Do not rely on `./deploy.sh` until it is rewritten for the Mac.** Prefer rsync (below) or a fixed script.

### 3. SSH from this Mac **does** work

```bash
ssh root@192.119.88.199 'hostname'   # → racknerd-…
```

No special key path is required if your normal SSH agent / `~/.ssh` key is authorized on the VPS.

### 4. Working deploy: **rsync of `next-app` only**

What worked for the AI-alignment release:

1. Edit source on Mac under `website/next-app/`
2. `rsync` that tree to `/opt/ajpacific/next-app/` on the VPS
3. **Exclude** secrets and heavy dirs: `.env*`, `node_modules`, `.next`
4. Next.js on the server restarted / recompiled; site served new content at https://dev.aj-pacific.com

Server-side `.env.local` (e.g. `VENICE_API_KEY`) was left untouched on the VPS.

### 5. Secrets must not be synced or committed

- Local secrets: `website/next-app/.env.local`, `website/.env`
- VPS secrets: same paths on server; plus NPM data under `website/data/` and certs under `website/letsencrypt/` if those trees exist on disk
- Repo root `.gitignore` is set to ignore env files, PEMs, NPM data, etc.
- Template only: `website/next-app/.env.example`

Never rsync `--delete` over the whole `/opt/ajpacific` tree without care: that could wipe NPM certs/logs if those live beside the app. Prefer syncing **only** `next-app/`.

### 6. Git bare repo still exists on the VPS (optional future path)

- Bare repo observed: `/opt/git/ajpacific.git` (under `/opt/git/`)
- App checkout/deploy dir: `/opt/ajpacific`
- Restoring git-based deploy is possible later: init git on Mac, add remote, push, pull/reset on VPS. Not required for day-to-day content updates while using rsync.

### 7. Production Next build is not required yet

Compose still runs:

```text
npm install && npm run dev
NODE_ENV=development
```

Switching to `npm run build && npm start` remains a future ops task, not part of the content deploy.

---

## Recommended deploy procedure (Mac → VPS)

### Prerequisites

- SSH access: `ssh root@192.119.88.199` works without password
- Changes completed under `website/next-app/`
- Optional: quick local check with `npm install && npm run dev` in `website/next-app/`

### Deploy command

From the **repo root** (`aj-pacific/`):

```bash
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.env' \
  --exclude '.env.local' \
  --exclude '.env*.local' \
  --exclude '.DS_Store' \
  ./website/next-app/ \
  root@192.119.88.199:/opt/ajpacific/next-app/
```

Or use the helper script (same options):

```bash
./scripts/deploy-next-app.sh
```

### After deploy

1. Open https://dev.aj-pacific.com in a **private window** first (avoids stubborn browser cache)
2. Check key pages: `/`, `/services`, `/services/ai`, `/about`, `/explore`, chat widget (FAB should be **hidden** on `/explore`)
3. On `/explore`: page should load at top (no jump); chips should only scroll the chat panel, not the whole page
4. If UI looks stale or you see a **hydration error**, this stack has layered caches. Use the full purge:

```bash
./scripts/deploy-next-app.sh --full
```

Or manually (from project docs `website/next-app/HYDRATION_ERROR_FIX.md`):

```bash
ssh root@192.119.88.199 '
  docker exec ajpacific-next-app-1 sh -c "rm -rf /app/.next"
  docker restart ajpacific-next-app-1
  docker restart ajpacific-nginx-proxy-manager-1
'
```

Wait 30–60s, then empty browser cache (DevTools → Empty Cache and Hard Reload).

**Why:** Nginx Proxy Manager previously included `assets.conf`, which can serve **old JS** while Next serves **new HTML** → hydration mismatch and “nothing changed” in private mode. Asset caching for `dev.aj-pacific.com` should stay disabled while running `next dev`.

### Verify on server (optional)

```bash
ssh root@192.119.88.199 'grep -n "AI Opportunity Scan" /opt/ajpacific/next-app/app/services/page.tsx | head'
curl -sS https://dev.aj-pacific.com/services | grep -o "AI Opportunity Scan"
curl -sS -o /dev/null -w "%{http_code}\n" https://dev.aj-pacific.com/explore
curl -sS https://dev.aj-pacific.com/explore | grep -o "Explore AI Opportunities" | head -1
```

Feature status for explore: [EXPLORE-AI-OPPORTUNITIES.md](./EXPLORE-AI-OPPORTUNITIES.md)

---

## What *not* to do

- Do not commit or rsync `.env.local`, private keys, or `website/data/` / `letsencrypt/`
- Do not run the old `deploy.sh` as-is from this Mac until it is rewritten
- Do not `docker compose down` on the VPS casually — NPM and other stacks may share the host
- Do not assume git history on the Mac is the source of truth until git is initialized here

---

## Local preview (no VPS)

```bash
cd website/next-app
cp .env.example .env.local   # then fill VENICE_API_KEY if testing chat
npm install
npm run dev
# → http://localhost:3000
```

Chat needs a valid Venice API key in `.env.local`.

---

## Related files

| File | Role |
|------|------|
| `scripts/deploy-next-app.sh` | Working rsync deploy helper |
| `deploy.sh` | **Legacy** git-based script (other environment; do not use from this Mac) |
| `website/docker-compose.yml` | Compose services (mirrors VPS layout) |
| `website/README.md` | Server manifesto / ops notes |
| `docs/CHANGELOG-AI-alignment-2026-08.md` | Content change log for the SAS alignment work |
| `docs/EXPLORE-AI-OPPORTUNITIES.md` | `/explore` feature: current status, architecture, backlog |
| `.gitignore` | Keeps secrets and NPM runtime data out of git |

---

## Future improvements (not done yet)

1. Initialize git on Mac with root `.gitignore`; optional remote to `/opt/git/ajpacific.git`
2. Rewrite or retire root `deploy.sh` so there is a single supported path
3. Switch Next container to production build when ready
4. Keep only app source on Mac; avoid storing live Let’s Encrypt private keys in the project folder
