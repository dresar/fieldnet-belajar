/**
 * FieldNet Belajar - Service Worker
 * Cache-first offline strategy for app shell and all educational modules.
 */

const CACHE_NAME = 'fieldnet-belajar-v1.0.0';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/src/styles/tokens.css',
  '/src/styles/base.css',
  '/src/styles/components.css',
  '/src/styles/print.css',
  '/src/main.js',
  '/src/db.js',
  '/src/icons.js',
  '/src/router.js',
  '/src/search.js',
  '/src/views/dashboard.js',
  '/src/views/modules.js',
  '/src/views/lesson.js',
  '/src/views/quiz.js',
  '/src/views/checklist.js',
  '/src/views/troubleshooter.js',
  '/src/views/reports.js',
  '/src/views/search-view.js',
  '/src/views/notes.js',
  '/src/views/settings.js',
  '/content/manifest.json',
  '/content/module-01.json',
  '/content/module-02.json',
  '/content/module-03.json',
  '/content/module-04.json',
  '/content/module-05.json',
  '/content/module-06.json',
  '/content/module-07.json',
  '/content/module-08.json',
  '/content/module-09.json',
  '/content/module-10.json',
  '/content/module-11.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.allSettled(
        PRECACHE_ASSETS.map(async (url) => {
          try {
            await cache.add(url);
          } catch (err) {
            // Silently handle assets that only exist in dev or prod
          }
        })
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Ignore non-GET and chrome-extension requests
  if (req.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Cache-First strategy for static assets and content JSON
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(req).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Fallback for navigation requests to offline app shell
        if (req.mode === 'navigate') {
          return caches.match('/index.html').then((indexRes) => {
            return indexRes || caches.match('/');
          });
        }
        return new Response('Offline: Konten belum tercache.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      });
    })
  );
});
