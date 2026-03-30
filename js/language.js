/**
 * RUFLO CODER AGENT — Full Bilingual Language System
 * Malayalam ↔ English — every visible text string
 * Architect placement: inside nav drawer on mobile
 */
'use strict';

/* ════════════════════════════════════════════════════
   COMPLETE TRANSLATION MAP
   Every visible string on the page
════════════════════════════════════════════════════ */
const TRANSLATIONS = {
  ml: {
    /* ── NAV ── */
    nav_home:      'മുഖ്യ താൾ',
    nav_about:     'ക്ഷേത്രത്തെ കുറിച്ച്',
    nav_timings:   'സമയക്രമം',
    nav_festivals: 'ഉത്സവങ്ങൾ',
    nav_gallery:   'ഗ്യാലറി',
    nav_location:  'സ്ഥലം',
    nav_donate:    'ദാനം',
    nav_contact:   'ബന്ധപ്പെടുക',

    /* ── HERO ── */
    hero_tagline:  'ഹരേ കൃഷ്ണ',
    hero_title:    'കക്കംവെള്ളി\nശ്രീകൃഷ്ണ ക്ഷേത്രം',
    hero_subtitle: 'Kakkamvelly Sreekrishna Temple',
    hero_location: 'പുറമേരി, കോഴിക്കോട്, കേരളം',
    hero_btn1:     'വഴി കാണിക്കുക',
    hero_btn2:     'ക്ഷേത്ര സമയം',

    /* ── LIVE STATUS ── */
    live_tag:      'ലൈവ് സ്റ്റാറ്റസ്',
    live_title:    'ഇന്നത്തെ ക്ഷേത്ര വിവരം',
    live_darshan:  '🛕 ദർശന സ്റ്റാറ്റസ്',
    live_festival: '🎉 അടുത്ത ഉത്സവം',
    live_weather:  '🌤 കാലാവസ്ഥ · Purameri',
    live_schedule: '⏰ ഇന്നത്തെ പൂജ ഷെഡ്യൂൾ',
    live_panchang: '📅 ഇന്നത്തെ പഞ്ചാംഗം',

    /* ── ABOUT ── */
    about_tag:     'ക്ഷേത്രം',
    about_title:   'ക്ഷേത്രത്തെ കുറിച്ച്',
    about_subtitle:'ഉണ്ണിക്കൃഷ്ണന്റെ പുണ്യ ഭൂമി',

    /* ── TIMINGS ── */
    timings_tag:   'ദർശനം',
    timings_title: 'ക്ഷേത്ര സമയക്രമവും പൂജ ഷെഡ്യൂളും',
    morning_title: 'രാവിലെ (പ്രഭാത പൂജ)',
    evening_title: 'വൈകുന്നേരം (സായഹ്ന പൂജ)',
    open_title:    'ക്ഷേത്ര തുറക്കൽ സമയം',
    morning_label: 'രാവിലെ',
    evening_label: 'വൈകുന്നേരം',

    /* ── FESTIVALS ── */
    festival_tag:   'ഉത്സവം',
    festival_title: 'ഉത്സവങ്ങളും പ്രത്യേക ആഘോഷങ്ങളും',

    /* ── ANNADHANAM ── */
    ann_title: 'മാസം തോറും ഒന്നാം ഞായർ — അന്നദാനം',
    ann_sub:   'Monthly First Sunday · Free Prasadam at Noon',
    kulam_title: 'അമ്പലം കുളം നവീകരണം',
    kulam_sub:   'Temple Pool Renovation — Seeking Your Support',

    /* ── GALLERY ── */
    gallery_tag:   'ഗ്യാലറി',
    gallery_title: 'ക്ഷേത്ര ചിത്രങ്ങൾ',

    /* ── LOCATION ── */
    location_tag:   'സ്ഥലം',
    location_title: 'സ്ഥലവും വഴിക്കുറിപ്പും',
    location_sub:   'എങ്ങനെ എത്തിച്ചേരാം',
    btn_maps:       'Google Maps-ൽ തുറക്കുക',

    /* ── VISITOR INFO ── */
    visitor_tag:   'സന്ദർശക വിവരം',
    visitor_title: 'ക്ഷേത്ര സന്ദർശന ഗൈഡ്',

    /* ── DONATE ── */
    donate_tag:   'ദാനം',
    donate_title: 'ക്ഷേത്ര വഴിപാട് & ദാനം',

    /* ── CONTACT ── */
    contact_tag:   'ബന്ധപ്പെടുക',
    contact_title: 'ഞങ്ങളെ ബന്ധപ്പെടുക',
    contact_sub:   'ക്ഷേത്രവുമായി ബന്ധപ്പെടുക',
    send_btn:      'സന്ദേശം അയക്കുക',

    /* ── FOOTER ── */
    footer_links:  'ദ്രുത ലിങ്കുകൾ',
    footer_hours:  'ക്ഷേത്ര സമയം',
    footer_find:   'ഞങ്ങളെ കണ്ടെത്തുക',
    footer_copy:   'കക്കംവെള്ളി ശ്രീകൃഷ്ണ ക്ഷേത്രം. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.',
    footer_mantra: '🪔 ഹരേ കൃഷ്ണ ഹരേ കൃഷ്ണ കൃഷ്ണ കൃഷ്ണ ഹരേ ഹരേ 🪔',

    /* ── OPEN/CLOSED ── */
    temple_open:   'ദർശനം തുറന്നിരിക്കുന്നു',
    temple_closed: 'ദർശനം അടഞ്ഞിരിക്കുന്നു',
  },

  en: {
    /* ── NAV ── */
    nav_home:      'Home',
    nav_about:     'About Temple',
    nav_timings:   'Timings',
    nav_festivals: 'Festivals',
    nav_gallery:   'Gallery',
    nav_location:  'Location',
    nav_donate:    'Donate',
    nav_contact:   'Contact',

    /* ── HERO ── */
    hero_tagline:  'Hare Krishna',
    hero_title:    'Kakkamvelly\nSreekrishna Temple',
    hero_subtitle: 'കക്കംവെള്ളി ശ്രീകൃഷ്ണ ക്ഷേത്രം',
    hero_location: 'Purameri, Kozhikode, Kerala',
    hero_btn1:     'Get Directions',
    hero_btn2:     'Temple Timings',

    /* ── LIVE STATUS ── */
    live_tag:      'Live Status',
    live_title:    'Today\'s Temple Information',
    live_darshan:  '🛕 Darshan Status',
    live_festival: '🎉 Next Festival',
    live_weather:  '🌤 Weather · Purameri',
    live_schedule: '⏰ Today\'s Pooja Schedule',
    live_panchang: '📅 Today\'s Panchang',

    /* ── ABOUT ── */
    about_tag:     'Temple',
    about_title:   'About the Temple',
    about_subtitle:'Sacred Home of Little Krishna',

    /* ── TIMINGS ── */
    timings_tag:   'Darshan',
    timings_title: 'Temple Timings & Pooja Schedule',
    morning_title: 'Morning (Prabhata Pooja)',
    evening_title: 'Evening (Sayahna Pooja)',
    open_title:    'Temple Opening Hours',
    morning_label: 'Morning',
    evening_label: 'Evening',

    /* ── FESTIVALS ── */
    festival_tag:   'Festivals',
    festival_title: 'Festivals & Special Celebrations',

    /* ── ANNADHANAM ── */
    ann_title: 'First Sunday Every Month — Annadhanam',
    ann_sub:   'Monthly First Sunday · Free Prasadam at Noon for All Devotees',
    kulam_title: 'Ambalam Kulam Naveekaranam',
    kulam_sub:   'Temple Pool Renovation — Seeking Your Support',

    /* ── GALLERY ── */
    gallery_tag:   'Gallery',
    gallery_title: 'Temple Photos',

    /* ── LOCATION ── */
    location_tag:   'Location',
    location_title: 'Location & Directions',
    location_sub:   'How to Reach',
    btn_maps:       'Open in Google Maps',

    /* ── VISITOR INFO ── */
    visitor_tag:   'Visitor Guide',
    visitor_title: 'Temple Visitor Guide',

    /* ── DONATE ── */
    donate_tag:   'Donate',
    donate_title: 'Temple Offerings & Donations',

    /* ── CONTACT ── */
    contact_tag:   'Contact',
    contact_title: 'Contact Us',
    contact_sub:   'Get in Touch with the Temple',
    send_btn:      'Send Message',

    /* ── FOOTER ── */
    footer_links:  'Quick Links',
    footer_hours:  'Temple Hours',
    footer_find:   'Find Us',
    footer_copy:   'Kakkamvelly Sreekrishna Temple. All rights reserved.',
    footer_mantra: '🪔 Hare Krishna Hare Krishna Krishna Krishna Hare Hare 🪔',

    /* ── OPEN/CLOSED ── */
    temple_open:   'Temple Open for Darshan',
    temple_closed: 'Temple Currently Closed',
  }
};

