/**
 * Kakkamvelly Sreekrishna Temple – Main JavaScript
 * Handles navigation, Google Maps embed, form validation, and UI interactions.
 */

'use strict';

/* ─────────────────────────────────────────────
   1. STICKY NAVIGATION & ACTIVE LINK HIGHLIGHT
───────────────────────────────────────────── */
(function initNavigation() {
  const header  = document.getElementById('site-header');
  const toggle  = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = navMenu ? navMenu.querySelectorAll('.nav-link') : [];
  const sections = document.querySelectorAll('section[id]');

  // Sticky header on scroll
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back-to-top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.removeAttribute('hidden');
      } else {
        backToTop.setAttribute('hidden', '');
      }
    }

    // Highlight active nav link
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  if (toggle && navMenu) {
    toggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Keyboard: close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
        document.body.style.overflow = '';
      }
    });
  }
})();

/* ─────────────────────────────────────────────
   2. BACK TO TOP BUTTON
───────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ─────────────────────────────────────────────
   3. GOOGLE MAPS EMBED – graceful error handling
───────────────────────────────────────────── */
(function initMap() {
  const iframe  = document.getElementById('temple-map');
  const loading = document.getElementById('map-loading');

  if (!iframe) return;

  /**
   * The embed uses the Maps Embed API v1 search endpoint which resolves the
   * place by name and shows a pin + info window without requiring the full
   * Maps JavaScript API.  A key is required by Google; the key used here is
   * restricted to Maps Embed API usage.  For a production deployment you
   * should swap this with your own API key (restrict it to Maps Embed API
   * only and your domain).
   */

  // Show a Google Maps search link as fallback if the iframe errors
  iframe.addEventListener('error', function () {
    if (loading) {
      loading.innerHTML =
        '<p>Unable to load the map. <a href="https://maps.google.com/?q=Kakkamvelly+Sreekrishna+Temple+Kozhikode+Kerala" ' +
        'target="_blank" rel="noopener noreferrer" style="color:#c8860a;text-decoration:underline;">' +
        'Open in Google Maps</a></p>';
    }
  });

  // Also handle the case where Google rejects the key (cross-origin, so we
  // can't detect HTTP 403 directly; instead we rely on onload from HTML and
  // add a timed fallback for slow connections).
  const loadTimeout = setTimeout(function () {
    if (loading && loading.style.display !== 'none') {
      loading.innerHTML =
        '<p style="text-align:center;padding:1rem;">' +
        '<a href="https://maps.google.com/?q=Kakkamvelly+Sreekrishna+Temple+Kozhikode+Kerala" ' +
        'target="_blank" rel="noopener noreferrer" style="color:#c8860a;text-decoration:underline;">' +
        '<i class="fa-solid fa-map-location-dot"></i> View on Google Maps</a></p>';
    }
  }, 8000);

  iframe.addEventListener('load', function () {
    clearTimeout(loadTimeout);
    if (loading) loading.style.display = 'none';
    iframe.style.opacity = '1';
  });
})();

/* ─────────────────────────────────────────────
   4. CONTACT FORM VALIDATION
───────────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  function getField(id) {
    return document.getElementById(id);
  }

  function showError(inputEl, errorId, message) {
    inputEl.classList.add('invalid');
    const errEl = document.getElementById(errorId);
    if (errEl) errEl.textContent = message;
  }

  function clearError(inputEl, errorId) {
    inputEl.classList.remove('invalid');
    const errEl = document.getElementById(errorId);
    if (errEl) errEl.textContent = '';
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateForm() {
    let isValid = true;

    const nameEl    = getField('name');
    const emailEl   = getField('email');
    const subjectEl = getField('subject');
    const messageEl = getField('message');

    // Name
    if (!nameEl.value.trim()) {
      showError(nameEl, 'name-error', 'Please enter your name.');
      isValid = false;
    } else {
      clearError(nameEl, 'name-error');
    }

    // Email
    if (!emailEl.value.trim()) {
      showError(emailEl, 'email-error', 'Please enter your email address.');
      isValid = false;
    } else if (!validateEmail(emailEl.value.trim())) {
      showError(emailEl, 'email-error', 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailEl, 'email-error');
    }

    // Subject
    if (!subjectEl.value) {
      showError(subjectEl, 'subject-error', 'Please select a subject.');
      isValid = false;
    } else {
      clearError(subjectEl, 'subject-error');
    }

    // Message
    if (!messageEl.value.trim()) {
      showError(messageEl, 'message-error', 'Please enter your message.');
      isValid = false;
    } else {
      clearError(messageEl, 'message-error');
    }

    return isValid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateForm()) {
      const success = document.getElementById('form-success');
      if (success) {
        success.removeAttribute('hidden');
        form.reset();
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  });

  // Real-time validation on blur
  ['name', 'email', 'subject', 'message'].forEach(function (fieldId) {
    const el = getField(fieldId);
    if (el) {
      el.addEventListener('blur', function () { validateForm(); });
    }
  });
})();

/* ─────────────────────────────────────────────
   5. FOOTER YEAR
───────────────────────────────────────────── */
(function updateFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();

/* ─────────────────────────────────────────────
   6. MARQUEE DUPLICATE (seamless loop)
───────────────────────────────────────────── */
(function initMarquee() {
  const content = document.querySelector('.marquee-content');
  if (!content) return;
  // Duplicate the text so the animation loops without a visible gap
  const clone = content.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  content.parentNode.appendChild(clone);
})();

/* ─────────────────────────────────────────────
   7. INTERSECTION OBSERVER – fade-in sections
───────────────────────────────────────────── */
(function initFadeIn() {
  if (!window.IntersectionObserver) return;

  const targets = document.querySelectorAll(
    '.timing-card, .festival-card, .gallery-item, .transport-item, .place-detail-item'
  );

  // Set initial state
  targets.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(function (el) { observer.observe(el); });
})();

/* ─────────────────────────────────────────────
   8. HINDU ANIMATIONS — Peacock Feather &
      Particle System
───────────────────────────────────────────── */
(function initHinduAnimations() {
  // Add peacock feather elements dynamically to hero
  const heroSection = document.getElementById('home');
  if (!heroSection) return;

  // Create a few animated peacock feather dots
  const featherColors = ['#00b4d8', '#48cae4', '#023e8a', '#c8860a', '#f0c040'];
  const animLayer = heroSection.querySelector('.hindu-anim-layer');
  if (!animLayer) return;

  featherColors.forEach(function(color, i) {
    const dot = document.createElement('div');
    dot.className = 'anim-peacock-dot';
    dot.setAttribute('aria-hidden', 'true');
    dot.style.cssText = [
      'position:absolute',
      'width:6px',
      'height:6px',
      'border-radius:50%',
      'background:' + color,
      'opacity:0.25',
      'left:' + (20 + i * 15) + '%',
      'top:' + (10 + i * 12) + '%',
      'animation:peacock-glow ' + (4 + i) + 's ease-in-out infinite',
      'animation-delay:' + (i * 0.8) + 's'
    ].join(';');
    animLayer.appendChild(dot);
  });
})();
