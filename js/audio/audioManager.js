export function tocarSom(id, volume = 0.5) {
  const som = document.getElementById(id);
  if (!som) return;
  som.volume = volume;
  som.currentTime = 0; // Reinicia se já estiver tocando
  som.play();
}

export function toggleMusic() {
  const musica = document.getElementById("bg-music");
  const btn = document.getElementById("music-btn");

  if (musica.paused) {
    musica.volume = 0.5;
    musica.play();
    btn.textContent = "🎵 MÚSICA";
  } else {
    musica.pause();
    btn.textContent = "🎵🚫 MÚSICA";
  }
}

export function iniciarMusicaAoPrimeiroClique() {
  function iniciarMusica() {
    const musica = document.getElementById("bg-music");
    const btn = document.getElementById("music-btn");

    musica.volume = 0.5;
    musica.play();
    btn.textContent = "🎵 MÚSICA";

    document.removeEventListener("click", iniciarMusica);
  }

  document.addEventListener("click", iniciarMusica);
}