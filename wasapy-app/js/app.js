
// ===== MODO DIRECTO (sin backend): usa Pollinations gratis sin llave =====
const POLL = {
  async chat(messages, model){
    const sys = "Eres Wasapy, un agente de IA de presencia real para negocios. Manejas WhatsApp, Messenger y Facebook del negocio como si fueras el dueño. Respondes en español, de forma natural y breve como en un chat. Aprendes cómo habla el dueño y te adaptas. Nunca dices que eres ChatGPT ni otra IA: eres Wasapy.";
    const prompt = sys+"\n\n"+messages.map(m=>(m.role==="user"?"Usuario":"Wasapy")+": "+m.content).join("\n")+"\nWasapy:";
    const r = await fetch("https://text.pollinations.ai/"+encodeURIComponent(prompt)+"?model="+(model||"openai"));
    if(!r.ok) throw new Error("pollinations");
    return await r.text();
  },
  image(prompt, w, h){
    return "https://image.pollinations.ai/prompt/"+encodeURIComponent(prompt)+"?width="+(w||1024)+"&height="+(h||1024)+"&model=flux&nologo=true&seed="+Math.floor(Math.random()*999999);
  }
};
// intenta backend primero, si falla usa Pollinations directo
async function aiChat(messages){
  try{
    const r = await fetch(WASAPY_API+"/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages})});
    if(r.ok){ const d = await r.json(); return {text:d.respuesta||d.text, via:"backend"}; }
    throw 0;
  }catch(e){ return {text: await POLL.chat(messages), via:"directo"}; }
}

/* ============ WASAPY — App ============ */
/* Configura aquí la URL del backend */
/* API base viene de js/config.js (WASAPY_API) */
const API_BASE = (typeof WASAPY_API !== "undefined" ? WASAPY_API : "").replace(/\/+$/, "");

const $ = (id) => document.getElementById(id);
const chatBox = $("chatBox"), chatInput = $("chatInput");

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

/* ---------- Navegación ---------- */
document.querySelectorAll(".navbtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".navbtn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    btn.classList.add("active");
    $(btn.dataset.view).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
$("brandHome").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector('.navbtn[data-view="v-chat"]').click();
});

/* ---------- Estado del sistema ---------- */
$("healthBtn").addEventListener("click", async () => {
  $("healthModal").classList.add("open");
  $("provList").innerHTML = '<div class="spinner"></div>';
  try {
    const r = await fetch(API_BASE + "/salud");
    if (!r.ok) throw new Error("HTTP " + r.status);
    const data = await r.json();
    let okCount = 0;
    $("provList").innerHTML = data.proveedores.map((p) => {
      const cls = p.estado === "ok" ? "ok" : p.estado === "sin_key" ? "nokey" : "error";
      const lbl = p.estado === "ok" ? "Listo" : p.estado === "sin_key" ? "Sin llave" : "Error";
      if (p.estado === "ok") okCount++;
      return `<div class="prov-row"><b>${esc(p.nombre)}</b><span class="prov-state ${cls}">${lbl}</span></div>`;
    }).join("");
    setHealth(okCount > 0);
  } catch (err) {
    $("provList").innerHTML = `<div class="empty">No se pudo conectar al backend.<br>Verifica que esté corriendo en ${esc(API_BASE)}.</div>`;
    setHealth(false);
  }
});
$("healthClose").addEventListener("click", () => $("healthModal").classList.remove("open"));
$("healthModal").addEventListener("click", (e) => {
  if (e.target === $("healthModal")) $("healthModal").classList.remove("open");
});
function setHealth(ok) {
  $("healthDot").className = "dot " + (ok ? "ok" : "warn");
  $("healthTxt").textContent = ok ? "En línea" : "Revisar";
}
// chequeo silencioso al cargar
fetch(API_BASE + "/salud").then((r) => setHealth(r.ok)).catch(() => setHealth(false));

/* ---------- Utilidades ---------- */
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

/* ================= 1. CHAT ================= */
const chatHistory = [];
addMsg("bot", "Hola, soy tu agente Wasapy. Aprendo cómo hablas para ser tu presencia real en WhatsApp, Messenger y Facebook. ¿En qué te ayudo hoy?", "wasapy");

