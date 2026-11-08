const SHELL_CACHE='pocketdex-shell-v2';
const DATA_CACHE='pocketdex-data-v1';
const SHELL=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(SHELL_CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>![SHELL_CACHE,DATA_CACHE].includes(k)).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.hostname==='raw.githubusercontent.com'&&url.pathname.includes('pokemon-tcg-pocket-database/')&&url.pathname.endsWith('.json')){
  event.respondWith(fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(DATA_CACHE).then(c=>c.put(request,copy)).catch(()=>{});}return response;}).catch(()=>caches.match(request)));return;
 }
 if(url.origin===self.location.origin){event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));}
});
