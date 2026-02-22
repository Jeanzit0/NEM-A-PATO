export const GameEngine = {
  iniciar() {},
  palpite() {},
  duvidar() {},
  sair() {}
};

function iniciarJogo() {
  const perguntaSorteada = bancoPerguntasOriginal[Math.floor(Math.random() * bancoPerguntasOriginal.length)];
  salvarEstadoGlobal({
    tela: "jogo",
    pergunta: perguntaSorteada,
    jogadorDaVez: state.jogadores[0],
    valorAtual: null,
    ultimoJogador: null
  });
}

function enviarPalpite() {
  const v = Number(document.getElementById("chInp").value);
  if (state.valorAtual && v <= state.valorAtual) return alert("O valor deve ser MAIOR que o anterior!");
  
  const idx = state.jogadores.findIndex(j => j.nome === state.jogadorDaVez.nome);
  const proximo = state.jogadores[(idx + 1) % state.jogadores.length];
  
  salvarEstadoGlobal({
    valorAtual: v,
    ultimoJogador: state.jogadorDaVez,
    jogadorDaVez: proximo
  });
}

async function duvidar() {
  tocarSom("som-duvida", 0.6);
  await delay(1000);

  const correta = state.pergunta.resposta;
  let novosJogadores = [...state.jogadores];
  
  if (state.valorAtual > correta) {
    const jIdx = novosJogadores.findIndex(j => j.nome === state.ultimoJogador.nome);
    novosJogadores[jIdx].pontos++;
    tocarSom("som-ponto", 0.6);
    alert(`MENTIRA! A resposta era ${correta}. ${state.ultimoJogador.nome} ganha 1 ponto.`);
  } else {
    const dIdx = novosJogadores.findIndex(j => j.nome === state.meuNome);
    novosJogadores[dIdx].pontos++;

    tocarSom("som-erro", 0.6);
    alert(`VERDADE! A resposta era ${correta}. Você errou e ganha 1 ponto.`);
  }

  const novaPergunta = bancoPerguntasOriginal[Math.floor(Math.random() * bancoPerguntasOriginal.length)];
  salvarEstadoGlobal({
    jogadores: novosJogadores,
    valorAtual: null,
    pergunta: novaPergunta,
    jogadorDaVez: state.jogadorDaVez
  });
}

function sairDaSala() {
  if (!state.salaId) return;

  const estadoRef = db.ref(`salas/${state.salaId}/estado`);

  estadoRef.once('value', (snap) => {
    const data = snap.val();
    if (!data || !data.jogadores) return;

    let jogadores = [...data.jogadores];
    const indexSaindo = jogadores.findIndex(j => j.id === minhaConexaoId);  

    if (indexSaindo === -1) return;

    const jogadorSaindo = jogadores[indexSaindo];
    jogadores.splice(indexSaindo, 1);

    // 🔥 Se não sobrou ninguém → apaga sala
    if (jogadores.length === 0) {
      db.ref(`salas/${state.salaId}`).remove();
      limparLocal();
      return;
    }

    let novoEstado = { jogadores };

    // 🔥 Se só sobrou 1 jogador → volta para espera
    if (jogadores.length === 1) {
      novoEstado.tela = "espera";
      novoEstado.valorAtual = null;
      novoEstado.ultimoJogador = null;
      novoEstado.jogadorDaVez = jogadores[0];
    }

    // 🔥 Se estava no jogo
    if (data.tela === "jogo") {

      // 👉 Se quem saiu era o jogador da vez
      if (data.jogadorDaVez?.nome === jogadorSaindo.nome) {
        const proxIndex = indexSaindo % jogadores.length;
        novoEstado.jogadorDaVez = jogadores[proxIndex];
      }

      // 👉 Se quem saiu era o último que deu palpite
      if (data.ultimoJogador?.nome === jogadorSaindo.nome) {
        novoEstado.ultimoJogador = null;
        novoEstado.valorAtual = null;
      }
    }

    estadoRef.update(novoEstado);

    limparLocal();
  });
}