function addMsg(who, text, prov, audioUrl) {
  const div = document.createElement("div");
  div.className = "msg " + who;
  let inner = esc(text).replace(/\n/g, "<br>");
  if (audioUrl) inner += `<audio class="chat-audio" controls src="${esc(audioUrl)}"></audio>`;
  inner += `<span class="meta">${who === "bot" ? 'Wasapy' + (prov ? ` · <span class="prov">${esc(prov)}</span>` : "") : "Tú"}</span>`;
  div.innerHTML = inner;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  return div;
}

/* Mascota estilo Muse: estado trabajando */
const museMascot = $("museMascot"), museStatus = $("museStatus");
const STATUS_IDLE = "¿En qué te ayudo hoy?";
function mascotWork(on, label) {
  if (!museMascot) return;
  museMascot.classList.toggle("working", !!on);
  if (museStatus) {
    museStatus.classList.toggle("working", !!on);
    museStatus.textContent = on ? (label || "Trabajando") : STATUS_IDLE;
  }
}

function showTyping() {
  const div = document.createElement("div");
  div.className = "msg bot typing";
  div.id = "typingRow";
  div.innerHTML = "<span></span><span></span><span></span>";
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  mascotWork(true, "Pensando");
}
function hideTyping() {
  const t = $("typingRow");
  if (t) t.remove();
  mascotWork(false);
}

async function sendChat(text) {
  text = text.trim();
  if (!text) return;
  addMsg("user", text);
  chatInput.value = "";
  chatHistory.push({ role: "user", content: text });
  showTyping();
  mascotWork(true, "Pensando...");
  try {
    const result = await aiChat(chatHistory.slice(-20));
    hideTyping(); mascotWork(false);
    // intentar audio solo si hay backend
    let audioUrl = null;
    if(result.via==="backend"){
      try {
        const tr = await fetch(API_BASE + "/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texto: result.text.slice(0, 500) })
        });
        if (tr.ok) { const blob = await tr.blob(); audioUrl = URL.createObjectURL(blob); }
      } catch (e) {}
    }
    addMsg("bot", result.text, result.via==="directo"?"Wasapy IA":result.proveedor, audioUrl);
    chatHistory.push({ role: "assistant", content: result.text });
  } catch (err) {
    hideTyping(); mascotWork(false);
    addMsg("bot", "Tuve un problema. Intenta de nuevo.");
  }
}

$("sendBtn").addEventListener("click", () => sendChat(chatInput.value));
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendChat(chatInput.value);
});

/* --- Audio: grabar → STT → enviar como texto --- */
let mediaRec = null, audioChunks = [], recording = false;
$("recBtn").addEventListener("click", async () => {
  if (recording) { stopRec(); return; }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRec = new MediaRecorder(stream);
    audioChunks = [];
    mediaRec.ondataavailable = (e) => audioChunks.push(e.data);
    mediaRec.onstop = sendAudio;
    mediaRec.start();
    recording = true;
    $("recBtn").classList.add("recording");
    toast("Grabando... toca de nuevo para enviar");
  } catch (e) {
    toast("No se pudo acceder al micrófono");
  }
});
function stopRec() {
  if (mediaRec && recording) { mediaRec.stop(); recording = false; }
  $("recBtn").classList.remove("recording");
}
async function sendAudio() {
  const blob = new Blob(audioChunks, { type: mediaRec.mimeType || "audio/webm" });
  if (blob.size < 1000) { toast("Audio muy corto"); return; }
  showTyping();
  try {
    const fd = new FormData();
    fd.append("file", blob, "nota.webm");
    const r = await fetch(API_BASE + "/stt", { method: "POST", body: fd });
    hideTyping();
    if (!r.ok) throw new Error("HTTP " + r.status);
    const data = await r.json();
    if (data.texto && data.texto.trim()) sendChat(data.texto.trim());
    else toast("No se entendió el audio");
  } catch (err) {
    hideTyping();
    toast("Error al transcribir el audio");
  }
}

/* ================= 2. ANALIZADOR DE FLYERS ================= */
const drop = $("dropZone"), flyerInput = $("flyerInput");
let flyerFile = null;

drop.addEventListener("click", () => flyerInput.click());
["dragover", "dragenter"].forEach((ev) => drop.addEventListener(ev, (e) => {
  e.preventDefault(); drop.classList.add("over");
}));
["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, (e) => {
  e.preventDefault(); drop.classList.remove("over");
}));
drop.addEventListener("drop", (e) => {
  const f = e.dataTransfer.files[0];
  if (f) setFlyer(f);
});
flyerInput.addEventListener("change", () => {
  if (flyerInput.files[0]) setFlyer(flyerInput.files[0]);
});
function setFlyer(f) {
  if (!f.type.startsWith("image/")) { toast("Solo imágenes (JPG, PNG, WebP)"); return; }
  flyerFile = f;
  const url = URL.createObjectURL(f);
  const prev = $("flyerPreview");
  prev.src = url; prev.style.display = "block";
  $("analyzeBtn").style.display = "inline-flex";
  $("flyerResult").innerHTML = "";
}

