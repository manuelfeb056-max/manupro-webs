/* ═══════════════ OMI JUMPING · CATÁLOGO v12 ═══════════════
   Datos del documento FINAL 2026-11-06 (catalogo-omi-jumping-2026-11-06.md):
   44 ítems únicos (47 tarjetas: carpas/mesas/sillas son 5 precios con 2 fotos),
   13 tarjetas con precio SEGURO confirmado por Omar, 34 "Cotiza por WhatsApp".
   Precio SEGURO solo cuando el documento lo marca SEGURO. NUNCA se inventa un precio.
   Sin apóstrofes en los strings (regla standing: rompen el form de WhatsApp). */
(function(){
"use strict";
var V = "?v=12";
var IMG = "img/catalogo/";
var VID = "img/catalogo/videos/";

/* cat: castillos | combos | chorreras | juegos | obstaculos | toro | carpas | espuma
   price: string con el precio SEGURO, o null = "Cotiza por WhatsApp"
   unit: texto extra del precio (ej. "c/u")
   tag: "VIDEO" | "RENDER" | "2 ANGULOS" | null
   img2: segundo ángulo (misma unidad) */
var CATALOGO = [
  /* ── Castillos / Casas de brinco (8) ── */
  {cat: "castillos", name: "Castillo Rojo y Azul", desc: "Torres cónicas rojas, columnas grises, rampa roja con punta verde.", img: "castillo-rojo-azul-01.jpg", price: null},
  {cat: "castillos", name: "Castillo Morado con Corona", desc: "Morado y rojo con corona amarilla y torres rojas.", img: "castillo-morado-corona.jpg", price: null},
  {cat: "castillos", name: "Castillo Rosa y Azul", desc: "Conos azules y rampa azul.", img: "castillo-rosa-azul.jpg", price: null},
  {cat: "castillos", name: "Castillo Rojo y Azul con Malla", desc: "Frente de malla, rampa azul con rayas rojas.", img: "castillo-rojo-azul-02.jpg", price: null},
  {cat: "castillos", name: "Castillo Toy Story", desc: "Temático Toy Story con Woody y Buzz en panel, en cancha techada.", img: "castillo-toy-story.jpg", price: null},
  {cat: "castillos", name: "Castillo Azul y Naranja", desc: "Azul y naranja, foto de almacén.", img: "castillo-azul-naranja.jpg", price: null},
  {cat: "castillos", name: "Castillo Pequeño Azul y Amarillo", desc: "Columnas amarillas y rampa azul.", img: "castillo-azul-amarillo-pequeno.jpg", price: "90"},
  {cat: "castillos", name: "Castillo Pequeño Morado y Rosa", desc: "Conos morados, paredes rosas, escalón rosa y azul. Sin chorrera.", img: "castillo-morado-rosa.jpg", price: null},
  /* ── Combos castillo + chorrera (10) ── */
  {cat: "combos", name: "Combo Castillo + Chorrera Morado", desc: "Chorrera lateral morada y azul, con piscina.", img: "combo-castillo-chorrera-morado.jpg", price: "350"},
  {cat: "combos", name: "Combo Castillo + Chorrera con Piscina", desc: "Conos azul y rojo, columnas rojas, arco gris, piscina redonda azul y morada.", img: "combo-castillo-chorrera-azul-naranja-piscina.jpg", img2: "combo-castillo-chorrera-azul-naranja-piscina-angulo-2.jpg", price: null, tag: "2 ANGULOS"},
  {cat: "combos", name: "Combo 4 en 1 (13x20)", desc: "Azul, morado y blanco con doble chorrera y piscina. Medida en la foto: 4en1 (13x20).", img: "combo-4en1-13x20.jpg", price: null},
  {cat: "combos", name: "Combo Rojo y Amarillo con Piscina", desc: "Torres rojas con coronas grises, chorrera roja y amarilla, piscina azul.", img: "combo-castillo-chorrera-rojo-amarillo-piscina.jpg", price: null},
  {cat: "combos", name: "Combo Rosa y Morado (Turquesa)", desc: "Sin conos, techo turquesa, chorrera turquesa, escalón rosa y turquesa.", img: "combo-rosa-morado-chorrera-turquesa.jpg", price: null},
  {cat: "combos", name: "Combo Azul y Verde (Playa)", desc: "Columnas azules, conos azul oscuro y verde, piscina naranja y amarilla.", img: "combo-azul-verde-playa-piscina.jpg", price: null},
  {cat: "combos", name: "Combo Rojo y Verde", desc: "Columnas verdes, conos naranja, chorrera y piscina rojas, base roja.", img: "combo-rojo-verde-chorrera-piscina.jpg", price: null},
  {cat: "combos", name: "Combo Azul y Naranja con Chorrera", desc: "Torres cónicas azules, techo gris, paredes naranja y amarillo.", img: "combo-azul-naranja-chorrera.jpg", img2: "combo-azul-naranja-chorrera-angulo-2.jpg", price: null, tag: "2 ANGULOS"},
  {cat: "combos", name: "Combo Rosa y Morado (Azul)", desc: "Conos morados, techo azul, chorrera azul con laterales rosas, base morada.", img: "combo-rosa-morado-chorrera-azul.jpg", price: null},
  {cat: "combos", name: "Combo Verde y Azul con Chorrera", desc: "Columnas blancas, conos azules, techo rojo, base roja.", img: "combo-verde-azul-chorrera.jpg", price: null},
  /* ── Chorreras con agua (13) ── */
  {cat: "chorreras", name: "Chorrera Tropical con Palmeras", desc: "Naranja, verde, azul y morado, con piscina al final.", img: "chorrera-tropical-palmeras.jpg", price: null},
  {cat: "chorreras", name: "Chorrera Grande Azul", desc: "Azul, amarilla y roja con piscina, al aire libre.", img: "chorrera-grande-azul.jpg", price: null},
  {cat: "chorreras", name: "Chorrera Wild Thing", desc: "Azul y morada con palmeras y letrero WILD THING, piscina naranja.", img: "chorrera-wild-thing.jpg", price: null},
  {cat: "chorreras", name: "Chorrera de Helado", desc: "Temática de helado: azul, morada y amarilla con cono gigante y paletas.", img: "chorrera-helado.jpg", price: null},
  {cat: "chorreras", name: "Chorrera Blazing River", desc: "Roja, amarilla y gris, doble chorrera con slip-n-slide y piscina.", img: "chorrera-blazing-river.jpg", price: null},
  {cat: "chorreras", name: "Chorrera Amarilla con Slip-n-Slide", desc: "Amarilla y naranja con slip-n-slide largo y piscina al final.", img: "chorrera-amarilla-slip-n-slide.jpg", price: null},
  {cat: "chorreras", name: "Chorrera Tropical Roja", desc: "Roja y verde con palmeras y piscina azul. Imagen de fabricante, no foto instalada.", img: "chorrera-tropical-roja-render.jpg", price: null, tag: "RENDER"},
  {cat: "chorreras", name: "Chorrera Tropical con Sol", desc: "Sol con lentes en la parte superior, palmeras, azul, naranja y verde.", img: "chorrera-tropical-sol.jpg", price: null},
  {cat: "chorreras", name: "Chorrera Azul y Verde con Palmeras", desc: "Azul y verde con palmeras y piscina azul.", img: "chorrera-azul-verde-palmeras.jpg", price: null},
  {cat: "chorreras", name: "Chorrera Morada y Azul con Palmeras", desc: "Larga, morada y azul con palmeras y piscina alargada.", img: "chorrera-morada-azul-palmeras.jpg", price: null},
  {cat: "chorreras", name: "Chorrera Azul y Amarilla con Arcos", desc: "Alta, con arcos y piscina.", img: "chorrera-azul-amarilla-arcos-piscina.jpg", price: null},
  {cat: "chorreras", name: "Chorrera Morada (Alta)", desc: "Alta, morada y gris con laterales grises y piscina azul. Video en Anuncios.", img: "chorrera-morada-gris-almacen.jpg", price: "350"},
  {cat: "chorreras", name: "Chorrera Verde", desc: "Verde con laterales amarillos y piscina verde, vista de drone. Video en Anuncios.", img: "videos/poster-chorrera-verde.jpg", price: "299", tag: "VIDEO"},
  /* ── Juegos interactivos (4) ── */
  {cat: "juegos", name: "Hoop Zone", desc: "Baloncesto inflable rojo y negro, con aros y puntos (30/50/10).", img: "juego-hoop-zone-baloncesto.jpg", price: "175"},
  {cat: "juegos", name: "Axe Throw", desc: "Dos dianas de tiro de hacha, letreros THROW.", img: "juego-axe-throw.jpg", price: null},
  {cat: "juegos", name: "Big Throw Down", desc: "3 estaciones: 2 Axe Challenge y 1 Dart Throw al centro.", img: "juego-big-throw-down.jpg", price: null},
  {cat: "juegos", name: "Juego Deportivo 4 en 1", desc: "Fútbol, béisbol, baloncesto y fútbol americano, con pelotas.", img: "juego-deportivo-4-en-1.jpg", price: "200"},
  /* ── Carreras de obstáculos (5) ── */
  {cat: "obstaculos", name: "Carrera de Obstáculos Gigante", desc: "Amarilla y negra instalada en coliseo.", img: "carrera-obstaculos-gigante.jpg", price: null},
  {cat: "obstaculos", name: "Carrera de Obstáculos Verde y Amarilla", desc: "Verde, amarilla, roja y negra con túneles y muro de escalar.", img: "carrera-obstaculos-verde-amarilla.jpg", price: null},
  {cat: "obstaculos", name: "Carrera de Obstáculos Call of Duty", desc: "Camuflaje, vista aérea, túneles y muros rojo y negro. Video en Anuncios.", img: "carrera-obstaculos-camuflaje.jpg", price: "450"},
  {cat: "obstaculos", name: "Carrera de Obstáculos con Tubos", desc: "Roja, amarilla, azul y negra con arcos de tubos, túnel y muro de escalar.", img: "carrera-obstaculos-roja-amarilla-tubos.jpg", price: null},
  {cat: "obstaculos", name: "Carrera de Obstáculos Gigante Roja y Verde", desc: "Roja, verde, amarilla y azul con torres de castillo, chorrera y piscina.", img: "carrera-obstaculos-gigante-roja-verde.jpg", price: null},
  /* ── Toro mecánico (1) ── */
  {cat: "toro", name: "Toro Mecánico", desc: "Estructura roja techada y consola de control amarilla. Video en Anuncios.", img: "toro-mecanico.jpg", price: null},
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
  {img: "juego-tanque-de-agua-dunk-tank.jpg", name: "Dunk Tank — Tanque de Agua", desc: "Anuncio del producto. Pregunta el precio por WhatsApp.", wa: "Hola Omi Jumping, quiero cotizar el Dunk Tank (Tanque de Agua)."},
  {img: "juego-connect-four-inflable.jpg", name: "Connect Four Inflable", desc: "Anuncio del producto. Pregunta el precio por WhatsApp.", wa: "Hola Omi Jumping, quiero cotizar el Connect Four inflable."}
];

/* ── Videos de Anuncios (preload none, sin autoplay) ── */
var VIDEOS = [
  {src: "canon-espuma.mp4", poster: "poster-canon-espuma.jpg", title: "Cañón de Espuma", sub: "$175 · Video 0:06", price: "175", wa: "Cañón de Espuma"},
  {src: "obstaculo-camuflaje-call-of-duty.mp4", poster: "poster-obstaculo-camuflaje.jpg", title: "Call of Duty — Carrera de Obstáculos", sub: "$450 · Video 0:50", price: "450", wa: "Carrera de Obstáculos Call of Duty"},
  {src: "chorrera-verde-drone.mp4", poster: "poster-chorrera-verde.jpg", title: "Chorrera Verde (Drone)", sub: "$299 · Video 2:12", price: "299", wa: "Chorrera Verde"},
  {src: "chorrera-morada.mp4", poster: "poster-chorrera-morada.jpg", title: "Chorrera Morada", sub: "$350 · Video 0:22", price: "350", wa: "Chorrera Morada"},
  {src: "toro-mecanico.mp4", poster: "poster-toro-mecanico.jpg", title: "Toro Mecánico", sub: "Cotiza por WhatsApp · Video 0:22", price: null, wa: "Toro Mecánico"},
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

/* ── Render del catálogo ── */
var grid = document.getElementById("catGrid");
var countEl = document.getElementById("catCount");
if(grid){
  var html = "";
  CATALOGO.forEach(function(it, i){
    var tagHtml = "";
    if(it.tag === "VIDEO") tagHtml = '<span class="cat-tag blue">VIDEO</span>';
    else if(it.tag === "RENDER") tagHtml = '<span class="cat-tag sun">RENDER DEL FABRICANTE</span>';
    else if(it.tag === "2 ANGULOS") tagHtml = '<span class="cat-tag">2 ÁNGULOS</span>';
    var priceHtml = (it.price !== null)
      ? '<p class="cat-price">' + priceLabel(it) + "</p>"
      : '<p class="cat-price cotiza"><small>Cotiza por WhatsApp</small></p>';
    var anglesHtml = "";
    if(it.img2){
      anglesHtml = '<div class="cat-angles"><img src="' + IMG + it.img2 + V + '" alt="Otro ángulo de ' + it.name + '" loading="lazy" data-angle="' + i + '"></div>';
    }
    var btnTxt = (it.price !== null) ? "Reservar" : "Cotizar";
    html += '<article class="cat-card rv" data-cat="' + it.cat + '">' +
      '<div class="cat-media" data-photo="' + i + '">' + tagHtml +
        '<img src="' + IMG + it.img + V + '" alt="' + it.name + ' de Omi Jumping" loading="lazy"></div>' +
      '<div class="cat-body"><h3>' + it.name + "</h3><p>" + it.desc + "</p>" +
      priceHtml + anglesHtml +
      '<div class="cat-foot"><a class="btn btn-primary sm" data-wa data-service="' + waMsg(it).replace(/"/g, "&quot;") + '">' + btnTxt + "</a></div>" +
      "</div></article>";
  });
  grid.innerHTML = html;
  /* Toca la foto: abre en grande (usa el lightbox de main.js) */
  grid.addEventListener("click", function(e){
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
    grid.querySelectorAll(".cat-card").forEach(function(card){
      var ok = (f === "todos" || card.getAttribute("data-cat") === f);
      card.style.display = ok ? "" : "none";
      if(ok) shown++;
    });
    if(countEl){
      countEl.innerHTML = "Mostrando <b>" + shown + "</b> de <b>" + CATALOGO.length + "</b> productos · <b>13</b> con precio confirmado · <b>34</b> por cotizar";
    }
    if(window.ScrollTrigger){ ScrollTrigger.refresh(); }
  }
  filters.forEach(function(btn){
    btn.addEventListener("click", function(){
      filters.forEach(function(b){ b.classList.remove("on"); });
      btn.classList.add("on");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });
  applyFilter("todos");
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
}

/* ── Render de videos de Anuncios ── */
var vidGrid = document.getElementById("adVideos");
if(vidGrid){
  var vidHtml = "";
  VIDEOS.forEach(function(v){
    var priceHtml = (v.price !== null)
      ? '<p class="cat-price">' + "$" + v.price + "</p>"
      : '<p class="cat-price cotiza"><small>' + v.sub + "</small></p>";
    var btnTxt = v.confirm ? "Preguntar por WhatsApp" : ((v.price !== null) ? "Reservar" : "Cotizar");
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
