# AJPacific Server Manifesto

> **Deploy from Mac:** Do not use root `deploy.sh` from the Mac workspace.  
> Use `scripts/deploy-next-app.sh` or see **`docs/DEPLOYMENT.md`**.  
> Content change log (Aug 2026 AI alignment): **`docs/CHANGELOG-AI-alignment-2026-08.md`**.

## 1. Environment Overview
- **Provider:** RackNerd (Los Angeles DC02)
- **IP Address:** 192.119.88.199
- **OS:** Ubuntu 22.04 LTS
- **Resources:** 2.5 GB RAM + 3.2 GB Swap (Crash-resistant)
- **Primary Domain:** aj-pacific.com
- **Development Subdomain:** dev.aj-pacific.com (Currently Live)

## 2. Architecture (Docker Stack)
The system runs on Docker Compose located at /opt/ajpacific.

### Services:
- **Nginx Proxy Manager (NPM):** 
  - Handles SSL (Let's Encrypt) and routing.
  - Admin UI: http://192.119.88.199:81
  - SSL Certificate: Active for dev.aj-pacific.com (Let's Encrypt)
  
- **Legacy Website (Static):** 
  - Container: ajpacific-website-1
  - Image: nginx:alpine
  - Content Folder: ./website-content
  - Status: Maintained for fallback/testing
  - **CRITICAL NOTE:** Internal routing in NPM must use the full container name ajpacific-website-1 instead of the service name website to avoid 502 Gateway errors.

- **Next.js Application (Primary):**
  - Container: ajpacific-next-app-1
  - Image: node:20-alpine
  - Port: 3000 (internal)
  - Working Directory: /app (mounted from ./next-app)
  - Auto-restart: Enabled
  - Development Mode: Hot-reload enabled via npm run dev
  - **Technology Stack:**
    - Next.js 14.2.15 (React 18)
    - TypeScript
    - Tailwind CSS 3.4.1
    - Framer Motion 11.11.9 (animations)
    - Lucide React 0.453.0 (icons)
  - **Application Structure (after Aug 2026 alignment):**
    - Homepage: AI-first pillars (AI Consulting, Finance, Personal Partnership)
    - Services: AI four-offer model first, then Controlling; deep pages `/services/ai` and `/services/controlling` retained
    - About: Technology & AI first, expanded How We Work, SAS collaboration note
    - Contact: Google Forms embed
    - ChatWidget + `/api/chat` (Venice API; system prompt matches new offering)
  - **Styling:** Glass-style cards, brand green (#007E3A), gold accent, Lato

## 3. Workflow
- **Preferred (Mac → VPS):** Edit `website/next-app` on Mac, run `./scripts/deploy-next-app.sh` (rsync). See `docs/DEPLOYMENT.md`.
- **Alternate:** Direct editing via VS Code Remote SSH on the VPS under `/opt/ajpacific/next-app`
- **Access:** Root user (Secure SSH Keys verified and configured from Mac Mini)
- **Project Root:** /opt/ajpacific
- **Live Development:** Changes to Next.js app auto-reload in development mode

## 4. Current Status & Achievements
✅ **Completed:**
1. Professional Next.js website deployed with modern UI/UX
2. Full responsive design with Tailwind CSS
3. Multi-page application (Home, Services, About, Contact)
4. AI Chatbot implemented and functional with streaming and local history
5. SSL certificate configured and active on dev.aj-pacific.com
6. Docker containerization with auto-restart capabilities
7. Contact form integrated with Google Forms
8. SSH Key authentication established from the Mac Mini hub

## 5. Future Roadmap
1. **Immediate Priority:**
   - Security audit of VPS (UFW hardening)
   - Production build deployment (npm run build + npm start)
   - Point primary domain (aj-pacific.com) to Next.js app

2. **Short-term:**
   - Transition to Git-based version control (GitHub)
   - Implement analytics (Google Analytics/Plausible)
   - Add content management system or headless CMS integration

3. **Long-term:**
   - Python-based AI Chatbot container integration
   - Database integration for persistent conversation memory
   - Blog/insights section
   - Client portal/dashboard

## 6. Technical Operations & Maintenance

### Common Commands (Run from /opt/ajpacific)
- **Start everything:** docker compose up -d
- **Stop everything:** docker compose down
- **Restart specific service:** docker compose restart next-app
- **View all logs:** docker compose logs -f
- **View Next.js logs only:** docker compose logs -f next-app
- **Check running containers:** docker compose ps
- **Check memory usage:** free -h
- **Access Next.js container shell:** docker exec -it ajpacific-next-app-1 sh

### Next.js Development Workflow
- **Edit files:** Modify files in ./next-app directory via VS Code Remote SSH
- **Auto-reload:** Changes are automatically detected and hot-reloaded
- **Install new packages:** docker exec -it ajpacific-next-app-1 npm install <package-name>
- **Production build:** 
  1. Update docker-compose.yml command to: sh -c "npm install && npm run build && npm start"
  2. Change NODE_ENV to production
  3. Restart container: docker compose restart next-app

### Networking & Security
- **Firewall:** UFW Status active (Port 22 and 18789 allowed). Ports 80, 443, 81, and 3000 handled via Docker.
- **SSL:** Managed by Nginx Proxy Manager via Let's Encrypt. Certificates auto-renew.
- **Active Certificate:** dev.aj-pacific.com (npm-1)
- **Access:** Direct root SSH via Keys.
- **Internal Network:** All containers communicate via Docker's default bridge network

### Key Configuration Quirks (Read before changing!)
1. **Network Routing:** We use the default Docker bridge network. NPM MUST point to container names (ajpacific-website-1 or ajpacific-next-app-1) instead of service names.
2. **Next.js Container:** Runs in development mode with hot-reload.
3. **Swap File:** A 3.2GB swap file was manually added at /swapfile. Do not remove this.
4. **Port 3000:** Next.js exposes port 3000 for direct access during development.

### File Structure
```
/opt/ajpacific/
├── docker-compose.yml          # Main orchestration file
├── README.md                   # This file
├── website-content/            # Legacy static site
│   └── index.html
├── next-app/                   # Next.js application
│   ├── app/                    # App router pages
│   │   ├── layout.tsx          # Root layout with navbar
│   │   ├── page.tsx            # Homepage
│   │   ├── about/page.tsx      # About page
│   │   ├── services/page.tsx   # Services page
│   │   └── contact/page.tsx    # Contact page
│   ├── components/             # Reusable components
│   │   ├── ServiceCard.tsx
│   │   └── ChatWidget.tsx
│   ├── styles/
│   │   └── globals.css         # Global styles + Tailwind
│   ├── public/
│   │   └── images/
│   │       └── ajp-logo.jpg
│   ├── package.json
│   └── tsconfig.json
├── data/                       # NPM persistent data
├── letsencrypt/                # SSL certificates
└── memory/                     # Elvis internal logs
```

### Credentials Location
- **Nginx Proxy Manager:** Private manager.
- **VPS Root:** Password stored in private notes.
