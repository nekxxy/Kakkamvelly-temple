/**
 * Mobile Futuristic Interactions
 * Bottom nav, ripple effects, scroll hints, toasts
 */
'use strict';

const isMobile = () => window.innerWidth <= 768;

/* ─────────────────────────────────────────────
   1. BUILD BOTTOM NAV BAR
───────────────────────────────────────────── */
(function buildBottomNav() {
  if (!isMobile()) return;

  const nav = document.createElement('nav');
  nav.id = 'mobile-bottom-nav';
  nav.setAttribute('aria-label', 'Mobile quick navigation');

  const items = [
    { icon: '🏠', label: 'മുഖ്യ',   href: '#home',     labelId: 'mob-lbl-home'     },
    { icon: '🛕', label: 'ക്ഷേത്രം', href: '#about',    labelId: 'mob-lbl-temple'   },
    { icon: null, label: 'OM',       href: '#home', center: true },
    { icon: '⏰', label: 'സമയം',    href: '#timings',  labelId: 'mob-lbl-timings'  },
    { icon: '📍', label: 'സ്ഥലം',   href: '#location', labelId: 'mob-lbl-location' },
  ];

  items.forEach(item => {
    const btn = document.createElement('a');
    btn.className = 'mob-nav-btn' + (item.center ? ' mob-nav-center' : '');
    btn.href = item.href;
    btn.setAttribute('aria-label', item.label);

    const iconEl = document.createElement('span');
    iconEl.className = 'mob-nav-icon';
    iconEl.textContent = item.center ? 'ॐ' : item.icon;
    btn.appendChild(iconEl);

    if (!item.center) {
      const labelEl = document.createElement('span');
      labelEl.className = 'mob-nav-label';
      if (item.labelId) labelEl.id = item.labelId;
      labelEl.textContent = item.label;
      btn.appendChild(labelEl);
    }

    btn.addEventListener('click', function(e) {
      document.querySelectorAll('.mob-nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });

    nav.appendChild(btn);
  });

  document.body.appendChild(nav);

  // Highlight active section in bottom nav
  const sectionMap = {
    'home':     0, 'about': 1, 'baby-krishna': 1,
    'timings':  3, 'festivals': 3,
    'gallery':  3, 'location': 4, 'contact': 4
  };
  const btns = nav.querySelectorAll('.mob-nav-btn:not(.mob-nav-center)');

  function updateActive() {
    let current = 'home';
    document.querySelectorAll('section[id]').forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    btns.forEach(b => b.classList.remove('active'));
    const idx = sectionMap[current];
    if (idx !== undefined && btns[idx]) btns[idx].classList.add('active');
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

/* ─────────────────────────────────────────────
   2. NAV OVERLAY (click outside to close)
───────────────────────────────────────────── */
(function initNavOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  overlay.addEventListener('click', function() {
    const menu   = document.getElementById('nav-menu');
    const toggle = document.querySelector('.nav-toggle');
    if (menu && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

/* ─────────────────────────────────────────────
   3. TAP RIPPLE EFFECT
───────────────────────────────────────────── */
(function initTapRipple() {
  if (!isMobile()) return;

  const rippleTargets = [
    '.festival-card', '.timing-card', '.bk-card',
    '.transport-item', '.btn', '.mob-nav-btn'
  ];

  rippleTargets.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.style.position = 'relative';
      el.style.overflow = 'hidden';

      el.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        const rect  = el.getBoundingClientRect();
        const size  = Math.max(rect.width, rect.height);
        const x     = touch.clientX - rect.left - size / 2;
        const y     = touch.clientY - rect.top  - size / 2;

        const ripple = document.createElement('span');
        ripple.className = 'tap-ripple';
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
        el.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      }, { passive: true });
    });
  });
})();

/* ─────────────────────────────────────────────
   4. FESTIVAL CARDS SCROLL HINT
───────────────────────────────────────────── */
(function initFestivalHint() {
  if (!isMobile()) return;
  const grid = document.querySelector('.festivals-grid');
  if (!grid) return;

  const hint = document.createElement('p');
  hint.className = 'festival-scroll-hint';
  hint.innerHTML = '← swipe to explore ✦ →';
  grid.insertAdjacentElement('afterend', hint);

  // Hide hint once user scrolls the carousel
  grid.addEventListener('scroll', () => hint.remove(), { once: true, passive: true });
})();

/* ─────────────────────────────────────────────
   5. BABY KRISHNA CAROUSEL SCROLL HINT
───────────────────────────────────────────── */
(function initBKHint() {
  if (!isMobile()) return;
  const grid = document.querySelector('.bk-grid');
  if (!grid) return;

  const hint = document.createElement('p');
  hint.className = 'festival-scroll-hint';
  hint.innerHTML = '← ദൈവ ലീലകൾ swipe ചെയ്ത് കാണൂ →';
  hint.style.cssText = 'text-align:center;font-size:0.72rem;color:rgba(255,215,0,0.6);margin-top:0.5rem;font-family:"Noto Serif Malayalam",serif;';
  grid.insertAdjacentElement('afterend', hint);

  grid.addEventListener('scroll', () => hint.remove(), { once: true, passive: true });
})();

/* ─────────────────────────────────────────────
   6. TOAST NOTIFICATION
───────────────────────────────────────────── */
const Toast = (function() {
  const el = document.createElement('div');
  el.id = 'mob-toast';
  document.body.appendChild(el);
  let timer;

  return function show(msg, duration) {
    duration = duration || 2200;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => el.classList.remove('show'), duration);
  };
})();

/* ─────────────────────────────────────────────
   7. FESTIVAL CARD TOAST ON TAP
───────────────────────────────────────────── */
(function initFestivalToast() {
  if (!isMobile()) return;
  const toastMap = {
    'അഷ്ടമി രോഹിണി': '🎉 Janmashtami – ചിങ്ങം',
    'വിഷു':           '🪔 Vishu – മേടം',
    'ഓണം':            '🌺 Onam – ചിങ്ങം',
    'തിരുവാതിര':      '⭐ Thiruvatira – ധനു',
    'ഏകാദശി':         '🪔 Ekadashi – Monthly',
    'ഗുരുവായൂർ':     '🌙 Guruvayur Ekadashi',
  };

  document.querySelectorAll('.festival-card h3').forEach(h => {
    h.closest('.festival-card').addEventListener('touchend', function() {
      const key = Object.keys(toastMap).find(k => h.textContent.includes(k));
      if (key) Toast(toastMap[key]);
    }, { passive: true });
  });
})();

/* ─────────────────────────────────────────────
   8. KRISHNA CARD TOAST ON TAP
───────────────────────────────────────────── */
(function initKrishnaToast() {
  if (!isMobile()) return;
  const msgs = [
    '🧈 വെണ്ണ കൃഷ്ണൻ – The Butter Thief',
    '🦚 മയൂര കൃഷ്ണൻ – Krishna & Peacock',
    '👶 ഉണ്ണി കൃഷ്ണൻ – Crawling Baby Krishna',
    '🐍 കാളിയ മർദ്ദനം – Kaliya Mardana',
    '🪔 പദ്മ കൃഷ്ണൻ – Lotus Krishna',
    '🏔️ ഗോവർദ്ധന ഗിരിധർ – Giridhar'
  ];
  document.querySelectorAll('.bk-card').forEach((card, i) => {
    card.addEventListener('touchend', function() {
      Toast(msgs[i] || '🕉️ ഹരേ കൃഷ്ണ');
    }, { passive: true });
  });
})();

/* ─────────────────────────────────────────────
   9. SMOOTH SCROLL FIX (offset for sticky nav)
───────────────────────────────────────────── */
(function fixSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const id  = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = isMobile() ? 70 : 80;
      window.scrollTo({
        top:      target.offsetTop - offset,
        behavior: 'smooth'
      });
    });
  });
})();

