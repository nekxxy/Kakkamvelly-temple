/**
 * RUFLO AGENT: ux-agent + content-agent
 * Multi-language switcher, PWA install prompt, WhatsApp float
 */
'use strict';

/* ─────────────────────────────────
   1. MULTI-LANGUAGE SWITCHER
   Translates key UI strings
───────────────────────────────── */
(function initLanguage() { return; // Replaced by language.js — full bilingual system

  const LANGS = {
    ml: {
      home:'മുഖ്യ', about:'ക്ഷേത്രം', timings:'സമയം',
      festivals:'ഉത്സവം', gallery:'ഗ്യാലറി', location:'സ്ഥലം',
      contact:'ബന്ധം', bk:'ബാലകൃഷ്ണൻ', donate:'സംഭാവന',
      live_title:'ലൈവ് സ്റ്റാറ്റസ്', visitor_title:'സന്ദർശക വിവരം',
    },
    en: {
      home:'Home', about:'Temple', timings:'Timings',
      festivals:'Festivals', gallery:'Gallery', location:'Location',
      contact:'Contact', bk:'Baby Krishna', donate:'Donate',
      live_title:'Live Status', visitor_title:'Visitor Guide',
    },
    hi: {
      home:'मुख्य', about:'मंदिर', timings:'समय',
      festivals:'उत्सव', gallery:'गैलरी', location:'स्थान',
      contact:'संपर्क', bk:'बालकृष्ण', donate:'दान',
      live_title:'लाइव स्टेटस', visitor_title:'दर्शक जानकारी',
    },
  };

  // Build switcher UI
  const switcher = document.createElement('div');
  switcher.className = 'lang-switcher';
  switcher.setAttribute('role','toolbar');
  switcher.setAttribute('aria-label','Language selector');

  const LABELS = { ml:'മലം', en:'EN' };
  let current = localStorage.getItem('kvt-lang') || 'ml';

  function apply(lang) {
    current = lang;
    localStorage.setItem('kvt-lang', lang);
    const t = LANGS[lang];
    if (!t) return;

    // Nav links
    const navKeys = ['home','about','baby-krishna','timings','festivals','gallery','location','contact'];
    document.querySelectorAll('.nav-link').forEach((a, i) => {
      const key = navKeys[i];
      if (key && t[key]) a.textContent = t[key === 'baby-krishna' ? 'bk' : key];
    });

    // Section tags
    const liveTag = document.querySelector('#live-section .section-tag');
    if (liveTag) liveTag.textContent = t.live_title;

    // Switcher buttons
    switcher.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  }

  Object.entries(LABELS).forEach(([code, label]) => {
    const btn = document.createElement('button');
    btn.className = 'lang-btn' + (code === current ? ' active' : '');
    btn.dataset.lang = code;
    btn.textContent  = label;
    btn.setAttribute('aria-label', `Switch to ${code}`);
    btn.addEventListener('click', () => apply(code));
    switcher.appendChild(btn);
  });

  document.getElementById('site-header').appendChild(switcher);
  apply(current);
})();

/* ─────────────────────────────────
   2. PWA INSTALL PROMPT
───────────────────────────────── */
(function initPWA() {
  // Register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/kakkamvelly-temple/sw.js')
        .then(() => console.log('SW registered'))
        .catch(() => {});
    });
  }

  let deferredPrompt = null;
  const banner = document.getElementById('pwa-banner');
  if (!banner) return;

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    // Show banner after 3 seconds
    setTimeout(() => banner.classList.add('show'), 3000);
  });

  const installBtn  = banner.querySelector('.pwa-install');
  const dismissBtn  = banner.querySelector('.pwa-dismiss');

  if (installBtn) installBtn.addEventListener('click', async () => {
    banner.classList.remove('show');
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    if (outcome === 'accepted') {
      console.log('PWA installed');
    }
  });

  if (dismissBtn) dismissBtn.addEventListener('click', () => {
    banner.classList.remove('show');
    localStorage.setItem('kvt-pwa-dismissed', '1');
  });

  // Don't show if already dismissed
  if (localStorage.getItem('kvt-pwa-dismissed')) {
    banner.style.display = 'none';
  }
})();

