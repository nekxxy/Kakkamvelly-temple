/**
 * Kakkamvelly Temple — Service Worker
 * Ruflo Agent: pwa-agent
 * Caches core assets for offline access
 */

const CACHE = 'kvt-v1';
const CORE  = [
  '/kakkamvelly-temple/',
  '/kakkamvelly-temple/index.html',
  '/kakkamvelly-temple/css/style.css',
  '/kakkamvelly-temple/css/krishna-animations.css',
  '/kakkamvelly-temple/css/baby-krishna.css',
  '/kakkamvelly-temple/css/mobile-futuristic.css',
  '/kakkamvelly-temple/css/live-widgets.css',
  '/kakkamvelly-temple/js/main.js',
  '/kakkamvelly-temple/js/krishna-animations.js',
  '/kakkamvelly-temple/js/mobile-futuristic.js',
  '/kakkamvelly-temple/js/live-features.js',
  '/kakkamvelly-temple/images/temple-entrance-deepam.jpg',
  '/kakkamvelly-temple/images/deepam-lamp-interior.jpg',
  '/kakkamvelly-temple/images/deepam-closeup.jpg',
  '/kakkamvelly-temple/images/hanging-lamps-corridor.jpg',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&family=Noto+Serif+Malayalam:wght@400;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
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
