import { observarConexao } from "./conexao.js";
import { criarPreview, obterLocalizacao } from "./dispositivo.js";
import {
  adicionarOcorrencia,
  limparOcorrencias,
  listarOcorrencias
} from "./estado.js";
import {
  atualizarStatusConexao,
  renderizarOcorrencias
} from "./interface.js";

const formulario = document.querySelector("#form-ocorrencia");
const botaoLocalizar = document.querySelector("#botao-localizar");
const resultadoLocalizacao = document.querySelector("#resultado-localizacao");
const campoFoto = document.querySelector("#foto");
const preview = document.querySelector("#preview");
const mensagem = document.querySelector("#mensagem");
const botaoLimpar = document.querySelector("#limpar-registros");

let localizacaoAtual = null;
let urlTemporaria = null;

function atualizarLista() {
  renderizarOcorrencias(listarOcorrencias());
}

botaoLocalizar.addEventListener("click", async () => {
  botaoLocalizar.disabled = true;
  resultadoLocalizacao.textContent = "Obtendo localização...";

  try {
    localizacaoAtual = await obterLocalizacao();
    resultadoLocalizacao.textContent =
      `Localização adicionada. Precisão aproximada: ` +
      `${Math.round(localizacaoAtual.precisao)} m.`;
  } catch (erro) {
    localizacaoAtual = null;
    resultadoLocalizacao.textContent = erro.message;
  } finally {
    botaoLocalizar.disabled = false;
  }
});

campoFoto.addEventListener("change", () => {
  const arquivo = campoFoto.files[0];
  if (!arquivo) return;

  try {
    if (urlTemporaria) URL.revokeObjectURL(urlTemporaria);
    urlTemporaria = criarPreview(arquivo);
    preview.src = urlTemporaria;
    preview.hidden = false;
    mensagem.textContent = "Imagem preparada para pré-visualização.";
    mensagem.className = "sucesso";
  } catch (erro) {
    campoFoto.value = "";
    preview.hidden = true;
    mensagem.textContent = erro.message;
    mensagem.className = "erro";
  }
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const dados = new FormData(formulario);
  const titulo = dados.get("titulo").trim();
  const descricao = dados.get("descricao").trim();
  const arquivo = campoFoto.files[0];

  if (!titulo || !descricao) {
    mensagem.textContent = "Preencha o título e a descrição.";
    mensagem.className = "erro";
    return;
  }

  adicionarOcorrencia({
    titulo,
    descricao,
    localizacao: localizacaoAtual,
    fotoNome: arquivo?.name ?? null
  });

  formulario.reset();
  localizacaoAtual = null;
  resultadoLocalizacao.textContent = "Localização ainda não adicionada.";
  preview.hidden = true;
  if (urlTemporaria) URL.revokeObjectURL(urlTemporaria);
  urlTemporaria = null;
  mensagem.textContent = "Ocorrência salva neste aparelho.";
  mensagem.className = "sucesso";
  atualizarLista();
  document.querySelector("#titulo").focus();
});

botaoLimpar.addEventListener("click", () => {
  if (!confirm("Deseja remover todos os registros deste aparelho?")) return;
  limparOcorrencias();
  atualizarLista();
});

observarConexao(atualizarStatusConexao);
atualizarLista();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./service-worker.js");
      console.log("Service Worker registrado.");
    } catch (erro) {
      console.error("Falha ao registrar o Service Worker.", erro);
    }
  });
}