/* ─────────────────────────────────
   3. WHATSAPP FLOAT BUTTON
───────────────────────────────── */
(function initWhatsApp() {
  const btn = document.createElement('a');
  btn.id   = 'whatsapp-float';
  btn.href = 'https://wa.me/919446844145?text=ഹരേ%20കൃഷ%20🙏%20Kakkamvelly%20Sreekrishna%20Temple';
  btn.target = '_blank';
  btn.rel    = 'noopener noreferrer';
  btn.setAttribute('aria-label', 'WhatsApp ൽ ബന്ധപ്പെടുക');
  btn.innerHTML = `
    <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
    <span class="wa-tooltip">WhatsApp ൽ ബന്ധപ്പെടുക</span>
  `;
  document.body.appendChild(btn);
})();

/* ─────────────────────────────────
   4. SCHEMA.ORG STRUCTURED DATA
   Helps Google AI Overviews & rich results
───────────────────────────────── */
(function injectSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HinduTemple",
    "name": "Kakkamvelly Sreekrishna Temple",
    "alternateName": "കക്കംവെള്ളി ശ്രീകൃഷ്ണ ക്ഷേത്രം",
    "description": "Kakkamvelly Sreekrishna Temple is a Hindu temple in Purameri, Kozhikode District, Kerala, dedicated to Lord Sreekrishna. Traditional tantric rituals as per Tantrasamuchayam.",
    "url": "https://deloitte-us-consulting.github.io/kakkamvelly-temple",
    "telephone": "+91-0000000000",
    "email": "kakkamvellytemple@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kakkamvelly",
      "addressLocality": "Purameri",
      "addressRegion": "Kozhikode",
      "postalCode": "673503",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 11.675,
      "longitude": 75.638
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "05:00",
        "closes": "12:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "17:00",
        "closes": "20:30"
      }
    ],
    "image": "https://deloitte-us-consulting.github.io/kakkamvelly-temple/images/temple-entrance-deepam.jpg",
    "hasMap": "https://maps.app.goo.gl/LaTA1pWM8NhjW4gK6",
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Free Entry", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Parking",    "value": true }
    ],
    "event": {
      "@type": "Event",
      "name": "Ashtami Rohini - Janmashtami 2025",
      "startDate": "2025-08-16",
      "location": { "@type": "Place", "name": "Kakkamvelly Sreekrishna Temple" }
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
})();

/* ─────────────────────────────────
   5. SHARE BUTTON (Web Share API)
───────────────────────────────── */
(function initShareBtn() {
  const btns = document.querySelectorAll('.share-btn');
  btns.forEach(btn => {
    if (!navigator.share) { btn.style.display = 'none'; return; }
    btn.addEventListener('click', () => {
      navigator.share({
        title: 'Kakkamvelly Sreekrishna Temple',
        text:  'ഹരേ കൃഷ്ണ 🙏 Visit Kakkamvelly Sreekrishna Temple, Kozhikode, Kerala',
        url:   window.location.href,
      }).catch(() => {});
    });
  });
})();

// Improvement 10: Contact form — full validation + feedback
(function() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  function showError(id, show) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('visible', show);
  }

  function validate() {
    let ok = true;
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const msg = form.querySelector('[name="message"]');

    if (name) {
      const v = name.value.trim().length >= 2;
      showError('name-error', !v);
      if (!v) ok = false;
    }
    if (email) {
      const v = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      showError('email-error', !v);
      if (!v) ok = false;
    }
    if (msg) {
      const v = msg.value.trim().length >= 5;
      showError('message-error', !v);
      if (!v) ok = false;
    }
    return ok;
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!validate()) return;

    const btn = document.getElementById('contact-submit');
    const origHTML = btn ? btn.innerHTML : '';
    if (btn) { btn.innerHTML = '⏳ അയക്കുന്നു...'; btn.disabled = true; }

    const banner = document.getElementById('form-success-banner');

    try {
      const res = await fetch(form.action || 'https://formspree.io/f/kakkamvellytemple',
        { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
      if (res.ok) {
        form.reset();
        // Clear errors
        form.querySelectorAll('.field-error-msg').forEach(el => el.classList.remove('visible'));
        if (banner) { banner.classList.add('visible'); setTimeout(() => banner.classList.remove('visible'), 8000); }
      } else throw new Error();
    } catch {
      alert('ദയവായി ബന്ധപ്പെടുക: kakkamvellytemple@gmail.com');
    }
    if (btn) { btn.innerHTML = origHTML; btn.disabled = false; }
  });

  // Live validation on blur
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('blur', validate);
  });
})();
