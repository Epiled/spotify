const cacheName = 'Spotify 2017';

const versao = 31;

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            cache.addAll([
                './',
                './index.html',
                './manifest.webmanifest',
                './assets/css/style.min.css',
                './assets/js/index.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js',

                './assets/fonts/Circular/CircularStd-Medium.otf',

                './assets/imgs/botao-toggle.svg',
                './assets/imgs/spotify.svg',
                './assets/imgs/favicon.png',
                './assets/imgs/album-bryson-tiller-trapsoul-vinyl.webp',
                './assets/imgs/album-daya-hide-away.webp',
                './assets/imgs/album-justin-bieber-purpose-amazon.webp',
                './assets/imgs/album-zara-larsson-lush-life.webp',
                './assets/imgs/capa.webp',
                './assets/imgs/ruido.webp',
                './assets/imgs/planningtorock-lets-talk-about-gender-baby.webp',
                './assets/imgs/playlist-discovery-weekly.webp',
                './assets/imgs/facebook.webp',
                './assets/imgs/instagram.webp',
                './assets/imgs/twitter.webp',
                './assets/imgs/pwa/app_icon.png',
                './assets/imgs/pwa/maskable_icon.png',
                './assets/imgs/pwa/spotify_icone_512.png',
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