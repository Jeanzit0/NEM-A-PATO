export function trocarNomeEEntrar() {
  const novo = document.getElementById("novoNomeInp").value.trim();
  if (!novo) return;
  state.meuNome = novo;
  realizarConexao(state.salaAlvo);
}

export function voltarEspera() {
  document.getElementById("overlay-nome").style.display = "none";
  state.tela = "escolha-sala";
  render();
}