/* ════════════════════════════════════════════════════
   APPLY TRANSLATIONS — map keys to DOM elements
════════════════════════════════════════════════════ */
const DOM_MAP = [
  // Nav links (by href)
  { sel: '.nav-link[href="#home"]',      key: 'nav_home' },
  { sel: '.nav-link[href="#about"]',     key: 'nav_about' },
  { sel: '.nav-link[href="#timings"]',   key: 'nav_timings' },
  { sel: '.nav-link[href="#festivals"]', key: 'nav_festivals' },
  { sel: '.nav-link[href="#gallery"]',   key: 'nav_gallery' },
  { sel: '.nav-link[href="#location"]',  key: 'nav_location' },
  { sel: '.nav-link[href="#donate"]',    key: 'nav_donate' },
  { sel: '.nav-link[href="#contact"]',   key: 'nav_contact' },

  // Hero
  { sel: '.hero-tagline',                key: 'hero_tagline' },
  { sel: '.hero-location',               key: 'hero_location', prefix: '📍 ' },
  { sel: '.hero-subtitle',               key: 'hero_subtitle' },

  // Section tags
  { sel: '#live-section .section-tag',   key: 'live_tag' },
  { sel: '#live-section .section-title', key: 'live_title' },
  { sel: '#live-section .live-card-title:nth-of-type(1)', key: 'live_darshan' },
  { sel: '#about .section-tag',          key: 'about_tag' },
  { sel: '#about .section-title',        key: 'about_title' },
  { sel: '.about-subtitle',              key: 'about_subtitle' },
  { sel: '#timings .section-tag',        key: 'timings_tag' },
  { sel: '#timings .section-title',      key: 'timings_title' },
  { sel: '#festivals .section-tag',      key: 'festival_tag' },
  { sel: '#festivals .section-title',    key: 'festival_title' },
  { sel: '#gallery .section-tag',        key: 'gallery_tag' },
  { sel: '#gallery .section-title',      key: 'gallery_title' },
  { sel: '#location .section-tag',       key: 'location_tag' },
  { sel: '#location .section-title',     key: 'location_title' },
  { sel: '.location-subtitle',           key: 'location_sub' },
  { sel: '#visitor-info .section-tag',   key: 'visitor_tag' },
  { sel: '#visitor-info .section-title', key: 'visitor_title' },
  { sel: '#donate .section-tag',         key: 'donate_tag' },
  { sel: '#donate .section-title',       key: 'donate_title' },
  { sel: '#contact .section-tag',        key: 'contact_tag' },
  { sel: '#contact .section-title',      key: 'contact_title' },
  { sel: '#contact .contact-info h3',    key: 'contact_sub' },

  // Timing section headers
  { sel: '.timing-card:nth-child(1) h3', key: 'morning_title' },
  { sel: '.timing-card:nth-child(2) h3', key: 'evening_title' },
  { sel: '.timing-card-full h3',         key: 'open_title' },
  { sel: '.hours-block:nth-child(1) .hours-label', key: 'morning_label' },
  { sel: '.hours-block:nth-child(3) .hours-label', key: 'evening_label' },

  // Annadhanam
  { sel: '.ann-title',   key: 'ann_title' },
  { sel: '.ann-sub',     key: 'ann_sub' },
  { sel: '.kulam-title', key: 'kulam_title' },
  { sel: '.kulam-sub',   key: 'kulam_sub' },

  // Maps button
  { sel: '.btn-directions', key: 'btn_maps', icon: '<i class="fa-solid fa-diamond-turn-right"></i> ' },

  // Contact submit button
  { sel: '#contact-form .btn-primary', key: 'send_btn', icon: '<i class="fa-solid fa-paper-plane"></i> ' },

  // Footer
  { sel: '.footer-nav h4',   key: 'footer_links' },
  { sel: '.footer-hours h4', key: 'footer_hours' },
  { sel: '.footer-copy',     key: 'footer_copy', prefix: '© 2026 ' },
  { sel: '.footer-tagline',  key: 'footer_mantra' },
];

