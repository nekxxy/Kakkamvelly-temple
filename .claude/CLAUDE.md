# Kakkamvelly Sreekrishna Temple — Ruflo Agent Constitution

## Project Identity
- Temple: Kakkamvelly Sreekrishna Temple (കക്കംവെള്ളി ശ്രീകൃഷ്ണ ക്ഷേത്രം)
- Location: Nadapuram Panchayat, Kozhikode District, Kerala
- Deity: Lord Sreekrishna (Vasudevan)
- Languages: Malayalam (primary), English (secondary)
- Tech Stack: Vanilla HTML/CSS/JS — NO frameworks, NO build tools, NO npm deps in site

## Agent Rules
- ALWAYS mobile-first (≤768px)
- NEVER break existing animations or photos
- ALWAYS use Malayalam text for UI labels + English fallback
- ALWAYS add loading states for async features
- Colors: gold #ffd700, saffron #ff9933, temple-red #8b0000, dark #1a0620
- Fonts: Noto Serif Malayalam, Cinzel, Lato (already loaded)
- Images live in /images/ — never hotlink external images

## File Structure (2026 redesign)
index.html          — the whole site (single page, no build step)
css/temple.css      — single stylesheet (design tokens in :root)
js/temple.js        — all interactivity (lang toggle, live widgets, slider, lightbox…)
sw.js               — service worker (bump VERSION when cached assets change)
manifest.json       — PWA manifest
images/             — real temple photos (+ /mobile and /thumbs variants)
audio/              — devotional background loop

## Yearly Maintenance
- Festival dates (lunar calendar) live in the FESTIVALS array in js/temple.js —
  update each year after confirming with the temple committee
- Annadhanam (first Sunday) and darshan status are computed automatically

## Quality Gates
- Lighthouse mobile score target: ≥85
- No horizontal scroll on any screen width
- All text readable without zooming on 375px width
- Touch targets ≥44px on mobile
