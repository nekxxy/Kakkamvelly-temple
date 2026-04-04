/* ════════════════════════════════════════════════════
   BILINGUAL LANGUAGE SYSTEM — Malayalam / English
   Kakkamvelly Sreekrishna Temple
════════════════════════════════════════════════════ */
(function() {
'use strict';

var TRANSLATIONS = {
  ml: {
    nav_home:      'മുഖ്യ',
    nav_about:     'ക്ഷേത്രം',
    nav_timings:   'സമയം',
    nav_gallery:   'ഗ്യാലറി',
    nav_location:  'സ്ഥലം',
    nav_kulam:     'കുളം',
    hero_tagline:  'ഹരേ കൃഷ്ണ',
    hero_title:    'കക്കംവെള്ളി\nശ്രീകൃഷ്ണ ക്ഷേത്രം',
    hero_subtitle: 'Kakkamvelly Sreekrishna Temple',
    hero_btn1:     'വഴി കാണിക്കുക',
    hero_btn2:     'ക്ഷേത്ര സമയം',
  },
  en: {
    nav_home:      'Home',
    nav_about:     'Temple',
    nav_timings:   'Timings',
    nav_gallery:   'Gallery',
    nav_location:  'Location',
    nav_kulam:     'Kulam',
    hero_tagline:  'HARE KRISHNA',
    hero_title:    'Kakkamvelly\nSreekrishna Temple',
    hero_subtitle: 'കക്കംവെള്ളി ശ്രീകൃഷ്ണ ക്ഷേത്രം',
    hero_btn1:     'Get Directions',
    hero_btn2:     'Temple Timings',
  }
};

var DOM_MAP = [
  { sel: '.nav-link[href="#home"]',     key: 'nav_home' },
  { sel: '.nav-link[href="#about"]',    key: 'nav_about' },
  { sel: '.nav-link[href="#timings"]',  key: 'nav_timings' },
  { sel: '.nav-link[href="#gallery"]',  key: 'nav_gallery' },
  { sel: '.nav-link[href="#location"]', key: 'nav_location' },
  { sel: '.nav-link[href="#kulam"]',    key: 'nav_kulam' },
];

var currentLang = localStorage.getItem('kvt-lang') || 'ml';

function applyLang(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem('kvt-lang', lang);
  var T = TRANSLATIONS[lang];

  // Apply nav links
  DOM_MAP.forEach(function(item) {
    var els = document.querySelectorAll(item.sel);
    if (!T[item.key]) return;
    els.forEach(function(el) { el.textContent = T[item.key]; });
  });

  // Hero title
  var heroTitle = document.querySelector('.hero-title');
  if (heroTitle && T.hero_title) {
    heroTitle.innerHTML = T.hero_title.replace('\n', '<br/>');
  }
  // Hero tagline
  var heroTagline = document.querySelector('.hero-tagline');
  if (heroTagline && T.hero_tagline) heroTagline.textContent = T.hero_tagline;

  // Hero buttons
  var heroBtns = document.querySelectorAll('.hero-actions .btn');
  if (heroBtns[0] && T.hero_btn1) {
    heroBtns[0].innerHTML = '<i class="fa-solid fa-map-location-dot" aria-hidden="true"></i> ' + T.hero_btn1;
  }
  if (heroBtns[1] && T.hero_btn2) {
    heroBtns[1].innerHTML = '<i class="fa-regular fa-clock" aria-hidden="true"></i> ' + T.hero_btn2;
  }

  // Sync ALL language buttons
  document.querySelectorAll('.nlp-btn, .nav-lang-btn, .lang-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  // html lang attribute
  document.documentElement.lang = lang === 'ml' ? 'ml' : 'en';
}

function initLangButtons() {
  document.querySelectorAll('.nlp-btn, .nav-lang-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (btn.dataset.lang === 'en') {
        document.body.classList.add('lang-en');
      } else {
        document.body.classList.remove('lang-en');
      }
      applyLang(btn.dataset.lang);
    });
  });
  applyLang(currentLang);
}

// Init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLangButtons);
} else {
  initLangButtons();
}

// Re-apply after dynamic content loads
setTimeout(function() { applyLang(currentLang); }, 800);
setTimeout(function() { applyLang(currentLang); }, 2500);

})();