const ICON_CHECK = '<svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>';
const ICON_PLUS = '<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>';
const ICON_MINUS = '<svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>';

$("analyzeBtn").addEventListener("click", async () => {
  if (!flyerFile) return;
  const btn = $("analyzeBtn");
  btn.disabled = true;
  mascotWork(true, "Analizando flyer");
  $("flyerResult").innerHTML = '<div class="spinner"></div>';
  try {
    const fd = new FormData();
    fd.append("file", flyerFile, flyerFile.name);
    const r = await fetch(API_BASE + "/analizar-flyer", { method: "POST", body: fd });
    if (!r.ok) throw new Error("HTTP " + r.status);
    const d = await r.json();
    const li = (arr) => (arr || []).map((x) => `<li>${esc(x)}</li>`).join("");
    $("flyerResult").innerHTML = `
      <div class="result-block rb-good"><h4>${ICON_CHECK}Fortalezas</h4><ul>${li(d.fortalezas)}</ul></div>
      <div class="result-block rb-add"><h4>${ICON_PLUS}Agregar</h4><ul>${li(d.agregar)}</ul></div>
      <div class="result-block rb-del"><h4>${ICON_MINUS}Quitar</h4><ul>${li(d.quitar)}</ul></div>
      <div class="verdict"><strong>Veredicto:</strong> ${esc(d.veredicto)}</div>
      <p style="margin-top:10px;font-size:.75rem;color:var(--gray-2)">Analizado por ${esc(d.proveedor || "IA")}</p>`;
  } catch (err) {
    $("flyerResult").innerHTML = `<div class="empty">Error al analizar. Verifica la conexión con el backend.</div>`;
  }
  mascotWork(false);
  btn.disabled = false;
});

/* ================= 3. GENERADOR DE CONTENIDO ================= */
$("genContentBtn").addEventListener("click", async () => {
  const negocio = $("ctNegocio").value.trim();
  const rubro = $("ctRubro").value.trim();
  if (!negocio || !rubro) { toast("Escribe el negocio y el rubro"); return; }
  const btn = $("genContentBtn");
  btn.disabled = true;
  mascotWork(true, "Creando contenido");
  $("contentResult").innerHTML = '<div class="spinner"></div>';
  const cantidad = parseInt($("ctCantidad").value, 10);
  const red = $("ctRed").value;
  const tema = $("ctTema").value.trim();
  try {
    let d = null;
    try {
      const r = await fetch(API_BASE + "/contenido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ negocio, rubro, tema: tema || null, cantidad, red })
      });
      if (r.ok) d = await r.json();
      else throw 0;
    } catch(e) {
      const prompt = "Genera "+cantidad+" ideas de contenido para "+red+" del negocio '"+negocio+"' ("+rubro+")"+(tema?". Tema: "+tema:"")+". Para cada idea dame: titulo, copy listo para publicar y 3 hashtags. Responde en formato numerado.";
      const txt = await POLL.chat([{role:"user",content:prompt}]);
      const ideas = txt.split(/\n(?=\d+[\.)\-])/).filter(s=>s.trim().length>10).slice(0,cantidad).map(s=>{
        const lines = s.trim().split("\n");
        return { titulo: lines[0].replace(/^\d+[\.)\-]\s*/,"").slice(0,80), texto: lines.slice(1).join("\n").slice(0,400), hashtags: (s.match(/#\w+/g)||[]).slice(0,5) };
      });
      d = { ideas: ideas.length?ideas:[{titulo:"Ideas para "+negocio,texto:txt.slice(0,500),hashtags:[]}] };
    }
    $("contentResult").innerHTML = (d.ideas || []).map((idea, i) => `
      <div class="idea">
        <h4>${i + 1}. ${esc(idea.titulo)}</h4>
        <p>${esc(idea.texto || idea.copy || "")}</p>
        <div class="tags">${(idea.hashtags || []).map((h) => `<span class="tag">${esc(h.startsWith("#") ? h : "#" + h)}</span>`).join("")}</div>
        <button class="copy-btn" data-i="${i}">
          <svg viewBox="0 0 24 24"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/></svg>
          Copiar copy
        </button>
      </div>`).join("");
    document.querySelectorAll(".copy-btn").forEach((b) => {
      b.addEventListener("click", async () => {
        const idea = d.ideas[parseInt(b.dataset.i, 10)];
        const txt = idea.titulo + "\n\n" + (idea.texto || idea.copy || "") + "\n\n" + (idea.hashtags || []).join(" ");
        try {
          await navigator.clipboard.writeText(txt);
          b.classList.add("ok");
          b.innerHTML = "Copiado";
          setTimeout(() => { b.classList.remove("ok"); }, 1800);
        } catch (e) { toast("No se pudo copiar"); }
      });
    });
  } catch (err) {
    $("contentResult").innerHTML = `<div class="empty">Error al generar. Intenta de nuevo.</div>`;
  }
  mascotWork(false);
  btn.disabled = false;
});

