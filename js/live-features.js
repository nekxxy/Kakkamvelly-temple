/* ═══════════════════════════════════════════════
   LIVE FEATURES — Kakkamvelly Sreekrishna Temple
   ALL time calculations forced to IST (Asia/Kolkata, UTC+5:30)
   regardless of the visitor's device timezone.
═══════════════════════════════════════════════ */
'use strict';

/* ── Helpers ── */
const $ = id => document.getElementById(id);

/**
 * IST CLOCK HELPER
 * Returns a plain object with IST hour, minute, second, and
 * a Date-like object whose .getDate/.getMonth/.getFullYear
 * all reflect IST calendar — not device local time.
 *
 * Method: UTC ms + device UTC-offset + 330-min IST offset
 * This avoids Intl/toLocaleString which can vary by browser.
 */
function getIST() {
  const now = new Date();
  // Shift to IST: add device's UTC offset (to cancel it) then add +330 min
  const istMs = now.getTime() + now.getTimezoneOffset() * 60000 + 330 * 60000;
  const ist   = new Date(istMs);     // a Date whose local fields == IST
  return {
    h:    ist.getHours(),
    m:    ist.getMinutes(),
    s:    ist.getSeconds(),
    date: ist,                       // use .getDate() .getMonth() .getFullYear()
    mins: ist.getHours() * 60 + ist.getMinutes(),
  };
}

/* ══════════════════════════════════════════════
   1. DARSHAN STATUS BAR
   Uses IST exclusively — correct on any device timezone.
══════════════════════════════════════════════ */
(function initDarshanBar() {
  const widget = document.getElementById('darshan-status-widget');
  if (!widget) return;

  const MO = 5*60+30, MC = 9*60;       // Morning  05:30–09:00
  const EO = 17*60+45, EC = 18*60+45;  // Evening  17:45–18:45

  function update() {
    const { mins } = getIST();
    const dot = widget.querySelector('.dsw-dot');
    const txt = widget.querySelector('.dsw-text');
    if (!dot || !txt) return;

    let open = false, msg = '';
    if (mins >= MO && mins < MC) {
      open = true;
      const left = MC - mins;
      msg = `ക്ഷേത്രം തുറന്നിരിക്കുന്നു · ${Math.floor(left/60)}h ${left%60}m കൂടി`;
    } else if (mins >= EO && mins < EC) {
      open = true;
      const left = EC - mins;
      msg = `ക്ഷേത്രം തുറന്നിരിക്കുന്നു · ${left}m കൂടി`;
    } else {
      let nextLabel, diffMins;
      if (mins < MO)       { nextLabel = '5:30 AM';       diffMins = MO - mins; }
      else if (mins < EO)  { nextLabel = '5:45 PM';       diffMins = EO - mins; }
      else                  { nextLabel = 'നാളെ 5:30 AM'; diffMins = (24*60 - mins) + MO; }
      const h = Math.floor(diffMins / 60), m = diffMins % 60;
      msg = `ക്ഷേത്രം അടഞ്ഞിരിക്കുന്നു · ${nextLabel}-ന് തുറക്കും (${h}h ${m}m)`;
    }

    dot.className = 'dsw-dot ' + (open ? 'open' : 'closed');
    txt.textContent = msg;
  }

  update();
  setInterval(update, 60000);
})();

/* ══════════════════════════════════════════════
   2. NEXT DARSHAN COUNTDOWN (hero badge)
   IST-forced — fixes "Opens in 45m at midnight IST" bug.
══════════════════════════════════════════════ */
(function initNextDarshan() {
  const el = document.getElementById('next-darshan-countdown');
  if (!el) return;

  const MO = 5*60+30, MC = 9*60;
  const EO = 17*60+45, EC = 18*60+45;

  function update() {
    const { mins } = getIST();
    let label, isOpen = false, diffMins;

    if (mins >= MO && mins < MC) {
      isOpen = true;
      diffMins = MC - mins;
      label = `🟢 ദർശനം: തുറന്നിരിക്കുന്നു · ${Math.floor(diffMins/60)}h ${diffMins%60}m കൂടി`;
    } else if (mins >= EO && mins < EC) {
      isOpen = true;
      diffMins = EC - mins;
      label = `🟢 ദർശനം: തുറന്നിരിക്കുന്നു · ${diffMins}m കൂടി`;
    } else {
      if (mins < MO)       diffMins = MO - mins;
      else if (mins < EO)  diffMins = EO - mins;
      else                  diffMins = (24*60 - mins) + MO;
      const h = Math.floor(diffMins/60), m = diffMins%60;
      label = `🔴 അടഞ്ഞിരിക്കുന്നു · ${h>0 ? h+'h ' : ''}${m}m-ൽ തുറക്കും`;
    }

    el.textContent = label;
    el.className = `next-darshan-badge ${isOpen ? 'nd-open' : 'nd-closed'}`;
  }

  update();
  setInterval(update, 60000);
})();

