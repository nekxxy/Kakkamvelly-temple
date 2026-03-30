/**
 * Galaxy Background + Audio Player
 * Kakkamvelly Sreekrishna Temple
 */
'use strict';

/* ─────────────────────────────────────────────
   1. GALAXY CANVAS — deep space with stars,
      milky way band, twinkling & parallax
───────────────────────────────────────────── */
(function initGalaxy() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = document.createElement('canvas');
  canvas.id = 'galaxy-canvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  let W, H;
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // ── Star field ──
  const STAR_COUNT = window.innerWidth < 600 ? 100 : window.innerWidth < 1024 ? 200 : 350;
  const stars = [];

  class Star {
    constructor() { this.reset(true); }
    reset(init) {
      this.x    = Math.random() * W;
      this.y    = Math.random() * H;
      this.size = Math.random() * 1.8 + 0.2;
      this.baseAlpha = Math.random() * 0.7 + 0.2;
      this.alpha = this.baseAlpha;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      this.twinkleDir   = Math.random() > 0.5 ? 1 : -1;
      // Star colour — mostly white, some tinted
      const hues = [0, 200, 220, 40, 280];
      this.hue  = hues[Math.floor(Math.random() * hues.length)];
      this.sat  = Math.random() < 0.3 ? Math.floor(Math.random()*60)+20 : 0;
    }
    update() {
      if (prefersReduced) return;
      this.alpha += this.twinkleSpeed * this.twinkleDir;
      if (this.alpha > this.baseAlpha + 0.25) this.twinkleDir = -1;
      if (this.alpha < 0.05)                  this.twinkleDir =  1;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      const color = this.sat > 0
        ? `hsl(${this.hue},${this.sat}%,90%)`
        : '#ffffff';
      // Glow for bigger stars
      if (this.size > 1.2) {
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        grd.addColorStop(0, color);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      // Core
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());

  // ── Milky Way band ──
  function drawMilkyWay() {
    ctx.save();
    ctx.globalAlpha = 0.07;
    const grd = ctx.createLinearGradient(0, H * 0.1, W, H * 0.9);
    grd.addColorStop(0,    'transparent');
    grd.addColorStop(0.2,  'rgba(180,140,255,0.6)');
    grd.addColorStop(0.45, 'rgba(220,200,255,0.8)');
    grd.addColorStop(0.55, 'rgba(180,140,255,0.6)');
    grd.addColorStop(0.8,  'rgba(140,100,220,0.4)');
    grd.addColorStop(1,    'transparent');
    ctx.fillStyle = grd;
    // Diagonal band
    ctx.beginPath();
    ctx.moveTo(0, H * 0.05);
    ctx.lineTo(W, H * 0.45);
    ctx.lineTo(W, H * 0.75);
    ctx.lineTo(0, H * 0.35);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // ── Nebula clouds ──
  const nebulae = [
    { x: 0.15, y: 0.2,  r: 220, color: 'rgba(120,0,80,0.08)',   speed: 0.00015 },
    { x: 0.75, y: 0.55, r: 280, color: 'rgba(0,60,150,0.07)',   speed: 0.0001  },
    { x: 0.45, y: 0.8,  r: 180, color: 'rgba(80,0,120,0.06)',   speed: 0.00018 },
    { x: 0.85, y: 0.15, r: 160, color: 'rgba(0,100,80,0.05)',   speed: 0.00012 },
  ];
  let tick = 0;

  function drawNebulae() {
    nebulae.forEach((n, i) => {
      const drift  = Math.sin(tick * n.speed * 1000 + i) * 30;
      const cx     = n.x * W + drift;
      const cy     = n.y * H + Math.cos(tick * n.speed * 800 + i) * 20;
      const grd    = ctx.createRadialGradient(cx, cy, 0, cx, cy, n.r);
      grd.addColorStop(0, n.color);
      grd.addColorStop(1, 'transparent');
      ctx.save();
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, n.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  // ── Shooting stars ──
  const shooters = [];
  function spawnShooter() {
    if (prefersReduced) return;
    if (Math.random() > 0.004) return;
    shooters.push({
      x:     Math.random() * W * 0.7,
      y:     Math.random() * H * 0.4,
      vx:    Math.random() * 6 + 4,
      vy:    Math.random() * 3 + 2,
      len:   Math.random() * 120 + 60,
      life:  1,
      decay: Math.random() * 0.015 + 0.01,
    });
  }

  function drawShooters() {
    for (let i = shooters.length - 1; i >= 0; i--) {
      const s = shooters[i];
      ctx.save();
      ctx.globalAlpha = s.life * 0.9;
      const grd = ctx.createLinearGradient(s.x, s.y, s.x - s.len, s.y - s.len * 0.5);
      grd.addColorStop(0, 'rgba(255,255,255,1)');
      grd.addColorStop(1, 'transparent');
      ctx.strokeStyle = grd;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.len, s.y - s.len * 0.5);
      ctx.stroke();
      ctx.restore();
      s.x += s.vx; s.y += s.vy; s.life -= s.decay;
      if (s.life <= 0) shooters.splice(i, 1);
    }
  }

  // ── Parallax on mouse ──
  let mouseX = 0, mouseY = 0;
  if (!prefersReduced) {
    document.addEventListener('mousemove', e => {
      mouseX = (e.clientX / W - 0.5) * 12;
      mouseY = (e.clientY / H - 0.5) * 8;
    }, { passive: true });
  }

  // ── Main loop ──
  let frameCount = 0;
  const isMobileGalaxy = window.innerWidth < 768;
  function loop(timestamp) {
    frameCount++;
    // Mobile: render every 2nd frame (30fps) to save battery
    if (isMobileGalaxy && frameCount % 2 !== 0) {
      requestAnimationFrame(loop);
      return;
    }
    tick = timestamp * 0.001;
    ctx.clearRect(0, 0, W, H);

    // Deep space gradient base
    const bg = ctx.createLinearGradient(0, 0, W * 0.3, H);
    bg.addColorStop(0, '#020008');
    bg.addColorStop(0.4, '#060015');
    bg.addColorStop(0.7, '#030010');
    bg.addColorStop(1, '#000805');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    drawMilkyWay();
    drawNebulae();

    // Stars with subtle parallax
    stars.forEach(s => {
      s.update();
      ctx.save();
      ctx.translate(mouseX * s.size * 0.3, mouseY * s.size * 0.2);
      s.draw();
      ctx.restore();
    });

    spawnShooter();
    drawShooters();

    requestAnimationFrame(loop);
  // Apply will-change hint to canvas for GPU compositing
  canvas.style.willChange = 'contents';
  }
  requestAnimationFrame(loop);

  // Add DOM nebula divs for CSS layer too
  const hero = document.querySelector('.hero');
  if (hero) {
    [1,2,3].forEach(i => {
      const n = document.createElement('div');
      n.className = `galaxy-nebula galaxy-nebula-${i}`;
      hero.appendChild(n);
    });
  }
})();

/* ─────────────────────────────────────────────
   2. AUDIO PLAYER — bulletproof iOS/Android
   Strategy: unlock on first touch, then play.
   iOS needs: call play() as the VERY FIRST LINE
   of the handler with ZERO conditions before it.
───────────────────────────────────────────── */
(function initAudio() {
  var btn    = document.getElementById('audio-toggle');
  var icon   = btn ? btn.querySelector('.audio-icon') : null;
  var lbl    = btn ? btn.querySelector('.audio-label') : null;
  var audio  = document.getElementById('krishna-audio');
  var VOL    = 0.20;
  var isPlaying = false;
  var unlocked  = false;

  if (!audio) return;
  audio.loop    = true;
  audio.preload = 'auto';

  /* ── UI helpers ── */
  function showPlaying() {
    isPlaying = true;
    if (!btn) return;
    btn.classList.add('playing');
    btn.classList.remove('muted');
    if (icon) icon.textContent = '🎵';
    if (lbl)  lbl.textContent  = 'ഭക്തി';
  }
  function showPaused() {
    isPlaying = false;
    if (!btn) return;
    btn.classList.remove('playing');
    btn.classList.add('muted');
    if (icon) icon.textContent = '🔇';
    if (lbl)  lbl.textContent  = 'pause';
  }

  /* ── Fade in volume ── */
  function fadeUp() {
    audio.volume = 0;
    var step = 0, total = 40;
    var t = setInterval(function() {
      step++;
      audio.volume = Math.min(VOL, step / total * VOL);
      if (step >= total) clearInterval(t);
    }, 75);
  }

  /* ── The play call — MUST be synchronous ── */
  function doPlay() {
    var p = audio.play();
    if (p && p.then) {
      p.then(function() {
        showPlaying();
        fadeUp();
      }).catch(function() {
        showPaused();
        unlocked = false;
      });
    } else {
      showPlaying();
      fadeUp();
    }
  }

  /* ── FIRST USER TOUCH — iOS unlock pattern ──
     Call audio.play() as the ABSOLUTE FIRST LINE.
     Any code before play() breaks iOS gesture trust.
     Using old-style addEventListener(,, false) for
     max browser compat (not options object).
  ── */
  function firstTouch() {
    if (unlocked) return;
    unlocked = true;
    /* play() is the first expression — gesture intact */
    doPlay();
    document.removeEventListener('touchend',   firstTouch, false);
    document.removeEventListener('click',      firstTouch, false);
    document.removeEventListener('touchstart', firstTouch, false);
  }

  /* Use old-style false (= bubble, not passive) for iOS */
  document.addEventListener('touchend',   firstTouch, false);
  document.addEventListener('touchstart', firstTouch, false);
  document.addEventListener('click',      firstTouch, false);

  /* ── Toggle button ── */
  if (btn) {
    btn.addEventListener('touchend', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (!isPlaying) {
        unlocked = true;
        doPlay();
      } else {
        audio.pause();
        showPaused();
      }
    }, false);

    btn.addEventListener('click', function(e) {
      e.stopImmediatePropagation();
      if (!isPlaying) {
        unlocked = true;
        doPlay();
      } else {
        audio.pause();
        showPaused();
      }
    }, false);
  }

  /* ── Tab visibility ── */
  document.addEventListener('visibilitychange', function() {
    if (!isPlaying) return;
    if (document.hidden) {
      audio.pause();
    } else {
      audio.play().catch(function() {});
    }
  });
})();
