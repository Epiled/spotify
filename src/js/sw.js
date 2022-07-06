const cacheName = 'Spotify2017'

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            cache.addAll([
                './',
                './index.html',
                './manifest.webmanifest',
                './index.js',
                './css/style.min.css'
            ])
        })
    )
    return self.skipWaiting()
})

self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request)
      .then(cachedResponse => {
          return cachedResponse || fetch(event.request);
      }
    )
   )
 });