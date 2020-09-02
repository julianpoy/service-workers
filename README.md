# An intro to service workers

Here are some useful resources for getting started:

[Service Workers: an Introduction | Web Fundamentals](https://developers.google.com/web/fundamentals/primers/service-workers)

[The Offline Cookbook | Web Fundamentals](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook)

[Workbox](https://developers.google.com/web/tools/workbox)

[Workbox Strategies](https://developers.google.com/web/tools/workbox/modules/workbox-strategies)

[Precache Files with Workbox CLI](https://developers.google.com/web/tools/workbox/guides/precache-files/cli)

# Example service worker file

See `service-worker.js` for an example service worker that uses Workbox.

# Other example files

See `index.html` for a simple root page that registers the service worker on load.

See `manifest.json` for an example PWA manifest file to enable A2HS (add to homescreen).

See `workbox-config.js` for an example config file for the Workbox CLI - Note: you'll need to fix the paths in here.
