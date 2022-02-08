const CORS_PROXY = 'https://cors.r2d2.to'

self.addEventListener('install', event => {
  console.log('sw install')
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  console.log('sw activate')
});

self.addEventListener('fetch', event => {
  const { url } = event.request
  console.log({ url })
  event.respondWith(fetch(url.startsWith(CORS_PROXY) ? url : `${CORS_PROXY}/?${url}`))
})
