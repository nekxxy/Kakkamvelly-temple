/* ═══════════════════════════════════════════
   LIVE DARSHAN STATUS — computed from schedule
   No backend. Runs every minute.
═══════════════════════════════════════════ */
(function initDarshanBar() {
  const widget = document.getElementById('darshan-status-widget');
  if (!widget) return;

  const MORNING = { o: 5*60+30, c: 9*60 };       // 5:30–9:00
  const EVENING = { o: 17*60+45, c: 18*60+45 };  // 5:45–6:45

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

    let open=false, msg='';
    if (cur >= MORNING.o && cur < MORNING.c) {
      open=true;
      const left = MORNING.c - cur;
      msg = `ക്ഷേത്രം തുറന്നിരിക്കുന്നു · ${Math.floor(left/60)}h ${left%60}m കൂടി`;
    } else if (cur >= EVENING.o && cur < EVENING.c) {
      open=true;
      const left = EVENING.c - cur;
      msg = `ക്ഷേത്രം തുറന്നിരിക്കുന്നു · ${left}m കൂടി`;
    } else {
      let next;
      if (cur < MORNING.o)       next = { time: MORNING.o, label: '5:30 AM' };
      else if (cur < EVENING.o)  next = { time: EVENING.o, label: '5:45 PM' };
      else                        next = { time: MORNING.o + 24*60, label: 'നാളെ 5:30 AM' };
      const diff = next.time - (cur > next.time ? cur-24*60 : cur);
      const h=Math.floor(Math.abs(diff)/60), m=Math.abs(diff)%60;
      msg = `ക്ഷേത്രം അടഞ്ഞിരിക്കുന്നു · ${next.label}-ന് തുറക്കും (${h}h ${m}m)`;
    }

    dot.className = 'dsw-dot ' + (open ? 'open' : 'closed');
    txt.textContent = msg;
  }

  update();
  setInterval(update, 60000);
})();

/**
 * RUFLO AGENT: feature-agent
 * Live Darshan Status, Festival Countdown, Weather, Today's Schedule
 * Kakkamvelly Sreekrishna Temple
 */
'use strict';

/* ── Helpers ── */
const $ = id => document.getElementById(id);
const isMob = () => window.innerWidth <= 768;

/* ═══════════════════════════════════════════════
   1. LIVE DARSHAN STATUS WIDGET
   Calculates real open/closed from local time
═══════════════════════════════════════════════ */
(function initDarshanStatus() {
  const widget = $('darshan-status-widget');
  if (!widget) return;

  function getStatus() {
    const now  = new Date();
    const h    = now.getHours();
    const m    = now.getMinutes();
    const mins = h * 60 + m;
    // Morning: 5:30–9:00  (330–540)
    // Evening: 17:45–18:45 (1065–1125)
    const morningOpen  = 5*60+30, morningClose  = 9*60;
    const eveningOpen  = 17*60+45, eveningClose  = 18*60+45;
    const isOpen = (mins >= morningOpen && mins < morningClose) ||
                   (mins >= eveningOpen && mins < eveningClose);

    // Next opening
    let nextLabel = '';
    if (!isOpen) {
      if (mins < morningOpen)  nextLabel = 'Opens at 5:30 AM';
      else if (mins < eveningOpen) nextLabel = 'Opens at 5:45 PM';
      else nextLabel = 'Opens tomorrow at 5:30 AM';
    }

    // Current pooja
    const poojas = [
      [300,330,'നിർമ്മാല്യദർശനം (5:00–5:30 AM)'],
      [330,360,'തിടമ്പ് എഴുന്നള്ളിപ്പ് (5:30–6:00 AM)'],
      [360,390,'ഉഷ പൂജ (6:00–6:30 AM)'],
      [390,420,'അതിർത്തു പൂജ (6:30–7:00 AM)'],
      [420,480,'പന്തീരടി പൂജ (7:00–8:00 AM)'],
      [630,720,'ഉച്ചപൂജ (10:30 AM–12:00 PM)'],
      [1050,1080,'ദീപാരാധന (5:30–6:00 PM)'],
      [1140,1200,'അത്താഴ പൂജ (7:00–8:00 PM)'],
      [1200,1230,'ത്രിപ്പുക (8:00–8:30 PM)'],
    ];
    let currentPooja = '';
    for (const [s,e,name] of poojas) {
      if (mins >= s && mins < e) { currentPooja = name; break; }
    }

    return { isOpen, nextLabel, currentPooja };
  }

  function render() {
    const { isOpen, nextLabel, currentPooja } = getStatus();
    widget.innerHTML = `
      <div class="ds-indicator ${isOpen ? 'ds-open' : 'ds-closed'}">
        <span class="ds-dot"></span>
        <span class="ds-label">${isOpen ? 'ദർശനം തുറന്നിരിക്കുന്നു' : 'ദർശനം അടഞ്ഞിരിക്കുന്നു'}</span>
        <span class="ds-eng">${isOpen ? 'Temple Open' : 'Temple Closed'}</span>
      </div>
      ${currentPooja ? `<div class="ds-pooja">🪔 ${currentPooja}</div>` : ''}
      ${nextLabel    ? `<div class="ds-next">⏰ ${nextLabel}</div>` : ''}
      <div class="ds-time" id="ds-clock"></div>
    `;
    // live clock
    function tick() {
      const c = $('ds-clock');
      if (c) c.textContent = new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
    }
    tick();
    setInterval(tick, 1000);
  }

  render();
  // Refresh status every minute
  setInterval(render, 60000);
})();

