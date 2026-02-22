import { state } from "../../core/state.js";
import { prepararContainer } from "../render.js";

export function renderEspera() {
  const box = prepararContainer();
  const chatCont = document.getElementById("chat-container");

  chatCont.style.display = "flex";

  // 🔹 Se ainda não entrou em sala
  if (!state.salaId) {
    box.innerHTML = `
      <h2>SALA DE ESPERA</h2>
      <p style="font-size: 1.2rem; color: #00ff00; margin: 30px 0;">
        Digite <strong>/join (nome_da_sala)</strong> para entrar em um jogo
      </p>
      <p><small>O chat está no canto inferior esquerdo.</small></p>
    `;
    return;
  }

  // 🔹 Se já está dentro da sala
  box.innerHTML = `
    <h2>SALA: ${state.salaId?.toUpperCase() || "-"}</h2>
  ` +
  state.jogadores.map(j => `<div>• ${j.nome}</div>`).join("") +
  (state.souHost
    ? `<button id="btn-iniciar" style="margin-top:20px">INICIAR JOGO</button>`
    : `<p><small>Agsuardando o Host iniciar...</small></p>`
  );
}