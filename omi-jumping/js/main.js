/* ═══════════════ OMI JUMPING · motor ═══════════════ */
(function(){
"use strict";
var WA_NUMBER = "17873215921";

/* ── Loader 3D: barra de carga con % ── */
var loader = document.getElementById("loader"),
    loadBar = document.getElementById("loadBar"),
    loadPct = document.getElementById("loadPct"),
    pct = 0, loaderDone = false;
function finishLoader(){
  if(loaderDone) return;
  loaderDone = true;
  loadBar.style.width = "100%";
  loadPct.textContent = "100";
  setTimeout(function(){ loader.classList.add("done"); }, 350);
}
var tick = setInterval(function(){
  pct = Math.min(92, pct + Math.floor(Math.random() * 14) + 6);
  loadBar.style.width = pct + "%";
  loadPct.textContent = pct;
  if(pct >= 92){ clearInterval(tick); }
}, 180);
window.addEventListener("load", function(){
  clearInterval(tick);
  loadBar.style.width = "100%";
  loadPct.textContent = "100";
  setTimeout(finishLoader, 500);
});
setTimeout(finishLoader, 4000);

/* ── Links de WhatsApp con mensaje prellenado ── */
document.querySelectorAll("[data-wa]").forEach(function(el){
  var msg = el.getAttribute("data-service") || "Hola Omi Jumping, quiero información";
  var href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
  if(el.tagName === "A"){ el.href = href; el.target = "_blank"; el.rel = "noopener"; }
  else { el.addEventListener("click", function(){ window.open(href, "_blank", "noopener"); }); }
});

/* ── Menú flotante ── */
var toggle = document.getElementById("navToggle"),
    menu = document.getElementById("overlayMenu");
function setMenu(open){
  toggle.classList.toggle("open", open);
  menu.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", open);
  menu.setAttribute("aria-hidden", !open);
  document.body.style.overflow = open ? "hidden" : "";
  if(open){
    menu.querySelectorAll(".overlay-inner a").forEach(function(a, i){
      a.style.transitionDelay = (i * 0.05) + "s";
    });
  }
}
toggle.addEventListener("click", function(){ setMenu(!menu.classList.contains("open")); });
menu.querySelectorAll("a").forEach(function(a){
  a.addEventListener("click", function(){ setMenu(false); });
});

/* ── Carrusel 3D del hero ── */
var ring = document.getElementById("ring"),
    stage = document.getElementById("stage"),
    dots = document.querySelectorAll("#ringNav button"),
    idx = 0, total = 3, autoTimer = null;
function showSlide(n){
  idx = ((n % total) + total) % total;
  ring.style.transform = "rotateY(" + (-idx * 120) + "deg)";
  dots.forEach(function(d, i){ d.classList.toggle("on", i === idx); });
}
function restartAuto(){
  if(autoTimer){ clearInterval(autoTimer); }
  autoTimer = setInterval(function(){ showSlide(idx + 1); }, 4200);
}
document.getElementById("ringNext").addEventListener("click", function(){ showSlide(idx + 1); restartAuto(); });
document.getElementById("ringPrev").addEventListener("click", function(){ showSlide(idx - 1); restartAuto(); });
dots.forEach(function(d, i){
  d.addEventListener("click", function(){ showSlide(i); restartAuto(); });
});
restartAuto();
/* Tilt con el mouse sobre el escenario 3D */
stage.addEventListener("mousemove", function(e){
  var r = stage.getBoundingClientRect();
  var x = (e.clientX - r.left) / r.width - 0.5;
  var y = (e.clientY - r.top) / r.height - 0.5;
  stage.style.transform = "rotateY(" + (x * 8) + "deg) rotateX(" + (-y * 6) + "deg)";
});
stage.addEventListener("mouseleave", function(){ stage.style.transform = ""; });

/* ── Cotizador: abre WhatsApp con el mensaje prellenado ── */
var form = document.getElementById("quoteForm");
form.addEventListener("submit", function(e){
  e.preventDefault();
  var fecha = document.getElementById("qFecha").value,
      tipo = document.getElementById("qTipo").value,
      servicio = document.getElementById("qServicio").value,
      pueblo = document.getElementById("qPueblo").value.trim(),
      nombre = document.getElementById("qNombre").value.trim();
  var fechaTxt = fecha;
  if(fecha){
    var parts = fecha.split("-");
    if(parts.length === 3){ fechaTxt = parts[2] + "/" + parts[1] + "/" + parts[0]; }
  }
  var msg = "Hola Omi Jumping, quiero reservar para mi evento.\n" +
    "Nombre: " + nombre + "\n" +
    "Fecha del evento: " + fechaTxt + "\n" +
    "Tipo de evento: " + tipo + "\n" +
    "Servicio: " + servicio + "\n" +
    "Pueblo: " + pueblo;
  window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
});

/* ── Lightbox de galería ── */
var galItems = Array.prototype.slice.call(document.querySelectorAll(".gal-item")),
    lb = document.getElementById("lightbox"),
    lbImg = document.getElementById("lbImg"),
    lbIdx = 0;
function openLB(i){
  lbIdx = ((i % galItems.length) + galItems.length) % galItems.length;
  lbImg.src = galItems[lbIdx].getAttribute("data-full");
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLB(){
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
galItems.forEach(function(item, i){
  item.addEventListener("click", function(){ openLB(i); });
});
lb.querySelector(".lb-close").addEventListener("click", closeLB);
lb.querySelector(".lb-prev").addEventListener("click", function(e){ e.stopPropagation(); openLB(lbIdx - 1); });
lb.querySelector(".lb-next").addEventListener("click", function(e){ e.stopPropagation(); openLB(lbIdx + 1); });
lb.addEventListener("click", function(e){ if(e.target === lb) closeLB(); });
document.addEventListener("keydown", function(e){
  if(e.key === "Escape"){ setMenu(false); closeLB(); }
  if(lb.classList.contains("open")){
    if(e.key === "ArrowRight"){ openLB(lbIdx + 1); }
    if(e.key === "ArrowLeft"){ openLB(lbIdx - 1); }
  }
});

/* ── Reveal on scroll ── */
var io = new IntersectionObserver(function(entries){
  entries.forEach(function(en){
    if(en.isIntersecting){ en.target.classList.add("on"); io.unobserve(en.target); }
  });
}, {threshold: 0.12});
document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });

/* ── Video Photobooth: reintento de autoplay silencioso ── */
var vid = document.querySelector(".svc-media video");
if(vid){
  var p = vid.play();
  if(p && p.catch){ p.catch(function(){}); }
}
})();
