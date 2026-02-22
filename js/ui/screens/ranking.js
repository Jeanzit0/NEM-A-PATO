export function renderRanking() {
    const r = [...state.jogadores].sort((a,b)=> a.pontos - b.pontos);
    box.innerHTML = `<h2>RANKING FINAL</h2>` + r.map((j,i)=>`<div>${i+1}º ${j.nome}: ${j.pontos}</div>`).join("") +
      `<button onclick="location.reload()" style="margin-top:20px">SAIR DO JOGO</button>`;
}