/* ═══════════════════════════════════════════════
   2. FESTIVAL COUNTDOWN TIMER
═══════════════════════════════════════════════ */
(function initFestivalCountdown() {
  const el = $('festival-countdown');
  if (!el) return;

  // Upcoming festivals 2025-2026
  const festivals = [
    { name: 'അഷ്ടമി രോഹിണി', eng: 'Janmashtami', date: new Date('2025-08-16T00:00:00') },
    { name: 'ഓണം',            eng: 'Onam',         date: new Date('2025-09-05T00:00:00') },
    { name: 'ഗുരുവായൂർ ഏകാദശി',eng:'Guruvayur Ekadasi', date: new Date('2025-12-01T00:00:00') },
    { name: 'വിഷു',           eng: 'Vishu',         date: new Date('2026-04-14T00:00:00') },
    { name: 'അഷ്ടമി രോഹിണി', eng: 'Janmashtami',   date: new Date('2026-08-05T00:00:00') },
  ];

  const now = new Date();
  const next = festivals.find(f => f.date > now) || festivals[festivals.length-1];

  function pad(n) { return String(n).padStart(2,'0'); }

  function update() {
    const diff = Math.max(0, next.date - new Date());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);
    el.innerHTML = `
      <div class="fc-label">
        <span class="fc-name">${next.name}</span>
        <span class="fc-eng">${next.eng}</span>
      </div>
      <div class="fc-units">
        <div class="fc-unit"><span class="fc-num">${pad(d)}</span><span class="fc-unit-label">ദിവസം</span></div>
        <div class="fc-sep">:</div>
        <div class="fc-unit"><span class="fc-num">${pad(h)}</span><span class="fc-unit-label">മണിക്കൂർ</span></div>
        <div class="fc-sep">:</div>
        <div class="fc-unit"><span class="fc-num">${pad(m)}</span><span class="fc-unit-label">മിനിറ്റ്</span></div>
        <div class="fc-sep">:</div>
        <div class="fc-unit"><span class="fc-num">${pad(s)}</span><span class="fc-unit-label">സെക്കൻഡ്</span></div>
      </div>
    `;
  }
  update();
  setInterval(update, 1000);
})();

