import "./config/firebase.js";
import { render } from "./ui/render.js";
import { tocarSom, toggleMusic } from "./audio/audioManager.js";
import { sairDaSala } from "./services/salaService.js";
import { trocarNomeEEntrar, voltarEspera } from "./services/salaService.js";
import { salvarDesenho, limparCanvas, fecharDesenho } from "./avatar/desenho.js";
import { tratarChat } from "./services/chatService.js";

render();

document.addEventListener("click", e => {
  if (e.target.id === "btn-sair") {
    sairDaSala();
  }
});

const musicBtn = document.getElementById("music-btn");
if (musicBtn) {
  musicBtn.addEventListener("click", toggleMusic);
}

const chatInput = document.getElementById("chat-input");
chatInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    tratarChat();
  }
});

//Eventos dos botões

document.addEventListener("click", e => {

  if (e.target.id === "btn-sair") {
    sairDaSala();
  }

  if (e.target.id === "btn-alterar-nome") {
    trocarNomeEEntrar();
  }

  if (e.target.id === "btn-cancelar") {
    voltarEspera();
  }

  if (e.target.id === "btn-salvar") {
    salvarDesenho();
  }

  if (e.target.id === "btn-limpar") {
    limparCanvas();
  }

  if (e.target.id === "btn-fechar") {
    fecharDesenho();
  }

  if (e.target.tagName === "BUTTON") {
    tocarSom("som-clique", 0.3);
  }
});