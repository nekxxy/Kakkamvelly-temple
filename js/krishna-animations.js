/**
 * Krishna Futuristic Animations
 * Kakkamvelly Sreekrishna Temple
 * Divine particles, peacock feathers, cursor sparkles, flute waves & more
 */
'use strict';

/* ─────────────────────────────────────────────────
   UTILITY
───────────────────────────────────────────────── */
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max));
const pickFrom = arr => arr[randInt(0, arr.length)];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────────────────────────────────────────
   1. CANVAS DIVINE PARTICLE SYSTEM
      Floating golden sparks + fireflies
───────────────────────────────────────────────── */
(function initDivineCanvas() { return; // Replaced by galaxy.js
  if (prefersReducedMotion) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'krishna-canvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Particle types: 'spark' = small golden, 'firefly' = glowing teal dot
  const PARTICLE_COUNT = 60;
  const particles = [];

  class Particle {
    constructor() { this.reset(true); }

    reset(initialise) {
      this.x    = rand(0, canvas.width);
      this.y    = initialise ? rand(0, canvas.height) : canvas.height + 10;
      this.size = rand(1.5, 4);
      this.speedY = rand(0.3, 1.2);
      this.speedX = rand(-0.4, 0.4);
      this.opacity = rand(0.4, 0.9);
      this.opacityDir = rand(-0.01, 0.01);
      this.hue  = pickFrom([45, 50, 180, 200, 330]); // gold, cyan, pink
      this.type = Math.random() < 0.3 ? 'firefly' : 'spark';
      this.pulse = 0;
      this.pulseSpeed = rand(0.02, 0.06);
      this.glowRadius = this.type === 'firefly' ? rand(8, 18) : rand(4, 10);
    }

    update() {
      this.y    -= this.speedY;
      this.x    += this.speedX + Math.sin(this.pulse) * 0.5;
      this.pulse += this.pulseSpeed;
      this.opacity += this.opacityDir;
      if (this.opacity > 0.9 || this.opacity < 0.1) this.opacityDir *= -1;
      if (this.y < -10) this.reset(false);
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      if (this.type === 'firefly') {
        // Glowing dot
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glowRadius);
        grad.addColorStop(0, `hsla(${this.hue}, 90%, 80%, 1)`);
        grad.addColorStop(1, `hsla(${this.hue}, 90%, 70%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowRadius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Diamond spark
        ctx.fillStyle = `hsla(${this.hue}, 100%, 75%, 1)`;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 75%, 0.8)`;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.pulse);
        ctx.moveTo(0, -this.size);
        ctx.lineTo(this.size * 0.4, 0);
        ctx.lineTo(0, this.size);
        ctx.lineTo(-this.size * 0.4, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ─────────────────────────────────────────────────
   2. GOLDEN CURSOR SPARKLE TRAIL
───────────────────────────────────────────────── */
(function initCursorTrail() {
  if (prefersReducedMotion) return;
  const sparkles = ['✦', '✧', '⁕', '✺', '❋', '🪔', '🪔'];
  const colors   = ['#ffd700', '#00c8ff', '#ff6b9d', '#0ff', '#fff'];
  let lastTime = 0;
  const THROTTLE = 40; // ms between sparkles

  document.addEventListener('mousemove', function (e) {
    const now = Date.now();
    if (now - lastTime < THROTTLE) return;
    lastTime = now;

    const el = document.createElement('div');
    el.className = 'cursor-sparkle';
    el.textContent = pickFrom(sparkles);
    const size = rand(12, 22);
    el.style.cssText = `
      left: ${e.clientX}px;
      top:  ${e.clientY}px;
      font-size: ${size}px;
      color: ${pickFrom(colors)};
      text-shadow: 0 0 8px ${pickFrom(colors)};
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 850);
  });
})();

/* ─────────────────────────────────────────────────
   3. PEACOCK FEATHERS IN HERO
───────────────────────────────────────────────── */
(function initPeacockFeathers() {
  if (prefersReducedMotion) return;
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const FEATHERS = ['🪶', '🌿', '💠', '🔵'];
  const COUNT = 12;

  function spawnFeather() {
    const el = document.createElement('div');
    el.className = 'peacock-feather';
    el.textContent = pickFrom(FEATHERS);
    const dur  = rand(8, 18);
    const size = rand(1.2, 2.2);
    el.style.cssText = `
      left: ${rand(0, 100)}%;
      font-size: ${size}rem;
      animation-duration: ${dur}s;
      animation-delay: ${rand(0, dur)}s;
      filter: drop-shadow(0 0 ${rand(4,10)}px rgba(0,200,160,0.9)) hue-rotate(${rand(0,60)}deg);
    `;
    hero.appendChild(el);
    // recycle
    setTimeout(() => {
      el.remove();
      spawnFeather();
    }, (dur + rand(0,5)) * 1000);
  }

  for (let i = 0; i < COUNT; i++) spawnFeather();
})();

/* ─────────────────────────────────────────────────
   4. HERO GLOW ORBS
───────────────────────────────────────────────── */
(function initHeroOrbs() {
  if (prefersReducedMotion) return;
  const hero = document.querySelector('.hero');
  if (!hero) return;
  for (let i = 1; i <= 3; i++) {
    const orb = document.createElement('div');
    orb.className = `hero-orb hero-orb-${i}`;
    hero.appendChild(orb);
  }
})();

/* ─────────────────────────────────────────────────
   5. FLUTE SOUND WAVE IN HERO
───────────────────────────────────────────────── */
/* initFluteWave removed */);

/* ─────────────────────────────────────────────────
   6. FLOATING KRISHNA ELEMENTS (page-wide)
      Flutes, lotus, butter pots floating upward
───────────────────────────────────────────────── */
(function initFloatingElements() {
  if (prefersReducedMotion) return;

  const SYMBOLS = ['🪈', '🪔', '🧈', '🦚', '🌺', '🪔', '⭐', '✨'];
  const COUNT = 10;

  function spawn() {
    const el = document.createElement('div');
    el.className = 'krishna-float-element';
    el.textContent = pickFrom(SYMBOLS);
    const dur = rand(14, 28);
    el.style.cssText = `
      left: ${rand(2, 96)}vw;
      font-size: ${rand(1.2, 2.5)}rem;
      animation-duration: ${dur}s;
      animation-delay: ${rand(0, 8)}s;
    `;
    document.body.appendChild(el);
    setTimeout(() => { el.remove(); spawn(); }, (dur + 10) * 1000);
  }

  for (let i = 0; i < COUNT; i++) spawn();
})();

/* ─────────────────────────────────────────────────
   7. DIVINE GLOW SCROLL REVEAL
      Enhanced version (replaces basic main.js fade)
───────────────────────────────────────────────── */
(function initKrishnaReveal() {
  if (!window.IntersectionObserver) return;

  const targets = document.querySelectorAll(
    '.section-header, .about-grid, .timing-card, .festival-card, ' +
    '.gallery-item, .transport-item, .place-detail-item, ' +
    '.contact-grid, .footer-grid'
  );

  targets.forEach(el => el.classList.add('krishna-reveal'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => obs.observe(el));
})();

/* ─────────────────────────────────────────────────
   8. FESTIVAL CARD CLICK – BURST OF PARTICLES
───────────────────────────────────────────────── */
(function initFestivalBurst() {
  if (prefersReducedMotion) return;
  const symbols = ['🪔','✨','🪔','⭐','🎉','🪔'];
  const colors  = ['#ffd700','#ff6b9d','#00c8ff','#ff9933'];

  document.querySelectorAll('.festival-card').forEach(card => {
    card.addEventListener('click', function (e) {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const cy   = rect.top  + rect.height / 2;
      for (let i = 0; i < 12; i++) {
        const b = document.createElement('div');
        b.className = 'cursor-sparkle';
        b.textContent = pickFrom(symbols);
        const angle = (i / 12) * Math.PI * 2;
        const dist  = rand(40, 90);
        const tx    = cx + Math.cos(angle) * dist;
        const ty    = cy + Math.sin(angle) * dist;
        b.style.cssText = `
          left: ${cx}px; top: ${cy}px;
          font-size: ${rand(14,24)}px;
          color: ${pickFrom(colors)};
          text-shadow: 0 0 8px currentColor;
          transition: all 0.7s ease-out;
        `;
        document.body.appendChild(b);
        requestAnimationFrame(() => {
          b.style.left = `${tx}px`;
          b.style.top  = `${ty}px`;
          b.style.opacity = '0';
          b.style.transform = `translate(-50%,-50%) scale(0) rotate(${rand(-180,180)}deg)`;
        });
        setTimeout(() => b.remove(), 800);
      }
    });
  });
})();

/* ─────────────────────────────────────────────────
   9. NOTICE BAR – GOLDEN SHIMMER INIT
      (purely CSS driven, no JS needed — this is
       just a placeholder hook for future events)
───────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────
   10. FOOTER YEAR (keep in sync)
───────────────────────────────────────────────── */
(function syncYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ─────────────────────────────────────────────────
   11. DIVINE TITLE GLOW ON HERO LOAD
───────────────────────────────────────────────── */
(function initHeroEntrance() {
  if (prefersReducedMotion) return;
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;
  heroContent.style.opacity = '0';
  heroContent.style.transform = 'translateY(30px)';
  heroContent.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
  window.addEventListener('load', () => {
    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 200);
  });
})();

/* ─────────────────────────────────────────────────
   12. SECTION ENTER – PLAY "RIPPLE" ON TITLE
───────────────────────────────────────────────── */
(function initSectionRipple() {
  if (prefersReducedMotion) return;
  if (!window.IntersectionObserver) return;

  document.querySelectorAll('.section-title').forEach(title => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          title.style.textShadow = '0 0 0 transparent';
          title.animate([
            { textShadow: '0 0 30px rgba(255,215,0,0.9), 0 0 60px rgba(255,165,0,0.5)' },
            { textShadow: '0 0 8px rgba(255,215,0,0.4)' },
            { textShadow: '0 0 0 transparent' },
          ], { duration: 2000, easing: 'ease-out' });
          obs.unobserve(title);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(title);
  });
})();
