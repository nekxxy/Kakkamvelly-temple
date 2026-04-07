/**
 * Kakkamvelly Temple — Service Worker v2
 * AUTO-UPDATE: users never need to manually clear cache
 *
 * Strategy:
 *  - HTML: always network-first (fresh content guaranteed)
 *  - CSS/JS: network-first with cache fallback (updates instantly)
 *  - Images/audio: cache-first (rarely change, saves bandwidth)
 *  - New SW activates immediately via skipWaiting + clients.claim
 *  - Old caches deleted on activate
 *  - Page auto-reloads when new SW takes control
 */

const CACHE = 'kvt-v1-0-9-b48';
const CACHE_IMAGES = 'kvt-img-v48';

/* Assets that change with every deploy — always go network-first */
const NETWORK_FIRST = [
  '/kakkamvelly-temple/',
  '/kakkamvelly-temple/index.html',
  '/kakkamvelly-temple/css/temple.min.css',
  '/kakkamvelly-temple/js/app.min.js',
  '/kakkamvelly-temple/js/galaxy.min.js',
  '/kakkamvelly-temple/sw.js',
];

/* Static assets — cache-first (save bandwidth) */
const CACHE_FIRST = [
  '/kakkamvelly-temple/audio/krishna-loop.mp3',
];

/* ── INSTALL: pre-cache critical assets ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll([
        '/kakkamvelly-temple/',
        '/kakkamvelly-temple/index.html',
        '/kakkamvelly-temple/css/temple.min.css',
        '/kakkamvelly-temple/js/app.min.js',
        '/kakkamvelly-temple/js/galaxy.min.js',
      ]))
      /* Skip waiting immediately — don't hold users on old version */
      .then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE: delete ALL old caches, claim all clients ── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== CACHE && k !== CACHE_IMAGES)
          .map(k => {
            console.log('[SW] Deleting old cache:', k);
            return caches.delete(k);
          })
      ))
      /* Claim all open tabs immediately — they get the new SW now */
      .then(() => self.clients.claim())
      /* Tell every open tab to reload so they get fresh assets */
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'SW_UPDATED', cache: CACHE });
        });
      })
  );
});

/* ── FETCH: smart routing ── */
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  /* Skip non-GET and cross-origin API calls (weather, fonts etc) */
  if (e.request.method !== 'GET') return;
  if (!url.hostname.includes('kakkamvellytemple') &&
      !url.hostname.includes('github.io') &&
      !url.pathname.startsWith('/kakkamvelly-temple')) return;

  const path = url.pathname;

  /* HTML navigation: always network-first, cache as fallback */
  if (e.request.mode === 'navigate' ||
      path.endsWith('.html') || path.endsWith('/')) {
    e.respondWith(
      fetch(e.request)
        .then(resp => {
          if (resp.ok) {
            const clone = resp.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return resp;
        })
        .catch(() => caches.match(e.request)
          .then(cached => cached || caches.match('/kakkamvelly-temple/index.html')))
    );
    return;
  }

  /* CSS / JS: network-first — always fresh after deploy */
  if (path.endsWith('.css') || path.endsWith('.js')) {
    e.respondWith(
      fetch(e.request)
        .then(resp => {
          if (resp.ok) {
            const clone = resp.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return resp;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  /* Images: cache-first for bandwidth saving */
  if (path.match(/\.(avif|webp|jpg|jpeg|png|gif|svg|ico)$/)) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(resp => {
          if (resp.ok) {
            const clone = resp.clone();
            caches.open(CACHE_IMAGES).then(c => c.put(e.request, clone));
          }
          return resp;
        });
      })
    );
    return;
  }

  /* Everything else: network with cache fallback */
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
