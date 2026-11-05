/* ═══════════════ OMI JUMPING · motor + GSAP ═══════════════ */
(function(){
"use strict";
var WA_NUMBER = "17873215921";
var hasGsap = (typeof window.gsap !== "undefined");
var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var gsapOn = hasGsap && !reduced;
var isMobile = window.matchMedia("(max-width: 640px)").matches;
if(hasGsap && window.ScrollTrigger){ gsap.registerPlugin(ScrollTrigger); }
if(gsapOn){ document.documentElement.classList.add("gsap-on"); }

/* ── Paleta de globos ── */
var BALLOON_COLORS = [
  {c: "#00AEEF", d: "#0077b6"},
  {c: "#FFD500", d: "#cf9f00"},
  {c: "#ED1C24", d: "#a80f16"},
  {c: "#FF5CA8", d: "#d6336c"}
];
var CONF_COLORS = ["#00AEEF", "#FFD500", "#ED1C24", "#FF5CA8", "#0B4DA2", "#22c55e"];
var _uid = 0;
function balloonSVG(color){
  _uid++;
  var g = "bg" + _uid;
  return '<svg width="100" height="152" viewBox="0 0 100 152" aria-hidden="true">' +
    '<defs><radialGradient id="' + g + '" cx="35%" cy="30%" r="75%">' +
    '<stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>' +
    '<stop offset="42%" stop-color="' + color.c + '" stop-opacity="0.96"/>' +
    '<stop offset="100%" stop-color="' + color.d + '"/></radialGradient></defs>' +
    '<ellipse cx="50" cy="55" rx="42" ry="50" fill="url(#' + g + ')"/>' +
    '<ellipse cx="36" cy="38" rx="11" ry="17" fill="#ffffff" opacity="0.55" transform="rotate(-22 36 38)"/>' +
    '<path d="M46 105 L54 105 L50 117 Z" fill="' + color.d + '"/>' +
    '<path d="M50 117 C 44 132, 56 140, 50 150" stroke="#94a3b8" stroke-width="1.6" fill="none"/></svg>';
}
function makeBalloon(colorIdx, size){
  var color = BALLOON_COLORS[colorIdx % BALLOON_COLORS.length];
  var outer = document.createElement("div");
  outer.className = "b3d";
  outer.style.width = size + "px";
  outer.innerHTML = '<span class="b3d-in">' + balloonSVG(color) + "</span>";
  return outer;
}

/* ── Confetti ── */
function burstConfetti(parent, x, y, n, spread){
  if(!parent) return;
  spread = spread || 110;
  for(var i = 0; i < n; i++){
    var p = document.createElement("div");
    p.className = "cfetti";
    p.style.background = CONF_COLORS[Math.floor(Math.random() * CONF_COLORS.length)];
    p.style.left = x + "px";
    p.style.top = y + "px";
    parent.appendChild(p);
    var dx = (Math.random() - 0.5) * spread * 2;
    var dy = 40 + Math.random() * 170;
    if(gsapOn){
      gsap.to(p, {x: dx, y: dy, rotation: Math.random() * 720 - 360, opacity: 0,
        duration: 0.9 + Math.random() * 0.7, ease: "power1.in",
        onComplete: (function(el){ return function(){ el.remove(); }; })(p)});
    } else {
      setTimeout((function(el){ return function(){ el.remove(); }; })(p), 900);
    }
  }
}

/* ── Catálogo: carrusel horizontal auto-scroll ── */
var catTrack = document.getElementById("catTrack"),
    catViewport = document.getElementById("catViewport"),
    catDots = document.getElementById("catDots");
var CAT = {setW: 0, cardW: 266, pages: 1, auto: true, resumeAt: 0, dragging: false, dragged: false};
if(catTrack && typeof GALLERY !== "undefined"){
  var cardHtml = "";
  GALLERY.forEach(function(g, i){
    cardHtml += '<button class="gal-item" data-idx="' + i + '" draggable="false" aria-label="Ver foto ' + (i + 1) + ' de Omi Jumping">' +
            '<img src="' + g.src + '" alt="' + g.alt + '" loading="lazy" draggable="false"></button>';
  });
  catTrack.innerHTML = cardHtml + cardHtml + cardHtml;
  var gc = document.getElementById("galCount");
  if(gc){ gc.textContent = GALLERY.length + " fotos y flyers reales"; }
}
function catMeasure(){
  if(!catViewport || !catTrack || !catTrack.children.length) return;
  var first = catTrack.children[0];
  var second = catTrack.children[GALLERY.length];
  CAT.cardW = first.offsetWidth + 16;
  CAT.setW = second ? second.offsetLeft : GALLERY.length * CAT.cardW;
  CAT.pages = Math.max(1, Math.ceil(CAT.setW / catViewport.clientWidth));
  var dots = "";
  for(var i = 0; i < CAT.pages; i++){ dots += '<button aria-label="Ir a la página ' + (i + 1) + ' del catálogo"></button>'; }
  catDots.innerHTML = dots;
}
/* Galería normal hacia el lado (plana, sin coverflow 3D — v8): las tarjetas
   corren en scroll horizontal simple con auto-scroll y swipe */
function catWrap(){
  if(!catViewport) return;
  var sl = catViewport.scrollLeft;
  if(sl >= CAT.setW * 2){ catViewport.scrollLeft = sl - CAT.setW; }
  else if(sl <= 0){ catViewport.scrollLeft = sl + CAT.setW; }
}
function catUpdateDots(){
  if(!catDots || !catDots.children.length) return;
  var pos = ((catViewport.scrollLeft % CAT.setW) + CAT.setW) % CAT.setW;
  var page = Math.min(CAT.pages - 1, Math.floor(pos / catViewport.clientWidth));
  for(var i = 0; i < catDots.children.length; i++){
    catDots.children[i].classList.toggle("on", i === page);
  }
}
function snapCat(){
  if(!catViewport) return;
  var target = Math.round(catViewport.scrollLeft / CAT.cardW) * CAT.cardW;
  catViewport.scrollTo({left: target, behavior: "smooth"});
}
function catPause(ms){
  CAT.auto = false;
  CAT.resumeAt = Date.now() + (ms || 3000);
}
function catResumeSoon(ms){ catPause(ms || 3000); }
if(catViewport){
  /* Auto-scroll con setInterval (rAF se estrangula en pestañas/headless inactivos; el intervalo es fiable) */
  setInterval(function(){
    if(CAT.auto && !CAT.dragging && !document.hidden && CAT.setW > 0){
      catViewport.scrollLeft += (isMobile ? 0.54 : 0.72);
      catWrap();
      catUpdateDots();
    } else if(Date.now() > CAT.resumeAt && !CAT.dragging){
      CAT.auto = true;
    }
  }, 20);
  /* Arrastre con mouse + swipe táctil, tap abre lightbox */
  var dragStartX = 0, dragStartScroll = 0, dragMoved = 0, dragT = 0;
  catViewport.addEventListener("pointerdown", function(e){
    CAT.dragging = true; CAT.dragged = false; CAT.auto = false;
    dragStartX = e.clientX; dragStartScroll = catViewport.scrollLeft; dragMoved = 0; dragT = Date.now();
    catViewport.classList.add("dragging");
    try{ catViewport.setPointerCapture(e.pointerId); }catch(_){}
  });
  catViewport.addEventListener("pointermove", function(e){
    if(!CAT.dragging) return;
    var dx = e.clientX - dragStartX;
    dragMoved = Math.max(dragMoved, Math.abs(dx));
    if(dragMoved > 7){ CAT.dragged = true; }
    catViewport.scrollLeft = dragStartScroll - dx;
    catWrap();
  });
  function endDrag(){
    if(!CAT.dragging) return;
    CAT.dragging = false;
    catViewport.classList.remove("dragging");
    if(CAT.dragged){
      snapCat();
      setTimeout(function(){ CAT.dragged = false; }, 350);
    }
    catResumeSoon(3000);
  }
  catViewport.addEventListener("pointerup", endDrag);
  catViewport.addEventListener("pointercancel", endDrag);
  catViewport.addEventListener("mouseenter", function(){ CAT.auto = false; });
  catViewport.addEventListener("mouseleave", function(){ if(!CAT.dragging){ catResumeSoon(2000); } });
  catViewport.addEventListener("click", function(e){
    if(CAT.dragged) return;
    var item = e.target.closest(".gal-item");
    if(item){ openLB(parseInt(item.getAttribute("data-idx"), 10)); }
  });
  document.getElementById("catPrev").addEventListener("click", function(){
    var step = Math.max(1, Math.round(catViewport.clientWidth * 0.8 / CAT.cardW)) * CAT.cardW;
    catViewport.scrollBy({left: -step, behavior: "smooth"});
    catResumeSoon(3000);
  });
  document.getElementById("catNext").addEventListener("click", function(){
    var step = Math.max(1, Math.round(catViewport.clientWidth * 0.8 / CAT.cardW)) * CAT.cardW;
    catViewport.scrollBy({left: step, behavior: "smooth"});
    catResumeSoon(3000);
  });
  catDots.addEventListener("click", function(e){
    var btn = e.target.closest("button");
    if(!btn) return;
    var idx = Array.prototype.indexOf.call(catDots.children, btn);
    var pos = ((catViewport.scrollLeft % CAT.setW) + CAT.setW) % CAT.setW;
    var base = catViewport.scrollLeft - pos;
    catViewport.scrollTo({left: base + idx * catViewport.clientWidth, behavior: "smooth"});
    setTimeout(snapCat, 650);
    catResumeSoon(3000);
  });
  window.addEventListener("resize", function(){ catMeasure(); });
  window.addEventListener("load", function(){ catMeasure(); catViewport.scrollLeft = CAT.setW; });
  setTimeout(function(){ catMeasure(); catViewport.scrollLeft = CAT.setW; }, 600);
}

/* ── Experiencia: fotos reales de eventos, corre normal hacia el lado (v10) ──
   Mismo patrón que la galería: auto-scroll solo y despacio, swipe, tap abre
   la foto completa con X + prev/next. 40 fotos únicas (sin duplicados). */
var expTrack = document.getElementById("expTrack"),
    expViewport = document.getElementById("expViewport"),
    expDots = document.getElementById("expDots");
var EXP_ST = {setW: 0, cardW: 266, pages: 1, auto: true, resumeAt: 0, dragging: false, dragged: false};
if(expTrack && typeof EXP !== "undefined"){
  var expHtml = "";
  EXP.forEach(function(g, i){
    expHtml += '<button class="gal-item" data-idx="' + i + '" draggable="false" aria-label="Ver foto ' + (i + 1) + ' de la experiencia Omi Jumping">' +
            '<img src="' + g.src + '" alt="' + g.alt + '" loading="lazy" draggable="false"></button>';
  });
  expTrack.innerHTML = expHtml + expHtml + expHtml;
}
function expMeasure(){
  if(!expViewport || !expTrack.children.length) return;
  var first = expTrack.children[0];
  var second = expTrack.children[EXP.length];
  EXP_ST.cardW = first.offsetWidth + 16;
  EXP_ST.setW = second ? second.offsetLeft : EXP.length * EXP_ST.cardW;
  EXP_ST.pages = Math.max(1, Math.ceil(EXP_ST.setW / expViewport.clientWidth));
  var dots = "";
  for(var i = 0; i < EXP_ST.pages; i++){ dots += '<button aria-label="Ir a la página ' + (i + 1) + ' de la experiencia"></button>'; }
  expDots.innerHTML = dots;
}
function expWrap(){
  if(!expViewport) return;
  var sl = expViewport.scrollLeft;
  if(sl >= EXP_ST.setW * 2){ expViewport.scrollLeft = sl - EXP_ST.setW; }
  else if(sl <= 0){ expViewport.scrollLeft = sl + EXP_ST.setW; }
}
function expUpdateDots(){
  if(!expDots || !expDots.children.length) return;
  var pos = ((expViewport.scrollLeft % EXP_ST.setW) + EXP_ST.setW) % EXP_ST.setW;
  var page = Math.min(EXP_ST.pages - 1, Math.floor(pos / expViewport.clientWidth));
  for(var i = 0; i < expDots.children.length; i++){
    expDots.children[i].classList.toggle("on", i === page);
  }
}
function expSnap(){
  if(!expViewport) return;
  var target = Math.round(expViewport.scrollLeft / EXP_ST.cardW) * EXP_ST.cardW;
  expViewport.scrollTo({left: target, behavior: "smooth"});
}
function expPause(ms){
  EXP_ST.auto = false;
  EXP_ST.resumeAt = Date.now() + (ms || 3000);
}
function expResumeSoon(ms){ expPause(ms || 3000); }
if(expViewport){
  setInterval(function(){
    if(EXP_ST.auto && !EXP_ST.dragging && !document.hidden && EXP_ST.setW > 0){
      expViewport.scrollLeft += (isMobile ? 0.54 : 0.72);
      expWrap();
      expUpdateDots();
    } else if(Date.now() > EXP_ST.resumeAt && !EXP_ST.dragging){
      EXP_ST.auto = true;
    }
  }, 20);
  var expDragStartX = 0, expDragStartScroll = 0, expDragMoved = 0;
  expViewport.addEventListener("pointerdown", function(e){
    EXP_ST.dragging = true; EXP_ST.dragged = false; EXP_ST.auto = false;
    expDragStartX = e.clientX; expDragStartScroll = expViewport.scrollLeft; expDragMoved = 0;
    expViewport.classList.add("dragging");
    try{ expViewport.setPointerCapture(e.pointerId); }catch(_){}
  });
  expViewport.addEventListener("pointermove", function(e){
    if(!EXP_ST.dragging) return;
    var dx = e.clientX - expDragStartX;
    expDragMoved = Math.max(expDragMoved, Math.abs(dx));
    if(expDragMoved > 7){ EXP_ST.dragged = true; }
    expViewport.scrollLeft = expDragStartScroll - dx;
    expWrap();
  });
  function expEndDrag(){
    if(!EXP_ST.dragging) return;
    EXP_ST.dragging = false;
    expViewport.classList.remove("dragging");
    if(EXP_ST.dragged){
      expSnap();
      setTimeout(function(){ EXP_ST.dragged = false; }, 350);
    }
    expResumeSoon(3000);
  }
  expViewport.addEventListener("pointerup", expEndDrag);
  expViewport.addEventListener("pointercancel", expEndDrag);
  expViewport.addEventListener("mouseenter", function(){ EXP_ST.auto = false; });
  expViewport.addEventListener("mouseleave", function(){ if(!EXP_ST.dragging){ expResumeSoon(2000); } });
  expViewport.addEventListener("click", function(e){
    if(EXP_ST.dragged) return;
    var item = e.target.closest(".gal-item");
    if(item){ openExpLB(parseInt(item.getAttribute("data-idx"), 10)); }
  });
  document.getElementById("expPrev").addEventListener("click", function(){
    var step = Math.max(1, Math.round(expViewport.clientWidth * 0.8 / EXP_ST.cardW)) * EXP_ST.cardW;
    expViewport.scrollBy({left: -step, behavior: "smooth"});
    expResumeSoon(3000);
  });
  document.getElementById("expNext").addEventListener("click", function(){
    var step = Math.max(1, Math.round(expViewport.clientWidth * 0.8 / EXP_ST.cardW)) * EXP_ST.cardW;
    expViewport.scrollBy({left: step, behavior: "smooth"});
    expResumeSoon(3000);
  });
  expDots.addEventListener("click", function(e){
    var btn = e.target.closest("button");
    if(!btn) return;
    var idx = Array.prototype.indexOf.call(expDots.children, btn);
    var pos = ((expViewport.scrollLeft % EXP_ST.setW) + EXP_ST.setW) % EXP_ST.setW;
    var base = expViewport.scrollLeft - pos;
    expViewport.scrollTo({left: base + idx * expViewport.clientWidth, behavior: "smooth"});
    setTimeout(expSnap, 650);
    expResumeSoon(3000);
  });
  window.addEventListener("resize", function(){ expMeasure(); });
  window.addEventListener("load", function(){ expMeasure(); expViewport.scrollLeft = EXP_ST.setW; });
  setTimeout(function(){ expMeasure(); expViewport.scrollLeft = EXP_ST.setW; }, 600);
}

/* ── Servicios: fila horizontal PLANA normal hacia el lado (v9) ──
   Corre sola despacio hacia el lado, swipe con el dedo/mouse, pausa al tocar.
   Sin coverflow 3D: ninguna tarjeta sale cortada por los bordes.
   Tap limpio en la FOTO abre la foto completa (lightbox modo single). */
var svcTrack = document.getElementById("svcTrack"),
    svcViewport = document.getElementById("svcViewport"),
    svcDots = document.getElementById("svcDots");
var SVC = {setW: 0, cardW: 340, auto: true, resumeAt: 0, dragging: false, dragged: false, total: 14};
if(svcTrack && svcTrack.children.length){
  svcTrack.innerHTML = svcTrack.innerHTML + svcTrack.innerHTML + svcTrack.innerHTML;
  /* Solo el primer video del Photobooth reproduce; los clones quedan en pausa */
  svcTrack.querySelectorAll("video").forEach(function(v, i){
    if(i > 0){ v.removeAttribute("autoplay"); v.pause(); }
  });
}
function svcMeasure(){
  if(!svcViewport || !svcTrack || !svcTrack.children.length) return;
  var first = svcTrack.children[0];
  var second = svcTrack.children[SVC.total];
  SVC.cardW = first.offsetWidth + 20;
  SVC.setW = second ? second.offsetLeft : SVC.total * SVC.cardW;
  /* 14 bolitas = 14 servicios: la activa marca la tarjeta actual */
  var dots = "";
  for(var i = 0; i < SVC.total; i++){ dots += '<button aria-label="Ir al servicio ' + (i + 1) + ' de 14"></button>'; }
  svcDots.innerHTML = dots;
  svcUpdateDots();
}
function svcWrap(){
  if(!svcViewport) return;
  var sl = svcViewport.scrollLeft;
  if(sl >= SVC.setW * 2){ svcViewport.scrollLeft = sl - SVC.setW; }
  else if(sl <= 0){ svcViewport.scrollLeft = sl + SVC.setW; }
}
/* La bolita activa = la tarjeta más cercana al borde izquierdo del viewport
   (la que se está viendo completa). Cambia con scroll, swipe, auto-scroll y flechas */
function svcUpdateDots(){
  if(!svcDots || !svcDots.children.length || !SVC.setW || !SVC.cardW) return;
  var pos = ((svcViewport.scrollLeft % SVC.setW) + SVC.setW) % SVC.setW;
  var idx = Math.round(pos / SVC.cardW) % SVC.total;
  if(idx < 0) idx = 0; else if(idx >= SVC.total) idx = SVC.total - 1;
  for(var i = 0; i < svcDots.children.length; i++){
    svcDots.children[i].classList.toggle("on", i === idx);
  }
}
function snapSvc(){
  if(!svcViewport) return;
  var target = Math.round(svcViewport.scrollLeft / SVC.cardW) * SVC.cardW;
  svcViewport.scrollTo({left: target, behavior: "smooth"});
}
function svcPause(ms){
  SVC.auto = false;
  SVC.resumeAt = Date.now() + (ms || 3000);
}
function svcResumeSoon(ms){ svcPause(ms || 3000); }
if(svcViewport){
  /* Auto-scroll despacio con setInterval (fiable en headless y pestañas inactivas) */
  setInterval(function(){
    if(SVC.auto && !SVC.dragging && !document.hidden && SVC.setW > 0){
      /* Acumular el avance fraccionario: scrollLeft redondea cada asignación
         a entero, así que sumar 0.42px/tick directo se redondea a 0 y el
         carrusel se quedaría quieto para siempre */
      SVC.acc = (SVC.acc || 0) + (isMobile ? 0.55 : 0.7);
      var step = Math.floor(SVC.acc);
      if(step > 0){
        SVC.acc -= step;
        svcViewport.scrollLeft += step;
        svcWrap();
        svcUpdateDots();
      }
    } else if(Date.now() > SVC.resumeAt && !SVC.dragging){
      SVC.auto = true;
    }
  }, 20);
  /* La bolita cambia con CUALQUIER movimiento del carrusel (scroll, swipe,
     auto-scroll, flechas, snap): el evento scroll lo cubre todo */
  svcViewport.addEventListener("scroll", function(){ svcUpdateDots(); }, {passive: true});
  /* Arrastre con mouse + swipe táctil, tap en la foto abre el lightbox */
  var sDragX = 0, sDragScroll = 0, sDragMoved = 0;
  svcViewport.addEventListener("pointerdown", function(e){
    SVC.dragging = true; SVC.dragged = false; SVC.auto = false;
    sDragX = e.clientX; sDragScroll = svcViewport.scrollLeft; sDragMoved = 0;
    svcViewport.classList.add("dragging");
    try{ svcViewport.setPointerCapture(e.pointerId); }catch(_){}
  });
  svcViewport.addEventListener("pointermove", function(e){
    if(!SVC.dragging) return;
    var dx = e.clientX - sDragX;
    sDragMoved = Math.max(sDragMoved, Math.abs(dx));
    if(sDragMoved > 7){ SVC.dragged = true; }
    svcViewport.scrollLeft = sDragScroll - dx;
    svcWrap();
  });
  function svcEndDrag(){
    if(!SVC.dragging) return;
    SVC.dragging = false;
    svcViewport.classList.remove("dragging");
    if(SVC.dragged){
      snapSvc();
      setTimeout(function(){ SVC.dragged = false; }, 350);
    }
    svcResumeSoon(3000);
  }
  svcViewport.addEventListener("pointerup", svcEndDrag);
  svcViewport.addEventListener("pointercancel", svcEndDrag);
  svcViewport.addEventListener("mouseenter", function(){ SVC.auto = false; });
  svcViewport.addEventListener("mouseleave", function(){ if(!SVC.dragging){ svcResumeSoon(2000); } });
  svcViewport.addEventListener("click", function(e){
    if(SVC.dragged) return;
    /* Reservar/Cotizar son enlaces: que sigan a WhatsApp, sin abrir la foto */
    if(e.target.closest("a, button")) return;
    var card = e.target.closest(".svc-card");
    if(!card) return;
    var img = card.querySelector(".svc-media img");
    var vid = card.querySelector(".svc-media video");
    var title = card.querySelector("h3");
    if(img){ openSingleLB(img.currentSrc || img.src, img.alt); }
    else if(vid){ openSingleLB(vid.poster, title ? title.textContent : "Photobooth 360"); }
  });
  document.getElementById("svcPrev").addEventListener("click", function(){
    var step = Math.max(1, Math.round(svcViewport.clientWidth * 0.8 / SVC.cardW)) * SVC.cardW;
    svcViewport.scrollBy({left: -step, behavior: "smooth"});
    svcResumeSoon(3000);
  });
  document.getElementById("svcNext").addEventListener("click", function(){
    var step = Math.max(1, Math.round(svcViewport.clientWidth * 0.8 / SVC.cardW)) * SVC.cardW;
    svcViewport.scrollBy({left: step, behavior: "smooth"});
    svcResumeSoon(3000);
  });
  svcDots.addEventListener("click", function(e){
    var btn = e.target.closest("button");
    if(!btn) return;
    var idx = Array.prototype.indexOf.call(svcDots.children, btn);
    var pos = ((svcViewport.scrollLeft % SVC.setW) + SVC.setW) % SVC.setW;
    var base = svcViewport.scrollLeft - pos;
    svcViewport.scrollTo({left: base + idx * SVC.cardW, behavior: "smooth"});
    setTimeout(snapSvc, 650);
    svcResumeSoon(3000);
  });
  window.addEventListener("resize", function(){ svcMeasure(); });
  window.addEventListener("load", function(){ svcMeasure(); svcViewport.scrollLeft = SVC.setW; });
  setTimeout(function(){ svcMeasure(); svcViewport.scrollLeft = SVC.setW; }, 600);
}

/* ── Loader ELITE: "EL INFLABLE SE ESTÁ INFLANDO" ── */
var loader = document.getElementById("loader"),
    loadBar = document.getElementById("loadBar"),
    loadPct = document.getElementById("loadPct"),
    loaderLogo = document.getElementById("loaderLogo"),
    pct = 0, loaderDone = false,
    REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(loaderLogo && (!gsapOn || REDUCED)){ loaderLogo.style.transform = "none"; }
function finishLoader(){
  if(loaderDone) return;
  loaderDone = true;
  loadBar.style.width = "100%";
  loadPct.textContent = "100";
  if(!REDUCED && gsapOn){
    burstConfetti(loader, loader.offsetWidth / 2, loader.offsetHeight / 2, 46, 320);
    gsap.fromTo(loaderLogo, {scaleY: 0.82, scaleX: 1.1}, {scaleY: 1, scaleX: 1, duration: 0.7, ease: "elastic.out(1, 0.4)"});
    setTimeout(function(){
      loader.classList.add("done");
      if(heroTl){ heroTl.play(); }
      startBalloonRain();
      setTimeout(function(){ loader.style.display = "none"; }, 700);
    }, 380);
  } else {
    loader.classList.add("done");
    if(heroTl){ heroTl.play(); }
    startBalloonRain();
    setTimeout(function(){ loader.style.display = "none"; }, 700);
  }
}
/* El logo entra DESINFLADO (aplastado) y se INFLA con física de rebote */
if(!REDUCED && gsapOn && loaderLogo){
  gsap.set(loaderLogo, {scaleY: 0.1, scaleX: 1.35, transformOrigin: "50% 100%"});
  gsap.timeline()
    .to(loaderLogo, {scaleY: 1.12, scaleX: 0.92, duration: 0.85, ease: "elastic.out(1, 0.45)"})
    .to(loaderLogo, {scaleY: 1, scaleX: 1, duration: 0.5, ease: "power2.out"}, "-=0.15");
}
/* ── Precarga REAL del loader (v10): la barra sigue la carga de los assets
   críticos (logo, fotos de servicios, primera tanda de galería, logos de pago
   y fuentes). Al terminar el loader la web ya está cargada completa: nada
   aparece tarde ni salta. Mínimo 900 ms para que se vea la animación de
   inflado, máximo 1800 ms, saltable al tocar. Un asset que falle igual
   cuenta como listo: nada puede dejar el loader colgado. */
var PRELOAD_START = Date.now();
function preloadList(){
  var list = ["img/logo.jpg"];
  document.querySelectorAll(".svc-media img").forEach(function(im){
    var s = im.getAttribute("src");
    if(s && list.indexOf(s) < 0){ list.push(s); }
  });
  if(typeof GALLERY !== "undefined"){
    GALLERY.slice(0, 6).forEach(function(g){ if(list.indexOf(g.src) < 0){ list.push(g.src); } });
  }
  ["ath-movil.png", "paypal.svg", "klarna.svg", "visa.svg", "mastercard.svg", "efectivo.svg"].forEach(function(n){
    list.push("img/pagos/" + n);
  });
  return list;
}
var PRELOAD_TOTAL = 0, PRELOAD_DONE = 0;
function preloadSetProgress(){
  var real = PRELOAD_TOTAL ? Math.round(PRELOAD_DONE / PRELOAD_TOTAL * 100) : 100;
  pct = Math.max(pct, real);
  loadBar.style.width = pct + "%";
  loadPct.textContent = pct;
}
function preloadTick(){
  if(loaderDone) return;
  var elapsed = Date.now() - PRELOAD_START;
  /* La barra nunca se queda parada: avanza sola hasta 92% mientras espera */
  if(pct < 92){ pct = Math.min(92, pct + 3); }
  preloadSetProgress();
  if(PRELOAD_DONE >= PRELOAD_TOTAL && PRELOAD_TOTAL > 0){
    if(elapsed >= 900){ clearInterval(preloadTimer); finishLoader(); }
  } else if(elapsed >= 1800){
    clearInterval(preloadTimer);
    finishLoader();
  }
}
function preloadOne(src){
  return new Promise(function(res){
    var im = new Image();
    var done = false;
    var fin = function(){ if(!done){ done = true; PRELOAD_DONE++; preloadSetProgress(); res(); } };
    im.onload = fin; im.onerror = fin;
    im.src = src;
    setTimeout(fin, 1500);
  });
}
function preloadFonts(){
  try{
    if(document.fonts && document.fonts.ready){
      var p = Promise.race([
        Promise.all([
          document.fonts.load("800 20px 'Baloo 2'"),
          document.fonts.load("600 20px 'Fredoka'"),
          document.fonts.load("400 20px 'Nunito'"),
          document.fonts.load("700 20px 'Nunito'")
        ]),
        new Promise(function(res){ setTimeout(res, 800); })
      ]);
      return p.then(function(){ PRELOAD_DONE++; preloadSetProgress(); });
    }
  }catch(_){}
  PRELOAD_DONE++;
  preloadSetProgress();
  return Promise.resolve();
}
var preloadTimer = null;
(function startPreload(){
  var list = preloadList();
  PRELOAD_TOTAL = list.length + 1; /* +1 = las fuentes */
  preloadTimer = setInterval(preloadTick, 110);
  list.forEach(function(src){ preloadOne(src); });
  preloadFonts();
})();
loader.addEventListener("click", function(){ if(preloadTimer){ clearInterval(preloadTimer); } finishLoader(); });

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

/* ── Cuenta regresiva al fin de semana ── */
(function countdown(){
  var el = document.getElementById("cdText");
  if(!el) return;
  function update(){
    var now = new Date();
    var day = now.getDay();
    var add = (6 - day + 7) % 7;
    var sat = new Date(now.getFullYear(), now.getMonth(), now.getDate() + add);
    sat.setHours(0, 0, 0, 0);
    var days = Math.max(0, Math.ceil((sat - now) / 86400000));
    if(days === 0){ el.textContent = "¡El fin de semana ya llegó! Separa tu fecha hoy."; }
    else if(days === 1){ el.textContent = "Falta 1 día para el finde — separa tu fecha."; }
    else { el.textContent = "Faltan " + days + " días para el finde — separa tu fecha."; }
  }
  update();
  setInterval(update, 3600000);
})();


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

/* ── ARMA TU FIESTA · constructor con total en vivo ── */
var BUILDER = [
  {id: "interactivos", name: "Juegos Interactivos", desc: "Todo el día · oferta principal", price: 150},
  {id: "castillo", name: "Castillo 13x13", desc: "El clásico que nunca falla", price: 99},
  {id: "brinco", name: "Casa de Brinco 13x13", desc: "Incluye popcorn y algodón", price: 150},
  {id: "mini", name: "Chorrera Mini", desc: "Especial fin de semana · incluye popcorn", price: 175},
  {id: "chorrera", name: "Chorrera", desc: "Especial de la semana", price: 199},
  {id: "mediana", name: "Chorrera Mediana", desc: "Elige el tamaño", price: null, sizes: [["16 x 30 · $225", 225], ["19 x 30 · $250", 250], ["Grande · $275", 275]]},
  {id: "obstaculos", name: "Carrera de Obstáculos", desc: "Desde $299", price: 299},
  {id: "obst60", name: "Carrera de Obstáculos 60 pies", desc: "La gigante", price: 350},
  {id: "espuma", name: "Cañón de Espuma", desc: "Desde $150 el día", price: 150},
  {id: "photo", name: "Photobooth 360", desc: "Desde $150", price: 150},
  {id: "toro", name: "Toro Mecánico", desc: "El reto de la fiesta", price: null},
  {id: "playground", name: "Playground", desc: "Lo nuevo, para los más pequeños", price: null},
  {id: "mantecado", name: "Máquina de Mantecado", desc: "3 sabores", price: null},
  {id: "comida", name: "Popcorn, Algodón, Piraguas y Slush", desc: "Máquinas de comida y mealprep", price: null},
  {id: "gigantes", name: "Juegos Gigantes", desc: "Double Axe Throw y más", price: null},
  {id: "mesas", name: "Mesas, Sillas y Carpa", desc: "Todo el equipo para tu evento", price: null},
  {id: "catering", name: "Catering y Postres", desc: "Nachos con queso y más", price: null}
];
var builderGrid = document.getElementById("builderGrid");
if(builderGrid){
  var bHtml = "";
  BUILDER.forEach(function(it){
    var priceHtml = (it.price !== null)
      ? '<span class="b-price">$' + it.price + "</span>"
      : '<span class="b-price"><small>A cotizar</small></span>';
    var selHtml = "";
    if(it.sizes){
      selHtml = '<select data-size-for="' + it.id + '" aria-label="Tamaño de Chorrera Mediana">';
      it.sizes.forEach(function(s){ selHtml += '<option value="' + s[1] + '">' + s[0] + "</option>"; });
      selHtml += "</select>";
    }
    bHtml += '<label class="b-item" data-id="' + it.id + '">' +
      '<input type="checkbox" data-bid="' + it.id + '">' +
      '<span class="b-info"><h4>' + it.name + "</h4><p>" + it.desc + "</p>" + selHtml + "</span>" +
      priceHtml + "</label>";
  });
  builderGrid.innerHTML = bHtml;
}
function builderSelection(){
  var picked = [];
  BUILDER.forEach(function(it){
    var cb = document.querySelector('[data-bid="' + it.id + '"]');
    if(cb && cb.checked){
      var price = it.price;
      if(it.sizes){
        var sel = document.querySelector('[data-size-for="' + it.id + '"]');
        price = sel ? parseInt(sel.value, 10) : it.sizes[0][1];
      }
      picked.push({item: it, price: price});
    }
  });
  return picked;
}
function builderUpdate(){
  var picked = builderSelection();
  var totalEl = document.getElementById("bTotal"),
      noteEl = document.getElementById("bNote"),
      listEl = document.getElementById("bList");
  var total = 0, hasQuote = false;
  var listHtml = "";
  picked.forEach(function(p){
    if(p.price !== null){ total += p.price; listHtml += "<li><span>" + p.item.name + "</span><b>$" + p.price + "</b></li>"; }
    else { hasQuote = true; listHtml += "<li><span>" + p.item.name + "</span><b>A cotizar</b></li>"; }
  });
  listEl.innerHTML = listHtml;
  if(!picked.length){
    totalEl.textContent = "$0";
    noteEl.textContent = "Marca al menos un servicio para ver tu total.";
  } else if(total === 0){
    totalEl.textContent = "A cotizar";
    noteEl.textContent = "Te confirmamos el precio por WhatsApp.";
  } else {
    totalEl.textContent = "$" + total;
    noteEl.textContent = hasQuote
      ? "Total estimado de los servicios con precio. Los servicios a cotizar se confirman por WhatsApp."
      : "Total estimado según precios de Facebook.";
  }
  document.querySelectorAll(".b-item").forEach(function(label){
    var cb = label.querySelector('input[type="checkbox"]');
    label.classList.toggle("on", !!(cb && cb.checked));
  });
}
if(builderGrid){
  builderGrid.addEventListener("change", builderUpdate);
  document.getElementById("bSend").addEventListener("click", function(){
    var picked = builderSelection();
    if(!picked.length){
      var note = document.getElementById("bNote");
      note.textContent = "Marca al menos un servicio para armar tu fiesta.";
      if(gsapOn){ gsap.fromTo(".builder-side", {x: -8}, {x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)"}); }
      return;
    }
    var fecha = document.getElementById("bFecha").value;
    var fechaTxt = "Sin fecha todavía";
    if(fecha){
      var parts = fecha.split("-");
      if(parts.length === 3){ fechaTxt = parts[2] + "/" + parts[1] + "/" + parts[0]; }
    }
    var lines = ["Hola Omi Jumping, quiero armar mi fiesta:", ""];
    var total = 0;
    picked.forEach(function(p){
      if(p.price !== null){ total += p.price; lines.push("- " + p.item.name + " ($" + p.price + ")"); }
      else { lines.push("- " + p.item.name + " (a cotizar)"); }
    });
    lines.push("");
    lines.push("Fecha del evento: " + fechaTxt);
    lines.push(total > 0 ? "Total estimado: $" + total : "Total: a cotizar");
    lines.push("¿Me confirmas disponibilidad y precio final?");
    window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
  });
  builderUpdate();
}

/* ── Arma tu fiesta: cerrado por defecto (v11); abre al tocar ── */
var builderBox = document.getElementById("builderBox"),
    builderOpenBtn = document.getElementById("builderOpen"),
    builderCloseRow = document.getElementById("builderCloseRow"),
    builderCloseBtn = document.getElementById("builderClose");
function openBuilder(scroll){
  if(!builderBox) return;
  builderBox.classList.remove("builder-hidden");
  if(builderCloseRow) builderCloseRow.classList.remove("builder-hidden");
  if(builderOpenBtn){ builderOpenBtn.classList.add("builder-hidden"); builderOpenBtn.setAttribute("aria-expanded", "true"); }
  if(window.ScrollTrigger){ ScrollTrigger.refresh(); }
  if(gsapOn){ gsap.fromTo(builderBox, {opacity: 0, y: 24}, {opacity: 1, y: 0, duration: 0.6, ease: "power3.out", clearProps: "opacity,transform"}); }
  if(scroll){
    setTimeout(function(){ document.getElementById("arma-tu-fiesta").scrollIntoView({behavior: "smooth"}); }, 60);
  }
}
function closeBuilder(){
  if(!builderBox) return;
  builderBox.classList.add("builder-hidden");
  if(builderCloseRow) builderCloseRow.classList.add("builder-hidden");
  if(builderOpenBtn){ builderOpenBtn.classList.remove("builder-hidden"); builderOpenBtn.setAttribute("aria-expanded", "false"); }
  if(window.ScrollTrigger){ ScrollTrigger.refresh(); }
  document.getElementById("arma-tu-fiesta").scrollIntoView({behavior: "smooth"});
}
if(builderOpenBtn){ builderOpenBtn.addEventListener("click", function(){ openBuilder(false); }); }
if(builderCloseBtn){ builderCloseBtn.addEventListener("click", closeBuilder); }
/* Menú de 3 rayas y CTA del hero: ir a la sección Y abrir el constructor */
document.querySelectorAll('a[href="#arma-tu-fiesta"]').forEach(function(a){
  a.addEventListener("click", function(){ openBuilder(true); });
});

/* ── Lightbox: galería (con prev/next) y foto única de servicio (solo X) ── */
var lb = document.getElementById("lightbox"),
    lbImg = document.getElementById("lbImg"),
    lbIdx = 0,
    lbMode = "gallery";
function galCount(){ return (typeof GALLERY !== "undefined") ? GALLERY.length : 0; }
function pauseAllCarousels(ms){
  if(catViewport){ catPause(ms); }
  if(svcViewport){ svcPause(ms); }
  if(expViewport){ expPause(ms); }
}
function resumeAllCarousels(ms){
  if(catViewport){ catResumeSoon(ms); }
  if(svcViewport){ svcResumeSoon(ms); }
  if(expViewport){ expResumeSoon(ms); }
}
function openLB(i){
  var n = galCount();
  if(!n) return;
  lbMode = "gallery";
  lb.classList.remove("lb-single");
  lbIdx = ((i % n) + n) % n;
  lbImg.src = GALLERY[lbIdx].src;
  lbImg.alt = GALLERY[lbIdx].alt;
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  pauseAllCarousels(60000);
}
/* Una sola foto (servicios): completa, sin recortes, sin prev/next */
function openSingleLB(src, alt){
  if(!src) return;
  lbMode = "single";
  lb.classList.add("lb-single");
  lbImg.src = src;
  lbImg.alt = alt || "Foto de Omi Jumping";
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  pauseAllCarousels(60000);
}
/* Experiencia: foto completa con X + prev/next (igual que la galería) */
function expCount(){ return (typeof EXP !== "undefined") ? EXP.length : 0; }
function openExpLB(i){
  var n = expCount();
  if(!n) return;
  lbMode = "exp";
  lb.classList.remove("lb-single");
  lbIdx = ((i % n) + n) % n;
  lbImg.src = EXP[lbIdx].src;
  lbImg.alt = EXP[lbIdx].alt;
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  pauseAllCarousels(60000);
}
function closeLB(){
  lb.classList.remove("open");
  lb.classList.remove("lb-single");
  lbMode = "gallery";
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  resumeAllCarousels(3000);
}
lb.querySelector(".lb-close").addEventListener("click", closeLB);
lb.querySelector(".lb-prev").addEventListener("click", function(e){ e.stopPropagation(); if(lbMode === "gallery"){ openLB(lbIdx - 1); } else if(lbMode === "exp"){ openExpLB(lbIdx - 1); } });
lb.querySelector(".lb-next").addEventListener("click", function(e){ e.stopPropagation(); if(lbMode === "gallery"){ openLB(lbIdx + 1); } else if(lbMode === "exp"){ openExpLB(lbIdx + 1); } });
lb.addEventListener("click", function(e){ if(e.target === lb) closeLB(); });
document.addEventListener("keydown", function(e){
  if(e.key === "Escape"){ setMenu(false); closeLB(); }
  if(lb.classList.contains("open") && (lbMode === "gallery" || lbMode === "exp")){
    if(e.key === "ArrowRight"){ if(lbMode === "gallery"){ openLB(lbIdx + 1); } else { openExpLB(lbIdx + 1); } }
    if(e.key === "ArrowLeft"){ if(lbMode === "gallery"){ openLB(lbIdx - 1); } else { openExpLB(lbIdx - 1); } }
  }
});

/* ── Reveal on scroll (fallback vanilla cuando NO hay GSAP) ── */
if(!gsapOn){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add("on"); io.unobserve(en.target); }
    });
  }, {threshold: 0.12});
  document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });
}

