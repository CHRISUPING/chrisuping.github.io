const cacheName = "v2";

// call install event
self.addEventListener("install", (evt) => {
  console.log("sw: Installed");
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
    fetch(evt.request)
      .then((res) => {
        const resClone = res.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(evt.request, resClone);
        });
        return res;
      })
      .catch((err) => {
        caches.match(e.request).then((res) => res);
      })
  );
});
