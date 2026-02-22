export function renderinicial() {
    playersDiv.style.display = "none";
    chatCont.style.display = "none";
    box.innerHTML = `<div class="logo">NEM A PATO</div><input id="nInp" placeholder="SEU NOME">

    <div style="margin-top:15px;">
      <label style="display:block; margin-bottom:8px;">SEU AVATAR</label>

      <div style="display:flex; gap:10px; align-items:center; justify-content:center;">
        
        <label style="
          background:#fff;
          color:#000;
          padding:10px 14px;
          font-weight:bold;
          text-transform:uppercase;
          cursor:pointer;
          border:1px solid #fff;
          min-width:140px;
          text-align:center;
        ">
          UPLOAD
          <input type="file" id="avatar-upload" accept="image/*" style="display:none;" onchange="uploadAvatar(event)">
        </label>

        <button onclick="abrirDesenho()" style="min-width:140px;">
          DESENHAR
        </button>

      </div>
    </div>
    <br>
    <button onclick="registrar()">ENTRAR</button>`;
    return;
  }