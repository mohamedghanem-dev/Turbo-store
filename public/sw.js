const CACHE_NAME = "turbostore-cache-v2";

// Core files that must be available offline immediately after install.
// Built relative to the service worker's scope so this works both on the
// web root (Vercel/PWA) and inside a Capacitor app shell.
const SCOPE = self.registration ? self.registration.scope : "./";
const CORE_ASSETS = [
  SCOPE,
  new URL("index.html", SCOPE).href,
  new URL("manifest.json", SCOPE).href,
  new URL("favicon.ico", SCOPE).href,
  new URL("icons/icon-192x192.png", SCOPE).href,
  new URL("icons/icon-512x512.png", SCOPE).href,
];

// Install: pre-cache the core app shell.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean up old caches.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: network-first for navigation requests (so updates are picked up),
// falling back to cache when offline. Cache-first for static assets.
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests.
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Ignore cross-origin requests (e.g. fonts, APIs) — let the browser handle them normally.
  if (url.origin !== self.location.origin) return;

  // Navigation requests (page loads / SPA routes): try network, fall back to cached app shell.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(new URL("index.html", SCOPE).href))
        )
    );
    return;
  }

  // Static assets (JS, CSS, images, icons): cache-first, then network, and cache the result.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          if (!response || response.status !== 200) return response;
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => cached);
    })
  );
});
