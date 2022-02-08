self.addEventListener('install', event => {
  console.log('sw install')
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  console.log('sw activate')
});

self.addEventListener('fetch', event => {
  console.log('ddd')
  return fetch('https://www.baidu.com')
})
