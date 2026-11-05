export function observarConexao(aoAlterar) {
  function informarEstado() {
    aoAlterar(navigator.onLine);
  }

  window.addEventListener("online", informarEstado);
  window.addEventListener("offline", informarEstado);
  informarEstado();
}
