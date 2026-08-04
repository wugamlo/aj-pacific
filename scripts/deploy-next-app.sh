#!/usr/bin/env bash
# Deploy Next.js app source to the configured host.
# See docs/DEPLOYMENT.md
#
# Configuration (first match wins):
#   1) Environment variables already exported
#   2) Repo-root .env.deploy (gitignored) — copy from .env.deploy.example
#
# Usage (from repo root):
#   ./scripts/deploy-next-app.sh              # sync + clear .next + restart Next
#   ./scripts/deploy-next-app.sh --full       # also restart reverse-proxy container
#   ./scripts/deploy-next-app.sh --sync-only  # rsync only (no restarts)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOCAL_APP="${REPO_ROOT}/website/next-app"
MODE="default" # default | full | sync-only

# Load local deploy targets if present (never commit .env.deploy)
if [[ -f "${REPO_ROOT}/.env.deploy" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "${REPO_ROOT}/.env.deploy"
  set +a
fi

DEPLOY_HOST="${DEPLOY_HOST:-}"
DEPLOY_PATH="${DEPLOY_PATH:-}"
DEPLOY_NEXT_CONTAINER="${DEPLOY_NEXT_CONTAINER:-}"
DEPLOY_NPM_CONTAINER="${DEPLOY_NPM_CONTAINER:-}"
DEPLOY_SITE_URL="${DEPLOY_SITE_URL:-https://dev.aj-pacific.com}"

for arg in "$@"; do
  case "$arg" in
    --full) MODE="full" ;;
    --sync-only) MODE="sync-only" ;;
    --restart) MODE="default" ;; # alias kept for older docs
    -h|--help)
      echo "Usage: $0 [--full|--sync-only]"
      echo "  Syncs website/next-app/ → \$DEPLOY_HOST:\$DEPLOY_PATH"
      echo "  Configure via .env.deploy (see .env.deploy.example) or env vars."
      echo "  Default: clear Next.js .next cache and restart Next container"
      echo "  --full:  also restart reverse-proxy container"
      echo "  --sync-only: files only"
      exit 0
      ;;
    *)
      echo "Unknown option: $arg" >&2
      exit 1
      ;;
  esac
done

if [[ ! -d "$LOCAL_APP" ]]; then
  echo "❌ Local app not found: $LOCAL_APP" >&2
  exit 1
fi

if [[ -z "$DEPLOY_HOST" || -z "$DEPLOY_PATH" ]]; then
  echo "❌ DEPLOY_HOST and DEPLOY_PATH must be set." >&2
  echo "   Copy .env.deploy.example → .env.deploy and edit, or export the variables." >&2
  exit 1
fi

if [[ -z "$DEPLOY_NEXT_CONTAINER" ]]; then
  echo "❌ DEPLOY_NEXT_CONTAINER must be set (Docker container name for Next.js)." >&2
  echo "   See .env.deploy.example" >&2
  exit 1
fi

echo "🚀 Deploying next-app"
echo "   From: $LOCAL_APP"
echo "   To:   ${DEPLOY_HOST}:${DEPLOY_PATH}"
echo "   Mode: $MODE"
echo ""

if ! ssh -o BatchMode=yes -o ConnectTimeout=10 "$DEPLOY_HOST" 'true'; then
  echo "❌ Cannot SSH to ${DEPLOY_HOST}. Check keys and network." >&2
  exit 1
fi

rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.env' \
  --exclude '.env.local' \
  --exclude '.env*.local' \
  --exclude '.DS_Store' \
  "${LOCAL_APP}/" \
  "${DEPLOY_HOST}:${DEPLOY_PATH}/"

echo ""
echo "✅ Files synced."

if [[ "$MODE" == "sync-only" ]]; then
  echo "   (skipped restarts — use without --sync-only if the site looks stale)"
  exit 0
fi

echo "🧹 Clearing Next.js .next build cache (prevents stale SSR vs client JS)..."
ssh "$DEPLOY_HOST" "docker exec ${DEPLOY_NEXT_CONTAINER} sh -c 'rm -rf /app/.next' 2>/dev/null || rm -rf '${DEPLOY_PATH}/.next'"

echo "🔄 Restarting Next.js container (${DEPLOY_NEXT_CONTAINER})..."
ssh "$DEPLOY_HOST" "docker restart ${DEPLOY_NEXT_CONTAINER}"

if [[ "$MODE" == "full" ]]; then
  if [[ -z "$DEPLOY_NPM_CONTAINER" ]]; then
    echo "⚠️  DEPLOY_NPM_CONTAINER not set — skipping proxy restart." >&2
  else
    echo "🔄 Restarting reverse proxy (${DEPLOY_NPM_CONTAINER})..."
    ssh "$DEPLOY_HOST" "docker restart ${DEPLOY_NPM_CONTAINER}"
    echo "   Waiting ~25s for both services..."
    sleep 25
  fi
else
  echo "   Waiting ~15s for Next.js..."
  sleep 15
fi

echo ""
echo "📋 Recent Next.js logs:"
ssh "$DEPLOY_HOST" "docker logs --tail 25 ${DEPLOY_NEXT_CONTAINER}" || true

echo ""
echo "🌐 Check: ${DEPLOY_SITE_URL}"
echo "   If UI still looks old: open a private window, or DevTools → Empty Cache and Hard Reload."
echo "   See: website/next-app/HYDRATION_ERROR_FIX.md"
echo ""