/* ── Video Photobooth: reintento de autoplay silencioso ── */
var vid = document.querySelector(".svc-media video");
if(vid){
  var p = vid.play();
  if(p && p.catch){ p.catch(function(){}); }
}

/* ═══════════════ GLOBOS ELITE 3D ═══════════════ */
var balloonLayer = document.getElementById("balloonLayer");
var heroBalloons = [];
function spawnHeroBalloon(rise){
  if(!balloonLayer) return null;
  var depth = 0.35 + Math.random() * 0.65;
  var size = Math.round(58 + depth * 72);
  var b = makeBalloon(Math.floor(Math.random() * BALLOON_COLORS.length), size);
  b.style.left = (3 + Math.random() * 88) + "%";
  b.style.top = (8 + Math.random() * 62) + "%";
  b.dataset.depth = depth.toFixed(2);
  balloonLayer.appendChild(b);
  heroBalloons.push(b);
  if(gsapOn){
    var inner = b.querySelector(".b3d-in");
    var svg = b.querySelector("svg");
    gsap.to(inner, {y: -12 - depth * 16, duration: 2.1 + depth * 1.2, yoyo: true, repeat: -1, ease: "sine.inOut", delay: Math.random()});
    gsap.to(svg, {rotation: 4, transformOrigin: "50% 0%", duration: 2.4 + depth, yoyo: true, repeat: -1, ease: "sine.inOut"});
    gsap.to(b, {yPercent: -30 - depth * 50, ease: "none",
      scrollTrigger: {trigger: ".hero", start: "top top", end: "bottom top", scrub: 1}});
    if(rise){
      gsap.from(b, {y: 180, opacity: 0, duration: 1.5, ease: "power2.out", delay: Math.random() * 0.7});
    }
  }
  return b;
}
function startBalloonRain(){
  if(!balloonLayer || heroBalloons.length) return;
  var count = isMobile ? 5 : 9;
  for(var i = 0; i < count; i++){ spawnHeroBalloon(true); }
}
if(balloonLayer){
  balloonLayer.addEventListener("click", function(e){
    var b = e.target.closest(".b3d");
    if(!b || b.dataset.popping) return;
    b.dataset.popping = "1";
    var r = b.getBoundingClientRect();
    var lr = balloonLayer.getBoundingClientRect();
    burstConfetti(balloonLayer, r.left - lr.left + r.width / 2, r.top - lr.top + r.height / 2, 14, 120);
    if(gsapOn){
      gsap.timeline({onComplete: function(){
        var idxB = heroBalloons.indexOf(b);
        if(idxB > -1){ heroBalloons.splice(idxB, 1); }
        if(window.ScrollTrigger){ ScrollTrigger.getAll().forEach(function(st){ if(st.trigger === b){ st.kill(); } }); }
        b.remove();
        setTimeout(function(){ spawnHeroBalloon(true); }, 1200);
      }})
      .to(b.querySelector(".b3d-in"), {scale: 1.3, duration: 0.12, ease: "power2.in"})
      .to(b, {scale: 0, opacity: 0, duration: 0.28, ease: "back.in(2)"}, 0.1);
    } else {
      b.remove();
      setTimeout(function(){ spawnHeroBalloon(false); }, 1200);
    }
  });
  /* Parallax con el mouse + globos que se apartan al acercarse */
  if(!isMobile){
    var heroEl = document.querySelector(".hero");
    heroEl.addEventListener("mousemove", function(e){
      var r = heroEl.getBoundingClientRect();
      var mx = (e.clientX - r.left) / r.width - 0.5;
      var my = (e.clientY - r.top) / r.height - 0.5;
      heroBalloons.forEach(function(b){
        var d = parseFloat(b.dataset.depth || "0.7");
        if(gsapOn){ gsap.to(b, {x: mx * 44 * d, duration: 0.9, ease: "power2.out", overwrite: "auto"}); }
        var br = b.getBoundingClientRect();
        var dx = (br.left + br.width / 2) - e.clientX;
        var dy = (br.top + br.height / 2) - e.clientY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < 150 && gsapOn){
          gsap.to(b.querySelector(".b3d-in"), {x: (dx / dist) * 34, duration: 0.6, ease: "power2.out"});
        } else if(gsapOn){
          gsap.to(b.querySelector(".b3d-in"), {x: 0, duration: 0.8, ease: "power2.out"});
        }
      });
    });
  }
}

