/* Oriaya beta service worker — app-shell cache + push notifications.
   Same-origin app shell is cached; cross-origin requests (Firebase, fonts)
   pass through untouched and are never cached.
   Push: the oriaya-push Worker sends a JSON payload {title, body} (or
   nothing); we show the daily-reminder notification and open /app/ on tap. */
var CACHE = "oriaya-app-v2";
var SHELL = [
  "/app/",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-512-maskable.png",
  "icons/apple-touch-icon-180.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(SHELL);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE) return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; /* cross-origin: pass through */

  if (req.mode === "navigate") {
    /* HTML: network first so updates propagate, cache fallback offline. */
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (cache) { cache.put(req, copy); }).catch(function () {});
        return res;
      }).catch(function () {
        return caches.match(req).then(function (cached) {
          return cached || caches.match("/app/");
        });
      })
    );
    return;
  }

  /* Other same-origin GETs: cache first, network fallback, update cache. */
  event.respondWith(
    caches.match(req).then(function (cached) {
      var network = fetch(req).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(req, copy); }).catch(function () {});
        }
        return res;
      }).catch(function () { return cached; });
      return cached || network;
    })
  );
});

/* ---- Push notifications (sent by the oriaya-push Worker) ---- */
self.addEventListener("push", function (event) {
  var title = "Oriaya";
  var body = "Time for your Daily Rep — three minutes, just for you.";
  try {
    if (event.data) {
      var data = event.data.json();
      if (data) {
        if (data.title) title = data.title;
        if (data.body) body = data.body;
      }
    }
  } catch (e) { /* payload unreadable — fall back to the defaults above */ }
  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: "icons/icon-192.png",
      badge: "icons/icon-192.png",
      tag: "oriaya-daily-reminder", /* repeat reminders replace each other */
      data: { url: "/app/" }
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  var target = (event.notification.data && event.notification.data.url) || "/app/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clients) {
      for (var i = 0; i < clients.length; i++) {
        var c = clients[i];
        if (c.url.indexOf("/app/") !== -1 && "focus" in c) return c.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(target);
    })
  );
});
