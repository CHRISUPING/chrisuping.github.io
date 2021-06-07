const cacheName = "v1";

const cacheAssets = ["index.html", "/js/main.js", "/css/style.css"];

// call install event
self.addEventListener("install", (evt) => {
  console.log("sw: Installed");
  evt.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("sw cache asser");
        cache.addAll(cacheAssets);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});

// call actiavte event
self.addEventListener("activate", (evt) => {
  console.log("sw: Activated");
  evt.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("remove old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// call fetch event
self.addEventListener("fetch", (evt) => {
  console.log("se: Fetching");
  evt.respondWith(
    fetch(evt.request).catch(() => {
      caches.match(evt.request);
    })
  );
});
