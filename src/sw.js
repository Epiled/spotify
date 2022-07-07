const cacheName = 'Spotify 2017';

const versao = 5;

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            cache.addAll([
                './',
                './index.html',
                './manifest.webmanifest',
                './css/style.min.css',
                './js/index.min.js',

                './fonts/Circular/CircularStd-Medium.otf',

                './imgs/botao-toggle.svg',
                './imgs/spotify.svg',
                './imgs/favicon.png',
                './imgs/album-bryson-tiller-trapsoul-vinyl.webp',
                './imgs/album-daya-hide-away.webp',
                './imgs/album-justin-bieber-purpose-amazon.webp',
                './imgs/album-zara-larsson-lush-life.webp',
                './imgs/capa.webp',
                './imgs/ruido.webp',
                './imgs/planningtorock-lets-talk-about-gender-baby.webp',
                './imgs/playlist-discovery-weekly.webp',
                './imgs/facebook.webp',
                './imgs/instagram.webp',
                './imgs/pwa/app_icon.png',
                './imgs/pwa/maskable_icon.png',
                './imgs/pwa/spotify_icone_512.png',
            ])
        })
    )
    return self.skipWaiting();
});

self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request)
      .then(cachedResponse => {
          return cachedResponse || fetch(event.request);
      }
    )
   )
 });