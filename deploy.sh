#!/bin/bash
# KAKKAMVELLY TEMPLE — Deploy Script
# Usage: ./deploy.sh "commit message"
# Does: build → validate → commit → push

set -e  # Exit on any error

MSG="${1:-"🚀 Deploy $(date '+%Y-%m-%d %H:%M')"}"

echo ""
echo "🛕  Kakkamvelly Temple — Deploy"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Run build (auto-increments version, rebuilds JS/CSS, bumps SW)
python3 build.py || exit 1

# Git commit and push
git add -A
git commit -m "$MSG"
git push origin main

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅  DEPLOYED: $MSG"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
