const CACHE_ATUAL = "registro-ocorrencias-v1";
const ARQUIVOS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./js/conexao.js",
  "./js/dispositivo.js",
  "./js/estado.js",
  "./js/interface.js"
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE_ATUAL).then((cache) => cache.addAll(ARQUIVOS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((nomes) => Promise.all(
      nomes
        .filter((nome) => nome !== CACHE_ATUAL)
        .map((nome) => caches.delete(nome))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evento) => {
  const requisicao = evento.request;
  const url = new URL(requisicao.url);

  if (requisicao.method !== "GET" || url.origin !== location.origin) return;

  evento.respondWith((async () => {
    const armazenada = await caches.match(requisicao);
    if (armazenada) return armazenada;

    try {
      const resposta = await fetch(requisicao);
      if (resposta.ok) {
        const cache = await caches.open(CACHE_ATUAL);
        cache.put(requisicao, resposta.clone());
      }
      return resposta;
    } catch (erro) {
      if (requisicao.mode === "navigate") {
        return caches.match("./index.html");
      }
      return new Response("Recurso indisponível offline.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  })());
});
