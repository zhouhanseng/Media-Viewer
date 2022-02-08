self.addEventListener('install', event => {
  console.log('sw install')
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  console.log('sw activate')
});

self.addEventListener('fetch', event => {
  console.log('ddd')
  e.respondWith(Promise.resolve(
    new Response('<h1>Offline</h1>', {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-type': 'text/html'
      }
    })
  ))
})
