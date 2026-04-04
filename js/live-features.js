/* ═══════════════════════════════════════════════
   LIVE FEATURES — Kakkamvelly Sreekrishna Temple
═══════════════════════════════════════════════ */
'use strict';

/* ── Helpers ── */
const $ = id => document.getElementById(id);

/* ══════════════════════════════════════════════
   1. DARSHAN STATUS BAR
══════════════════════════════════════════════ */
(function initDarshanBar() {
  const widget = document.getElementById('darshan-status-widget');
  if (!widget) return;

  const MORNING = { o: 5*60+30, c: 9*60 };
  const EVENING = { o: 17*60+45, c: 18*60+45 };

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
      if (cur < MORNING.o)      next = { time: MORNING.o, label: '5:30 AM' };
      else if (cur < EVENING.o) next = { time: EVENING.o, label: '5:45 PM' };
      else                       next = { time: MORNING.o + 24*60, label: 'നാളെ 5:30 AM' };
      const diff = next.time - (cur > next.time ? cur - 24*60 : cur);
      const h = Math.floor(Math.abs(diff)/60), m = Math.abs(diff)%60;
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
   — Exact logic from commit 9d50d5d (working)
══════════════════════════════════════════════ */
(function initNextDarshan() {
  const el = document.getElementById('next-darshan-countdown');
  if (!el) return;

  function update() {
    const now  = new Date();
    const mins = now.getHours()*60 + now.getMinutes();
    const morningOpen=5*60+30, morningClose=9*60;
    const eveningOpen=17*60+45, eveningClose=18*60+45;

    let label='', diffMins=0, isOpen=false;

    if (mins>=morningOpen && mins<morningClose) {
      isOpen=true;
      diffMins = morningClose - mins;
      label = `🟢 ദർശനം: തുറന്നിരിക്കുന്നു · ${Math.floor(diffMins/60)}h ${diffMins%60}m കൂടി`;
    } else if (mins>=eveningOpen && mins<eveningClose) {
      isOpen=true;
      diffMins = eveningClose - mins;
      label = `🟢 ദർശനം: തുറന്നിരിക്കുന്നു · ${diffMins}m കൂടി`;
    } else {
      isOpen=false;
      if (mins<morningOpen)       diffMins = morningOpen - mins;
      else if (mins<eveningOpen)  diffMins = eveningOpen - mins;
      else                         diffMins = (24*60 - mins) + morningOpen;
      const h=Math.floor(diffMins/60), m=diffMins%60;
      label = `🔴 അടഞ്ഞിരിക്കുന്നു · ${h>0?h+'h ':''}${m}m-ൽ തുറക്കും`;
    }

    el.textContent = label;
    el.className = `next-darshan-badge ${isOpen ? 'nd-open' : 'nd-closed'}`;
  }

  update();
  setInterval(update, 60000);
})();

/* ══════════════════════════════════════════════
   3. FESTIVAL COUNTDOWN — ticking every second
   — Exact logic from commit 9d50d5d (working)
══════════════════════════════════════════════ */
(function initFestivalCountdown() {
  const el = $('festival-countdown');
  if (!el) return;

  const festivals = [
    { name: 'വിഷു 2026',          eng: 'Vishu',              date: new Date('2026-04-14T05:00:00+05:30') },
    { name: 'അഷ്ടമി രോഹിണി 2026', eng: 'Janmashtami',        date: new Date('2026-08-05T00:00:00+05:30') },
    { name: 'ഓണം 2026',           eng: 'Onam',               date: new Date('2026-09-14T00:00:00+05:30') },
    { name: 'ഗുരുവായൂർ ഏകാദശി',  eng: 'Guruvayur Ekadasi',  date: new Date('2026-11-21T00:00:00+05:30') },
  ];

  // FIX: re-evaluated every tick so next festival auto-advances correctly
  function getNextFestival() {
    const now = new Date();
    return festivals.find(f => f.date > now) || festivals[festivals.length-1];
  }

  function pad(n) { return String(n).padStart(2,'0'); }

  function update() {
    const next = getNextFestival();
    const diff = Math.max(0, next.date - new Date());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);
    const dateStr = next.date.toLocaleDateString('en-IN', {day:'numeric', month:'short'});
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
   6. ANNADHANAM — First Sunday each month
══════════════════════════════════════════════ */
(function initAnnadhanam() {
  const el = $('ann-next-date');
  if (!el) return;

  const ML_MONTHS = ['ജനുവരി','ഫെബ്രുവരി','മാർച്ച്','ഏപ്രിൽ','മേയ്','ജൂൺ',
                     'ജൂലൈ','ഓഗസ്റ്റ്','സെപ്റ്റംബർ','ഒക്ടോബർ','നവംബർ','ഡിസംബർ'];

  function getFirstSunday(year, month0) {
    const first = new Date(year, month0, 1);
    const day = first.getDay(); // 0=Sun
    return new Date(year, month0, 1 + (day === 0 ? 0 : 7 - day), 12, 0, 0);
  }

  const now = new Date();
  let next = getFirstSunday(now.getFullYear(), now.getMonth());
  if (next <= now) {
    const nm = now.getMonth() === 11
      ? new Date(now.getFullYear()+1, 0, 1)
      : new Date(now.getFullYear(), now.getMonth()+1, 1);
    next = getFirstSunday(nm.getFullYear(), nm.getMonth());
  }

  const d = next.getDate(), m = next.getMonth(), y = next.getFullYear();
  const diffDays = Math.floor((next - now) / 86400000);
  let extra = '';
  if (diffDays === 0) extra = ' · <strong style="color:#ff9933">ഇന്ന്! 🎉</strong>';
  else if (diffDays === 1) extra = ' · <strong style="color:#ff9933">നാളെ! 🎉</strong>';
  else if (diffDays <= 7) extra = ` · <strong style="color:#ff9933">${diffDays} ദിവസം</strong>`;

  el.innerHTML = `📅 ${d} ${ML_MONTHS[m]} ${y} · ഉച്ചക്ക് 12:00${extra}`;
})();

/* ══════════════════════════════════════════════
   7. SUNRISE / SUNSET
══════════════════════════════════════════════ */
(function initSunriseSunset() {
  const el = $('sunrise-sunset');
  if (!el) return;
  const LAT = 11.6814, LON = 75.6478;
  const now = new Date();
  const JD = now.getTime()/86400000 + 2440587.5;
  const n = JD - 2451545.0;
  const L = (280.46 + 0.9856474*n) % 360;
  const g = ((357.528 + 0.9856003*n) % 360) * Math.PI/180;
  const lambda = (L + 1.915*Math.sin(g) + 0.02*Math.sin(2*g)) * Math.PI/180;
  const eps = 23.439 * Math.PI/180;
  const sinDec = Math.sin(eps)*Math.sin(lambda);
  const dec = Math.asin(sinDec);
  const cosHA = (Math.cos(90.833*Math.PI/180) - sinDec*Math.sin(LAT*Math.PI/180))
              / (Math.cos(dec)*Math.cos(LAT*Math.PI/180));
  if (Math.abs(cosHA) > 1) return;
  const HA = Math.acos(cosHA)*180/Math.PI;
  const noon = (720 - 4*LON - ((n%1)*360-180))/1440;
  function toIST(frac) {
    const mins = Math.round(((frac%1)+0.5)*1440 + 5.5*60) % 1440;
    const h=Math.floor(mins/60), m=mins%60;
    return `${h%12||12}:${String(m).padStart(2,'0')} ${h<12?'AM':'PM'}`;
  }
  el.innerHTML = `
    <div class="sun-row"><span class="sun-icon">🌅</span><span class="sun-label">സൂര്യോദയം</span><span class="sun-time">${toIST(noon-HA/360)}</span></div>
    <div class="sun-row"><span class="sun-icon">🌇</span><span class="sun-label">സൂര്യാസ്തമയം</span><span class="sun-time">${toIST(noon+HA/360)}</span></div>`;
})();

/* ══════════════════════════════════════════════
   8. MOON PHASE
══════════════════════════════════════════════ */
(function initMoonPhase() {
  const el = $('moon-phase');
  if (!el) return;
  const phase = ((((new Date() - new Date('2024-01-11'))/86400000) % 29.53) + 29.53) % 29.53;
  const icons = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'];
  const names = ['അമാവാസി','വളരുന്ന','ഒന്നാം ചതുർഥി','വളരുന്ന','പൗർണ്ണമി','കുറയുന്ന','മൂന്നാം ചതുർഥി','കുറയുന്ന'];
  const idx = Math.round(phase/29.53*8) % 8;
  el.innerHTML = `<span class="moon-icon">${icons[idx]}</span><span class="moon-name">${names[idx]}</span>`;
})();

/* ══════════════════════════════════════════════
   9. KULAM PROGRESS
══════════════════════════════════════════════ */
(function initKulamProgress() {
  const el = $('kulam-days');
  if (el) el.textContent = 'ആസൂത്രണ ഘട്ടം';
})();

/* ══════════════════════════════════════════════
   10. LIVE IST CLOCK
══════════════════════════════════════════════ */
(function initLiveClock() {
  const bar = document.querySelector('.live-status-bar');
  if (!bar) return;
  const clockEl = document.createElement('div');
  clockEl.id = 'live-clock';
  clockEl.style.cssText = 'font-family:"Cinzel",serif;font-size:.78rem;color:rgba(255,215,0,.7);white-space:nowrap;letter-spacing:.04em;flex-shrink:0;font-variant-numeric:tabular-nums;';
  bar.insertBefore(clockEl, bar.querySelector('.dsw-actions'));
  function tick() {
    const now = new Date();
    const h=now.getHours(), m=now.getMinutes(), s=now.getSeconds();
    clockEl.textContent = `${h%12||12}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')} ${h<12?'AM':'PM'}`;
  }
  tick();
  setInterval(tick, 1000);
})();

/* ══════════════════════════════════════════════
   11. SCROLL PROGRESS BAR
══════════════════════════════════════════════ */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,#c8860a,#ffd700,#ff9933);z-index:9999;transition:width .1s linear;pointer-events:none;box-shadow:0 0 8px rgba(255,180,0,.6);border-radius:0 3px 3px 0;';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docH > 0 ? (window.scrollY/docH*100)+'%' : '0%';
  }, {passive:true});
})();

/* ══════════════════════════════════════════════
   KULAM RENOVATION COUNTDOWN — May 1 2026
══════════════════════════════════════════════ */
(function initKulamCountdown() {
  const targetDate = new Date('2026-05-01T00:00:00').getTime();

  function update() {
    const now  = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      const cd = document.getElementById('kulam-cd-days');
      if (cd) cd.closest('.kdb-countdown-wrap').innerHTML =
        '<p class="kdb-countdown-label" style="color:#22c55e">🔨 Renovation Started!</p>';
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins  = Math.floor((diff / (1000 * 60)) % 60);

    const dEl = document.getElementById('kulam-cd-days');
    const hEl = document.getElementById('kulam-cd-hours');
    const mEl = document.getElementById('kulam-cd-mins');
    if (dEl) dEl.textContent = days;
    if (hEl) hEl.textContent = String(hours).padStart(2,'0');
    if (mEl) mEl.textContent = String(mins).padStart(2,'0');
  }

  update();
  setInterval(update, 1000);
})();
