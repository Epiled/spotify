const cacheName = 'Spotify2017'

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            cache.addAll([
                './',
                './index.html',
                './manifest.webmanifest',
                './index.js',
                './css/style.css'
            ])
        })
    )
    return self.skipWaiting()
})

// self.addEventListener('activate', e => {
//     self.clients.claim()
// })

// self.addEventListener('fetch', async e => {
//     const req = e.request
//     const url = new URL(req.url)

//     if(url.origin === location.origin) {
//         e.respondWith(cacheFirst(req))
//     } else {
//         e.respondWith(networkAndCache(req))
//     }
// })

// async function cacheFirst(req) {
//     const cache = await caches.open(cacheName)
//     const cached = await cache.match(req)
    
//     return cached || fetch(req)
// }

// async function networkAndCache(req) {
//     const cache = await caches.open(cacheName)
//     try {
//         const refresh = await fetch(req)
//         await cache.put(req, refresh.clone())

//         return refresh
//     } catch(e) {
//         const cached = await cache.match(req)
//         return cached
//     }
// }

// const urlsToCache = ["./", "./index.html", "./manifest.webmanifest", "./index.js", "./css/style.css"];
// self.addEventListener("install", (event) => {
//    event.waitUntil(async () => {
//       const cache = await caches.open("pwa-assets");
//       return cache.addAll(urlsToCache);
//    });
// });

self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request)
      .then(cachedResponse => {
        // It can update the cache to serve updated content on the next request
          return cachedResponse || fetch(event.request);
      }
    )
   )
 });