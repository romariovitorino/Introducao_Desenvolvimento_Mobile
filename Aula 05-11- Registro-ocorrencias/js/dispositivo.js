const MENSAGENS_LOCALIZACAO = {
  1: "Permissão de localização negada.",
  2: "Posição indisponível neste aparelho.",
  3: "Tempo de localização excedido. Tente novamente."
};

export function obterLocalizacao() {
  if (!("geolocation" in navigator)) {
    return Promise.reject(
      new Error("Geolocalização indisponível neste navegador.")
    );
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (posicao) => {
        resolve({
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude,
          precisao: posicao.coords.accuracy
        });
      },
      (erro) => {
        const mensagem = MENSAGENS_LOCALIZACAO[erro.code]
          ?? "Não foi possível obter a localização.";
        reject(new Error(mensagem));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  });
}

export function validarImagem(arquivo) {
  if (!arquivo) return;
  if (!arquivo.type.startsWith("image/")) {
    throw new Error("Selecione um arquivo de imagem.");
  }
  const limite = 5 * 1024 * 1024;
  if (arquivo.size > limite) {
    throw new Error("A imagem deve possuir, no máximo, 5 MB.");
  }
}

export function criarPreview(arquivo) {
  validarImagem(arquivo);
  return URL.createObjectURL(arquivo);
}
