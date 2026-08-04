#!/usr/bin/env bash
# Deploy Next.js app source from this Mac to the AJ Pacific VPS.
# See docs/DEPLOYMENT.md and website/next-app/HYDRATION_ERROR_FIX.md
#
# Usage (from repo root):
#   ./scripts/deploy-next-app.sh              # sync + clear .next + restart Next
#   ./scripts/deploy-next-app.sh --full       # also restart Nginx Proxy Manager
#   ./scripts/deploy-next-app.sh --sync-only  # rsync only (no restarts)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOCAL_APP="${REPO_ROOT}/website/next-app"
REMOTE_HOST="${DEPLOY_HOST:-root@192.119.88.199}"
REMOTE_APP="${DEPLOY_PATH:-/opt/ajpacific/next-app}"
MODE="default" # default | full | sync-only

for arg in "$@"; do
  case "$arg" in
    --full) MODE="full" ;;
    --sync-only) MODE="sync-only" ;;
    --restart) MODE="default" ;; # alias kept for older docs
    -h|--help)
      echo "Usage: $0 [--full|--sync-only]"
      echo "  Syncs website/next-app/ → ${REMOTE_HOST}:${REMOTE_APP}"
      echo "  Default: clear Next.js .next cache and restart next-app"
      echo "  --full:  also restart nginx-proxy-manager (use after structural UI changes)"
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

echo "🚀 Deploying next-app"
echo "   From: $LOCAL_APP"
echo "   To:   ${REMOTE_HOST}:${REMOTE_APP}"
echo "   Mode: $MODE"
echo ""

if ! ssh -o BatchMode=yes -o ConnectTimeout=10 "$REMOTE_HOST" 'true'; then
  echo "❌ Cannot SSH to ${REMOTE_HOST}. Check keys and network." >&2
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
  "${REMOTE_HOST}:${REMOTE_APP}/"

echo ""
echo "✅ Files synced."

if [[ "$MODE" == "sync-only" ]]; then
  echo "   (skipped restarts — use without --sync-only if the site looks stale)"
  exit 0
fi

echo "🧹 Clearing Next.js .next build cache (prevents stale SSR vs client JS)..."
ssh "$REMOTE_HOST" 'docker exec ajpacific-next-app-1 sh -c "rm -rf /app/.next" 2>/dev/null || rm -rf /opt/ajpacific/next-app/.next'

echo "🔄 Restarting Next.js container..."
ssh "$REMOTE_HOST" 'docker restart ajpacific-next-app-1'

if [[ "$MODE" == "full" ]]; then
  echo "🔄 Restarting Nginx Proxy Manager (clears edge asset cache)..."
  ssh "$REMOTE_HOST" 'docker restart ajpacific-nginx-proxy-manager-1'
  echo "   Waiting ~25s for both services..."
  sleep 25
else
  echo "   Waiting ~15s for Next.js..."
  sleep 15
fi

echo ""
echo "📋 Recent Next.js logs:"
ssh "$REMOTE_HOST" 'docker logs --tail 25 ajpacific-next-app-1' || true

echo ""
echo "🌐 Check: https://dev.aj-pacific.com"
echo "   If UI still looks old: open a private window, or DevTools → Empty Cache and Hard Reload."
echo "   See: website/next-app/HYDRATION_ERROR_FIX.md"
echo ""
