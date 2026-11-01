/* ═══════════════ DGBF ESTHETIC · motor ═══════════════ */
(function(){
"use strict";
var WA_NUMBER = "17876887438";

/* ── Links de WhatsApp con mensaje pre-llenado ── */
document.querySelectorAll("[data-wa]").forEach(function(el){
  var msg = el.getAttribute("data-service") || "Hola DGBF Esthetic, quiero información";
  var href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
  if(el.tagName === "A"){ el.href = href; el.target = "_blank"; el.rel = "noopener"; }
  else { el.addEventListener("click", function(){ window.open(href, "_blank", "noopener"); }); }
});

/* ── Zona de anuncios rotativa ── */
var announcements = [
  "Del 6 al 10 de noviembre estaremos cerrados por vacaciones",
  "Láser Diodo con efecto frío — depilación cómoda y efectiva",
  "Evaluación personalizada gratuita — agenda por WhatsApp"
];
var annMsg = document.getElementById("announceMsg"), annIdx = 0;
setInterval(function(){
  annMsg.classList.add("fade");
  setTimeout(function(){
    annIdx = (annIdx + 1) % announcements.length;
    annMsg.textContent = announcements[annIdx];
    annMsg.classList.remove("fade");
  }, 400);
}, 5000);

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
document.addEventListener("keydown", function(e){
  if(e.key === "Escape"){ setMenu(false); closeLB(); }
});

/* ── Marquee de flyers (todos sus flyers corriendo hacia el lado) ── */
var flyers = [
  "17875644531624267.jpg","17877957234653835.jpg","17886467460437603.jpg",
  "17978368062112898.jpg","18018712916883130.jpg","18022232231700171.jpg",
  "18035287658911457.jpg","18053829317801951.jpg","18073775444203835.jpg",
  "18077588189415064.jpg","18090698864265725.jpg","18133071895586232.jpg",
  "18225760345323901.jpg","18418577047147607.jpg","18487168720108614.jpg",
  "18610146274008904.jpg","18626528389017217.jpg"
];
function buildTrack(trackId, list){
  var track = document.getElementById(trackId);
  if(!track) return;
  var html = "";
  // duplicado x2 para loop infinito sin cortes
  for(var r = 0; r < 2; r++){
    list.forEach(function(f, i){
      html += '<figure class="flyer-card" data-idx="' + (list === flyers.slice(0,9) ? i : i + 9) + '">' +
              '<img src="img/flyers/' + f + '" alt="Flyer de DGBF Esthetic" loading="lazy"></figure>';
    });
  }
  track.innerHTML = html;
}
var half = Math.ceil(flyers.length / 2);
buildTrack("track1", flyers.slice(0, half));
buildTrack("track2", flyers.slice(half));

/* ── Lightbox ── */
var lb = document.getElementById("lightbox"),
    lbImg = document.getElementById("lbImg"),
    lbIdx = 0;
function openLB(i){
  lbIdx = (i + flyers.length) % flyers.length;
  lbImg.src = "img/flyers/" + flyers[lbIdx];
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLB(){
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll(".flyer-card").forEach(function(card){
  card.addEventListener("click", function(){ openLB(parseInt(card.dataset.idx, 10)); });
});
lb.querySelector(".lb-close").addEventListener("click", closeLB);
lb.querySelector(".lb-prev").addEventListener("click", function(e){ e.stopPropagation(); openLB(lbIdx - 1); });
lb.querySelector(".lb-next").addEventListener("click", function(e){ e.stopPropagation(); openLB(lbIdx + 1); });
lb.addEventListener("click", function(e){ if(e.target === lb) closeLB(); });

/* ── Slider antes / después (arrastrable) ── */
var ba = document.getElementById("baSlider");
if(ba){
  var setPos = function(clientX){
    var r = ba.getBoundingClientRect();
    var p = ((clientX - r.left) / r.width) * 100;
    p = Math.max(4, Math.min(96, p));
    ba.style.setProperty("--pos", p + "%");
  };
  var dragging = false;
  ba.addEventListener("pointerdown", function(e){
    dragging = true;
    try{ ba.setPointerCapture(e.pointerId); }catch(_){}
    setPos(e.clientX);
  });
  ba.addEventListener("pointermove", function(e){ if(dragging) setPos(e.clientX); });
  ["pointerup","pointercancel","pointerleave"].forEach(function(ev){
    ba.addEventListener(ev, function(){ dragging = false; });
  });
}

/* ── Reveal on scroll ── */
var io = new IntersectionObserver(function(entries){
  entries.forEach(function(en){
    if(en.isIntersecting){ en.target.classList.add("on"); io.unobserve(en.target); }
  });
}, {threshold: 0.12});
document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });

/* ── Video hero: reintento de autoplay silencioso ── */
var vid = document.querySelector(".hero-video");
if(vid){
  var p = vid.play();
  if(p && p.catch){ p.catch(function(){}); }
  document.addEventListener("touchstart", function once(){
    vid.play().catch(function(){});
    document.removeEventListener("touchstart", once);
  });
}
})();
