import { state } from "../../core/state.js";
import { sairDaSala } from "../../services/salaService.js";

export function renderPlayersPanel() {
  const playersDiv = document.getElementById("players");
  const chatCont = document.getElementById("chat-container");

  playersDiv.style.display = "block";
  chatCont.style.display = "flex";

  playersDiv.innerHTML = `
    <strong>SALA: ${state.salaId?.toUpperCase() || "-"}</strong>
    <br><hr>
  ` + 
  state.jogadores.map(j => `
    <div style="display:flex; align-items:center; gap:8px;">
      ${j.avatar ? `<img src="${j.avatar}" style="width:30px; height:30px; border-radius:50%; object-fit:cover;">` : ""}
      <span>${j.nome}: ${j.pontos}</span>
    </div>
  `).join("") + `
    <hr style="margin:10px 0;">
    <button id="btn-sair" style="background:#800; color:#fff; border-color:#800;">
      SAIR DA PARTIDA
    </button>
  `;

  const btnSair = document.getElementById("btn-sair");

  if (btnSair) {
    btnSair.addEventListener("click", sairDaSala);
  }
}