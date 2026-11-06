/* ═══════════════ OMI JUMPING · CATÁLOGO v16 ═══════════════
   Datos del documento FINAL 2026-11-06 (catalogo-omi-jumping-2026-11-06.md):
   44 ítems únicos (47 tarjetas: carpas/mesas/sillas son 5 precios con 2 fotos),
   47 tarjetas con precio SEGURO confirmado por Omar, todas con precio.
   Precios completos 2026-11-06: regla de Omar + lista de respuestas 6-23.
   #4 = $165 y #7 = $90 (precios por foto, pendientes de confirmación).
   Revisión de precios 2026-11-06 + respuestas de Omar: catálogo COMPLETO 44/44.
   Precio SEGURO solo cuando el documento lo marca SEGURO. NUNCA se inventa un precio.
   Sin apóstrofes en los strings (regla standing: rompen el form de WhatsApp). */
(function(){
"use strict";
var V = "?v=16";
var IMG = "img/catalogo/";
var VID = "img/catalogo/videos/";

/* cat: castillos | combos | chorreras | juegos | obstaculos | toro | carpas | espuma
   price: string con el precio SEGURO, o null = "Precio a confirmar"
   unit: texto extra del precio (ej. "c/u")
   tag: "VIDEO" | "RENDER" | "2 ANGULOS" | null
   img2: segundo ángulo (misma unidad) */
var CATALOGO = [
  /* ── Castillos / Casas de brinco (8) ── */
  {cat: "castillos", name: "Castillo Rojo y Azul", desc: "Torres cónicas rojas, columnas grises, rampa roja con punta verde.", img: "castillo-rojo-azul-01.jpg", price: "100"},
  {cat: "castillos", name: "Castillo Morado con Corona", desc: "Morado y rojo con corona amarilla y torres rojas.", img: "castillo-morado-corona.jpg", price: "100"},
  {cat: "castillos", name: "Castillo Rosa y Azul", desc: "Conos azules y rampa azul.", img: "castillo-rosa-azul.jpg", price: "100"},
  {cat: "castillos", name: "Castillo Rojo y Azul con Malla", desc: "Frente de malla, rampa azul con rayas rojas.", img: "castillo-rojo-azul-02.jpg", price: "165"},
  {cat: "castillos", name: "Castillo Toy Story", desc: "Temático Toy Story con Woody y Buzz en panel, en cancha techada.", img: "castillo-toy-story.jpg", price: "100"},
  {cat: "castillos", name: "Castillo Azul y Naranja", desc: "Azul y naranja, foto de almacén.", img: "castillo-azul-naranja.jpg", price: "100"},
  {cat: "castillos", name: "Castillo Pequeño Azul y Amarillo", desc: "Columnas amarillas y rampa azul.", img: "castillo-azul-amarillo-pequeno.jpg", price: "90"},
  {cat: "castillos", name: "Castillo Pequeño Morado y Rosa", desc: "Conos morados, paredes rosas, escalón rosa y azul. Sin chorrera.", img: "castillo-morado-rosa.jpg", price: "100"},
  /* ── Combos castillo + chorrera (10) ── */
  {cat: "combos", name: "Combo Castillo + Chorrera Morado", desc: "Chorrera lateral morada y azul, con piscina.", img: "combo-castillo-chorrera-morado.jpg", price: "150"},
  {cat: "combos", name: "Combo Castillo + Chorrera con Piscina", desc: "Conos azul y rojo, columnas rojas, arco gris, piscina redonda azul y morada.", img: "combo-castillo-chorrera-azul-naranja-piscina.jpg", img2: "combo-castillo-chorrera-azul-naranja-piscina-angulo-2.jpg", price: "145", tag: "2 ANGULOS"},
  {cat: "combos", name: "Combo 4 en 1 (13x20)", desc: "Azul, morado y blanco con doble chorrera y piscina. Medida en la foto: 4en1 (13x20).", img: "combo-4en1-13x20.jpg", price: "200"},
  {cat: "combos", name: "Combo Rojo y Amarillo con Piscina", desc: "Torres rojas con coronas grises, chorrera roja y amarilla, piscina azul.", img: "combo-castillo-chorrera-rojo-amarillo-piscina.jpg", price: "275"},
  {cat: "combos", name: "Combo Rosa y Morado (Turquesa)", desc: "Sin conos, techo turquesa, chorrera turquesa, escalón rosa y turquesa.", img: "combo-rosa-morado-chorrera-turquesa.jpg", price: "150"},
  {cat: "combos", name: "Combo Azul y Verde (Playa)", desc: "Columnas azules, conos azul oscuro y verde, piscina naranja y amarilla.", img: "combo-azul-verde-playa-piscina.jpg", price: "175"},
  {cat: "combos", name: "Combo Rojo y Verde", desc: "Columnas verdes, conos naranja, chorrera y piscina rojas, base roja.", img: "combo-rojo-verde-chorrera-piscina.jpg", price: "175"},
  {cat: "combos", name: "Combo Azul y Naranja con Chorrera", desc: "Torres cónicas azules, techo gris, paredes naranja y amarillo.", img: "combo-azul-naranja-chorrera.jpg", img2: "combo-azul-naranja-chorrera-angulo-2.jpg", price: "150", tag: "2 ANGULOS"},
  {cat: "combos", name: "Combo Rosa y Morado (Azul)", desc: "Conos morados, techo azul, chorrera azul con laterales rosas, base morada.", img: "combo-rosa-morado-chorrera-azul.jpg", price: "150"},
  {cat: "combos", name: "Combo Verde y Azul con Chorrera", desc: "Columnas blancas, conos azules, techo rojo, base roja.", img: "combo-verde-azul-chorrera.jpg", price: "150"},
  /* ── Chorreras con agua (13) ── */
  {cat: "chorreras", name: "Chorrera Tropical con Palmeras", desc: "Naranja, verde, azul y morado, con piscina al final.", img: "chorrera-tropical-palmeras.jpg", price: "275"},
  {cat: "chorreras", name: "Chorrera Grande Azul", desc: "Azul, amarilla y roja con piscina, al aire libre.", img: "chorrera-grande-azul.jpg", price: "275"},
  {cat: "chorreras", name: "Chorrera Wild Thing", desc: "Azul y morada con palmeras y letrero WILD THING, piscina naranja.", img: "chorrera-wild-thing.jpg", price: "200"},
  {cat: "chorreras", name: "Chorrera de Helado", desc: "Temática de helado: azul, morada y amarilla con cono gigante y paletas.", img: "chorrera-helado.jpg", price: "275"},
  {cat: "chorreras", name: "Chorrera Blazing River", desc: "Roja, amarilla y gris, doble chorrera con slip-n-slide y piscina.", img: "chorrera-blazing-river.jpg", price: "250"},
  {cat: "chorreras", name: "Chorrera Amarilla con Slip-n-Slide", desc: "Amarilla y naranja con slip-n-slide largo y piscina al final.", img: "chorrera-amarilla-slip-n-slide.jpg", price: "450"},
  {cat: "chorreras", name: "Chorrera Tropical Roja", desc: "Roja y verde con palmeras y piscina azul. Imagen de fabricante, no foto instalada.", img: "chorrera-tropical-roja-render.jpg", price: "250", tag: "RENDER"},
  {cat: "chorreras", name: "Chorrera Tropical con Sol", desc: "Sol con lentes en la parte superior, palmeras, azul, naranja y verde.", img: "chorrera-tropical-sol.jpg", price: "275"},
  {cat: "chorreras", name: "Chorrera Azul y Verde con Palmeras", desc: "Azul y verde con palmeras y piscina azul.", img: "chorrera-azul-verde-palmeras.jpg", price: "275"},
  {cat: "chorreras", name: "Chorrera Morada y Azul con Palmeras", desc: "Larga, morada y azul con palmeras y piscina alargada.", img: "chorrera-morada-azul-palmeras.jpg", price: "450"},
  {cat: "chorreras", name: "Chorrera Azul y Amarilla con Arcos", desc: "Alta, con arcos y piscina.", img: "chorrera-azul-amarilla-arcos-piscina.jpg", price: "450"},
  {cat: "chorreras", name: "Chorrera Morada (Alta)", desc: "Alta, morada y gris con laterales grises y piscina azul. Video en Anuncios.", img: "chorrera-morada-gris-almacen.jpg", price: "350"},
  {cat: "chorreras", name: "Chorrera Verde", desc: "Verde con laterales amarillos y piscina verde, vista de drone. Video en Anuncios.", img: "videos/poster-chorrera-verde.jpg", price: "299", tag: "VIDEO"},
  /* ── Juegos interactivos (4) ── */
  {cat: "juegos", name: "Hoop Zone", desc: "Baloncesto inflable rojo y negro, con aros y puntos (30/50/10).", img: "juego-hoop-zone-baloncesto.jpg", price: "150"},
  {cat: "juegos", name: "Axe Throw", desc: "Dos dianas de tiro de hacha, letreros THROW.", img: "juego-axe-throw.jpg", price: "175"},
  {cat: "juegos", name: "Big Throw Down", desc: "3 estaciones: 2 Axe Challenge y 1 Dart Throw al centro.", img: "juego-big-throw-down.jpg", price: "175"},
  {cat: "juegos", name: "Juego Deportivo 4 en 1", desc: "Fútbol, béisbol, baloncesto y fútbol americano, con pelotas.", img: "juego-deportivo-4-en-1.jpg", price: "200"},
  /* ── Carreras de obstáculos (5) ── */
  {cat: "obstaculos", name: "Carrera de Obstáculos Gigante", desc: "Amarilla y negra instalada en coliseo.", img: "carrera-obstaculos-gigante.jpg", price: "500"},
  {cat: "obstaculos", name: "Carrera de Obstáculos Verde y Amarilla", desc: "Verde, amarilla, roja y negra con túneles y muro de escalar.", img: "carrera-obstaculos-verde-amarilla.jpg", price: "350"},
  {cat: "obstaculos", name: "Carrera de Obstáculos Call of Duty", desc: "Camuflaje, vista aérea, túneles y muros rojo y negro. Video en Anuncios.", img: "carrera-obstaculos-camuflaje.jpg", price: "450"},
  {cat: "obstaculos", name: "Carrera de Obstáculos con Tubos", desc: "Roja, amarilla, azul y negra con arcos de tubos, túnel y muro de escalar.", img: "carrera-obstaculos-roja-amarilla-tubos.jpg", price: "325"},
  {cat: "obstaculos", name: "Carrera de Obstáculos Gigante Roja y Verde", desc: "Roja, verde, amarilla y azul con torres de castillo, chorrera y piscina.", img: "carrera-obstaculos-gigante-roja-verde.jpg", price: "325"},
  /* ── Toro mecánico (1) ── */
  {cat: "toro", name: "Toro Mecánico", desc: "Estructura roja techada y consola de control amarilla. Video en Anuncios.", img: "toro-mecanico.jpg", price: "175"},
  /* ── Carpas, mesas y sillas (5 precios, 2 fotos) ── */
  {cat: "carpas", name: "Carpa 20x20", desc: "Carpa blanca para tu evento.", img: "carpa-blanca.jpg", price: "200"},
  {cat: "carpas", name: "Carpa 10x20", desc: "Carpa blanca para tu evento.", img: "carpa-blanca.jpg", price: "175"},
  {cat: "carpas", name: "Sillas", desc: "Sillas blancas plegables.", img: "sillas-mesas-blancas.jpg", price: "1.00", unit: "c/u"},
  {cat: "carpas", name: "Mesas 6 pies", desc: "Mesas blancas de 6 pies.", img: "sillas-mesas-blancas.jpg", price: "6.00"},
  {cat: "carpas", name: "Mesas redondas", desc: "Mesas blancas redondas.", img: "sillas-mesas-blancas.jpg", price: "10.00"},
  /* ── Cañón de espuma (1, solo video) ── */
  {cat: "espuma", name: "Cañón de Espuma", desc: "Cañón negro disparando espuma sobre piscina. Video en Anuncios.", img: "videos/poster-canon-espuma.jpg", price: "175", tag: "VIDEO"}
];

/* ── Flyers de Anuncios (no son productos) ── */
var ANUNCIOS = [
  {img: "flyer-carnival-nuevos-inventario.jpg", name: "Juegos de Carnival — Nuevos en inventario", desc: "Casetas de juegos de carnival: basketball, baseball, soccer, tiro al blanco y payaso.", wa: "Hola Omi Jumping, quiero reservar los juegos de carnival nuevos en inventario."},
  {img: "flyer-pagos-klarna-paypal.jpg", name: "Paga con Klarna o PayPal", desc: "En Omi Jumping puedes pagar con Klarna, PayPal, Mastercard y AMEX.", wa: "Hola Omi Jumping, quiero información sobre los métodos de pago."},
  {img: "juego-tanque-de-agua-dunk-tank.jpg", name: "Dunk Tank — Tanque de Agua", desc: "Anuncio del producto. Pregunta por WhatsApp.", wa: "Hola Omi Jumping, quiero información del Dunk Tank (Tanque de Agua)."},
  {img: "juego-connect-four-inflable.jpg", name: "Connect Four Inflable", desc: "Anuncio del producto. Pregunta por WhatsApp.", wa: "Hola Omi Jumping, quiero información del Connect Four inflable."}
];

/* ── Videos de Anuncios (preload none, sin autoplay) ── */
var VIDEOS = [
  {src: "canon-espuma.mp4", poster: "poster-canon-espuma.jpg", title: "Cañón de Espuma", sub: "$175 · Video 0:06", price: "175", wa: "Cañón de Espuma"},
  {src: "obstaculo-camuflaje-call-of-duty.mp4", poster: "poster-obstaculo-camuflaje.jpg", title: "Call of Duty — Carrera de Obstáculos", sub: "$450 · Video 0:50", price: "450", wa: "Carrera de Obstáculos Call of Duty"},
  {src: "chorrera-verde-drone.mp4", poster: "poster-chorrera-verde.jpg", title: "Chorrera Verde (Drone)", sub: "$299 · Video 2:12", price: "299", wa: "Chorrera Verde"},
  {src: "chorrera-morada.mp4", poster: "poster-chorrera-morada.jpg", title: "Chorrera Morada", sub: "$350 · Video 0:22", price: "350", wa: "Chorrera Morada"},
  {src: "toro-mecanico.mp4", poster: "poster-toro-mecanico.jpg", title: "Toro Mecánico", sub: "$175 · Video 0:22", price: "175", wa: "Toro Mecánico"},
  {src: "catch-the-stick-por-confirmar.mp4", poster: "poster-catch-the-stick.jpg", title: "¿Quieres este juego en tu fiesta?", sub: "Pregunta por WhatsApp", price: null, wa: "el juego Catch the Stick", confirm: true}
];

function priceLabel(it){
  if(it.price === null) return "";
  return "$" + it.price + (it.unit ? " " + it.unit : "");
}
function waMsg(it){
  var m = "Hola Omi Jumping, quiero reservar " + it.name;
  var p = priceLabel(it);
  if(p) m += " (" + p + ")";
  return m + ". ¿Me confirmas disponibilidad?";
}

/* ── Render del catálogo v16 · TIRA HORIZONTAL hacia el lado ──
   Una sola tira con las 47 tarjetas en orden perfecto del documento
   (castillos → combos → chorreras → juegos → obstáculos → toro →
   carpas → espuma). Sin grid viejo: el único catálogo es esta tira.
   Flechas + puntos + arrastre/swipe. Sin auto-scroll ni bucle infinito
   (los filtros cambian el conjunto visible). */
var track = document.getElementById("catStripTrack");
var viewport = document.getElementById("catStripViewport");
var dotsEl = document.getElementById("catStripDots");
var prevBtn = document.getElementById("catStripPrev");
var nextBtn = document.getElementById("catStripNext");
var countEl = document.getElementById("catCount");
var STRIP = {cardW: 340, pages: 1, dragging: false, dragged: false};
if(track){
  var html = "";
  CATALOGO.forEach(function(it, i){
    var tagHtml = "";
    if(it.tag === "VIDEO") tagHtml = '<span class="cat-tag blue">VIDEO</span>';
    else if(it.tag === "RENDER") tagHtml = '<span class="cat-tag sun">RENDER DEL FABRICANTE</span>';
    else if(it.tag === "2 ANGULOS") tagHtml = '<span class="cat-tag">2 ÁNGULOS</span>';
    var priceHtml = (it.price !== null)
      ? '<p class="cat-price">' + priceLabel(it) + "</p>"
      : '<p class="cat-price noprice"><small>Precio a confirmar</small></p>';
    var anglesHtml = "";
    if(it.img2){
      anglesHtml = '<div class="cat-angles"><img src="' + IMG + it.img2 + V + '" alt="Otro ángulo de ' + it.name + '" loading="lazy" data-angle="' + i + '"></div>';
    }
    var btnTxt = "Reservar";
    html += '<article class="cat-card rv" data-cat="' + it.cat + '">' +
      '<div class="cat-media" data-photo="' + i + '">' + tagHtml +
        '<img src="' + IMG + it.img + V + '" alt="' + it.name + ' de Omi Jumping" loading="lazy"></div>' +
      '<div class="cat-body"><h3>' + it.name + "</h3><p>" + it.desc + "</p>" +
      priceHtml + anglesHtml +
      '<div class="cat-foot"><a class="btn btn-primary sm" data-wa data-service="' + waMsg(it).replace(/"/g, "&quot;") + '">' + btnTxt + "</a></div>" +
      "</div></article>";
  });
  track.innerHTML = html;
  /* Toca la foto: abre en grande (usa el lightbox de main.js) */
  track.addEventListener("click", function(e){
    if(STRIP.dragged) return;
    var media = e.target.closest(".cat-media");
    var ang = e.target.closest("[data-angle]");
    if(ang){
      var it = CATALOGO[parseInt(ang.getAttribute("data-angle"), 10)];
      if(window.openSingleLB) window.openSingleLB(IMG + it.img2 + V, "Otro ángulo de " + it.name);
      return;
    }
    if(media){
      var idx = parseInt(media.getAttribute("data-photo"), 10);
      var item = CATALOGO[idx];
      if(window.openSingleLB) window.openSingleLB(IMG + item.img + V, item.name + " de Omi Jumping");
    }
  });
  /* Filtros por categoría */
  var filters = document.querySelectorAll("#catFilters button");
  function applyFilter(f){
    var shown = 0;
    track.querySelectorAll(".cat-card").forEach(function(card){
      var ok = (f === "todos" || card.getAttribute("data-cat") === f);
      card.style.display = ok ? "" : "none";
      if(ok) shown++;
    });
    if(countEl){
      var priced = CATALOGO.filter(function(it){ return it.price !== null; }).length;
      countEl.innerHTML = "Mostrando <b>" + shown + "</b> de <b>" + CATALOGO.length + "</b> productos · <b>" + priced + "</b> con precio confirmado";
    }
    if(viewport){ viewport.scrollLeft = 0; }
    stripMeasure();
    stripUpdateDots();
    if(window.ScrollTrigger){ ScrollTrigger.refresh(); }
  }
  filters.forEach(function(btn){
    btn.addEventListener("click", function(){
      filters.forEach(function(b){ b.classList.remove("on"); });
      btn.classList.add("on");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });
  /* ── Tira horizontal: medir, puntos, flechas, arrastre ── */
  function stripMeasure(){
    if(!viewport || !track.children.length) return;
    var first = null;
    for(var i = 0; i < track.children.length; i++){
      if(track.children[i].style.display !== "none"){ first = track.children[i]; break; }
    }
    if(!first) return;
    STRIP.cardW = first.offsetWidth + 20;
    var visibleW = 0;
    track.querySelectorAll(".cat-card").forEach(function(card){
      if(card.style.display !== "none") visibleW += STRIP.cardW;
    });
    STRIP.pages = Math.max(1, Math.ceil(visibleW / viewport.clientWidth));
    var dots = "";
    for(var p = 0; p < STRIP.pages; p++){ dots += '<button aria-label="Ir a la página ' + (p + 1) + ' del catálogo"></button>'; }
    if(dotsEl){ dotsEl.innerHTML = dots; }
  }
  function stripUpdateDots(){
    if(!dotsEl || !dotsEl.children.length || !viewport) return;
    var page = Math.min(STRIP.pages - 1, Math.floor(viewport.scrollLeft / viewport.clientWidth));
    if(page < 0) page = 0;
    for(var i = 0; i < dotsEl.children.length; i++){
      dotsEl.children[i].classList.toggle("on", i === page);
    }
  }
  function snapStrip(){
    if(!viewport) return;
    var target = Math.round(viewport.scrollLeft / STRIP.cardW) * STRIP.cardW;
    viewport.scrollTo({left: target, behavior: "smooth"});
  }
  function stripStep(dir){
    if(!viewport) return;
    var step = Math.max(1, Math.round(viewport.clientWidth * 0.8 / STRIP.cardW)) * STRIP.cardW;
    viewport.scrollBy({left: dir * step, behavior: "smooth"});
    setTimeout(snapStrip, 450);
  }
  if(prevBtn){ prevBtn.addEventListener("click", function(){ stripStep(-1); }); }
  if(nextBtn){ nextBtn.addEventListener("click", function(){ stripStep(1); }); }
  if(dotsEl){
    dotsEl.addEventListener("click", function(e){
      var btn = e.target.closest("button");
      if(!btn) return;
      var idx = Array.prototype.indexOf.call(dotsEl.children, btn);
      viewport.scrollTo({left: idx * viewport.clientWidth, behavior: "smooth"});
      setTimeout(snapStrip, 650);
    });
  }
  if(viewport){
    viewport.addEventListener("scroll", function(){ stripUpdateDots(); }, {passive: true});
    var dStartX = 0, dStartScroll = 0, dMoved = 0;
    viewport.addEventListener("pointerdown", function(e){
      STRIP.dragging = true; STRIP.dragged = false;
      dStartX = e.clientX; dStartScroll = viewport.scrollLeft; dMoved = 0;
      viewport.classList.add("dragging");
      try{ viewport.setPointerCapture(e.pointerId); }catch(_){}
    });
    viewport.addEventListener("pointermove", function(e){
      if(!STRIP.dragging) return;
      var dx = e.clientX - dStartX;
      dMoved = Math.max(dMoved, Math.abs(dx));
      if(dMoved > 7){ STRIP.dragged = true; }
      viewport.scrollLeft = dStartScroll - dx;
    });
    function endStripDrag(){
      if(!STRIP.dragging) return;
      STRIP.dragging = false;
      viewport.classList.remove("dragging");
      if(STRIP.dragged){ snapStrip(); setTimeout(function(){ STRIP.dragged = false; }, 350); }
    }
    viewport.addEventListener("pointerup", endStripDrag);
    viewport.addEventListener("pointercancel", endStripDrag);
    window.addEventListener("resize", function(){ stripMeasure(); stripUpdateDots(); });
    window.addEventListener("load", function(){ stripMeasure(); stripUpdateDots(); });
  }
  applyFilter("todos");
}

/* ── Tira horizontal genérica (Anuncios v16): flechas + puntos + swipe ──
   Mismo patrón que la tira del catálogo, sin auto-scroll ni bucle:
   medir tarjetas, puntos por página, flechas por ~80% del viewport,
   arrastre con mouse/táctil y snap a tarjeta. El clic justo después de
   arrastrar queda bloqueado para no abrir el lightbox ni el video. */
function initAdStrip(ids){
  var vp = document.getElementById(ids.vp),
      tr = document.getElementById(ids.tr),
      dots = document.getElementById(ids.dots),
      prev = document.getElementById(ids.prev),
      next = document.getElementById(ids.next);
  if(!vp || !tr || !tr.children.length) return;
  var S = {cardW: 340, pages: 1, dragging: false, dragged: false};
  function measure(){
    var first = tr.children[0];
    if(!first) return;
    S.cardW = first.offsetWidth + 20;
    var totalW = 0;
    for(var i = 0; i < tr.children.length; i++){ totalW += S.cardW; }
    S.pages = Math.max(1, Math.ceil(totalW / vp.clientWidth));
    var html = "";
    for(var p = 0; p < S.pages; p++){ html += '<button aria-label="Ir a la página ' + (p + 1) + '"></button>'; }
    if(dots){ dots.innerHTML = html; }
    updateDots();
  }
  function updateDots(){
    if(!dots || !dots.children.length) return;
    var page = Math.min(S.pages - 1, Math.floor(vp.scrollLeft / vp.clientWidth));
    if(page < 0) page = 0;
    for(var i = 0; i < dots.children.length; i++){
      dots.children[i].classList.toggle("on", i === page);
    }
  }
  function snap(){
    var target = Math.round(vp.scrollLeft / S.cardW) * S.cardW;
    vp.scrollTo({left: target, behavior: "smooth"});
  }
  function step(dir){
    var st = Math.max(1, Math.round(vp.clientWidth * 0.8 / S.cardW)) * S.cardW;
    vp.scrollBy({left: dir * st, behavior: "smooth"});
    setTimeout(snap, 450);
  }
  if(prev){ prev.addEventListener("click", function(){ step(-1); }); }
  if(next){ next.addEventListener("click", function(){ step(1); }); }
  if(dots){
    dots.addEventListener("click", function(e){
      var btn = e.target.closest("button");
      if(!btn) return;
      var idx = Array.prototype.indexOf.call(dots.children, btn);
      vp.scrollTo({left: idx * vp.clientWidth, behavior: "smooth"});
      setTimeout(snap, 650);
    });
  }
  vp.addEventListener("scroll", function(){ updateDots(); }, {passive: true});
  var dX = 0, dScroll = 0, dMoved = 0;
  vp.addEventListener("pointerdown", function(e){
    S.dragging = true; S.dragged = false;
    dX = e.clientX; dScroll = vp.scrollLeft; dMoved = 0;
    vp.classList.add("dragging");
    try{ vp.setPointerCapture(e.pointerId); }catch(_){}
  });
  vp.addEventListener("pointermove", function(e){
    if(!S.dragging) return;
    var dx = e.clientX - dX;
    dMoved = Math.max(dMoved, Math.abs(dx));
    if(dMoved > 7){ S.dragged = true; }
    vp.scrollLeft = dScroll - dx;
  });
  function endDrag(){
    if(!S.dragging) return;
    S.dragging = false;
    vp.classList.remove("dragging");
    if(S.dragged){
      vp.dataset.dragged = "1";
      snap();
      setTimeout(function(){ S.dragged = false; vp.dataset.dragged = ""; }, 350);
    }
  }
  vp.addEventListener("pointerup", endDrag);
  vp.addEventListener("pointercancel", endDrag);
  vp.addEventListener("click", function(e){
    if(vp.dataset.dragged === "1"){ e.preventDefault(); e.stopPropagation(); }
  }, true);
  window.addEventListener("resize", function(){ measure(); });
  window.addEventListener("load", function(){ measure(); });
  measure();
}

/* ── Render de flyers de Anuncios ── */
var adGrid = document.getElementById("adFlyers");
if(adGrid){
  var adHtml = "";
  ANUNCIOS.forEach(function(f, i){
    adHtml += '<article class="ad-card rv">' +
      '<div class="ad-media" data-flyer="' + i + '"><img src="' + IMG + f.img + V + '" alt="' + f.name + '" loading="lazy"></div>' +
      '<div class="ad-body"><h3>' + f.name + "</h3><p>" + f.desc + "</p>" +
      '<div class="cat-foot"><a class="btn btn-primary sm" data-wa data-service="' + f.wa + '">Preguntar por WhatsApp</a></div>' +
      "</div></article>";
  });
  adGrid.innerHTML = adHtml;
  adGrid.addEventListener("click", function(e){
    var media = e.target.closest(".ad-media");
    if(!media) return;
    var f = ANUNCIOS[parseInt(media.getAttribute("data-flyer"), 10)];
    if(window.openSingleLB) window.openSingleLB(IMG + f.img + V, f.name);
  });
  initAdStrip({vp: "adFlyerViewport", tr: "adFlyers", dots: "adFlyerDots", prev: "adFlyerPrev", next: "adFlyerNext"});
}

/* ── Render de videos de Anuncios ── */
var vidGrid = document.getElementById("adVideos");
if(vidGrid){
  var vidHtml = "";
  VIDEOS.forEach(function(v){
    var priceHtml = (v.price !== null)
      ? '<p class="cat-price">' + "$" + v.price + "</p>"
      : '<p class="cat-price noprice"><small>' + v.sub + "</small></p>";
    var btnTxt = v.confirm ? "Preguntar por WhatsApp" : "Reservar";
    var wa = v.confirm
      ? "Hola Omi Jumping, quiero información sobre " + v.wa + ". ¿Lo tienen disponible para mi fiesta?"
      : "Hola Omi Jumping, quiero reservar " + v.wa + (v.price ? " ($" + v.price + ")" : "") + ". ¿Me confirmas disponibilidad?";
    vidHtml += '<article class="vid-card rv">' +
      '<video controls preload="none" playsinline poster="' + VID + v.poster + V + '">' +
        '<source src="' + VID + v.src + V + '" type="video/mp4">' +
      "</video>" +
      '<div class="vid-body"><h3>' + v.title + "</h3>" +
      (v.price !== null ? '<p class="vid-sub">' + v.sub + "</p>" : "") +
      priceHtml +
      '<div class="cat-foot"><a class="btn btn-primary sm" data-wa data-service="' + wa + '">' + btnTxt + "</a></div>" +
      "</div></article>";
  });
  vidGrid.innerHTML = vidHtml;
  initAdStrip({vp: "adVideoViewport", tr: "adVideos", dots: "adVideoDots", prev: "adVideoPrev", next: "adVideoNext"});
  /* Un solo video sonando a la vez */
  vidGrid.querySelectorAll("video").forEach(function(vid){
    vid.addEventListener("play", function(){
      vidGrid.querySelectorAll("video").forEach(function(other){
        if(other !== vid && !other.paused){ other.pause(); }
      });
    });
  });
}
})();
