// 舊版使用者頁面（/user.html）留下的 service worker 已停用。
// 這個版本會清掉舊快取並註銷自己；新版使用者頁面在 /user/，有自己的 sw.js。
const OLD_CACHES = ["smart-parking-u-v1", "smart-parking-user-v1"];

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    await Promise.all(OLD_CACHES.map(k => caches.delete(k)));
    await self.registration.unregister();
    const wins = await self.clients.matchAll({ type: "window" });
    wins.forEach(w => w.navigate(w.url));
  })());
});
