#!/bin/bash
# KAKKAMVELLY TEMPLE — Deploy Script
# Usage: ./deploy.sh "commit message"
# Plain static site — no build step. Commits and pushes to main;
# GitHub Pages deploys automatically via .github/workflows.

set -e

MSG="${1:-"🚀 Deploy $(date '+%Y-%m-%d %H:%M')"}"

echo ""
echo "🛕  Kakkamvelly Temple — Deploy"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

git add -A
git commit -m "$MSG"
git push origin main

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅  DEPLOYED: $MSG"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
