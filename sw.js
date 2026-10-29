/* La app ya no usa modo sin conexión: este archivo borra la versión
   anterior guardada en los teléfonos para que siempre vean la más nueva. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', ev => {
  ev.waitUntil((async () => {
    const ks = await caches.keys();
    await Promise.all(ks.map(k => caches.delete(k)));
    await self.registration.unregister();
    const cs = await self.clients.matchAll({ type:'window' });
    cs.forEach(c => c.navigate(c.url));
  })());
});
