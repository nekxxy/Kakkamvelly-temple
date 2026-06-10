/* ════════════════════════════════════════════════════════════
   KAKKAMVELLY SREEKRISHNA TEMPLE — temple.js
   All interactivity in one file. Vanilla JS, no dependencies.
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Shared helpers ──────────────────────────────────────── */
  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  // Temple hours in minutes-from-midnight (IST)
  var MORNING_OPEN = 5 * 60 + 30, MORNING_CLOSE = 9 * 60;
  var EVENING_OPEN = 17 * 60 + 45, EVENING_CLOSE = 18 * 60 + 45;

  function nowIST() {
    var n = new Date();
    return new Date(n.getTime() + n.getTimezoneOffset() * 60000 + 330 * 60000);
  }
  function isEN() { return document.body.classList.contains('lang-en'); }
  function pad(x) { return x < 10 ? '0' + x : '' + x; }

  /* ── Language toggle (Malayalam ⇄ English) ───────────────── */
  function applyLang(lang) {
    document.body.classList.toggle('lang-en', lang === 'en');
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    $$('[data-ml]').forEach(function (el) {
      var txt = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ml');
      if (txt) el.textContent = txt;
    });
    $$('.nlp-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-setlang') === lang);
    });
    try { localStorage.setItem('kvt-lang', lang); } catch (e) { /* private mode */ }
    document.dispatchEvent(new CustomEvent('kvt:lang'));
  }

  $$('.nlp-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { applyLang(btn.getAttribute('data-setlang')); });
  });

  (function initLang() {
    var saved = null;
    try { saved = localStorage.getItem('kvt-lang'); } catch (e) { /* ignore */ }
    var fromURL = new URLSearchParams(location.search).get('lang');
    var lang = fromURL === 'en' || (!fromURL && saved === 'en') ? 'en' : 'ml';
    if (lang === 'en') applyLang('en');
  })();

  /* ── Darshan status (hero badge + live card) ─────────────── */
  function darshanState() {
    var ist = nowIST();
    var mins = ist.getHours() * 60 + ist.getMinutes();
    var open = (mins >= MORNING_OPEN && mins < MORNING_CLOSE) || (mins >= EVENING_OPEN && mins < EVENING_CLOSE);
    var diff, nextLabel;
    if (open) {
      diff = mins < MORNING_CLOSE ? MORNING_CLOSE - mins : EVENING_CLOSE - mins;
    } else if (mins < MORNING_OPEN) {
      diff = MORNING_OPEN - mins; nextLabel = '5:30 AM';
    } else if (mins < EVENING_OPEN) {
      diff = EVENING_OPEN - mins; nextLabel = '5:45 PM';
    } else {
      diff = (24 * 60 - mins) + MORNING_OPEN; nextLabel = '5:30 AM';
    }
    return { open: open, diff: diff, nextLabel: nextLabel };
  }

  function fmtDuration(mins, en) {
    var h = Math.floor(mins / 60), m = mins % 60;
    return (h > 0 ? h + 'h ' : '') + m + 'm';
  }

  function updateDarshan() {
    var s = darshanState(), en = isEN();
    var badge = $('#hero-darshan-badge');
    if (badge) {
      if (s.open) {
        badge.textContent = (en ? '🟢 Darshan open · closes in ' : '🟢 ദർശനം തുറന്നിരിക്കുന്നു · ') + fmtDuration(s.diff, en) + (en ? '' : ' കൂടി');
        badge.className = 'darshan-badge nd-open';
      } else {
        badge.textContent = (en ? '🔴 Closed · opens at ' : '🔴 അടഞ്ഞിരിക്കുന്നു · ') + s.nextLabel + (en ? '' : '-ന് തുറക്കും');
        badge.className = 'darshan-badge nd-closed';
      }
    }
    var dot = $('#darshan-dot'), stat = $('#darshan-status'), sub = $('#darshan-sub');
    if (dot && stat && sub) {
      dot.classList.toggle('closed', !s.open);
      if (s.open) {
        stat.textContent = en ? '🟢 Temple is Open' : '🟢 ക്ഷേത്രം തുറന്നിരിക്കുന്നു';
        sub.textContent = en ? 'Closes in ' + fmtDuration(s.diff, en) : fmtDuration(s.diff, en) + ' കൂടി';
      } else {
        stat.textContent = en ? '🔴 Temple is Closed' : '🔴 ക്ഷേത്രം അടഞ്ഞിരിക്കുന്നു';
        sub.textContent = en ? 'Opens at ' + s.nextLabel : s.nextLabel + '-ന് തുറക്കും';
      }
    }
  }

  /* ── Festival countdown + queue ──────────────────────────── */
  // NOTE: lunar-calendar dates — verify each year with the temple committee.
  var FESTIVALS = [
    { ml: 'അഷ്ടമി രോഹിണി', en: 'Ashtami Rohini (Janmashtami)', date: new Date('2026-08-04T18:30:00+05:30') },
    { ml: 'തിരുവോണം',       en: 'Thiruvonam (Onam)',            date: new Date('2026-09-13T06:30:00+05:30') },
    { ml: 'ഗുരുവായൂർ ഏകാദശി', en: 'Guruvayur Ekadasi',          date: new Date('2026-11-29T05:30:00+05:30') },
    { ml: 'തിരുവാതിര',       en: 'Thiruvathira',                date: new Date('2026-12-26T05:30:00+05:30') },
    { ml: 'വിഷു 2027',       en: 'Vishu 2027',                  date: new Date('2027-04-14T05:00:00+05:30') }
  ];

  function fmtDate(d, en) {
    var ml = ['ജനു', 'ഫെബ്രു', 'മാർച്ച്', 'ഏപ്രിൽ', 'മേയ്', 'ജൂൺ', 'ജൂലൈ', 'ഓഗ', 'സെപ്', 'ഒക്ടോ', 'നവം', 'ഡിസം'];
    var enM = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return d.getDate() + ' ' + (en ? enM : ml)[d.getMonth()] + ' ' + d.getFullYear();
  }

  function renderFestivalQueue() {
    var queue = $('#fest-queue');
    if (!queue) return;
    var now = new Date(), en = isEN();
    var upcoming = FESTIVALS.filter(function (f) { return f.date > now; }).slice(1, 4);
    queue.innerHTML = '';
    upcoming.forEach(function (f) {
      var li = document.createElement('li');
      var name = document.createElement('span');
      name.textContent = en ? f.en : f.ml;
      var date = document.createElement('b');
      date.textContent = fmtDate(f.date, en);
      li.appendChild(name); li.appendChild(date);
      queue.appendChild(li);
    });
  }

  function updateFestival() {
    var now = new Date(), en = isEN();
    var next = null;
    for (var i = 0; i < FESTIVALS.length; i++) {
      if (FESTIVALS[i].date > now) { next = FESTIVALS[i]; break; }
    }
    if (!next) next = FESTIVALS[FESTIVALS.length - 1];
    var nameEl = $('#fest-name'), dateEl = $('#fest-date');
    if (nameEl) nameEl.textContent = en ? next.en : next.ml;
    if (dateEl) dateEl.textContent = fmtDate(next.date, en);

    var diff = Math.max(0, next.date - now);
    var d = Math.floor(diff / 86400000);
    var h = Math.floor(diff % 86400000 / 3600000);
    var m = Math.floor(diff % 3600000 / 60000);
    var s = Math.floor(diff % 60000 / 1000);
    var ids = { 'cd-d': d, 'cd-h': h, 'cd-m': m, 'cd-s': s };
    Object.keys(ids).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = pad(ids[id]);
    });
  }

  /* ── Annadhanam — first Sunday of every month, 12 noon ───── */
  function updateAnnadhanam() {
    var t = nowIST();
    function firstSunday(y, m) {
      var d = new Date(y, m, 1);
      while (d.getDay() !== 0) d.setDate(d.getDate() + 1);
      d.setHours(12, 0, 0, 0);
      return d;
    }
    var next = firstSunday(t.getFullYear(), t.getMonth());
    if (t > next) next = firstSunday(t.getFullYear(), t.getMonth() + 1);
    var days = Math.ceil((next - t) / 86400000);
    var daysEl = $('#ann-days'), dateEl = $('#ann-date');
    if (daysEl) daysEl.textContent = days === 0 ? '🎉' : days;
    if (dateEl) dateEl.textContent = fmtDate(next, isEN());
  }

  /* ── Weather + sunrise/sunset (open-meteo) + moon phase ──── */
  var WEATHER_CODES = {
    0: ['☀️', 'തെളിഞ്ഞ ആകാശം', 'Clear sky'], 1: ['🌤️', 'ഏറെക്കുറെ തെളിഞ്ഞത്', 'Mostly clear'],
    2: ['⛅', 'ഭാഗിക മേഘം', 'Partly cloudy'], 3: ['☁️', 'മേഘാവൃതം', 'Overcast'],
    45: ['🌫️', 'മൂടൽമഞ്ഞ്', 'Fog'], 48: ['🌫️', 'മൂടൽമഞ്ഞ്', 'Fog'],
    51: ['🌦️', 'ചാറ്റൽ മഴ', 'Light drizzle'], 53: ['🌦️', 'ചാറ്റൽ മഴ', 'Drizzle'], 55: ['🌧️', 'ചാറ്റൽ മഴ', 'Heavy drizzle'],
    61: ['🌧️', 'നേരിയ മഴ', 'Light rain'], 63: ['🌧️', 'മഴ', 'Rain'], 65: ['⛈️', 'കനത്ത മഴ', 'Heavy rain'],
    80: ['🌦️', 'മഴച്ചാറൽ', 'Showers'], 81: ['🌧️', 'മഴ', 'Showers'], 82: ['⛈️', 'കനത്ത മഴ', 'Heavy showers'],
    95: ['⛈️', 'ഇടിമിന്നൽ', 'Thunderstorm'], 96: ['⛈️', 'ഇടിമിന്നൽ', 'Thunderstorm'], 99: ['⛈️', 'ഇടിമിന്നൽ', 'Thunderstorm']
  };
  var weatherData = null;

  function renderWeather() {
    var box = $('#weather-widget');
    if (!box || !weatherData) return;
    var en = isEN();
    var code = WEATHER_CODES[weatherData.code] || ['🌤️', 'കാലാവസ്ഥ', 'Weather'];
    box.innerHTML =
      '<div class="weather-now">' +
        '<span class="weather-icon">' + code[0] + '</span>' +
        '<span class="weather-temp">' + Math.round(weatherData.temp) + '°C</span>' +
        '<span class="weather-desc">' + (en ? code[2] : code[1]) +
          '<br>💧 ' + weatherData.humidity + '%</span>' +
      '</div>';
  }

  function fmtTime12(iso) {
    var d = new Date(iso);
    var h = d.getHours(), m = d.getMinutes();
    var ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + pad(m) + ' ' + ap;
  }

  function loadWeather() {
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=11.6814&longitude=75.6478' +
      '&current=temperature_2m,relative_humidity_2m,weather_code' +
      '&daily=sunrise,sunset&timezone=Asia%2FKolkata&forecast_days=1';
    fetch(url).then(function (r) { return r.json(); }).then(function (data) {
      weatherData = {
        temp: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        code: data.current.weather_code
      };
      renderWeather();
      var sr = $('#sunrise-time'), ss = $('#sunset-time');
      if (sr && data.daily.sunrise) sr.textContent = fmtTime12(data.daily.sunrise[0]);
      if (ss && data.daily.sunset) ss.textContent = fmtTime12(data.daily.sunset[0]);
    }).catch(function () {
      var box = $('#weather-widget');
      if (box) box.innerHTML = '<p class="live-sub">—</p>';
    });
  }

  function updateMoon() {
    // Synodic month approximation from a known new moon (2000-01-06 18:14 UTC)
    var synodic = 29.53058867;
    var days = (Date.now() - Date.UTC(2000, 0, 6, 18, 14)) / 86400000;
    var phase = ((days % synodic) + synodic) % synodic / synodic;
    var names = [
      ['🌑', 'അമാവാസി', 'New Moon'], ['🌒', 'വളരുന്ന ചന്ദ്രൻ', 'Waxing Crescent'],
      ['🌓', 'അർദ്ധചന്ദ്രൻ', 'First Quarter'], ['🌔', 'വളരുന്ന ചന്ദ്രൻ', 'Waxing Gibbous'],
      ['🌕', 'പൗർണ്ണമി', 'Full Moon'], ['🌖', 'ക്ഷയിക്കുന്ന ചന്ദ്രൻ', 'Waning Gibbous'],
      ['🌗', 'അർദ്ധചന്ദ്രൻ', 'Last Quarter'], ['🌘', 'ക്ഷയിക്കുന്ന ചന്ദ്രൻ', 'Waning Crescent']
    ];
    var idx = Math.round(phase * 8) % 8;
    var emoji = $('#moon-emoji'), label = $('#moon-phase');
    if (emoji) emoji.textContent = names[idx][0];
    if (label) label.textContent = isEN() ? names[idx][2] : names[idx][1];
  }

  /* ── Hero slider (crossfade + Ken Burns) ─────────────────── */
  (function initSlider() {
    var slides = $$('.hero-slide');
    var dots = $$('.hero-dot');
    if (!slides.length) return;
    var current = 0, total = slides.length, timer;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function ensureLoaded(idx) {
      var s = slides[idx];
      if (s && s.dataset.bg) {
        s.style.backgroundImage = "url('" + s.dataset.bg + "')";
        s.removeAttribute('data-bg');
      }
    }
    function go(n) {
      ensureLoaded(n % total);
      ensureLoaded((n + 1) % total);
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (n + total) % total;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }
    function next() { go(current + 1); }
    function restartTimer() {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(next, 5500);
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        go(parseInt(dot.dataset.slide, 10));
        restartTimer();
      });
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearInterval(timer);
      else restartTimer();
    });
    ensureLoaded(1);
    restartTimer();
  })();

  /* ── Lightbox (full-size images from data-full) ──────────── */
  (function initLightbox() {
    var box = $('#lightbox'), img = $('#lightbox-img'), cap = $('#lightbox-caption');
    if (!box) return;

    function open(el) {
      var thumb = el.querySelector('img');
      img.src = el.getAttribute('data-full') || (thumb ? thumb.src : '');
      img.alt = thumb ? thumb.alt : '';
      cap.textContent = thumb ? thumb.alt : '';
      box.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      box.classList.remove('active');
      img.src = '';
      document.body.style.overflow = '';
    }

    $$('[data-full]').forEach(function (el) {
      el.addEventListener('click', function () { open(el); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el); }
      });
    });
    $('#lightbox-close').addEventListener('click', close);
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  })();

  /* ── Vazhipad search ─────────────────────────────────────── */
  (function initVazhipadSearch() {
    var input = $('#vazhipad-search');
    if (!input) return;
    input.addEventListener('input', function () {
      var q = input.value.toLowerCase().trim();
      var any = false;
      $$('.vz').forEach(function (row) {
        // Search both ML and EN labels regardless of current language
        var span = row.querySelector('span');
        var hay = (row.textContent + ' ' + (span ? (span.getAttribute('data-ml') || '') + ' ' + (span.getAttribute('data-en') || '') : '')).toLowerCase();
        var show = q === '' || hay.indexOf(q) !== -1;
        row.style.display = show ? 'flex' : 'none';
        if (show) any = true;
      });
      $$('.vz-cat-title').forEach(function (title) {
        var list = title.nextElementSibling;
        var visible = list ? list.querySelectorAll('.vz:not([style*="none"])').length : 0;
        title.style.display = visible > 0 ? '' : 'none';
      });
      var none = $('#vz-no-results');
      if (none) none.hidden = any;
    });
  })();

  /* ── Video facade (YouTube loads only on click) ──────────── */
  (function initVideo() {
    var player = $('#video-player');
    if (!player) return;
    function load() {
      player.innerHTML = '<iframe src="https://www.youtube.com/embed/SLW7USzalbY?autoplay=1&rel=0&modestbranding=1" title="Kakkamvelly Sreekrishna Temple" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
      player.style.cursor = 'default';
      player.removeAttribute('role');
      player.removeAttribute('tabindex');
    }
    player.addEventListener('click', load, { once: true });
    player.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') load();
    });
  })();

  /* ── Lazy map iframe ─────────────────────────────────────── */
  (function initLazyMap() {
    var iframe = document.querySelector('iframe[data-src]');
    if (!iframe) return;
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.src = e.target.dataset.src;
          e.target.removeAttribute('data-src');
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: '400px' }).observe(iframe);
  })();

  /* ── Scroll: progress bar, reveal, back-to-top, active nav ─ */
  (function initScrollUI() {
    var progress = $('#scroll-progress');
    var topBtn = $('#back-to-top');
    var navLinks = $$('.nav-link');
    var mbnItems = $$('.mbn-item');
    var sections = $$('main section[id]');
    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        if (progress) progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
        if (topBtn) topBtn.classList.toggle('show', y > 600);

        var active = 'home';
        sections.forEach(function (sec) {
          if (sec.offsetTop - 140 <= y) active = sec.id;
        });
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + active);
        });
        mbnItems.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + active);
        });
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (topBtn) topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Reveal-on-scroll
    if ('IntersectionObserver' in window) {
      var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
      $$('.reveal').forEach(function (el) { revealObs.observe(el); });
    } else {
      $$('.reveal').forEach(function (el) { el.classList.add('visible'); });
    }
  })();

  /* ── Devotional audio toggle ─────────────────────────────── */
  (function initAudio() {
    var btn = $('#audio-toggle');
    var audio = $('#krishna-audio');
    if (!btn || !audio) return;
    var icon = btn.querySelector('.audio-icon');
    var fadeTimer;

    function fadeTo(target) {
      clearInterval(fadeTimer);
      fadeTimer = setInterval(function () {
        var v = audio.volume;
        if (Math.abs(v - target) < 0.02) {
          audio.volume = target;
          clearInterval(fadeTimer);
          if (target === 0) audio.pause();
        } else {
          audio.volume = v + (target > v ? 0.02 : -0.02);
        }
      }, 60);
    }

    btn.addEventListener('click', function () {
      if (audio.paused) {
        audio.volume = 0;
        audio.play().then(function () {
          fadeTo(0.25);
          btn.classList.add('playing');
          btn.setAttribute('aria-pressed', 'true');
          if (icon) icon.textContent = '🎵';
        }).catch(function () { /* playback blocked */ });
      } else {
        fadeTo(0);
        btn.classList.remove('playing');
        btn.setAttribute('aria-pressed', 'false');
        if (icon) icon.textContent = '🔇';
      }
    });
  })();

  /* ── Footer year ─────────────────────────────────────────── */
  var yearEl = $('#footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Service worker ──────────────────────────────────────── */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* offline support optional */ });
    });
  }

  /* ── Kick off live widgets ───────────────────────────────── */
  function refreshLive() {
    updateDarshan();
    updateAnnadhanam();
    renderFestivalQueue();
  }
  refreshLive();
  updateFestival();
  updateMoon();
  loadWeather();

  setInterval(updateDarshan, 30000);
  setInterval(updateAnnadhanam, 60000);
  setInterval(updateFestival, 1000);
  document.addEventListener('kvt:lang', function () {
    refreshLive();
    updateFestival();
    updateMoon();
    renderWeather();
  });
})();