/* ================= 4. GENERADOR DE IMÁGENES ================= */
$("genImgBtn").addEventListener("click", async () => {
  const prompt = $("imgPrompt").value.trim();
  if (prompt.length < 3) { toast("Describe la imagen primero"); return; }
  const btn = $("genImgBtn");
  btn.disabled = true;
  mascotWork(true, "Generando imagen");
  $("imgResult").innerHTML = '<div class="spinner"></div>';
  const w = parseInt($("imgW").value, 10), h = parseInt($("imgH").value, 10);
  let url = null;
  try {
    const r = await fetch(API_BASE + "/generar-imagen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, ancho: w, alto: h })
    });
    if (r.ok) {
      const d = await r.json();
      url = d.url + (d.url.includes("?") ? "&" : "?") + "seed=" + Date.now();
    } else throw 0;
  } catch(e) {
    url = POLL.image(prompt, w, h);
  }
  try {
    $("imgResult").innerHTML = `
      <div class="gen-img">
        <img src="${esc(url)}" alt="Imagen generada" loading="lazy">
        <a class="dl" href="${esc(url)}" download="wasapy-imagen.jpg" target="_blank" rel="noopener" aria-label="Descargar">
          <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
        </a>
      </div>`;
  } catch (err) {
    $("imgResult").innerHTML = `<div class="empty">Error al generar. Intenta de nuevo.</div>`;
  }
  mascotWork(false);
  btn.disabled = false;
});

/* ================= 5. CRM — CONEXIONES REALES ================= */
const CHAN_ICON = {
  whatsapp: '<img class="chan-logo" src="assets/logo-whatsapp.svg" alt="WhatsApp">',
  messenger: '<img class="chan-logo" src="assets/logo-messenger.svg" alt="Messenger">',
  facebook: '<img class="chan-logo" src="assets/logo-facebook.svg" alt="Facebook">',
  instagram: '<img class="chan-logo" src="assets/logo-instagram.svg" alt="Instagram">'
};
const CHAN_NAME = { whatsapp: "WhatsApp", messenger: "Messenger", facebook: "Facebook", instagram: "Instagram" };

function canalBtn(canal, conectado, nombre) {
  const lbl = conectado ? (nombre ? "Conectado: " + esc(nombre) : "Conectado") : "Conectar " + CHAN_NAME[canal];
  const cls = conectado ? "conn-ok" : "";
  return `<button class="conn-btn ${cls}" data-canal="${canal}" data-conectado="${conectado ? 1 : 0}">
    ${CHAN_ICON[canal] || ""}<span>${lbl}</span></button>`;
}

async function cargarConexiones() {
  const box = $("connBox");
  try {
    const r = await fetch(API_BASE + "/conexiones");
    if (!r.ok) throw new Error();
    const e = await r.json();
    const fbN = (e.facebook.paginas[0] || {}).nombre || "";
    const igN = (e.instagram.cuentas[0] || {}).usuario || "";
    box.innerHTML =
      canalBtn("facebook", e.facebook.conectado, fbN) +
      canalBtn("instagram", e.instagram.conectado, igN ? "@" + igN : "") +
      canalBtn("messenger", e.messenger.conectado, fbN) +
      canalBtn("whatsapp", e.whatsapp.conectado, e.whatsapp.numero || "");
    box.querySelectorAll(".conn-btn").forEach((b) => {
      b.addEventListener("click", () => {
        const canal = b.dataset.canal;
        if (canal === "whatsapp") { $("waModal").classList.add("open"); return; }
        window.location.href = API_BASE + "/oauth/meta/iniciar?canal=" + canal;
      });
    });
  } catch (err) {
    box.innerHTML = '<div class="empty">Sin conexión al backend.</div>';
  }
}

