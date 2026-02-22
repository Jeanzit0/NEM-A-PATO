export function enviarMensagemChat(texto) {
  if (!state.salaId) return;
  db.ref(`salas/${state.salaId}/chat`).push({
    autor: `<strong>${state.meuNome}</strong>`,
    texto: texto
  });
}

export function exibirNoChat(autor, texto) {
  const box = document.getElementById("chat-messages");
  if(!box) return;
  box.innerHTML += `<div>${autor}: ${texto}</div>`;
  box.scrollTop = box.scrollHeight;
}

export function tratarChat() {
  const input = document.getElementById("chat-input");
  const msg = input.value.trim();
  if (!msg) return;

  if (msg.startsWith("/")) {
    const partes = msg.split(" ");
    const cmd = partes[0].toLowerCase();

    if (cmd === "/join") {
      const novaSala = partes[1];
      if (!novaSala) return alert("Uso: /join nome_da_sala");
      conectarASala(novaSala);
    } else {
      const senha = prompt("Senha Admin:");
      if (senha === "jean24gs") executarComandoAdmin(msg);
      else alert("Senha incorreta!");
    }
  } else {
    enviarMensagemChat(msg);
  }
  input.value = "";
}