export const TELAS = {
  INICIAL: "inicial",
  ESPERA: "espera",
  JOGO: "jogo",
  RANKING: "ranking"
};

/*Conexão do user, para evitar jogadores fantasmas*/
export const minhaConexaoId =
  Date.now() + "_" + Math.random().toString(36).slice(2, 9);