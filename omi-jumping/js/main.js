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
  return '<svg viewBox="0 0 100 152" aria-hidden="true">' +
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
  setTimeout(function(){
    loader.classList.add("done");
    if(heroTl){ heroTl.play(); }
    startBalloonRain();
  }, 350);
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

/* ── Carrusel 3D del hero (GSAP cuando está, vanilla si no) ── */
var ring = document.getElementById("ring"),
    stage = document.getElementById("stage"),
    dots = document.querySelectorAll("#ringNav button"),
    idx = 0, total = 3, autoTimer = null;
function showSlide(n){
  idx = ((n % total) + total) % total;
  if(gsapOn){
    gsap.to(ring, {rotationY: -idx * 120, duration: 1.1, ease: "power3.inOut"});
  } else {
    ring.style.transform = "rotateY(" + (-idx * 120) + "deg)";
  }
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

/* ── Lightbox de galería ── */
var lb = document.getElementById("lightbox"),
    lbImg = document.getElementById("lbImg"),
    lbIdx = 0;
function galCount(){ return (typeof GALLERY !== "undefined") ? GALLERY.length : 0; }
function openLB(i){
  var n = galCount();
  if(!n) return;
  lbIdx = ((i % n) + n) % n;
  lbImg.src = GALLERY[lbIdx].src;
  lbImg.alt = GALLERY[lbIdx].alt;
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if(catViewport){ catPause(60000); }
}
function closeLB(){
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if(catViewport){ catResumeSoon(3000); }
}
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

/* ═══════════════ LA FIESTA · personajes, confetti, parallax ═══════════════ */
var bounceTweens = [];
function fiestaStart(){
  if(!gsapOn || bounceTweens.length) return;
  var chars = [document.getElementById("char1"), document.getElementById("char2"), document.getElementById("char3")];
  chars.forEach(function(ch, i){
    if(!ch) return;
    gsap.set(ch, {transformOrigin: "50% 100%"});
    bounceTweens.push(gsap.to(ch, {y: -42 - i * 6, duration: 0.55 + i * 0.07, yoyo: true, repeat: -1, ease: "sine.inOut", delay: i * 0.14}));
    bounceTweens.push(gsap.to(ch, {scaleY: 0.86, scaleX: 1.12, duration: 0.27, yoyo: true, repeat: -1, ease: "sine.inOut", delay: i * 0.14}));
  });
  /* Personaje deslizándose por la chorrera, en loop */
  var slider = document.getElementById("charSlider");
  if(slider){
    gsap.set(slider, {transformOrigin: "50% 50%"});
    gsap.timeline({repeat: -1, repeatDelay: 0.6})
      .to(slider, {x: 88, y: 198, rotation: 62, duration: 1.15, ease: "power2.in"})
      .to(slider, {opacity: 0, duration: 0.2}, "+=0.1")
      .set(slider, {x: 0, y: 0, rotation: 0})
      .to(slider, {opacity: 1, duration: 0.3});
  }
  /* Lluvia de confetti al entrar */
  var sky = document.getElementById("fiestaSky");
  var rain = 0;
  var rainTimer = setInterval(function(){
    rain++;
    if(rain > 4){ clearInterval(rainTimer); return; }
    burstConfetti(document.getElementById("fiestaConfetti"),
      60 + Math.random() * (sky.clientWidth - 120), 10, 12, 90);
  }, 900);
  /* Racimo de globos atado al castillo */
  var bunch = document.getElementById("fiestaBunch");
  if(bunch && !bunch.children.length){
    for(var i = 0; i < 3; i++){
      var bb = makeBalloon(i, 40);
      bb.style.pointerEvents = "none";
      bb.style.cursor = "default";
      bunch.appendChild(bb);
      gsap.to(bb, {y: -9 - i * 3, duration: 1.8 + i * 0.3, yoyo: true, repeat: -1, ease: "sine.inOut"});
    }
  }
}
function fiestaBoom(){
  var castle = document.getElementById("fiestaCastle");
  var sky = document.getElementById("fiestaSky");
  if(!castle || !sky) return;
  var r = castle.getBoundingClientRect();
  var sr = sky.getBoundingClientRect();
  burstConfetti(document.getElementById("fiestaConfetti"),
    r.left - sr.left + r.width / 2, r.top - sr.top + 90, 60, 260);
  if(gsapOn){
    bounceTweens.forEach(function(t){
      t.timeScale(2.4);
      gsap.delayedCall(1.4, function(){ t.timeScale(1); });
    });
    gsap.fromTo("#fiestaCastle svg", {scale: 1}, {scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out", transformOrigin: "50% 100%"});
  }
}
(function fiestaInit(){
  var castle = document.getElementById("fiestaCastle");
  if(castle){
    castle.addEventListener("click", fiestaBoom);
    castle.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); fiestaBoom(); } });
  }
  if(gsapOn){
    ScrollTrigger.create({trigger: "#fiesta", start: "top 75%", once: true, onEnter: fiestaStart});
    /* Parallax suave con el mouse en desktop */
    if(!isMobile){
      var skyEl = document.getElementById("fiestaSky");
      skyEl.addEventListener("mousemove", function(e){
        var r = skyEl.getBoundingClientRect();
        var mx = (e.clientX - r.left) / r.width - 0.5;
        var my = (e.clientY - r.top) / r.height - 0.5;
        skyEl.querySelectorAll("[data-depth]").forEach(function(el){
          if(el.id === "fiestaCastle") return;
          var d = parseFloat(el.getAttribute("data-depth") || "10");
          gsap.to(el, {x: mx * d, y: my * d * 0.6, duration: 0.9, ease: "power2.out", overwrite: "auto"});
        });
      });
    }
  } else {
    fiestaStart();
  }
})();

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
  gsap.set(".hero-logo", {scale: 0.55, rotation: -6});
  gsap.set(".social-row .soc", {y: 18});
  gsap.set(".hero h1 .w", {yPercent: 115});
  gsap.set(".hero .offer", {scale: 0.7, transformOrigin: "50% 100%"});
  gsap.set(".hero .stage", {scale: 0.82, rotationY: -24, opacity: 0});
  gsap.set([".hero .hero-sub", ".hero .hero-ctas", ".hero .hero-note", ".call-today", ".countdown"], {y: 24});
  heroTl = gsap.timeline({paused: true, defaults: {ease: "power3.out"}});
  heroTl
    .to(".hero-logo", {opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: "elastic.out(1, 0.6)"}, 0)
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
    .to(".hero .hero-note", {opacity: 1, y: 0, duration: 0.5}, 1.6)
    .to(".stage-col", {opacity: 1, duration: 0.3}, 1.1)
    .to(".hero .stage", {opacity: 1, scale: 1, rotationY: 0, duration: 1.1, ease: "power3.out"}, 1.1);

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

  /* ── Reveals con ScrollTrigger en cada sección ── */
  var single = gsap.utils.toArray(".rv:not(.hero-anim)").filter(function(el){
    if(el.classList.contains("quote") || el.classList.contains("price-table") || el.classList.contains("cat-wrap")){ return false; }
    return !el.closest(".svc-grid, .steps, .aud-grid, .contact-grid, .price-table, .cat-track, .builder, .game");
  });
  single.forEach(function(el){
    gsap.from(el, {y: 44, opacity: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: {trigger: el, start: "top 88%", once: true}});
  });
  ScrollTrigger.batch(".svc-card", {start: "top 88%", once: true,
    onEnter: function(b){ gsap.fromTo(b, {y: 50, opacity: 0, scale: 0.94}, {y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.09, ease: "back.out(1.5)", overwrite: true}); }});
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
  gsap.from(".fiesta-sky", {scale: 0.94, opacity: 0, duration: 1, ease: "back.out(1.4)",
    scrollTrigger: {trigger: "#fiesta", start: "top 82%", once: true}});

  window.addEventListener("load", function(){ ScrollTrigger.refresh(); });
}
})();
