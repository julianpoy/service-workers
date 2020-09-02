// Change directories and patterns accordingly. Example only.
module.exports = {
  "globDirectory": "src",
  "globPatterns": [
    "*.css",
    "*.js",
    "manifest.json"
  ],
  "dontCacheBustURLsMatching": new RegExp('.+\.[a-f0-9]{20}\..+'),
  "maximumFileSizeToCacheInBytes": 5000000,
  "swSrc": "src/service-worker.js",
  "swDest": "build/service-worker.js"
};
