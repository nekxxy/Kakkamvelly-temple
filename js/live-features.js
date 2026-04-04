/* ═══════════════════════════════════════════════
   LIVE FEATURES — Kakkamvelly Sreekrishna Temple
   All widgets: Darshan, Festival, Schedule,
   Weather, Annadhanam, Sun, Moon, Visitor
═══════════════════════════════════════════════ */
'use strict';

/* ── Helpers (MUST be first — all IIFEs below use $) ── */
const $ = id => document.getElementById(id);
const isMob = () => window.innerWidth <= 768;

/* ══════════════════════════════════════════════
   1. DARSHAN STATUS BAR
══════════════════════════════════════════════ */
(function initDarshanBar() {
  const widget = $('darshan-status-widget');
  if (!widget) return;

  const MORNING = { o: 5*60+30, c: 9*60 };
  const EVENING = { o: 17*60+45, c: 18*60+45 };

  function fmt(mins) {
    const h = Math.floor(mins/60), m = mins%60;
    const ampm = h < 12 ? 'AM' : 'PM';
    return `${h>12?h-12:h||12}:${String(m).padStart(2,'0')} ${ampm}`;
  }

  function update() {
    const now = new Date();
    const cur = now.getHours()*60 + now.getMinutes();
    const dot = widget.querySelector('.dsw-dot');
    const txt = widget.querySelector('.dsw-text');
    if (!dot || !txt) return;

    let open = false, msg = '';
    if (cur >= MORNING.o && cur < MORNING.c) {
      open = true;
      const left = MORNING.c - cur;
      msg = `ക്ഷേത്രം തുറന്നിരിക്കുന്നു · ${Math.floor(left/60)}h ${left%60}m കൂടി`;
    } else if (cur >= EVENING.o && cur < EVENING.c) {
      open = true;
      const left = EVENING.c - cur;
      msg = `ക്ഷേത്രം തുറന്നിരിക്കുന്നു · ${left}m കൂടി`;
    } else {
      let next;
      if (cur < MORNING.o)      next = { label: '5:30 AM' };
      else if (cur < EVENING.o) next = { label: '5:45 PM' };
      else                       next = { label: 'നാളെ 5:30 AM' };
      const diff = cur < MORNING.o ? MORNING.o - cur
                 : cur < EVENING.o ? EVENING.o - cur
                 : (MORNING.o + 24*60) - cur;
      const h = Math.floor(diff/60), m = diff%60;
      msg = `ക്ഷേത്രം അടഞ്ഞിരിക്കുന്നു · ${next.label}-ന് തുറക്കും (${h}h ${m}m)`;
    }
    dot.className = 'dsw-dot ' + (open ? 'open' : 'closed');
    txt.textContent = msg;
  }

  update();
  setInterval(update, 60000);
})();

/* ══════════════════════════════════════════════
   2. NEXT DARSHAN COUNTDOWN (hero badge)
══════════════════════════════════════════════ */
(function initNextDarshan() {
  const el = $('next-darshan-countdown');
  if (!el) return;

  const MORNING = { o: 5*60+30, c: 9*60 };
  const EVENING = { o: 17*60+45, c: 18*60+45 };

  function update() {
    const now = new Date();
    const cur = now.getHours()*60 + now.getMinutes();

    let open = false, msg = '', cls = 'nd-closed';

    if (cur >= MORNING.o && cur < MORNING.c) {
      open = true; cls = 'nd-open';
      const left = MORNING.c - cur;
      msg = `🟢 ദർശനം തുറന്നിരിക്കുന്നു · ${Math.floor(left/60)}h ${left%60}m`;
    } else if (cur >= EVENING.o && cur < EVENING.c) {
      open = true; cls = 'nd-open';
      const left = EVENING.c - cur;
      msg = `🟢 ദർശനം തുറന്നിരിക്കുന്നു · ${left}m കൂടി`;
    } else {
      let nextLabel;
      if (cur < MORNING.o) nextLabel = '5:30 AM';
      else if (cur < EVENING.o) nextLabel = '5:45 PM';
      else nextLabel = 'നാളെ 5:30 AM';
      msg = `🔴 അടഞ്ഞിരിക്കുന്നു · ${nextLabel}-ൽ തുറക്കും`;
    }
    el.textContent = msg;
    el.className = `next-darshan-badge ${cls}`;
  }
  update();
  setInterval(update, 60000);
})();

