#!/bin/bash
# =============================================================================
# LEGACY — DO NOT USE FROM THE MAC WORKSPACE
#
# This script assumes:
#   - git remotes and a working tree under /usr/projects/...
#   - SSH key at /a0/root/.ssh/id_ed25519 (other environment)
#
# Supported deploy from this repo on Mac:
#   ./scripts/deploy-next-app.sh
#   docs/DEPLOYMENT.md
# =============================================================================

set -e

echo "❌ This is the legacy git deploy script."
echo "   From the Mac project, use:"
echo "     ./scripts/deploy-next-app.sh"
echo "   See: docs/DEPLOYMENT.md"
echo ""
echo "   (Original body left below for reference if you restore git deploy later.)"
echo ""

# --- original body (inactive) ---
# Check if we're in the website directory
# if [ ! -f "docker-compose.yml" ]; then
#     echo "❌ Error: Not in website directory"
#     exit 1
# fi
#
# if [ -n "$(git status --porcelain)" ]; then
#     echo "⚠️  Uncommitted changes detected"
#     exit 1
# fi
#
# GIT_SSH_COMMAND='ssh -i /a0/root/.ssh/id_ed25519 -o StrictHostKeyChecking=no' git push vps master
# ssh -i /a0/root/.ssh/id_ed25519 -o StrictHostKeyChecking=no root@192.119.88.199 "
#     cd /opt/ajpacific && \
#     git fetch origin && \
#     git reset --hard origin/master && \
#     docker compose up -d --build
# "

exit 1
