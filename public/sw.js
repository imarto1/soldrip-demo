// Basic service worker for Balcony Garden AI
const CACHE_NAME = 'balcony-garden-ai-v1';
const urlsToCache = [
  '/',
  '/static/js/main.js',
  '/static/css/main.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
}); 