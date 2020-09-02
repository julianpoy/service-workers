'use strict';

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const { precaching, routing, strategies, expiration } = workbox;

const { precacheAndRoute } = precaching;
const { registerRoute } = routing;
const { NetworkFirst, CacheFirst } = strategies;
const { ExpirationPlugin } = expiration;

// Placeholder for Workbox CLI precache manifest injection
// Workbox will replace self.__WB_MANIFEST with the paths of all frontend static assets which will then be served cache-first by the service worker
precacheAndRoute(self.__WB_MANIFEST || []);

// Precache the newest index.html manually on install
// We could use precacheAndRoute for this, but it serves all entries as cacheFirst - we want networkFirst for index.html as mentioned in the next handler
self.addEventListener('install', async (event) => {
  const networkFirstPrecacheUrls = [
    "/",
    "/index.html"
  ];
  event.waitUntil(
    caches.open('base-asset-cache')
      .then((cache) => cache.addAll(networkFirstPrecacheUrls))
  );
});

// Index should be cached networkFirst - this way, users will always get the newest application version
const MAX_OFFILE_APP_AGE = 30; // Days
registerRoute(
  /\/index\.html/,
  new NetworkFirst({
    cacheName: 'base-asset-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * MAX_OFFILE_APP_AGE,
      }),
    ]
  })
);

// Icons should be served cache first - they almost never change, and serving an old version is accepable
const MAX_SVG_ICON_AGE = 60; // Days
registerRoute(
  /\/svg\/.*\.svg/,
  new CacheFirst({
    cacheName: 'svg-icon-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * MAX_SVG_ICON_AGE,
      }),
    ]
  })
);

// API calls should always fetch the newest if available. Fall back on cache for offline support.
// Limit the maxiumum age so that requests aren't too stale.
const MAX_OFFLINE_API_AGE = 60; // Days
registerRoute(
  /https:\/\/api\.recipesage\.com/,
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * MAX_OFFLINE_API_AGE,
      }),
    ]
  })
);

// S3 assets don't share ID's so we can cache them indefinitely
// Limit the cache to a maximum number of entries so as not to consume too much storage
registerRoute(
  /https:\/\/chefbook-prod.*amazonaws\.com\//,
  new CacheFirst({
    cacheName: 's3-image-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        purgeOnQuotaError: true // Clear the image cache if we exceed the browser cache limit
      }),
    ],
  })
);

console.log("Service worker mounted");
