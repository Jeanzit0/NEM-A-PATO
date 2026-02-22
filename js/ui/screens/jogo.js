export function renderJogo() {
    const jVez = state.jogadorDaVez;
    box.innerHTML = `
      <div style="margin-bottom:30px; color:#00ff00;">VEZ DE: <strong style="color:#fff;">${jVez.nome.toUpperCase()}</strong></div>
      <div class="pergunta-texto">${state.pergunta.texto}</div>
      <div class="unidade-texto">UM: ${state.pergunta.unidade}</div>
      
      ${state.valorAtual ? `<p>Palpite atual: <strong style="font-size:1.5rem;">${state.valorAtual}</strong></p>` : "<p style='color:#00ff00'>Início da rodada!</p>"}
      
      <div style="margin-top:20px">
        ${jVez.nome === state.meuNome ? `
          <input id="chInp" type="number" placeholder="Maior que ${state.valorAtual || 0}">
          <button onclick="enviarPalpite()">CHUTAR</button>
          ${state.valorAtual ? `<button onclick="duvidar()" style="background:none; color:red; border-color:red; margin-top:10px;">NEM A PATO!</button>` : ""}
        ` : `<p>Aguardando ${jVez.nome} jogar...</p>`}
      </div>`;
  }