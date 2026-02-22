import { renderInicial } from "./screens/inicial.js";
import { renderEspera } from "./screens/espera.js";
import { renderJogo } from "./screens/jogo.js";
import { renderRanking } from "./screens/ranking.js";
import { state } from "../core/state.js";
import { renderPlayersPanel } from "./components/playersPanel.js";

export function render() {
  switch (state.tela) {
    case "inicial":
      renderPlayersPanel();
      renderInicial();
      break;
    case "espera":
      renderPlayersPanel();
      renderEspera();
      break;
    case "jogo":
      renderPlayersPanel();
      renderJogo();
      break;
    case "ranking":
      renderPlayersPanel();
      renderRanking();
      break;
  }
}

export function prepararContainer() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const box = document.createElement("div");
  box.className = "center";
  app.appendChild(box);

  return box;
}