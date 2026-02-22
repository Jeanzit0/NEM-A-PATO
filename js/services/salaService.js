export function conectarASala(id) {
  const salaRef = db.ref(`salas/${id.toLowerCase()}/estado`);
  
  salaRef.once('value', (snap) => {
    const data = snap.val();
    // Verifica se o nome já existe na sala
    if (data && data.jogadores && data.jogadores.some(j => 
                                      j.nome.toLowerCase() === state.meuNome.toLowerCase() &&
                                      j.id !== minhaConexaoId)
        ) {
      document.getElementById("overlay-nome").style.display = "flex";
      state.salaAlvo = id.toLowerCase(); // Guarda para tentar novamente após trocar nome
      return;
    }
    realizarConexao(id);
  });
}

export function realizarConexao(id) {
  if (state.salaId) {
    db.ref(`salas/${state.salaId}/estado`).off();
    db.ref(`salas/${state.salaId}/chat`).off();
  }

  state.salaId = id.toLowerCase();
  const estadoRef = db.ref(`salas/${state.salaId}/estado`);

  // 🔥 Listener principal
  estadoRef.on('value', (snap) => {
    const onlineState = snap.val();
    if (onlineState) {
      state.tela = onlineState.tela;
      state.jogadores = onlineState.jogadores || [];
      state.jogadorDaVez = onlineState.jogadorDaVez;
      state.pergunta = onlineState.pergunta;
      state.valorAtual = onlineState.valorAtual;
      state.ultimoJogador = onlineState.ultimoJogador;

      state.souHost = (
        state.jogadores.length > 0 &&
        state.jogadores[0].id === minhaConexaoId
      );

      render();
    }
  });

  db.ref(`salas/${state.salaId}/chat`).on('child_added', (snap) => {
    const m = snap.val();
    exibirNoChat(m.autor, m.texto);
  });

  estadoRef.once('value', (snap) => {
    let currentData = snap.val() || { tela: "espera", jogadores: [] };

    // Remove duplicado por ID
    currentData.jogadores = (currentData.jogadores || []).filter(
      j => j.id !== minhaConexaoId
    );

    // Adiciona jogador
    currentData.jogadores.push({
      id: minhaConexaoId,
      nome: state.meuNome,
      pontos: 0,
      avatar: state.meuAvatar || null
    });

    // 🔥 SALVA NO FIREBASE
    estadoRef.set(currentData);

    // 🔥 onDisconnect correto (remove por índice atual)
    const index = currentData.jogadores.findIndex(j => j.id === minhaConexaoId);
    db.ref(`salas/${state.salaId}/estado/jogadores/${index}`)
      .onDisconnect()
      .remove();
  });

  document.getElementById("overlay-nome").style.display = "none";
  exibirNoChat("SISTEMA", `Conectado à sala: ${state.salaId}`);
}

export function salvarEstadoGlobal(novoEstado) {
  if (state.salaId) {
    db.ref(`salas/${state.salaId}/estado`).update(novoEstado);
  }
}

export function limparLocal() {
  if (!state.salaId) return;

  db.ref(`salas/${state.salaId}/estado`).off();
  db.ref(`salas/${state.salaId}/chat`).off();

  state.salaId = null;
  state.jogadores = [];
  state.tela = "inicial";
  state.jogadorDaVez = null;
  state.ultimoJogador = null;
  state.valorAtual = null;

  render();
}

export function executarComandoAdmin(msg) {
  const cmd = msg.split(" ")[0].toLowerCase();
  
  if (cmd === "/clear") {
    // Apaga o nó 'salas' inteiro do Firebase
    db.ref('salas').remove()
      .then(() => alert("Banco de dados resetado com sucesso!"))
      .catch(e => alert("Erro ao resetar: " + e.message));
  }
  
  if (cmd === "/endgame") salvarEstadoGlobal({ tela: "ranking" });
  
  if (cmd === "/takehost") {
    const index = state.jogadores.findIndex(j => j.nome === state.meuNome);
    if (index !== -1) {
      const me = state.jogadores.splice(index, 1)[0];
      state.jogadores.unshift(me);
      salvarEstadoGlobal({ jogadores: state.jogadores });
    }
  }
}