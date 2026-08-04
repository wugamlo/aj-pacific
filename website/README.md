# Website stack overview

> **Deploy:** use `scripts/deploy-next-app.sh` from the monorepo root.  
> **Procedure:** `docs/DEPLOYMENT.md`.  
> **Host-specific notes:** keep them in gitignored `docs/OPS.local.md` and `.env.deploy` (see `docs/OPS.local.example.md`).  
> **Content changelog:** `docs/CHANGELOG-AI-alignment-2026-08.md`.

## Product URLs

- Live site: https://dev.aj-pacific.com  
- Explore: https://dev.aj-pacific.com/explore  

## Architecture (Docker Compose)

Defined by `docker-compose.yml` in this directory. Typical services:

| Service | Role |
|---------|------|
| **next-app** | Primary Next.js site (Node image; app code volume-mounted) |
| **website** | Optional legacy static nginx (`website-content/`) |
| **nginx-proxy-manager** | TLS (Let's Encrypt) and reverse proxy |

Exact host paths, container names, and admin URLs are **not** documented here — see your private ops file.

### Next.js application (summary)

- **Stack:** Next.js 14, React 18, TypeScript, Tailwind, Framer Motion, Lucide  
- **Structure (after Aug 2026 alignment):**
  - Homepage: AI-first pillars
  - Services: four AI offers first, then Controlling; deep pages `/services/ai`, `/services/controlling`
  - About, Contact (Google Forms embed)
  - ChatWidget + `/api/chat`; Explore + `/api/explore`
- **Styling:** glass-style cards, brand green (`#007E3A`), gold accent, Lato

### Proxy routing note

When the reverse proxy targets containers by name, use the **full Docker container name** (compose project prefix included), not only the short service name — otherwise you may see 502 errors. Specific names live in private ops notes.

## Workflow

1. Edit `next-app/` in this monorepo  
2. Test locally: `cd next-app && npm run dev`  
3. Deploy: `./scripts/deploy-next-app.sh` from monorepo root (requires `.env.deploy`)  
4. Optional: SSH to the host for docker logs / restarts (commands in `docs/OPS.local.md`)

## Repo layout (this folder)

```
website/
├── docker-compose.yml
├── README.md                 # this file (public-safe)
├── website-content/          # legacy static
├── next-app/                 # Next.js application
├── data/                     # proxy runtime (gitignored)
└── letsencrypt/              # certs (gitignored)
```

On a server, the same tree is often checked out or mirrored under a single project directory; absolute paths stay in private ops docs.

## Status & roadmap (product)

**In good shape:** multi-page Next site, responsive UI, SSL on the public hostname, chat + explore, contact form, containerized stack.

**Next ideas:** production Next build (`build` + `start`), domain cutover, analytics, CMS, stronger host hardening — track in issues or private ops as you prefer.

## Credentials

Never store production passwords or API keys in this file or in public git. Use:

- `next-app/.env.local` / server-side env for API keys  
- a password manager for host and proxy admin logins  