/* ─────────────────────────────────────────────
   10. FORM INPUT STYLE — add neon active class
───────────────────────────────────────────── */
(function initFormFocus() {
  if (!isMobile()) return;
  const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
  inputs.forEach(inp => {
    inp.addEventListener('focus', () => inp.parentElement.classList.add('field-focused'));
    inp.addEventListener('blur',  () => inp.parentElement.classList.remove('field-focused'));
  });
})();

/* ─────────────────────────────────────────────
   11. PULL-DOWN SHIMMER on page load (mobile)
───────────────────────────────────────────── */
(function initLoadShimmer() {
  if (!isMobile()) return;
  const shimmer = document.createElement('div');
  shimmer.style.cssText = `
    position:fixed;top:0;left:0;right:0;height:3px;z-index:9999;
    background:linear-gradient(90deg,transparent,#ffd700,#00e5ff,#ffd700,transparent);
    background-size:200% 100%;
    animation:gold-shimmer 1.2s linear forwards;
    pointer-events:none;
  `;
  document.body.appendChild(shimmer);
  setTimeout(() => shimmer.remove(), 1400);
})();

/* ─────────────────────────────────────────────
   12. WINDOW RESIZE: rebuild bottom nav
───────────────────────────────────────────── */
window.addEventListener('resize', function() {
  const existing = document.getElementById('mobile-bottom-nav');
  if (isMobile() && !existing) {
    // re-trigger on resize to mobile
    location.reload();
  }
  if (!isMobile() && existing) {
    existing.remove();
  }
});