/* ═══════════════ JUEGO · REVIENTA LOS GLOBOS ═══════════════ */
var game = {playing: false, score: 0, time: 20, spawnTimer: null, tickTimer: null};
var gameArena = document.getElementById("gameArena");
function gameEnd(){
  game.playing = false;
  clearInterval(game.spawnTimer);
  clearInterval(game.tickTimer);
  if(gameArena){
    gameArena.querySelectorAll(".b3d").forEach(function(b){ b.remove(); });
  }
  var endEl = document.getElementById("gEnd");
  var ctaEl = document.getElementById("gEndCta");
  var waEl = document.getElementById("gEndWa");
  var msg = "¡Hice " + game.score + " puntos en Revienta los Globos! Quiero reservar mi fiesta con Omi Jumping.";
  endEl.textContent = game.score >= 100
    ? "¡" + game.score + " puntos! Eres una estrella de la fiesta. Tu fiesta es la próxima."
    : "¡" + game.score + " puntos! Buen juego. Tu fiesta es la próxima.";
  endEl.hidden = false;
  ctaEl.hidden = false;
  waEl.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hola Omi Jumping, " + msg);
  var startBtn = document.getElementById("gStart");
  startBtn.textContent = "Jugar de nuevo";
  startBtn.disabled = false;
}
function gameSpawn(){
  if(!game.playing || !gameArena) return;
  var b = makeBalloon(Math.floor(Math.random() * BALLOON_COLORS.length), 56 + Math.floor(Math.random() * 28));
  b.style.left = (4 + Math.random() * 84) + "%";
  b.style.top = "100%";
  gameArena.appendChild(b);
  var h = gameArena.clientHeight;
  if(gsapOn){
    gsap.to(b, {y: -(h + 180), duration: 2.8 + Math.random() * 1.1, ease: "none",
      onComplete: function(){ b.remove(); }});
  } else {
    setTimeout(function(){ b.remove(); }, 3500);
  }
}
function gameStart(){
  if(game.playing) return;
  game.playing = true;
  game.score = 0;
  game.time = 20;
  document.getElementById("gScore").textContent = "0";
  document.getElementById("gTime").textContent = "20";
  document.getElementById("gEnd").hidden = true;
  document.getElementById("gEndCta").hidden = true;
  var idle = gameArena.querySelector(".game-idle");
  if(idle){ idle.remove(); }
  var startBtn = document.getElementById("gStart");
  startBtn.textContent = "Jugando...";
  startBtn.disabled = true;
  game.spawnTimer = setInterval(gameSpawn, 650);
  game.tickTimer = setInterval(function(){
    game.time--;
    document.getElementById("gTime").textContent = game.time;
    if(game.time <= 0){ gameEnd(); }
  }, 1000);
}
if(gameArena){
  document.getElementById("gStart").addEventListener("click", gameStart);
  gameArena.addEventListener("click", function(e){
    var b = e.target.closest(".b3d");
    if(!b || !game.playing || b.dataset.popping) return;
    b.dataset.popping = "1";
    game.score += 10;
    var scoreEl = document.getElementById("gScore");
    scoreEl.textContent = game.score;
    if(gsapOn){ gsap.fromTo(scoreEl, {scale: 1.5}, {scale: 1, duration: 0.4, ease: "back.out(2)"}); }
    var r = b.getBoundingClientRect();
    var ar = gameArena.getBoundingClientRect();
    burstConfetti(gameArena, r.left - ar.left + r.width / 2, r.top - ar.top + r.height / 2, 10, 90);
    if(gsapOn){
      gsap.timeline({onComplete: function(){ b.remove(); }})
        .to(b.querySelector(".b3d-in"), {scale: 1.35, duration: 0.1, ease: "power2.in"})
        .to(b, {scale: 0, opacity: 0, duration: 0.22, ease: "back.in(2)"}, 0.08);
    } else {
      b.remove();
    }
  });
}

