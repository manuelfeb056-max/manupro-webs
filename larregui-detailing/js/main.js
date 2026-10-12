/* Larregui Detailing — menú móvil + reveals */
(function(){
  "use strict";
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.addEventListener('click', function(e){
      if (e.target.tagName === 'A') nav.classList.remove('open');
    });
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {threshold: .12});
  var all = document.querySelectorAll('.reveal');
  if (/[?&]shots=1/.test(location.search)) {
    // QA mode: reveal everything instantly for full-page screenshots
    all.forEach(function(el){ el.classList.add('in'); });
    document.documentElement.classList.add('shots');
  } else {
    all.forEach(function(el){ io.observe(el); });
  }

  /* Cobertura interactiva: paradas de la ruta */
  (function(){
    var STOPS = {
      ciales:  {name:"Ciales",  badge:"Base",  promise:"Nuestra base de operaciones. Servicio a domicilio en Ciales: pulido, corrección de pintura, ceramic coating, shampoo y desinfección, sin que salgas de tu casa.", wa:"Ciales"},
      morovis: {name:"Morovis", badge:"Parada",promise:"Servicio a domicilio en Morovis: pulido, corrección de pintura, ceramic coating, shampoo y desinfección a tu puerta.", wa:"Morovis"},
      orocovis:{name:"Orocovis",badge:"Parada",promise:"Servicio a domicilio en Orocovis: pulido, corrección de pintura, ceramic coating, shampoo y desinfección a tu puerta.", wa:"Orocovis"},
      manati:  {name:"Manatí", badge:"Parada", promise:"Servicio a domicilio en Manatí: pulido, corrección de pintura, ceramic coating, shampoo y desinfección a tu puerta.", wa:"Manatí"}
    };
    var btns = document.querySelectorAll('.stop');
    if (!btns.length) return;
    var badge = document.getElementById('stopBadge'),
        nm = document.getElementById('stopName'),
        pr = document.getElementById('stopPromise'),
        cta = document.getElementById('stopCta'),
        inner = document.getElementById('stopInner');
    function apply(key){
      var s = STOPS[key];
      badge.textContent = s.badge;
      nm.textContent = s.name;
      pr.textContent = s.promise;
      cta.textContent = "Pedir servicio en " + s.name;
      cta.href = "https://wa.me/17874287135?text=" + encodeURIComponent("Hola Larregui Detailing, quiero un servicio a domicilio en " + s.wa + ".");
      cta.setAttribute('data-track', 'wa_cobertura_' + key);
    }
    function select(key){
      if (!STOPS[key]) return;
      btns.forEach(function(b){ b.classList.toggle('active', b.dataset.stop === key); });
      if (inner) {
        inner.style.opacity = "0";
        setTimeout(function(){ apply(key); inner.style.opacity = "1"; }, 160);
      } else { apply(key); }
    }
    btns.forEach(function(b){
      b.addEventListener('click', function(){ select(b.dataset.stop); });
    });
  })();
})();