/* ══════════════════════════════════════════════
   3. FESTIVAL COUNTDOWN — IST-anchored dates
   Dates use +05:30 offset → correct on any timezone device.
   getNextFestival() re-evaluated every tick.
══════════════════════════════════════════════ */
(function initFestivalCountdown() {

  /* ── Festival registry — 2026 to 2029, IST-anchored ────────────── */
  const FESTIVALS = [
    // ─── 2026 ───
    { ml:'വിഷു 2026',              en:'Vishu · Kerala New Year',     icon:'🌸', date:new Date('2026-04-14T05:00:00+05:30'), note:'ക്ഷേത്ര ദർശനം: 5:00 AM – 7:30 PM', special:true },
    { ml:'അഷ്ടമി രോഹിണി 2026',   en:'Janmashtami · Birth of Krishna',icon:'🪷', date:new Date('2026-08-05T00:00:00+05:30'), note:'ഉണ്ണി കൃഷ്ണൻ ജന്മദിനം', special:true },
    { ml:'തിരുവോണം 2026',          en:'Onam · Thiruvonam',            icon:'🌺', date:new Date('2026-09-14T00:00:00+05:30'), note:'ഓണ ദർശനം' },
    { ml:'ഗുരുവായൂർ ഏകാദശി 2026', en:'Guruvayur Ekadasi',             icon:'🛕', date:new Date('2026-11-21T00:00:00+05:30'), note:'ഏകാദശി വ്രതം' },
    { ml:'തിരുവാതിര 2026',          en:'Thiruvathira',                  icon:'💫', date:new Date('2026-12-27T00:00:00+05:30'), note:'ആർദ്ര ദർശനം' },
    // ─── 2027 ───
    { ml:'ശിവരാത്രി 2027',           en:'Maha Shivaratri',              icon:'🌙', date:new Date('2027-02-19T00:00:00+05:30'), note:'ഊർജ്ജ ആരാധന' },
    { ml:'വിഷു 2027',              en:'Vishu · Kerala New Year',     icon:'🌸', date:new Date('2027-04-14T05:00:00+05:30'), note:'ക്ഷേത്ര ദർശനം: 5:00 AM – 7:30 PM', special:true },
    { ml:'അഷ്ടമി രോഹിണി 2027',   en:'Janmashtami · Birth of Krishna',icon:'🪷', date:new Date('2027-08-25T00:00:00+05:30'), note:'ഉണ്ണി കൃഷ്ണൻ ജന്മദിനം', special:true },
    { ml:'തിരുവോണം 2027',          en:'Onam · Thiruvonam',            icon:'🌺', date:new Date('2027-09-03T00:00:00+05:30'), note:'ഓണ ദർശനം' },
    { ml:'ഗുരുവായൂർ ഏകാദശി 2027', en:'Guruvayur Ekadasi',             icon:'🛕', date:new Date('2027-11-10T00:00:00+05:30'), note:'ഏകാദശി വ്രതം' },
    { ml:'തിരുവാതിര 2027',          en:'Thiruvathira',                  icon:'💫', date:new Date('2027-12-16T00:00:00+05:30'), note:'ആർദ്ര ദർശനം' },
    // ─── 2028 ───
    { ml:'ശിവരാത്രി 2028',           en:'Maha Shivaratri',              icon:'🌙', date:new Date('2028-03-08T00:00:00+05:30'), note:'ഊർജ്ജ ആരാധന' },
    { ml:'വിഷു 2028',              en:'Vishu · Kerala New Year',     icon:'🌸', date:new Date('2028-04-13T05:00:00+05:30'), note:'ക്ഷേത്ര ദർശനം: 5:00 AM – 7:30 PM', special:true },
    { ml:'അഷ്ടമി രോഹിണി 2028',   en:'Janmashtami · Birth of Krishna',icon:'🪷', date:new Date('2028-08-12T00:00:00+05:30'), note:'ഉണ്ണി കൃഷ്ണൻ ജന്മദിനം', special:true },
    { ml:'തിരുവോണം 2028',          en:'Onam · Thiruvonam',            icon:'🌺', date:new Date('2028-08-22T00:00:00+05:30'), note:'ഓണ ദർശനം' },
    { ml:'ഗുരുവായൂർ ഏകാദശി 2028', en:'Guruvayur Ekadasi',             icon:'🛕', date:new Date('2028-11-28T00:00:00+05:30'), note:'ഏകാദശി വ്രതം' },
    { ml:'തിരുവാതിര 2028',          en:'Thiruvathira',                  icon:'💫', date:new Date('2028-01-05T00:00:00+05:30'), note:'ആർദ്ര ദർശനം' },
    // ─── 2029 ───
    { ml:'ശിവരാത്രി 2029',           en:'Maha Shivaratri',              icon:'🌙', date:new Date('2029-02-25T00:00:00+05:30'), note:'ഊർജ്ജ ആരാധന' },
    { ml:'വിഷു 2029',              en:'Vishu · Kerala New Year',     icon:'🌸', date:new Date('2029-04-14T05:00:00+05:30'), note:'ക്ഷേത്ര ദർശനം: 5:00 AM – 7:30 PM', special:true },
    { ml:'അഷ്ടമി രോഹിണി 2029',   en:'Janmashtami · Birth of Krishna',icon:'🪷', date:new Date('2029-09-01T00:00:00+05:30'), note:'ഉണ്ണി കൃഷ്ണൻ ജന്മദിനം', special:true },
    { ml:'തിരുവോണം 2029',          en:'Onam · Thiruvonam',            icon:'🌺', date:new Date('2029-09-11T00:00:00+05:30'), note:'ഓണ ദർശനം' },
    { ml:'ഗുരുവായൂർ ഏകാദശി 2029', en:'Guruvayur Ekadasi',             icon:'🛕', date:new Date('2029-11-17T00:00:00+05:30'), note:'ഏകാദശി വ്രതം' },
  ].sort((a,b) => a.date - b.date);  // Always chronological

  /* ── Find next festival (re-evaluated every call) ── */
  function getNext() {
    const now = new Date();
    return FESTIVALS.find(f => f.date > now) || FESTIVALS[FESTIVALS.length-1];
  }

  /* ── Countdown tick ── */
  function pad(n) { return String(n).padStart(2,'0'); }
  let currentNext = null;

  function tick() {
    const next = getNext();

    // If festival changed, update hero identity
    if (!currentNext || next.ml !== currentNext.ml) {
      currentNext = next;
      const el   = id => document.getElementById(id);
      const nameEl = el('fest-name-ml');   if (nameEl) nameEl.textContent  = next.ml;
      const enEl   = el('fest-name-en');   if (enEl)   enEl.textContent    = next.en;
      const iconEl = el('fest-icon');      if (iconEl) iconEl.textContent  = next.icon;
      const noteEl = el('fest-note');      if (noteEl) noteEl.textContent  = next.note || '';
      const dateEl = el('fest-date-badge');
      if (dateEl) dateEl.innerHTML =
        `<i class="fa-regular fa-calendar" aria-hidden="true"></i> ` +
        next.date.toLocaleDateString('en-IN', {day:'numeric', month:'long', year:'numeric'});
      buildQueue(next);
    }

    // Countdown digits
    const diff = Math.max(0, next.date - new Date());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);
    const set = (id, v) => { const el=document.getElementById(id); if(el) el.textContent=pad(v); };
    set('fc-d', d); set('fc-h', h); set('fc-m', m); set('fc-s', s);
  }

  /* ── Build upcoming queue (all FUTURE festivals except current) ── */
  let showAll = false;
  window.toggleFestQueue = function() {
    showAll = !showAll;
    const btn = document.getElementById('fest-toggle');
    if (btn) { btn.textContent = showAll ? 'Show less ▴' : 'Show all years ▾'; btn.setAttribute('aria-expanded', showAll); }
    buildQueue(currentNext || getNext());
  };

  function buildQueue(next) {
    const qEl = document.getElementById('fest-queue');
    if (!qEl) return;
    const now = new Date();

    // Upcoming = all festivals strictly after `next` (i.e. queue starts from item after current)
    let queue = FESTIVALS.filter(f => f !== next && f.date > now);
    const PREVIEW = 5;
    const limited = showAll ? queue : queue.slice(0, PREVIEW);

    const toggle = document.getElementById('fest-toggle');
    if (toggle) toggle.style.display = queue.length > PREVIEW ? '' : 'none';

    let html = '';
    let lastYear = -1;

    limited.forEach(f => {
      const year = f.date.getFullYear();
      if (year !== lastYear) {
        html += `<div class="fqi-year-sep" data-year="${year}" role="separator" aria-label="Year ${year}"></div>`;
        lastYear = year;
      }
      const daysAway = Math.ceil((f.date - now) / 86400000);
      const dateStr  = f.date.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
      const daysStr  = daysAway === 1 ? 'Tomorrow' : `${daysAway} days`;
      html += `
        <div class="fest-queue-item" role="listitem">
          <span class="fqi-emoji" aria-hidden="true">${f.icon}</span>
          <div class="fqi-info">
            <span class="fqi-ml">${f.ml}</span>
            <span class="fqi-en">${f.en}</span>
          </div>
          <div class="fqi-right">
            <span class="fqi-date">${dateStr}</span>
            <span class="fqi-days">${daysStr}</span>
          </div>
        </div>`;
    });

    if (!html) html = '<div style="color:rgba(255,255,255,.35);font-size:.82rem;text-align:center;padding:1rem">All 2029 festivals listed ✓</div>';
    qEl.innerHTML = html;
  }

  tick();
  setInterval(tick, 1000);
})();

})();