let currentLang = localStorage.getItem('kvt-lang') || 'ml';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('kvt-lang', lang);
  const T = TRANSLATIONS[lang];
  if (!T) return;

  // Apply DOM map
  DOM_MAP.forEach(({ sel, key, prefix, icon }) => {
    const els = document.querySelectorAll(sel);
    if (!T[key]) return;
    els.forEach(el => {
      // Preserve inner icons (i tags) where needed
      const icons = el.querySelectorAll('i[aria-hidden]');
      if (icon) {
        el.innerHTML = icon + T[key];
      } else if (icons.length && !prefix) {
        // Keep the first icon, replace text
        const iconHTML = icons[0].outerHTML;
        el.innerHTML = iconHTML + ' ' + T[key];
      } else {
        el.textContent = (prefix || '') + T[key];
      }
    });
  });

  // Hero title — has a <br> 
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && T.hero_title) {
    heroTitle.innerHTML = T.hero_title.replace('\n', '<br />');
  }

  // Live card titles — all of them
  const liveTitles = document.querySelectorAll('.live-card-title');
  const liveKeys = ['live_darshan','live_festival','live_weather','live_schedule','live_panchang'];
  liveTitles.forEach((el, i) => {
    if (liveKeys[i] && T[liveKeys[i]]) el.textContent = T[liveKeys[i]];
  });

  // Darshan status widget text
  const dsLabel = document.querySelector('.ds-label');
  if (dsLabel) {
    const isOpen = dsLabel.closest('.ds-open') !== null ||
                   dsLabel.parentElement?.classList.contains('ds-open');
    // Let live-features.js handle text — just translate what it produces
    // We expose the lang so live-features can use it
  }

  // Update <html lang> attribute
  document.documentElement.lang = lang === 'ml' ? 'ml' : 'en';

  // Sync ALL lang buttons (pill + drawer)
  document.querySelectorAll('.nlp-btn, .nav-lang-btn, .lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  // Hero button texts
  const heroBtns = document.querySelectorAll('.hero-actions .btn');
  if (heroBtns[0] && T.hero_btn1) {
    heroBtns[0].innerHTML = `<i class="fa-solid fa-map-location-dot"></i> ${T.hero_btn1}`;
  }
  if (heroBtns[1] && T.hero_btn2) {
    heroBtns[1].innerHTML = `<i class="fa-regular fa-clock"></i> ${T.hero_btn2}`;
  }

  // Dispatch event so other scripts can react
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

/* ════════════════════════════════════════════════════
   WIRE UP BUTTONS — drawer + desktop
════════════════════════════════════════════════════ */
function initLangButtons() {
  // New nav pill buttons (.nlp-btn) — replaces hamburger
  document.querySelectorAll('.nlp-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      applyLang(btn.dataset.lang);
    });
  });

  // Old drawer buttons (legacy — keep for safety)
  document.querySelectorAll('.nav-lang-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      applyLang(btn.dataset.lang);
    });
  });

  // Apply saved lang on load
  applyLang(currentLang);
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLangButtons);
} else {
  initLangButtons();
}

// Also re-apply after live widgets render (they overwrite some text)
setTimeout(() => applyLang(currentLang), 1200);
setTimeout(() => applyLang(currentLang), 3000);
