export function atualizarStatusConexao(online) {
  const status = document.querySelector("#status-conexao");
  status.textContent = online
    ? "Conexão disponível"
    : "Sem conexão: dados permanecem neste aparelho";
  status.className = online ? "status online" : "status offline";
}

export function renderizarOcorrencias(ocorrencias) {
  const lista = document.querySelector("#lista-ocorrencias");
  const resumo = document.querySelector("#resumo");
  lista.replaceChildren();
  resumo.textContent = `${ocorrencias.length} ocorrência(s) salva(s).`;

  if (ocorrencias.length === 0) {
    const item = document.createElement("li");
    item.textContent = "Nenhuma ocorrência foi registrada.";
    lista.append(item);
    return;
  }

  ocorrencias.forEach((ocorrencia) => {
    const item = document.createElement("li");
    item.className = "item";

    const titulo = document.createElement("h3");
    titulo.textContent = ocorrencia.titulo;

    const descricao = document.createElement("p");
    descricao.textContent = ocorrencia.descricao;

    const data = document.createElement("p");
    data.textContent = new Date(ocorrencia.criadaEm).toLocaleString("pt-BR");

    const local = document.createElement("p");
    local.textContent = ocorrencia.localizacao
      ? `Local: ${ocorrencia.localizacao.latitude.toFixed(6)}, ` +
        `${ocorrencia.localizacao.longitude.toFixed(6)}`
      : "Localização não informada";

    const foto = document.createElement("p");
    foto.textContent = ocorrencia.fotoNome
      ? `Foto selecionada: ${ocorrencia.fotoNome}`
      : "Foto não informada";

    const rede = document.createElement("p");
    rede.textContent = ocorrencia.criadaComRede
      ? "Registrada com rede disponível"
      : "Registrada enquanto o aparelho estava offline";

    item.append(titulo, descricao, data, local, foto, rede);
    lista.append(item);
  });
}
