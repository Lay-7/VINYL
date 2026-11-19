const C='vinyl-v2',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request,u=new URL(q.url);
 if(q.method!=='GET'||u.origin!==location.origin||u.pathname.includes('/music/'))return;
 e.respondWith(caches.match(q,{ignoreSearch:true}).then(r=>{
  const f=fetch(q).then(n=>{if(n.ok)caches.open(C).then(c=>c.put(q,n.clone()));return n}).catch(()=>r||(q.mode==='navigate'?caches.match('index.html'):Response.error()));
  return r||f}))});