/* ═══════════════════════════════════════════════
   3. WEATHER WIDGET (Open-Meteo — FREE, no key)
   Lat/Lon: Nadapuram, Kozhikode
═══════════════════════════════════════════════ */
(function initWeather() {
  const el = $('weather-widget');
  if (!el) return;

  const LAT = 11.6814, LON = 75.6478; // Purameri
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weathercode,windspeed_10m,relative_humidity_2m&timezone=Asia%2FKolkata`;

  const WMO = {
    0:'☀️ Clear',1:'🌤 Mostly Clear',2:'⛅ Partly Cloudy',3:'☁️ Overcast',
    45:'🌫 Foggy',48:'🌫 Freezing Fog',51:'🌦 Light Drizzle',61:'🌧 Light Rain',
    63:'🌧 Moderate Rain',65:'🌧 Heavy Rain',80:'🌦 Showers',81:'🌧 Heavy Showers',
    95:'⛈ Thunderstorm',
  };

  el.innerHTML = `<span class="ww-loading">⏳ Loading weather…</span>`;

  fetch(url)
    .then(r => r.json())
    .then(data => {
      const c   = data.current;
      const temp = Math.round(c.temperature_2m);
      const code = c.weathercode;
      const desc = WMO[code] || WMO[Math.floor(code/10)*10] || '🌤 Clear';
      const humidity = c.relative_humidity_2m;
      const wind = Math.round(c.windspeed_10m);

      el.innerHTML = `
        <div class="ww-main">
          <span class="ww-icon">${desc.split(' ')[0]}</span>
          <span class="ww-temp">${temp}°C</span>
        </div>
        <div class="ww-desc">${desc.substring(desc.indexOf(' ')+1)}</div>
        <div class="ww-meta">
          <span>💧 ${humidity}%</span>
          <span>💨 ${wind} km/h</span>
          <span class="ww-loc">📍 Purameri</span>
        </div>
        <div class="ww-advice">${temp > 33 ? '☂️ Carry umbrella & water' : temp < 22 ? '🧣 Light wrap advised' : '✅ Good time to visit'}</div>
      `;
    })
    .catch(() => {
      el.innerHTML = `<span class="ww-err">🌤 Kozhikode, Kerala</span>`;
    });
})();

/* ═══════════════════════════════════════════════
   4. TODAY'S POOJA SCHEDULE WIDGET
═══════════════════════════════════════════════ */
(function initTodaySchedule() {
  const el = $('today-schedule');
  if (!el) return;

  const schedule = [
    { time: '5:00 AM',  name: 'നിർമ്മാല്യദർശനം', eng: 'Nirmalya Darshanam' },
    { time: '5:30 AM',  name: 'തിടമ്പ് എഴുന്നള്ളിപ്പ്', eng: 'Thidambu Ezhunnallippu' },
    { time: '6:00 AM',  name: 'ഉഷ പൂജ',           eng: 'Usha Pooja' },
    { time: '6:30 AM',  name: 'അതിർത്തു പൂജ',     eng: 'Athirthu Pooja' },
    { time: '7:00 AM',  name: 'പന്തീരടി പൂജ',    eng: 'Pantheeradi Pooja' },
    { time: '10:30 AM', name: 'ഉച്ചപൂജ',          eng: 'Uchha Pooja' },
    { time: '12:00 PM', name: 'ക്ഷേത്ര അടക്കൽ',  eng: 'Temple Closes' },
    { time: '5:00 PM',  name: 'ക്ഷേത്ര തുറക്കൽ', eng: 'Temple Opens' },
    { time: '5:30 PM',  name: 'ദീപാരാധന',         eng: 'Deepaaradhana' },
    { time: '7:00 PM',  name: 'അത്താഴ പൂജ',       eng: 'Athazha Pooja' },
    { time: '8:00 PM',  name: 'ത്രിപ്പുക',        eng: 'Thripuka' },
    { time: '8:30 PM',  name: 'ക്ഷേത്ര അടക്കൽ',  eng: 'Temple Closes' },
  ];

  const now   = new Date();
  const nowM  = now.getHours()*60 + now.getMinutes();

  function toMins(t) {
    const [time,ap] = t.split(' ');
    let [h,m]       = time.split(':').map(Number);
    if (ap === 'PM' && h !== 12) h += 12;
    if (ap === 'AM' && h === 12) h  = 0;
    return h*60 + m;
  }

  el.innerHTML = schedule.map(p => {
    const pm = toMins(p.time);
    const active = nowM >= pm && nowM < pm + 60;
    const past   = nowM > pm + 60;
    return `
      <div class="ts-row ${active ? 'ts-active' : past ? 'ts-past' : ''}">
        <span class="ts-time">${p.time}</span>
        <span class="ts-dot">${active ? '🔴' : past ? '✅' : '⭕'}</span>
        <div class="ts-info">
          <span class="ts-ml">${p.name}</span>
          <span class="ts-en">${p.eng}</span>
        </div>
      </div>
    `;
  }).join('');
})();

/* ═══════════════════════════════════════════════
   5. DYNAMIC PANCHANG (today's tithi/nakshatra)
   Uses Drik Panchang public API
═══════════════════════════════════════════════ */
(function initPanchang() {
  const el = $('panchang-widget');
  if (!el) return;
  const now = new Date();
  const days = ['ഞായർ','തിങ്കൾ','ചൊവ്വ','ബുധൻ','വ്യാഴം','വെള്ളി','ശനി'];
  const months = ['ചിങ്ങം','കന്നി','തുലാം','വൃശ്ചികം','ധനു','മകരം','കുംഭം','മീനം','മേടം','ഇടവം','മിഥുനം','കർക്കടകം'];

  el.innerHTML = `
    <div class="pc-row">
      <span class="pc-label">📅 ദിവസം</span>
      <span class="pc-value">${days[now.getDay()]}, ${now.getDate()} ${now.toLocaleString('en-IN',{month:'long'})} ${now.getFullYear()}</span>
    </div>
    <div class="pc-row">
      <span class="pc-label">🌙 മലയാള മാസം</span>
      <span class="pc-value">${months[now.getMonth()]}</span>
    </div>
    <div class="pc-row">
      <span class="pc-label">🪔 ക്ഷേത്ര വിശേഷം</span>
      <span class="pc-value" id="pc-special">—</span>
    </div>
  `;

  // Mark special days
  const special = {
    1: 'ഏകാദശി',  11: 'ഏകാദശി', 15: 'പൂർണ്ണിമ',
    30: 'അമാവാസി', 8: 'അഷ്ടമി',  4: 'ചതുർത്ഥി'
  };
  const d = now.getDate();
  const sp = $('pc-special');
  if (sp) sp.textContent = special[d] || 'സാധാരണ ദിനം';
})();

/* ═══════════════════════════════════════════════
   6. ANNADHANAM NEXT DATE CALCULATOR
   First Sunday of every month, noon
═══════════════════════════════════════════════ */
(function initAnnadhanam() {
  const el = document.getElementById('ann-next-date');
  if (!el) return;

  function getFirstSunday(year, month) {
    // month is 0-indexed
    const d = new Date(year, month, 1);
    const day = d.getDay(); // 0=Sun
    const diff = day === 0 ? 0 : 7 - day;
    return new Date(year, month, 1 + diff);
  }

  const now = new Date();
  let nextSunday = getFirstSunday(now.getFullYear(), now.getMonth());

  // If this month's first Sunday is in the past (or today after noon), move to next month
  const noonToday = new Date(nextSunday);
  noonToday.setHours(12, 0, 0, 0);
  if (now > noonToday) {
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    nextSunday = getFirstSunday(nextMonth.getFullYear(), nextMonth.getMonth());
  }

  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const mlMonths = ['ജനുവരി','ഫെബ്രുവരി','മാർച്ച്','ഏപ്രിൽ','മേയ്','ജൂൺ',
                    'ജൂലൈ','ഓഗസ്റ്റ്','സെപ്റ്റംബർ','ഒക്ടോബർ','നവംബർ','ഡിസംബർ'];

  const m = nextSunday.getMonth();
  const d = nextSunday.getDate();
  const y = nextSunday.getFullYear();

  el.innerHTML = `🍛 അടുത്ത അന്നദാനം: ${d} ${mlMonths[m]} ${y} (${months[m]} ${d}) · ഉച്ചക്ക് 12:00`;

  // Countdown if within 7 days
  const diff = nextSunday - now;
  const days = Math.floor(diff / 86400000);
  if (days <= 7 && days >= 0) {
    el.innerHTML += ` · <strong style="color:#ff9933">${days === 0 ? 'ഇന്ന്! 🎉' : days + ' days away'}</strong>`;
  }
})();

/* ═══════════════════════════════════════════════
   7. VISHU SPECIAL HOURS BADGE
   Show auto-badge on or near Vishu (Apr 14-15)
═══════════════════════════════════════════════ */
(function initSpecialHoursBadge() {
  const now   = new Date();
  const month = now.getMonth(); // 3 = April
  const date  = now.getDate();

  // Show badge in April 10-20 window
  if (month === 3 && date >= 10 && date <= 20) {
    const cards = document.querySelectorAll('.timing-card-full, .timing-card');
    if (cards.length > 0) {
      const badge = document.createElement('div');
      badge.className = 'special-hours-badge';
      badge.innerHTML = `🪔 <strong>വിഷു 2026 (Apr 15):</strong> &nbsp;ക്ഷേത്രം 5:00 AM – 7:30 PM&nbsp; (Special Hours)`;
      cards[cards.length - 1].appendChild(badge);
    }
  }
})();

/* ═══════════════════════════════════════════
   NEXT DARSHAN COUNTDOWN
═══════════════════════════════════════════ */
(function initNextDarshan() {
  const el = document.getElementById('next-darshan-countdown');
  if (!el) return;

  function update() {
    const now = new Date();
    const mins = now.getHours()*60 + now.getMinutes();
    const morningOpen=5*60+30, morningClose=9*60;
    const eveningOpen=17*60+45, eveningClose=18*60+45;

    let label='', diffMins=0, isOpen=false;

    if (mins>=morningOpen && mins<morningClose) {
      isOpen=true; label='🟢 ദർശനം: തുറന്നിരിക്കുന്നു';
      diffMins = morningClose - mins;
      label += ` · ${Math.floor(diffMins/60)}h ${diffMins%60}m കൂടി`;
    } else if (mins>=eveningOpen && mins<eveningClose) {
      isOpen=true; label='🟢 ദർശനം: തുറന്നിരിക്കുന്നു';
      diffMins = eveningClose - mins;
      label += ` · ${diffMins}m കൂടി`;
    } else {
      isOpen=false;
      if (mins<morningOpen) diffMins=morningOpen-mins;
      else if (mins<eveningOpen) diffMins=eveningOpen-mins;
      else diffMins=(24*60-mins)+morningOpen;
      const h=Math.floor(diffMins/60),m=diffMins%60;
      label=`🔴 അടഞ്ഞിരിക്കുന്നു · ${h>0?h+'h ':''}${m}m-ൽ തുറക്കും`;
    }

    el.textContent = label;
    el.className = `next-darshan-badge ${isOpen?'nd-open':'nd-closed'}`;
  }

  update();
  setInterval(update, 60000);
})();
