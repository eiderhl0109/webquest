// GENERADO por vite.config.ts. No editar a mano.
const CACHE = "webquest-mvqw3gbt";
const FILES = ["./","./assets/geist-mono-symbols2-400-normal-BS9BGVxz.woff2","./assets/geist-mono-latin-400-normal-DTRLJnHl.woff2","./assets/geist-latin-400-normal-B40WzpMT.woff2","./assets/geist-mono-latin-ext-400-normal-DI-rJ0UV.woff2","./assets/geist-latin-ext-400-normal-CND6cjiG.woff2","./assets/geist-latin-600-normal-CSETrqM2.woff2","./assets/geist-latin-ext-600-normal-CVFbg5dS.woff2","./assets/index-DJA6zc14.css","./assets/index-8Xh6-Khy.js","./manifest.webmanifest","./favicon.svg","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./apple-touch-icon.png","./img/bici.svg","./img/cruasan.svg","./img/galletas.svg","./img/logo.svg","./img/paisaje.svg","./img/persona.svg","./img/portada.svg","./img/tarta.svg","./maquetas/dulce-1000.png","./maquetas/dulce-375.png","./maquetas/espiga-1000.png","./maquetas/espiga-375.png","./maquetas/lectura-1000.png","./maquetas/lectura-375.png","./maquetas/radio-1000.png","./maquetas/radio-375.png","./maquetas/roble-1000.png","./maquetas/roble-375.png","./maquetas/sonora-1000.png","./maquetas/sonora-375.png"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});
// Solo borra sus cachés antiguas: en github.io comparte el almacén con las otras apps
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x.startsWith('webquest-') && x !== CACHE).map((x) => caches.delete(x)))));
  self.clients.claim();
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // La página: primero la red (para recibir versiones nuevas) y, sin conexión, la guardada
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('./', { ignoreVary: true })));
    return;
  }
  // El resto lleva un hash en el nombre (o es una foto fija de img/): si está guardado, no cambia.
  // ignoreVary: si el servidor responde con «Vary: Origin», la copia guardada no coincidiría
  e.respondWith(caches.match(req, { ignoreVary: true }).then((hit) => hit || fetch(req)));
});
