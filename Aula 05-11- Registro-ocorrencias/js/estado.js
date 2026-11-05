const CHAVE = "ocorrencias-aula";

function carregar() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) ?? [];
  } catch (erro) {
    console.error("Falha ao ler os registros.", erro);
    return [];
  }
}

let ocorrencias = carregar();

function persistir() {
  localStorage.setItem(CHAVE, JSON.stringify(ocorrencias));
}

export function listarOcorrencias() {
  return [...ocorrencias];
}

export function adicionarOcorrencia(dados) {
  const ocorrencia = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    titulo: dados.titulo,
    descricao: dados.descricao,
    localizacao: dados.localizacao,
    fotoNome: dados.fotoNome,
    criadaEm: new Date().toISOString(),
    criadaComRede: navigator.onLine
  };
  ocorrencias = [ocorrencia, ...ocorrencias];
  persistir();
  return ocorrencia;
}

export function limparOcorrencias() {
  ocorrencias = [];
  persistir();
}