/* ══════════════════════════════════════════════
   4. TODAY'S POOJA SCHEDULE — IST
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
    const { mins } = getIST();
    let html = '';
    POOJAS.forEach((p, i) => {
      const pMins    = p.h * 60 + p.m;
      const nextMins = i+1 < POOJAS.length ? POOJAS[i+1].h*60+POOJAS[i+1].m : 99999;
      const isActive = mins >= pMins && mins < nextMins && mins < 18*60+45;
      const isDone   = mins > pMins && !isActive;
      html += `<div class="ts-row ${isActive?'ts-active':isDone?'ts-done':''}">
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
   5. WEATHER (Open-Meteo, no API key)
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
      const c    = data.current;
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
   FIX: Compare calendar DATE in IST (not ms diff from noon).
   "Today" now triggers correctly regardless of device timezone.
══════════════════════════════════════════════ */
(function initAnnadhanam() {
  const el = $('ann-next-date');
  if (!el) return;

  const ML_MONTHS = ['ജനുവരി','ഫെബ്രുവരി','മാർച്ച്','ഏപ്രിൽ','മേയ്','ജൂൺ',
                     'ജൂലൈ','ഓഗസ്റ്റ്','സെപ്റ്റംബർ','ഒക്ടോബർ','നവംബർ','ഡിസംബർ'];

  // Returns the first Sunday of the given IST-calendar year+month (0-indexed)
  function getFirstSunday(year, month0) {
    const first = new Date(year, month0, 1);
    const dow   = first.getDay(); // 0 = Sunday
    return new Date(year, month0, 1 + (dow === 0 ? 0 : 7 - dow));
    // NOTE: returns a plain calendar date (midnight local) — no noon bias
  }

  const ist = getIST();

  // Build today's calendar date in IST (no time component)
  const todayIST = new Date(ist.date.getFullYear(), ist.date.getMonth(), ist.date.getDate());

  let next = getFirstSunday(todayIST.getFullYear(), todayIST.getMonth());

  // If this month's first Sunday is strictly before today → use next month
  if (next < todayIST) {
    const nextM = todayIST.getMonth() === 11
      ? new Date(todayIST.getFullYear() + 1, 0, 1)
      : new Date(todayIST.getFullYear(), todayIST.getMonth() + 1, 1);
    next = getFirstSunday(nextM.getFullYear(), nextM.getMonth());
  }

  // Calendar-date diff — avoids the noon-bias bug
  const diffDays = Math.round((next - todayIST) / 86400000);

  let extra = '';
  if (diffDays === 0)      extra = ' · <strong style="color:#ff9933">ഇന്ന്! 🎉</strong>';
  else if (diffDays === 1) extra = ' · <strong style="color:#ff9933">നാളെ! 🎉</strong>';
  else if (diffDays <= 7)  extra = ` · <strong style="color:#ff9933">${diffDays} ദിവസം</strong>`;

  el.innerHTML = `📅 ${next.getDate()} ${ML_MONTHS[next.getMonth()]} ${next.getFullYear()} · ഉച്ചക്ക് 12:00${extra}`;
})();

