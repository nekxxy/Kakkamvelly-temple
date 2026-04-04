/* ══════════════════════════════════════════════════════
   COMPLETE BILINGUAL SYSTEM — Malayalam ↔ English
   When English is active: ZERO Malayalam words on screen
   Kakkamvelly Sreekrishna Temple
══════════════════════════════════════════════════════ */
(function() {
'use strict';

var T = {
  ml: {
    /* ── nav ── */
    nav_home:     'മുഖ്യ', nav_about: 'ക്ഷേത്രം', nav_timings: 'സമയം',
    nav_gallery:  'ഗ്യാലറി', nav_location: 'സ്ഥലം', nav_kulam: 'കുളം',
    /* ── hero ── */
    hero_tagline:  'ഹരേ കൃഷ്ണ',
    hero_title:    'കക്കംവെള്ളി\nശ്രീകൃഷ്ണ ക്ഷേത്രം',
    hero_subtitle: 'Kakkamvelly Sreekrishna Temple',
    hero_location: '📍 പുറമേരി, കോഴിക്കോട്, കേരളം',
    hero_btn1:     'വഴി കാണിക്കുക', hero_btn2: 'ക്ഷേത്ര സമയം',
    hero_share:    'ക്ഷേത്ര വിവരം പങ്കിടുക',
    /* ── darshan bar ── */
    dsw_call: '📞 വിളിക്കുക', dsw_dir: '🗺 വഴി', dsw_wa: '💬 WhatsApp',
    /* ── live section ── */
    live_title: 'ഇന്നത്തെ ക്ഷേത്ര വിവരം',
    /* ── vishu banner ── */
    vishu_text: 'വിഷു 2026 (ഏപ്രിൽ 15) — ക്ഷേത്രം: 5:00 AM – 7:30 PM · Special Darshan',
    /* ── timings ── */
    timings_tag:         'ദർശനം',
    timings_title:       'ക്ഷേത്ര സമയക്രമവും പൂജ ഷെഡ്യൂളും',
    timings_morning_hdr: 'രാവിലെ (പ്രഭാത പൂജ)',
    timings_evening_hdr: 'വൈകുന്നേരം (സായഹ്ന പൂജ)',
    timings_col_pooja:   'പൂജ', timings_col_time: 'സമയം',
    timings_open_title:  'ക്ഷേത്ര തുറക്കൽ സമയം',
    timings_morning:     'രാവിലെ', timings_evening: 'വൈകുന്നേരം',
    timings_note:        'ഉത്സവ ദിനങ്ങളിൽ സമയക്രമം മാറ്റം വരാം.',
    timings_vishu:       'വിഷു 2026 (ഏപ്രിൽ 15): 5:00 AM – 7:30 PM (Special).',
    timings_office:      'ക്ഷേത്ര ഓഫീസ്:',
    timings_tirumeni:    '· തിരുമേനി:',
    /* ── annadhanam ── */
    ann_title: 'മാസം തോറും ഒന്നാം ഞായർ — അന്നദാനം',
    ann_sub:   'Monthly First Sunday · Free Prasadam at Noon for All Devotees',
    ann_desc:  'ഒരു പ്രാചീന പാരമ്പര്യമനുസരിച്ച്, ഓരോ മാസവും ആദ്യ ഞായറാഴ്ച ഉച്ചയ്ക്ക് ക്ഷേത്ര പരിസരത്ത് അന്നദാനം നടത്തുന്നു. എല്ലാ ഭക്തർക്കും സ്വാഗതം.',
    ann_sched: '📅 ഓരോ മാസവും ആദ്യ ഞായറാഴ്ച · ഉച്ചക്ക് 12:00',
    ann_every: '📅 ഓരോ മാസവും ആദ്യ ഞായറാഴ്ച ഉച്ചക്ക് 12:00',
    /* ── kulam ── */
    kulam_tag:    '💧 നവീകരണ പദ്ധതി', kulam_title: 'അമ്പലം കുളം നവീകരണം',
    kulam_cost:   'ആകെ ചെലവ് (Estimated)', kulam_status: '📋 ആസൂത്രണ ഘട്ടം',
    kulam_days_lbl: 'നവീകരണം ആരംഭിച്ചിട്ട്', kulam_open: 'ഭക്ത സഹകരണം',
    kulam_open_val: 'തുറന്നിരിക്കുന്നു',
    kulam_desc:   'ക്ഷേത്ര കുളത്തിൻ്റെ ചരിത്രപരമായ നവീകരണ പ്രവൃത്തി ആരംഭിച്ചിരിക്കുന്നു. വർഷങ്ങളായി ഉപേക്ഷിക്കപ്പെട്ട കുളം ഇപ്പോൾ ആയിരക്കണക്കിന് ഭക്തരുടെ കൂട്ടായ്മ ശ്രമഫലമായി പുനർജനിക്കുകയാണ്.',
    kulam_cta:    '🙏 ഈ ദൈവകാര്യത്തിൽ പങ്കാളിയാകൂ — ₹47 ലക്ഷം ആവശ്യമുണ്ട്',
    kulam_call:   'വിളിക്കൂ', kulam_donate: 'ദാനം',
    kulam_before: 'മുൻപ്', kulam_before_cap: 'കുളം — പഴയ അവസ്ഥ',
    kulam_work:   'പ്രവൃത്തി', kulam_exc_cap: 'കുഴിക്കൽ ഘട്ടം',
    kulam_team:   'കൂട്ടായ്മ', kulam_team_cap: 'ഭക്തർ ഒന്നിച്ച്',
    kulam_monsoon:'മഴക്കാലം', kulam_monsoon_cap: 'പഴയകാല മഴക്കാല ദൃശ്യം',
    kulam_renovation_lbl: 'Renovation starts in',
    kulam_upi_lbl: 'Donate via UPI / Bank Transfer',
    kulam_upi_contact: 'Contact Secretary for UPI ID & account details',
    kulam_sec_name: 'Nanu. T — Secretary',
    kulam_wa_label: 'WhatsApp',
    /* ── about ── */
    about_tag:     'ക്ഷേത്രം', about_title: 'ക്ഷേത്രത്തെ കുറിച്ച്',
    about_subtitle:'ഉണ്ണിക്കൃഷ്ണന്റെ പുണ്യ ഭൂമി',
    about_badge:   '🪔 കക്കംവെള്ളി ശ്രീകൃഷ്ണ ക്ഷേത്രം',
    about_heading: 'ചരിത്രത്തിൽ നിന്ന് പുനർജനിച്ച ഭക്തിയുടെ ഭവനം',
    /* ── gallery ── */
    gallery_tag:   'ഗ്യാലറി', gallery_title: 'ക്ഷേത്ര ചിത്രങ്ങൾ',
    gallery_maps:  'Google Maps-ൽ എല്ലാ ചിത്രങ്ങളും കാണുക',
    gallery_divider:'🪔 ദീപ ജ്യോതി നമോഽസ്തു തേ 🪔',
    /* ── location ── */
    location_tag:  'സ്ഥലം', location_title: 'സ്ഥലവും വഴിക്കുറിപ്പും',
    location_sub:  'എങ്ങനെ എത്തിച്ചേരാം',
    location_addr_lbl: 'വിലാസം',
    location_addr1:'കക്കംവെള്ളി ശ്രീകൃഷ്ണ ക്ഷേത്രം,',
    location_addr2:'പുറമേരി, കോഴിക്കോട്, കേരളം – 673503',
    location_rail: 'അടുത്ത റെയിൽവേ സ്റ്റേഷൻ',
    location_bus:  'അടുത്ത ബസ് സ്റ്റാൻഡ്',
    location_stop: 'ഏറ്റവും അടുത്ത ബസ് സ്റ്റോപ്പ്',
    location_maps_btn: 'Google Maps-ൽ തുറക്കുക',
    /* ── footer ── */
    footer_name:   'കക്കംവെള്ളി ശ്രീകൃഷ്ണ ക്ഷേത്രം',
    footer_loc:    '📍 പുറമേരി, കോഴിക്കോട്, Kerala 673503',
    footer_hours:  '🕐 ദർശന സമയം',
    footer_daily:  '7 ദിവസവും',
    footer_tagline:'🪔 ഹരേ കൃഷ്ണ',
    footer_copy:   'കക്കംവെള്ളി ശ്രീകൃഷ്ണ ക്ഷേത്രം · All rights reserved',
    /* ── mobile nav ── */
    mob_home: 'മുഖ്യ', mob_temple: 'ക്ഷേത്രം',
    mob_timings: 'സമയം', mob_location: 'സ്ഥലം',
  },
  en: {
    nav_home:     'Home', nav_about: 'Temple', nav_timings: 'Timings',
    nav_gallery:  'Gallery', nav_location: 'Location', nav_kulam: 'Kulam',
    hero_tagline:  'HARE KRISHNA',
    hero_title:    'Kakkamvelly\nSreekrishna Temple',
    hero_subtitle: 'കക്കംവെള്ളി ശ്രീകൃഷ്ണ ക്ഷേത്രം',
    hero_location: '📍 Purameri, Kozhikode, Kerala',
    hero_btn1:     'Get Directions', hero_btn2: 'Temple Timings',
    hero_share:    'Share Temple Info',
    dsw_call: '📞 Call', dsw_dir: '🗺 Route', dsw_wa: '💬 WhatsApp',
    live_title: 'Live Temple Status',
    vishu_text: 'Vishu 2026 (April 15) — Temple: 5:00 AM – 7:30 PM · Special Darshan',
    timings_tag:         'Darshan',
    timings_title:       'Temple Timings & Pooja Schedule',
    timings_morning_hdr: 'Morning (Prabhatha Pooja)',
    timings_evening_hdr: 'Evening (Sayahna Pooja)',
    timings_col_pooja:   'Pooja', timings_col_time: 'Time',
    timings_open_title:  'Temple Opening Hours',
    timings_morning:     'Morning', timings_evening: 'Evening',
    timings_note:        'Timings may vary on festival days.',
    timings_vishu:       'Vishu 2026 (April 15): 5:00 AM – 7:30 PM (Special).',
    timings_office:      'Temple Office:',
    timings_tirumeni:    '· Thirumeni:',
    ann_title: 'Monthly First Sunday — Annadhanam',
    ann_sub:   'Monthly First Sunday · Free Prasadam at Noon for All Devotees',
    ann_desc:  'Following an ancient tradition, free prasadam (sacred food) is offered every first Sunday of the month at noon in the temple premises. All devotees are welcome.',
    ann_sched: '📅 Every First Sunday of the Month · Noon (12:00 PM)',
    ann_every: '📅 Every First Sunday of the Month · Noon 12:00',
    kulam_tag:    '💧 Renovation Project', kulam_title: 'Temple Pool Renovation',
    kulam_cost:   'Total Cost (Estimated)', kulam_status: '📋 Planning Phase',
    kulam_days_lbl: 'Renovation started', kulam_open: 'Devotee Support',
    kulam_open_val: 'Open',
    kulam_desc:   'The historic renovation of the temple pond has begun. This pond, abandoned for years, is now being restored through the collective efforts of thousands of devotees.',
    kulam_cta:    '🙏 Be a part of this sacred cause — ₹47 Lakhs needed',
    kulam_call:   'Call', kulam_donate: 'Donate',
    kulam_before: 'Before', kulam_before_cap: 'Pond — Original State',
    kulam_work:   'Work', kulam_exc_cap: 'Excavation Phase',
    kulam_team:   'Volunteers', kulam_team_cap: 'Devotees Together',
    kulam_monsoon:'Monsoon', kulam_monsoon_cap: 'Historic Monsoon Photo',
    kulam_renovation_lbl: 'Renovation starts in',
    kulam_upi_lbl: 'Donate via UPI / Bank Transfer',
    kulam_upi_contact: 'Contact Secretary for UPI ID & account details',
    kulam_sec_name: 'Nanu. T — Secretary',
    kulam_wa_label: 'WhatsApp',
    about_tag:     'Temple', about_title: 'About the Temple',
    about_subtitle:'Sacred Home of Baby Krishna (Little Krishna)',
    about_badge:   '🪔 Kakkamvelly Sreekrishna Temple',
    about_heading: 'A Home of Devotion — Reborn from History',
    gallery_tag:   'Gallery', gallery_title: 'Temple Gallery',
    gallery_maps:  'View all photos on Google Maps',
    gallery_divider:'🪔 Deepa Jyothi Namo Asthu The 🪔',
    location_tag:  'Location', location_title: 'Location & Directions',
    location_sub:  'How to Reach',
    location_addr_lbl: 'Address',
    location_addr1:'Kakkamvelly Sreekrishna Temple,',
    location_addr2:'Purameri, Kozhikode, Kerala – 673503',
    location_rail: 'Nearest Railway Station',
    location_bus:  'Nearest Bus Stand',
    location_stop: 'Nearest Bus Stop',
    location_maps_btn: 'Open in Google Maps',
    footer_name:   'Kakkamvelly Sreekrishna Temple',
    footer_loc:    '📍 Purameri, Kozhikode, Kerala 673503',
    footer_hours:  '🕐 Darshan Hours',
    footer_daily:  'Daily',
    footer_tagline:'🪔 Hare Krishna',
    footer_copy:   'Kakkamvelly Sreekrishna Temple · All rights reserved',
    mob_home: 'Home', mob_temple: 'Temple',
    mob_timings: 'Timings', mob_location: 'Location',
  }
};

/* ══ Selector map — every element that needs text swap ══ */
var NAV = [
  { sel:'.nav-link[href="#home"]',     k:'nav_home' },
  { sel:'.nav-link[href="#about"]',    k:'nav_about' },
  { sel:'.nav-link[href="#timings"]',  k:'nav_timings' },
  { sel:'.nav-link[href="#gallery"]',  k:'nav_gallery' },
  { sel:'.nav-link[href="#location"]', k:'nav_location' },
  { sel:'.nav-link[href="#kulam"]',    k:'nav_kulam' },
];

var SELECTORS = [
  /* timings section */
  { id:'timings-morning-hdr',  k:'timings_morning_hdr' },
  { id:'timings-evening-hdr',  k:'timings_evening_hdr' },
  { id:'timings-open-title',   k:'timings_open_title' },
  { id:'timings-col-pooja-1',  k:'timings_col_pooja' },
  { id:'timings-col-time-1',   k:'timings_col_time' },
  { id:'timings-col-pooja-2',  k:'timings_col_pooja' },
  { id:'timings-col-time-2',   k:'timings_col_time' },
  { id:'timings-morning-lbl',  k:'timings_morning' },
  { id:'timings-evening-lbl',  k:'timings_evening' },
  { id:'timings-note',         k:'timings_note' },
  { id:'timings-vishu',        k:'timings_vishu' },
  { id:'timings-office',       k:'timings_office' },
  { id:'timings-tirumeni',     k:'timings_tirumeni' },
  /* annadhanam */
  { id:'ann-title',    k:'ann_title' },
  { id:'ann-desc',     k:'ann_desc' },
  { id:'ann-sched',    k:'ann_sched' },
  { id:'ann-every',    k:'ann_every' },
  /* kulam */
  { id:'kulam-cost-lbl',    k:'kulam_cost' },
  { id:'kulam-status-val',  k:'kulam_status' },
  { id:'kulam-days-lbl',    k:'kulam_days_lbl' },
  { id:'kulam-open-lbl',    k:'kulam_open' },
  { id:'kulam-open-val',    k:'kulam_open_val' },
  { id:'kulam-desc',        k:'kulam_desc' },
  { id:'kulam-cta-text',    k:'kulam_cta' },
  { id:'kulam-call-text',   k:'kulam_call' },
  { id:'kulam-donate-text', k:'kulam_donate' },
  { id:'kulam-badge-before',k:'kulam_before' },
  { id:'kulam-cap-before',  k:'kulam_before_cap' },
  { id:'kulam-badge-work',  k:'kulam_work' },
  { id:'kulam-cap-exc',     k:'kulam_exc_cap' },
  { id:'kulam-badge-team',  k:'kulam_team' },
  { id:'kulam-cap-team',    k:'kulam_team_cap' },
  { id:'kulam-badge-monsoon',k:'kulam_monsoon' },
  { id:'kulam-cap-monsoon', k:'kulam_monsoon_cap' },
  { id:'kulam-renovation-lbl',k:'kulam_renovation_lbl' },
  /* about */
  { id:'about-badge',    k:'about_badge' },
  { id:'about-heading',  k:'about_heading' },
  /* location */
  { id:'location-addr-lbl', k:'location_addr_lbl' },
  { id:'location-addr1',    k:'location_addr1' },
  { id:'location-addr2',    k:'location_addr2' },
  { id:'location-rail-hdr', k:'location_rail' },
  { id:'location-bus-hdr',  k:'location_bus' },
  { id:'location-stop-hdr', k:'location_stop' },
  { id:'location-maps-btn', k:'location_maps_btn' },
  { id:'location-maps-btn2',k:'location_maps_btn' },
  /* footer */
  { id:'footer-name-ml',  k:'footer_name' },
  { id:'footer-loc-text', k:'footer_loc' },
  /* mobile nav */
  { id:'mob-lbl-home',     k:'mob_home' },
  { id:'mob-lbl-temple',   k:'mob_temple' },
  { id:'mob-lbl-timings',  k:'mob_timings' },
  { id:'mob-lbl-location', k:'mob_location' },
];

var lang = localStorage.getItem('kvt-lang') || 'ml';

function applyLang(l) {
  lang = l;
  localStorage.setItem('kvt-lang', l);
  var Tl = T[l] || T.ml;

  /* 1. Nav links */
  NAV.forEach(function(item) {
    document.querySelectorAll(item.sel).forEach(function(el) {
      el.textContent = Tl[item.k];
    });
  });

  /* 2. All data-ml/data-en elements */
  document.querySelectorAll('[data-ml][data-en]').forEach(function(el) {
    el.textContent = el.getAttribute('data-' + l);
  });

  /* 3. ID-mapped elements */
  SELECTORS.forEach(function(item) {
    var el = document.getElementById(item.id);
    if (el && Tl[item.k]) el.textContent = Tl[item.k];
  });

  /* 4. Hero */
  var heroTitle = document.querySelector('.hero-title');
  if (heroTitle) heroTitle.innerHTML = Tl.hero_title.replace('\n','<br/>');
  setText('.hero-tagline',   Tl.hero_tagline);
  setText('.hero-subtitle',  Tl.hero_subtitle);
  setText('#hero-location',  Tl.hero_location);
  setText('#hero-share-text',Tl.hero_share);

  /* 5. Hero buttons */
  var btns = document.querySelectorAll('.hero-actions .btn');
  if (btns[0]) btns[0].innerHTML = '<i class="fa-solid fa-map-location-dot" aria-hidden="true"></i> ' + Tl.hero_btn1;
  if (btns[1]) btns[1].innerHTML = '<i class="fa-regular fa-clock" aria-hidden="true"></i> ' + Tl.hero_btn2;

  /* 6. DSW action buttons */
  setHTML('#dsw-call-btn', '<i class="fa-solid fa-phone" aria-hidden="true"></i> ' + Tl.dsw_call);
  setHTML('#dsw-dir-btn',  '<i class="fa-solid fa-diamond-turn-right" aria-hidden="true"></i> ' + Tl.dsw_dir);
  setHTML('#dsw-wa-btn',   '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> ' + Tl.dsw_wa);

  /* 7. Vishu banner */
  setText('#vishu-banner-text', Tl.vishu_text);

  /* 8. Live section title */
  setText('#live-heading', Tl.live_title);

  /* 9. Footer links */
  document.querySelectorAll('.footer-links-row a[href]').forEach(function(a) {
    var href = a.getAttribute('href');
    var map = {'#home':'nav_home','#about':'nav_about','#timings':'nav_timings',
               '#gallery':'nav_gallery','#location':'nav_location','#kulam':'nav_kulam'};
    if (map[href]) a.textContent = Tl[map[href]];
  });

  /* 10. Footer copyright */
  var copy = document.querySelector('.footer-copy');
  if (copy) {
    var yr = document.getElementById('footer-year');
    var yrTxt = yr ? yr.textContent : new Date().getFullYear();
    copy.innerHTML = '&copy; <span id="footer-year">' + yrTxt + '</span> ' + Tl.footer_copy;
  }

  /* 11. Brand name */
  setText('#brand-ml', l === 'en' ? 'Kakkamvelly Sreekrishna Temple' : 'കക്കംവെള്ളി ശ്രീകൃഷ്ണ ക്ഷേത്രം');

  /* 12. Sync button states */
  document.querySelectorAll('.nlp-btn, .nav-lang-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.lang === l);
  });

  /* 13. Body class */
  document.body.classList.toggle('lang-en', l === 'en');
  document.documentElement.lang = l === 'ml' ? 'ml' : 'en';

  /* 14. About section subtitle */
  setText('.about-subtitle', Tl.about_subtitle);

  /* 15. Ann sub title */
  var annSub = document.querySelector('.ann-sub');
  if (annSub) annSub.textContent = Tl.ann_sub;
}

function setText(sel, val) {
  if (!val) return;
  var el = typeof sel === 'string' ? document.querySelector(sel) : sel;
  if (el) el.textContent = val;
}
function setHTML(sel, val) {
  var el = document.querySelector(sel);
  if (el) el.innerHTML = val;
}

function init() {
  document.querySelectorAll('.nlp-btn, .nav-lang-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      applyLang(btn.dataset.lang);
    });
  });
  applyLang(lang);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
/* Re-apply after live widgets render */
setTimeout(function(){ applyLang(lang); }, 700);
setTimeout(function(){ applyLang(lang); }, 2200);

})();
