# Kakkamvelly Sreekrishna Temple

> Official static website for **Kakkamvelly Sreekrishna Temple**, Kozhikode District, Kerala.

## 🛕 About

A fully responsive static website dedicated to the Kakkamvelly Sreekrishna Temple located in the Kozhikode district of Kerala, India. The site provides devotees and visitors with:

- Temple history and deity information
- Daily pooja schedule and opening hours
- Festival calendar
- Photo gallery (placeholder – ready for real images)
- **Google Maps embed** showing the temple location with directions
- Contact form with client-side validation

## �� Project Structure

```
kakkamvelly-temple/
├── index.html        # Main HTML page
├── css/
│   └── style.css     # All styles (responsive, Kerala temple aesthetic)
├── js/
│   └── main.js       # Navigation, Maps embed, form validation, animations
└── images/           # (add temple images here)
```

## 🗺️ Google Maps Integration

The site uses the **Google Maps Embed API v1** (`/maps/embed/v1/search`) to display an interactive map of the temple location. The embed is loaded as an `<iframe>` so it works without any JavaScript SDK.

A direct link to the [Google Maps listing](https://maps.google.com/?q=Kakkamvelly+Sreekrishna+Temple+Kozhikode+Kerala) is also provided for mobile users who prefer to open the native Maps app.

> **API Key:** Replace the `key` parameter in the `<iframe src="…">` inside `index.html` with your own Maps Embed API key restricted to your domain.

## 🚀 Running Locally

No build step is required – this is a plain static site.

```bash
# Using Python's built-in server
python3 -m http.server 8080

# Or using Node's npx serve
npx serve .
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

## 📦 Deployment

Deploy to any static hosting platform:

| Platform | Command |
|---|---|
| GitHub Pages | Push to `gh-pages` branch or configure via *Settings → Pages* |
| Netlify | Drag-and-drop the project folder, or connect via Git |
| Vercel | `vercel --prod` |
| Firebase Hosting | `firebase deploy` |

## ✅ Features

- **Fully responsive** – works on mobile, tablet, and desktop
- **Accessible** – ARIA labels, semantic HTML, keyboard navigation, focus-visible outlines
- **No build tools** – plain HTML/CSS/JS, zero dependencies to install
- **Performance** – lazy-loaded map iframe, IntersectionObserver animations, `prefers-reduced-motion` support
- **Kerala temple aesthetic** – saffron, gold and deep red colour palette; Malayalam typography

## 🔧 Customisation

| What | Where |
|---|---|
| Temple address / phone | `index.html` – `#contact` and `#location` sections |
| Pooja timings | `index.html` – `#timings` section tables |
| Festival dates | `index.html` – `#festivals` section |
| Colour scheme | `css/style.css` – `:root` CSS custom properties |
| Google Maps location | `index.html` – `<iframe src>` `q=` query parameter |
| Social media links | `index.html` – `.social-links` anchors |

## 📜 License

© Kakkamvelly Sreekrishna Temple. All rights reserved.