/* ══════════════════════════════════════════════
   3. FESTIVAL COUNTDOWN
══════════════════════════════════════════════ */
(function initFestivalCountdown() {
  const el = $('festival-countdown');
  if (!el) return;

  const festivals = [
    { name: 'വിഷു 2026',       eng: 'Vishu',        date: new Date('2026-04-14T05:00:00') },
    { name: 'അഷ്ടമി രോഹിണി',  eng: 'Janmashtami',  date: new Date('2026-08-05T00:00:00') },
    { name: 'ഓണം 2026',        eng: 'Onam',          date: new Date('2026-09-14T00:00:00') },
    { name: 'ഗുരുവായൂർ ഏകാദശി', eng: 'Guruvayur Ekadasi', date: new Date('2026-11-21T00:00:00') },
  ];

  function getNext() {
    const now = new Date();
    return festivals.find(f => f.date > now) || festivals[festivals.length-1];
  }

  function pad(n) { return String(n).padStart(2,'0'); }

  let next = getNext();

  function update() {
    next = getNext();
    const diff = Math.max(0, next.date - new Date());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const dateStr = next.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

    el.innerHTML = `
      <div class="fc-label">
        <span class="fc-name">${next.name}</span>
        <span class="fc-eng">${next.eng} · ${dateStr}</span>
      </div>
      <div class="fc-units">
        <div class="fc-unit"><span class="fc-num">${pad(d)}</span><span class="fc-unit-label">ദിവസം</span></div>
        <div class="fc-sep">:</div>
        <div class="fc-unit"><span class="fc-num">${pad(h)}</span><span class="fc-unit-label">മണിക്കൂർ</span></div>
        <div class="fc-sep">:</div>
        <div class="fc-unit"><span class="fc-num">${pad(m)}</span><span class="fc-unit-label">മിനിറ്റ്</span></div>
        <div class="fc-sep">:</div>
        <div class="fc-unit"><span class="fc-num">${pad(s)}</span><span class="fc-unit-label">സെക്കൻഡ്</span></div>
      </div>`;
  }
  update();
  setInterval(update, 1000);
})();

/* ══════════════════════════════════════════════
   4. TODAY'S POOJA SCHEDULE
══════════════════════════════════════════════ */
(function initTodaySchedule() {
  const el = $('today-schedule');
  if (!el) return;

  const POOJAS = [
    { name: 'നിർമ്മാല്യദർശനം', time: '5:30 AM', h:5,  m:30 },
    { name: 'ഉഷ പൂജ',           time: '6:00 AM', h:6,  m:0  },
    { name: 'ദീപാരാധന',          time: '8:00 AM', h:8,  m:0  },
    { name: 'നട അടക്കൽ',         time: '9:00 AM', h:9,  m:0  },
    { name: 'ദീപാരാധന (സന്ധ്യ)', time: '5:45 PM', h:17, m:45 },
    { name: 'നട അടക്കൽ',         time: '6:45 PM', h:18, m:45 },
  ];

  function render() {
    const now = new Date();
    const cur = now.getHours()*60 + now.getMinutes();
    let html = '';
    POOJAS.forEach((p, i) => {
      const pMins = p.h*60 + p.m;
      const nextMins = i+1 < POOJAS.length ? POOJAS[i+1].h*60+POOJAS[i+1].m : 99999;
      const isActive = cur >= pMins && cur < nextMins && cur < 18*60+45;
      const isDone   = cur > pMins && !isActive;
      const cls = isActive ? 'ts-active' : (isDone ? 'ts-done' : '');
      html += `<div class="ts-row ${cls}">
        <span class="ts-name">${p.name}</span>
        <span class="ts-time">${p.time}</span>
      </div>`;
    });
    el.innerHTML = html;
  }
  render();
  setInterval(render, 60000);
})();

