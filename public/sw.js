// Service Worker básico para o Mestre das Contas
const CACHE_NAME = 'mestre-das-contas-v1';

// Atualmente não fazemos cache agressivo para evitar problemas de atualização,
// mas o arquivo precisa existir para o PWA ser válido.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Estratégia de Network Only ou Cache conforme necessário no futuro
  event.respondWith(fetch(event.request));
});