/* ═══════════════ GSAP · animación elite ═══════════════ */
var heroTl = null;
if(gsapOn){
  /* ── Timeline de entrada del hero (en pausa hasta que se va el loader) ── */
  gsap.set(".hero-anim", {opacity: 0});
  gsap.set(".hero-logo-unit", {scale: REDUCED ? 1 : 0.85});
  gsap.set(".social-row .soc", {y: 18});
  gsap.set(".hero h1 .w", {yPercent: 115});
  gsap.set(".hero .offer", {scale: 0.7, transformOrigin: "50% 100%"});
  gsap.set([".hero .hero-sub", ".hero .hero-ctas", ".hero .hero-note", ".call-today", ".countdown"], {y: 24});
  heroTl = gsap.timeline({paused: true, defaults: {ease: "power3.out"}});
  heroTl
    .to(".hero-logo-unit", {opacity: 1, scale: 1, duration: 1.15, ease: REDUCED ? "power2.out" : "elastic.out(1, 0.55)"}, 0)
    .to(".social-row", {opacity: 1, duration: 0.1}, 0.35)
    .to(".social-row .soc", {opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2)"}, 0.35)
    .to(".call-today", {opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.6)"}, 0.55)
    .to(".hero .badge", {opacity: 1, duration: 0.5}, 0.7)
    .to(".hero h1", {opacity: 1, duration: 0.1}, 0.75)
    .to(".hero h1 .w", {yPercent: 0, duration: 0.85, stagger: 0.1, ease: "back.out(1.7)"}, 0.75)
    .to(".hero .hero-sub", {opacity: 1, y: 0, duration: 0.6}, 1.05)
    .to(".hero .offer", {opacity: 1, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.55)"}, 1.15)
    .to(".countdown", {opacity: 1, y: 0, duration: 0.5}, 1.4)
    .to(".hero .hero-ctas", {opacity: 1, y: 0, duration: 0.5}, 1.5)
    .to(".hero .hero-note", {opacity: 1, y: 0, duration: 0.5}, 1.6);

  /* ── Física de rebote: el precio de la oferta se infla y rebota ── */
  gsap.set(".offer-price", {transformOrigin: "50% 100%"});
  gsap.timeline({repeat: -1, repeatDelay: 2.6, delay: 3})
    .to(".offer-price", {scaleY: 0.8, scaleX: 1.1, duration: 0.16, ease: "power2.in"})
    .to(".offer-price", {scaleY: 1.14, scaleX: 0.93, duration: 0.55, ease: "elastic.out(1.2, 0.35)"})
    .to(".offer-price", {scaleY: 1, scaleX: 1, duration: 0.4, ease: "power2.out"});

  /* ── Parallax del hero al hacer scroll ── */
  gsap.to(".hero-center", {y: 40, ease: "none",
    scrollTrigger: {trigger: ".hero", start: "top top", end: "bottom top", scrub: 1}});

  /* ── Marquesina fiesta (loop infinito) ── */
  gsap.to("#marqueeTrack", {xPercent: -50, repeat: -1, duration: 24, ease: "none"});

  /* ── Micro-interacción: los CTAs rebotan al tocarlos ── */
  document.querySelectorAll(".btn, .soc, .call-today").forEach(function(btn){
    btn.addEventListener("click", function(){
      gsap.fromTo(btn, {scale: 0.92}, {scale: 1, duration: 0.7, ease: "elastic.out(1, 0.4)", overwrite: "auto"});
    });
  });
  /* Pulso suave del CTA principal del hero */
  gsap.to(".hero-ctas .btn-wa", {scale: 1.045, duration: 0.85, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 2});

  /* ── Logo hero: inflado suave + respiración + brillo + halo + tilt ── */
  if(!REDUCED){
    var logoUnit = document.querySelector(".hero-logo-unit");
    if(logoUnit){
      var floatAmp = isMobile ? -4 : -8;
      gsap.to(logoUnit, {y: floatAmp, duration: 2.25, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 2});
      gsap.to(".hero-logo-halo", {scale: 1.07, opacity: 0.9, duration: 2.25, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 2});
      gsap.fromTo(".hero-shine", {xPercent: -320}, {xPercent: 460, duration: 1.15, ease: "sine.inOut", repeat: -1, repeatDelay: 4.9, delay: 3});
      if(window.matchMedia("(pointer: fine)").matches){
        var heroEl = document.querySelector(".hero");
        heroEl.addEventListener("mousemove", function(e){
          var r = heroEl.getBoundingClientRect();
          var nx = (e.clientX - r.left) / r.width * 2 - 1;
          var ny = (e.clientY - r.top) / r.height * 2 - 1;
          gsap.to(logoUnit, {rotationY: nx * 6, rotationX: -ny * 6, duration: 0.9, ease: "power2.out", overwrite: "auto"});
        });
        heroEl.addEventListener("mouseleave", function(){
          gsap.to(logoUnit, {rotationY: 0, rotationX: 0, duration: 1.1, ease: "power2.out", overwrite: "auto"});
        });
      } else {
        gsap.to(logoUnit, {rotationX: 3.5, ease: "none",
          scrollTrigger: {trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2}});
      }
    }
  }

  /* ── Reveals con ScrollTrigger en cada sección ── */
  var single = gsap.utils.toArray(".rv:not(.hero-anim)").filter(function(el){
    if(el.classList.contains("quote") || el.classList.contains("price-table") || el.classList.contains("cat-wrap")){ return false; }
    return !el.closest(".svc-wrap, .steps, .aud-grid, .contact-grid, .price-table, .cat-track, .builder, .game");
  });
  single.forEach(function(el){
    gsap.from(el, {y: 44, opacity: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: {trigger: el, start: "top 88%", once: true}});
  });
  /* Tarjetas de servicios: solo fade (v9, fila plana: sin transform en loop) */
  ScrollTrigger.batch(".svc-card", {start: "top 88%", once: true,
    onEnter: function(b){ gsap.fromTo(b, {opacity: 0}, {opacity: 1, duration: 0.8, stagger: 0.09, ease: "power2.out", overwrite: "auto"}); }});
  ScrollTrigger.batch(".step, .aud-card, .c-card", {start: "top 88%", once: true,
    onEnter: function(b){ gsap.fromTo(b, {y: 40, opacity: 0}, {y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", overwrite: true}); }});
  ScrollTrigger.batch(".price-row:not(.head)", {start: "top 92%", once: true,
    onEnter: function(b){ gsap.fromTo(b, {x: -28, opacity: 0}, {x: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: "power2.out", overwrite: true}); }});
  ScrollTrigger.batch(".b-item", {start: "top 92%", once: true,
    onEnter: function(b){ gsap.fromTo(b, {y: 30, opacity: 0}, {y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "back.out(1.4)", overwrite: true}); }});
  gsap.from(".quote", {y: 60, opacity: 0, duration: 1, ease: "power3.out",
    scrollTrigger: {trigger: "#reserva", start: "top 85%", once: true}});
  gsap.from(".price-table", {y: 44, opacity: 0, duration: 0.9, ease: "power3.out",
    scrollTrigger: {trigger: "#precios", start: "top 85%", once: true}});
  gsap.from(".builder-side", {y: 44, opacity: 0, duration: 0.9, ease: "power3.out",
    scrollTrigger: {trigger: "#arma-tu-fiesta", start: "top 80%", once: true}});
  gsap.from(".cat-wrap", {y: 44, opacity: 0, duration: 0.9, ease: "power3.out",
    scrollTrigger: {trigger: "#galeria", start: "top 82%", once: true}});
  gsap.from(".svc-wrap", {y: 44, opacity: 0, duration: 0.9, ease: "power3.out",
    scrollTrigger: {trigger: "#servicios", start: "top 82%", once: true}});
  gsap.from(".fiesta-sky", {scale: 0.94, opacity: 0, duration: 1, ease: "back.out(1.4)",
    scrollTrigger: {trigger: "#fiesta", start: "top 82%", once: true}});

  window.addEventListener("load", function(){ ScrollTrigger.refresh(); });
}

/* ── Red de seguridad: ninguna sección puede quedarse invisible jamás ── */
function forceReveal(){
  var vh = window.innerHeight || 800;
  var sel = ".rv, .svc-card, .step, .aud-card, .c-card, .b-item, .price-row, .quote, .price-table, .builder-side, .cat-wrap, .fiesta-sky";
  document.querySelectorAll(sel).forEach(function(el){
    if(el.classList.contains("hero-anim")) return;
    var r = el.getBoundingClientRect();
    if(r.top < vh * 0.92 && r.bottom > -100){
      if(getComputedStyle(el).opacity === "0"){ el.classList.add("force-on"); }
    }
  });
  if(window.ScrollTrigger){ ScrollTrigger.refresh(); }
}
window.addEventListener("load", function(){ setTimeout(forceReveal, 2000); });
setTimeout(forceReveal, 5000);
var frT = null;
window.addEventListener("scroll", function(){
  if(frT) return;
  frT = setTimeout(function(){ frT = null; forceReveal(); }, 250);
}, {passive: true});

/* ── Tilt 3D suave en las tarjetas de pago (solo mouse; en táctil manda el hover CSS) ── */
document.querySelectorAll(".pay-card[data-tilt]").forEach(function(card){
  card.addEventListener("pointermove", function(e){
    if(e.pointerType !== "mouse") return;
    var r = card.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = "translateY(-8px) rotateX(" + (-y * 10).toFixed(1) + "deg) rotateY(" + (x * 12).toFixed(1) + "deg)";
  });
  card.addEventListener("pointerleave", function(){ card.style.transform = ""; });
});
})();
