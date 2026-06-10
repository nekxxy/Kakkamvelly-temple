# Kakkamvelly Sreekrishna Temple

> Official static website for **Kakkamvelly Sreekrishna Temple** (കക്കംവെള്ളി ശ്രീകൃഷ്ണ ക്ഷേത്രം), Purameri, Kozhikode District, Kerala.

🌐 **Live site:** https://kakkamvellytemple.page/

## 🛕 About

A fully responsive, Malayalam-first static website for devotees and visitors:

- **Live darshan status** — open/closed badge computed in IST, works in any timezone
- **Festival countdown** — live ticking countdown plus upcoming festival queue
- **Annadhanam tracker** — days until the next first-Sunday Annadhanam
- **Weather & panchang touches** — Purameri weather, sunrise/sunset (Open-Meteo) and moon phase
- **Complete vazhipad price list** with instant search (Malayalam + English)
- Temple timings, pooja schedule and committee contacts
- **Kulam (temple pond) renovation** project section with donation contacts
- Photo gallery with lightbox + historic YouTube footage (click-to-load)
- Location section with lazy-loaded Google Maps embed and transport guidance
- Optional devotional background music toggle
- PWA: installable, offline-capable via service worker

## 📦 Project Structure

```
kakkamvelly-temple/
├── index.html        # The whole site (single page)
├── css/temple.css    # Single hand-written stylesheet (design system in :root)
├── js/temple.js      # All interactivity (vanilla JS, no dependencies)
├── sw.js             # Service worker (offline cache)
├── manifest.json     # PWA manifest
├── privacy.html      # Privacy policy
├── images/           # Real temple photos (webp + jpg, mobile + thumbs variants)
└── audio/            # Devotional background loop
```

No build step, no frameworks, no npm. Edit the files and push.

## 🚀 Running Locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## 🔧 Customisation

| What | Where |
|---|---|
| Pooja timings | `index.html` — `#timings` section |
| Vazhipad prices | `index.html` — `#vazhipad` section |
| Festival dates (update yearly!) | `js/temple.js` — `FESTIVALS` array |
| Temple hours used by live status | `js/temple.js` — `MORNING_OPEN` … `EVENING_CLOSE` |
| Colours / design tokens | `css/temple.css` — `:root` custom properties |
| Contacts / phone numbers | `index.html` — search for `tel:+91` |

> **⚠️ Yearly maintenance:** festival dates follow the lunar calendar. Update the
> `FESTIVALS` array in `js/temple.js` each year after confirming dates with the
> temple committee. When the cached assets change, bump `VERSION` in `sw.js`.

## 📜 License

© Kakkamvelly Sreekrishna Temple. All rights reserved.
