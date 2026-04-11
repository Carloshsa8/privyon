const CACHE_NAME = 'alexandria-cache-v5';
const ASSETS_TO_CACHE = [
  './index.html',
  './cursos.html',
  './contato.html',
  './login.html',
  './registro.html',
  './curso-detalhe.html',
  './meus-cursos.html',
  './aula.html',
  './checkout.html',
  './styles.css',
  './app.js',
  './data.js',
  './auth.js',
  './courses.js',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use addAll but carefully; if one fails, it might fail the whole install
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('Some assets failed to cache during install, continuing anyway...', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('index.html') || caches.match('./') || caches.match('./index.html');
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((response) => {
      return response || fetch(event.request);
    })
  );
});
