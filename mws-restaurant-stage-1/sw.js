//Much of this code adapted from: https://developers.google.com/web/fundamentals/primers/service-workers

var cacheID = 'mws-restaurant-v1'

var urlsToCache = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/js',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/register.js'
]

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheID)
    .then(function(cache) {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', function(event) {
  console.log('fetch')
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        console.log('cache hit')
        return response;
      }

      console.log('no cache hit')
      return fetch(event.request);
    })
  );
});
