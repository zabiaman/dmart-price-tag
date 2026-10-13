const CACHE_NAME = 'dmart-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// د نصب وخت
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ کیش پرانیستل شو');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// د فعالولو وخت
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// د غوښتنو نیول (آفلاین کار)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
