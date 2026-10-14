/* El proceso del atardecer — sun-arc timeline interactivo.
   El sol recorre el arco Q(60,340)-(600,-90)-(1140,340); cada fase es un nodo
   en la curva. Tocar un nodo mueve el sol con animación y muestra el detalle. */
(function(){
  "use strict";

  var arc = document.getElementById('arcPath');
  var sun = document.getElementById('sunDot');
  var chip = document.getElementById('sdChip');
  var title = document.getElementById('sdTitle');
  var desc = document.getElementById('sdDesc');
  var points = document.getElementById('sdPoints');
  var nodes = Array.prototype.slice.call(document.querySelectorAll('.stage-node'));
  if (!arc || !sun || !nodes.length) return;

  var STAGES = [
    { t: 0.0625, chip: "Fase 01 · Amanecer",
      title: "Lavado y descontaminación",
      desc: "El día arranca con el carro frío y la luz baja. Lavado detallado panel por panel e inspección completa de la pintura: se elimina hierro, savia, alquitrán y todo residuo que el lavado normal no quita. Sin base limpia, no hay buen acabado.",
      pts: ["Inspección de pintura bajo luz", "Lavado detallado y descontaminación total", "Base lista para pulir o pintar"] },
    { t: 0.375, chip: "Fase 02 · Media mañana",
      title: "Pulido y corrección",
      desc: "Con el sol subiendo, se nivela el clear y se pule profesionalmente: se eliminan swirls y opacidad y se recupera brillo y profundidad, aun en pinturas con años encima. Los focos se restauran con clear de alta duración para que el resultado dure años, no meses.",
      pts: ["Nivelación de clear y pulido profesional", "Brillo profundo recuperado", "Restauración de focos con clear de alta duración"] },
    { t: 0.625, chip: "Fase 03 · La tarde",
      title: "Color y detalle",
      desc: "Aquí el carro cambia de personalidad: pintamos los calipers en el color que quieras, le hacemos powder coating a los aros y piezas — bronze brilloso o negro brilloso — y pintamos accesorios, emblemas y logos de fábrica al detalle.",
      pts: ["Pintura de calipers en tu color", "Powder coating de aros y piezas", "Emblemas, logos y accesorios pintados"] },
    { t: 0.9375, chip: "Fase 04 · Atardecer",
      title: "Protección y entrega",
      desc: "El sol baja y el carro queda sellado: revestimiento cerámico con pulido previo para protección duradera contra el sol, la lluvia y la contaminación. Inspección final bajo la luz natural del sur y entrega lista para exhibición. Recogemos piezas y entregamos a toda la isla.",
      pts: ["Revestimiento cerámico con pulido previo", "Inspección final bajo la luz del sur", "Recogido y entrega a toda la isla"] }
  ];

  /* curva cuadrática de Bézier del arco: P0(60,340) P1(600,-90) P2(1140,340) */
  function posAt(t){
    var u = 1 - t;
    return {
      x: u*u*60 + 2*u*t*600 + t*t*1140,
      y: u*u*340 + 2*u*t*(-90) + t*t*340
    };
  }

  var curT = STAGES[0].t, animId = null;

  function drawSun(t){
    var p = posAt(t);
    sun.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ',' + p.y.toFixed(1) + ')');
  }

  function animateTo(targetT){
    if (animId) cancelAnimationFrame(animId);
    var from = curT, to = targetT, start = null, dur = 850;
    function step(now){
      if (!start) start = now;
      var p = Math.min((now - start) / dur, 1);
      var e = p < .5 ? 2*p*p : -1 + (4 - 2*p)*p; /* easeInOut */
      curT = from + (to - from) * e;
      drawSun(curT);
      if (p < 1) animId = requestAnimationFrame(step);
      else animId = null;
    }
    animId = requestAnimationFrame(step);
  }

  function activate(i){
    nodes.forEach(function(n, k){ n.classList.toggle('on', k === i); });
    var s = STAGES[i];
    var detail = document.getElementById('stageDetail');
    if (detail) { detail.classList.remove('swap'); void detail.offsetWidth; detail.classList.add('swap'); }
    chip.textContent = s.chip;
    title.textContent = s.title;
    desc.textContent = s.desc;
    points.innerHTML = '';
    s.pts.forEach(function(p){
      var li = document.createElement('li');
      li.textContent = p;
      points.appendChild(li);
    });
    animateTo(s.t);
  }

  nodes.forEach(function(n, i){
    n.addEventListener('click', function(){ activate(i); });
    n.addEventListener('keydown', function(ev){
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); activate(i); }
    });
  });

  /* estado inicial: fase 1 activa, sol colocado sin animación */
  nodes[0].classList.add('on');
  drawSun(curT);
  activate(0);
})();
