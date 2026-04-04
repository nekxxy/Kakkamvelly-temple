/**
 * Kakkamvelly Temple — Service Worker
 * Ruflo Agent: pwa-agent
 * Caches core assets for offline access
 */

const CACHE = 'kvt-v17';
const CORE = [
  '/kakkamvelly-temple/',
  '/kakkamvelly-temple/index.html',
  '/kakkamvelly-temple/css/temple.min.css',
  '/kakkamvelly-temple/js/app.min.js',
  '/kakkamvelly-temple/js/galaxy.min.js',
  '/kakkamvelly-temple/images/baby-krishna-hero.avif',
  '/kakkamvelly-temple/images/mobile/baby-krishna-hero.avif',
  '/kakkamvelly-temple/audio/krishna-loop.mp3',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Cache-first for assets, network-first for HTML
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('/kakkamvelly-temple/index.html'))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
      if (resp.ok) {
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return resp;
    }))
  );
});
