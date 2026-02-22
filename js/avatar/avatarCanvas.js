let desenhando = false;
let canvas = null;
let ctx = null;

export function abrirDesenho() {
  const modal = document.getElementById("modal-desenho");
  modal.style.display = "flex";

  canvas = document.getElementById("canvas-avatar");
  ctx = canvas.getContext("2d");

  ativarEventosCanvas();
}

export function ativarEventosCanvas() {
  canvas.onmousedown = (e) => {
    desenhando = true;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  canvas.onmouseup = () => desenhando = false;
  canvas.onmouseleave = () => desenhando = false;

  canvas.onmousemove = (e) => {
    if (!desenhando) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cor = document.getElementById("cor-pincel").value;

    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = cor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

}

export function salvarDesenho() {
  // Criar um canvas temporário
  const canvasTemp = document.createElement("canvas");
  canvasTemp.width = canvas.width;
  canvasTemp.height = canvas.height;

  const ctxTemp = canvasTemp.getContext("2d");

  // Fundo branco
  ctxTemp.fillStyle = "#ffffff";
  ctxTemp.fillRect(0, 0, canvasTemp.width, canvasTemp.height);

  // Desenho por cima
  ctxTemp.drawImage(canvas, 0, 0);

  ctxTemp.beginPath();
  ctxTemp.arc(150, 150, 150, 0, Math.PI * 2);
  ctxTemp.clip();

  // Salva como imagem com fundo branco
  avatarTemp = canvasTemp.toDataURL("image/png");
  state.meuAvatar = avatarTemp;

  fecharDesenho();
}

export function limparCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function fecharDesenho() { 
  document.getElementById("modal-desenho").style.display = "none"; 
}

export function uploadAvatar(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    state.meuAvatar = e.target.result;
  };

  reader.readAsDataURL(file);
}