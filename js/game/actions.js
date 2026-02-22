export function registrar() {
  const n = document.getElementById("nInp").value.trim();
  if (!n) return;

  state.meuNome = n;
  state.tela = "escolha-sala";
  render();
}

export function finalizarRegistro(nome) {
  state.meuNome = nome;
  state.tela = "escolha-sala";
  render();
}