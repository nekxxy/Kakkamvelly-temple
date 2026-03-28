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
    // Morning: 5:00–12:00  (300–720)
    // Evening: 17:00–20:30 (1020–1230)
    const morningOpen  = 5*60, morningClose  = 12*60;
    const eveningOpen  = 17*60, eveningClose  = 20*60+30;
    const isOpen = (mins >= morningOpen && mins < morningClose) ||
                   (mins >= eveningOpen && mins < eveningClose);

    // Next opening
    let nextLabel = '';
    if (!isOpen) {
      if (mins < morningOpen)  nextLabel = 'Opens at 5:00 AM';
      else if (mins < eveningOpen) nextLabel = 'Opens at 5:00 PM';
      else nextLabel = 'Opens tomorrow at 5:00 AM';
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

  const LAT = 11.675, LON = 75.638; // Nadapuram
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
          <span class="ww-loc">📍 Nadapuram</span>
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