async function cargarConversaciones() {
  const list = $("convList");
  try {
    const r = await fetch(API_BASE + "/conversaciones");
    if (!r.ok) throw new Error();
    const data = await r.json();
    const convs = data.conversaciones || [];
    $("stTotal").textContent = convs.length;
    $("stHot").textContent = convs.filter((c) => (c.unread || 0) > 0).length;
    $("stResp").textContent = convs.filter((c) => c.ia).length;
    $("stHoy").textContent = convs.filter((c) => (c.tiempo || "").includes(":")).length;
    if (!convs.length) {
      list.innerHTML = `<div class="card"><div class="empty" style="padding:28px 16px;text-align:center">
        <p style="font-weight:700;margin-bottom:8px">Conecta tus redes para ver conversaciones reales</p>
        <p style="font-size:.9rem;opacity:.75">Sin conexiones no hay datos que mostrar. Toca arriba para conectar Facebook, Instagram, Messenger o WhatsApp.</p>
      </div></div>`;
      return;
    }
    list.innerHTML = convs.map((c) => `
      <div class="conv">
        <div class="avatar">${esc(c.inicial || "?")}</div>
        <div class="conv-info">
          <div class="conv-name">${esc(c.nombre || "?")}</div>
          <div class="conv-msg">${esc(c.ultimo || "")}</div>
          <div class="chan" style="margin-top:5px">${CHAN_ICON[c.canal] || ""}${CHAN_NAME[c.canal] || c.canal}${c.ia ? " · respondido por IA" : ""}</div>
        </div>
        <div class="conv-right">
          <div class="conv-time">${esc(c.tiempo || "")}</div>
          ${c.unread ? `<span class="unread">${c.unread}</span>` : ""}
        </div>
      </div>`).join("");
  } catch (err) {
    list.innerHTML = '<div class="empty">No se pudieron cargar las conversaciones.</div>';
  }
}

// WhatsApp: conectar con phone_number_id + token permanente
$("waClose") && $("waClose").addEventListener("click", () => $("waModal").classList.remove("open"));
$("waModal") && $("waModal").addEventListener("click", (e) => {
  if (e.target === $("waModal")) $("waModal").classList.remove("open");
});
$("waConnectBtn") && $("waConnectBtn").addEventListener("click", async () => {
  const pid = $("waPhoneId").value.trim(), tok = $("waToken").value.trim();
  if (!pid || !tok) { toast("Pega el Phone Number ID y el token."); return; }
  $("waConnectBtn").disabled = true;
  try {
    const r = await fetch(API_BASE + "/conexiones/whatsapp", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number_id: pid, token: tok }),
    });
    const j = await r.json();
    if (!r.ok) throw new Error(j.detail || "Error");
    toast("WhatsApp conectado: " + (j.numero || "listo"));
    $("waModal").classList.remove("open");
    cargarConexiones(); cargarConversaciones();
  } catch (err) {
    toast("No se pudo conectar: " + err.message);
  }
  $("waConnectBtn").disabled = false;
});

// aviso de OAuth recién completado
(function () {
  const q = new URLSearchParams(location.search);
  const ok = q.get("conectado"), err = q.get("error");
  if (ok) {
    toast("¡" + CHAN_NAME[ok] + " conectado!");
    history.replaceState(null, "", location.pathname);
  } else if (err) {
    toast("No se pudo conectar. Intenta de nuevo.");
    history.replaceState(null, "", location.pathname);
  }
})();

cargarConexiones();
cargarConversaciones();

// Avatar picker: cambia la mascota en toda la app
document.querySelectorAll('.av-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.av-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const av = btn.dataset.av;
    document.querySelectorAll('.brand-logo, .mascot-img, #mascotImg').forEach(img=>{ img.src = 'assets/'+av; });
    localStorage.setItem('wasapy_avatar', av);
  });
});
// restaurar avatar elegido
(function(){
  const av = localStorage.getItem('wasapy_avatar');
  if(av){
    document.querySelectorAll('.brand-logo, .mascot-img, #mascotImg').forEach(img=>{ img.src = 'assets/'+av; });
    document.querySelectorAll('.av-btn').forEach(b=>b.classList.toggle('active', b.dataset.av===av));
  }
})();