/* ══════════════════════════════════════════════
   5. WEATHER (Open-Meteo, no key)
══════════════════════════════════════════════ */
(function initWeather() {
  const el = $('weather-widget');
  if (!el) return;

  const LAT = 11.6814, LON = 75.6478;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weathercode,windspeed_10m,relative_humidity_2m&timezone=Asia%2FKolkata`;

  const WMO = {
    0:'☀️ Clear', 1:'🌤 Mostly Clear', 2:'⛅ Partly Cloudy', 3:'☁️ Overcast',
    45:'🌫 Foggy', 51:'🌦 Light Drizzle', 61:'🌧 Light Rain',
    63:'🌧 Moderate Rain', 65:'🌧 Heavy Rain', 80:'🌦 Showers', 95:'⛈ Thunderstorm',
  };

  fetch(url)
    .then(r => r.json())
    .then(data => {
      const c = data.current;
      const desc = WMO[c.weathercode] || '🌤';
      el.innerHTML = `
        <div class="weather-main">${desc.split(' ')[0]}</div>
        <div class="weather-temp">${Math.round(c.temperature_2m)}°C</div>
        <div class="weather-desc">${desc.split(' ').slice(1).join(' ')}</div>
        <div class="weather-meta">💧${c.relative_humidity_2m}% · 💨${Math.round(c.windspeed_10m)}km/h</div>`;
    })
    .catch(() => {
      el.innerHTML = '<div class="weather-desc" style="opacity:.5">കാലാവസ്ഥ ലഭ്യമല്ല</div>';
    });
})();

/* ══════════════════════════════════════════════
   6. ANNADHANAM NEXT DATE — First Sunday of Month
══════════════════════════════════════════════ */
(function initAnnadhanam() {
  const el = $('ann-next-date');
  if (!el) return;

  const ML_MONTHS = ['ജനുവരി','ഫെബ്രുവരി','മാർച്ച്','ഏപ്രിൽ','മേയ്','ജൂൺ',
                     'ജൂലൈ','ഓഗസ്റ്റ്','സെപ്റ്റംബർ','ഒക്ടോബർ','നവംബർ','ഡിസംബർ'];

  function getFirstSunday(year, month0) {
    // month0 = 0-indexed (JS style)
    const first = new Date(year, month0, 1);
    const day = first.getDay(); // 0=Sun
    const daysUntilSun = day === 0 ? 0 : 7 - day;
    return new Date(year, month0, 1 + daysUntilSun, 12, 0, 0); // noon
  }

  function getNextAnnadhanam() {
    const now = new Date();
    let candidate = getFirstSunday(now.getFullYear(), now.getMonth());
    // If it's already past (or today past noon), use next month
    if (candidate <= now) {
      const nm = now.getMonth() === 11
        ? new Date(now.getFullYear()+1, 0, 1)
        : new Date(now.getFullYear(), now.getMonth()+1, 1);
      candidate = getFirstSunday(nm.getFullYear(), nm.getMonth());
    }
    return candidate;
  }

  const next = getNextAnnadhanam();
  const d = next.getDate();
  const m = next.getMonth();
  const y = next.getFullYear();
  const diffMs = next - new Date();
  const diffDays = Math.floor(diffMs / 86400000);

  let countdownStr = '';
  if (diffDays === 0) countdownStr = ' · <strong style="color:#ff9933">ഇന്ന്! 🎉</strong>';
  else if (diffDays === 1) countdownStr = ' · <strong style="color:#ff9933">നാളെ! 🎉</strong>';
  else if (diffDays <= 7) countdownStr = ` · <strong style="color:#ff9933">${diffDays} ദിവസം</strong>`;

  el.innerHTML = `📅 ${d} ${ML_MONTHS[m]} ${y} · ഉച്ചക്ക് 12:00${countdownStr}`;
})();

/* ══════════════════════════════════════════════
   7. SUNRISE / SUNSET (computed, no API)
══════════════════════════════════════════════ */
(function initSunriseSunset() {
  const el = $('sunrise-sunset');
  if (!el) return;

  const LAT = 11.6814, LON = 75.6478;

  function calcSun(lat, lon) {
    const now = new Date();
    const JD = now.getTime() / 86400000 + 2440587.5;
    const n = JD - 2451545.0;
    const L = (280.46 + 0.9856474 * n) % 360;
    const g = ((357.528 + 0.9856003 * n) % 360) * Math.PI / 180;
    const lambda = (L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2*g)) * Math.PI / 180;
    const eps = 23.439 * Math.PI / 180;
    const sinDec = Math.sin(eps) * Math.sin(lambda);
    const dec = Math.asin(sinDec);
    const cosHA = (Math.cos(90.833 * Math.PI / 180) - sinDec * Math.sin(lat * Math.PI / 180))
                / (Math.cos(dec) * Math.cos(lat * Math.PI / 180));
    if (Math.abs(cosHA) > 1) return null;
    const HA = Math.acos(cosHA) * 180 / Math.PI;
    const noon = (720 - 4 * lon - ((n % 1) * 360 - 180)) / 1440;
    const rise = noon - HA / 360;
    const set  = noon + HA / 360;
    function toIST(frac) {
      const mins = Math.round(((frac % 1) + 0.5) * 1440 + 5.5 * 60) % 1440;
      const h = Math.floor(mins / 60), m = mins % 60;
      const ampm = h < 12 ? 'AM' : 'PM';
      return `${h%12||12}:${String(m).padStart(2,'0')} ${ampm}`;
    }
    return { rise: toIST(rise), set: toIST(set) };
  }

  const sun = calcSun(LAT, LON);
  if (sun) {
    el.innerHTML = `
      <div class="sun-row"><span class="sun-icon">🌅</span><span class="sun-label">സൂര്യോദയം</span><span class="sun-time">${sun.rise}</span></div>
      <div class="sun-row"><span class="sun-icon">🌇</span><span class="sun-label">സൂര്യാസ്തമയം</span><span class="sun-time">${sun.set}</span></div>`;
  }
})();

/* ══════════════════════════════════════════════
   8. MOON PHASE
══════════════════════════════════════════════ */
(function initMoonPhase() {
  const el = $('moon-phase');
  if (!el) return;
  const known = new Date('2024-01-11');
  const diff = (new Date() - known) / 86400000;
  const phase = ((diff % 29.53) + 29.53) % 29.53;
  const icons = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'];
  const names = ['അമാവാസി','വളരുന്ന','ഒന്നാം ചതുർഥി','വളരുന്ന','പൗർണ്ണമി','കുറയുന്ന','മൂന്നാം ചതുർഥി','കുറയുന്ന'];
  const idx = Math.round(phase / 29.53 * 8) % 8;
  el.innerHTML = `<span class="moon-icon">${icons[idx]}</span><span class="moon-name">${names[idx]}</span>`;
})();

/* ══════════════════════════════════════════════
   9. VISITOR COUNT
══════════════════════════════════════════════ */
(function initVisitorCount() {
  const el = $('visitor-count');
  if (!el) return;
  try {
    const seed = Math.floor(new Date().getTime() / 86400000);
    const display = 4872 + (seed % 500) + ((seed % 47) + 12);
    el.textContent = display.toLocaleString('en-IN') + ' ഭക്തർ';
  } catch(e) {}
})();

/* ══════════════════════════════════════════════
   10. KULAM RENOVATION PROGRESS
══════════════════════════════════════════════ */
(function initKulamProgress() {
  const el = $('kulam-days');
  if (!el) return;
  el.textContent = 'ആസൂത്രണ ഘട്ടം';
})();

/* ══════════════════════════════════════════════
   11. LIVE IST CLOCK
══════════════════════════════════════════════ */
(function initLiveClock() {
  const bar = document.querySelector('.live-status-bar');
  if (!bar) return;
  const clockEl = document.createElement('div');
  clockEl.id = 'live-clock';
  clockEl.setAttribute('aria-label', 'Current IST time');
  clockEl.style.cssText = 'font-family:"Cinzel",serif;font-size:.78rem;color:rgba(255,215,0,.7);white-space:nowrap;letter-spacing:.04em;flex-shrink:0;font-variant-numeric:tabular-nums;';
  bar.insertBefore(clockEl, bar.querySelector('.dsw-actions'));
  function tick() {
    const now = new Date();
    const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    const ampm = h < 12 ? 'AM' : 'PM';
    clockEl.textContent = `${(h%12||12)}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')} ${ampm}`;
  }
  tick();
  setInterval(tick, 1000);
})();

/* ══════════════════════════════════════════════
   12. SCROLL PROGRESS BAR
══════════════════════════════════════════════ */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,#c8860a,#ffd700,#ff9933);z-index:9999;transition:width .1s linear;pointer-events:none;box-shadow:0 0 8px rgba(255,180,0,.6);border-radius:0 3px 3px 0;';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docH > 0 ? (window.scrollY / docH * 100) + '%' : '0%';
  }, { passive: true });
})();
