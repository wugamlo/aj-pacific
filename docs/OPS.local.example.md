# Private ops notes (example template)

Copy this file to `docs/OPS.local.md` and fill in real values.
`OPS.local.md` is gitignored — keep it on your machine only.

## Host

| Item | Value |
|------|--------|
| Provider | |
| IP / hostname | |
| SSH | `user@host` (key auth) |
| OS | |
| Project root on server | |
| Live site | |
| Proxy admin (if any) | *(do not expose publicly)* |

## Deploy

```bash
# From repo root — loads .env.deploy automatically
./scripts/deploy-next-app.sh
./scripts/deploy-next-app.sh --full
```

## Stack notes

- Compose project path:
- Next container name:
- Proxy container name:
- Runtime mode (dev vs production):
- Anything quirky (swap, firewall ports, container name routing, …):

## Credentials

Store passwords and API keys in a password manager — not in git, and ideally not in this file either. This file is for host layout and runbooks only.
