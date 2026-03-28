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

## File Structure
index.html          — main page
css/style.css       — base styles
css/krishna-animations.css — animation styles  
css/baby-krishna.css — baby krishna SVG styles
css/mobile-futuristic.css — mobile overrides
js/main.js          — core JS
js/krishna-animations.js — particle animations
js/mobile-futuristic.js — mobile interactions
images/             — real temple photos

## Quality Gates
- Lighthouse mobile score target: ≥85
- No horizontal scroll on any screen width
- All text readable without zooming on 375px width
- Touch targets ≥44px on mobile