/* ══════════════════════════════════════════════
   7. SUNRISE / SUNSET — computed, no API
══════════════════════════════════════════════ */
(function initSunriseSunset() {
  const el = $('sunrise-sunset');
  if (!el) return;
  const LAT = 11.6814, LON = 75.6478;
  const now = new Date();
  const JD  = now.getTime()/86400000 + 2440587.5;
  const n   = JD - 2451545.0;
  const L   = (280.46 + 0.9856474*n) % 360;
  const g   = ((357.528 + 0.9856003*n) % 360) * Math.PI/180;
  const lam = (L + 1.915*Math.sin(g) + 0.02*Math.sin(2*g)) * Math.PI/180;
  const eps = 23.439 * Math.PI/180;
  const sinDec = Math.sin(eps)*Math.sin(lam);
  const dec    = Math.asin(sinDec);
  const cosHA  = (Math.cos(90.833*Math.PI/180) - sinDec*Math.sin(LAT*Math.PI/180))
               / (Math.cos(dec)*Math.cos(LAT*Math.PI/180));
  if (Math.abs(cosHA) > 1) return;
  const HA   = Math.acos(cosHA)*180/Math.PI;
  const noon = (720 - 4*LON - ((n%1)*360-180))/1440;
  function toIST(frac) {
    const mins = Math.round(((frac%1)+0.5)*1440 + 330) % 1440;
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
  const idx   = Math.round(phase/29.53*8) % 8;
  el.innerHTML = `<span class="moon-icon">${icons[idx]}</span><span class="moon-name">${names[idx]}</span>`;
})();

/* ══════════════════════════════════════════════
   9. KULAM RENOVATION COUNTDOWN — May 1 2026 IST
══════════════════════════════════════════════ */
(function initKulamCountdown() {
  const targetDate = new Date('2026-05-01T00:00:00+05:30').getTime();

  function update() {
    const diff = targetDate - new Date().getTime();

    if (diff <= 0) {
      const wrap = document.querySelector('.kdb-countdown-wrap');
      if (wrap) wrap.innerHTML =
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
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(mins).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
})();

/* ══════════════════════════════════════════════
   10. KULAM STATUS
══════════════════════════════════════════════ */
(function initKulamProgress() {
  const el = $('kulam-days');
  if (el) el.textContent = 'ആസൂത്രണ ഘട്ടം';
})();

/* ══════════════════════════════════════════════
   11. LIVE IST CLOCK in status bar
══════════════════════════════════════════════ */
(function initLiveClock() {
  const bar = document.querySelector('.live-status-bar');
  if (!bar) return;
  const clockEl = document.createElement('div');
  clockEl.id = 'live-clock';
  clockEl.style.cssText = 'font-family:"Cinzel",serif;font-size:.78rem;color:rgba(255,215,0,.7);white-space:nowrap;letter-spacing:.04em;flex-shrink:0;font-variant-numeric:tabular-nums;';
  bar.insertBefore(clockEl, bar.querySelector('.dsw-actions'));
  function tick() {
    const { h, m, s } = getIST();
    const ampm = h < 12 ? 'AM' : 'PM';
    clockEl.textContent = `${h%12||12}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')} ${ampm} IST`;
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
    bar.style.width = docH > 0 ? (window.scrollY/docH*100)+'%' : '0%';
  }, { passive: true });
})();
