// SELLA TECHOS · interactividad
(function(){
  "use strict";

  /* ---- menú flotante ---- */
  var btn = document.getElementById('menuBtn'),
      overlay = document.getElementById('menuOverlay'),
      close = document.getElementById('menuClose');
  function openMenu(){ overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  function closeMenu(){ overlay.classList.remove('open'); overlay.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  btn.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  overlay.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeMenu(); });

  /* ---- acordeón FAQ ---- */
  document.querySelectorAll('.acc-item').forEach(function(item){
    var q = item.querySelector('.acc-q'), a = item.querySelector('.acc-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function(o){
        o.classList.remove('open'); o.querySelector('.acc-a').style.maxHeight = null;
      });
      if(!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ---- contador del número gigante ---- */
  var num = document.querySelector('.giant-num');
  if(num){
    var target = parseInt(num.getAttribute('data-count'), 10) || 100,
        done = false;
    function count(){
      if(done) return; done = true;
      var start = null, dur = 1600;
      function tick(t){
        if(!start) start = t;
        var p = Math.min((t - start) / dur, 1),
            e = 1 - Math.pow(1 - p, 3);
        num.textContent = Math.round(target * e);
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    new IntersectionObserver(function(es, ob){
      es.forEach(function(e){ if(e.isIntersecting){ count(); ob.disconnect(); } });
    }, {threshold:.4}).observe(num);
  }

  /* ---- reveal on scroll ---- */
  var rev = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.12});
    rev.forEach(function(el){ io.observe(el); });
  } else { rev.forEach(function(el){ el.classList.add('in'); }); }

  /* ---- parallax sutil del hero ---- */
  var heroBg = document.querySelector('.hero-bg'), hero = document.querySelector('.hero');
  window.addEventListener('scroll', function(){
    if(!heroBg || !hero) return;
    var y = window.scrollY;
    if(y < hero.offsetHeight) heroBg.style.translate = '0 ' + (y * 0.18) + 'px';
  }, {passive:true});
})();

/* ===== ELITE-PACK JS (mejora ligera 2026-10-15) ===== */
(function(){
  if (window.__elitePack) return; window.__elitePack = true;

  /* 1. reveal on scroll — suave, sin tocar el diseño base */
  var rsel = '.g-card,.svc-card,.faq-item,.plan,.ci-row,.stat,.case,.qp';
  var rels = Array.prototype.slice.call(document.querySelectorAll(rsel)).filter(function(el){
    return !el.classList.contains('reveal') && !el.classList.contains('elite-reveal');
  });
  rels.forEach(function(el){ el.classList.add('elite-reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold: .1, rootMargin: '0px 0px -40px 0px'});
    document.querySelectorAll('.elite-reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.elite-reveal').forEach(function(el){ el.classList.add('in'); });
  }
  /* si el sitio ya trae .reveal sin observer propio, lo activamos también */
  var own = Array.prototype.slice.call(document.querySelectorAll('.reveal:not(.visible):not(.in)'));
  if (own.length && 'IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io2.unobserve(e.target); } });
    }, {threshold: .1});
    own.forEach(function(el){
      var cs = getComputedStyle(el);
      if (cs.opacity === '0' || el.style.opacity === '0' || cs.transform !== 'none') io2.observe(el);
    });
  }

  /* 2. hover premium en tarjetas */
  document.querySelectorAll('.g-card,.svc-card,.case,.plan').forEach(function(el){
    el.classList.add('elite-card');
  });

  /* 3. fix menú: overlay por encima del botón + botón cerrar propio */
  var overlays = document.querySelectorAll('.menu-overlay,#menuOverlay,.nav');
  overlays.forEach(function(ov){
    ov.style.zIndex = '400';
    if (!ov.querySelector('.elite-mclose')) {
      var b = document.createElement('button');
      b.className = 'elite-mclose'; b.setAttribute('aria-label', 'Cerrar menú'); b.textContent = '×';
      b.addEventListener('click', function(){
        ov.classList.remove('open');
        document.querySelectorAll('.fab-menu.x,.menu-btn.x,#menuBtn.x').forEach(function(m){ m.classList.remove('x'); });
      });
      ov.appendChild(b);
    }
  });
  document.querySelectorAll('.fab-menu,.menu-btn,#menuBtn').forEach(function(m){ m.style.zIndex = '390'; });

  /* 4. formulario de cotización -> WhatsApp del negocio */
  var qf = document.getElementById('qform');
  if (qf && !qf.__eliteWired) {
    qf.__eliteWired = true;
    qf.addEventListener('submit', function(e){
      e.preventDefault();
      var v = function(id){ var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var n = v('qNombre'), t = v('qTel'), s = v('qServicio'), m = v('qMsg');
      var biz = qf.getAttribute('data-biz') || 'nuestro negocio';
      var wa = qf.getAttribute('data-wa') || '';
      if (!wa) return;
      var txt = 'Hola ' + biz + ', soy ' + (n || 'un cliente') + (t ? ' (' + t + ')' : '') + '. Necesito: ' + s + '.' + (m ? ' ' + m : '');
      window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(txt), '_blank');
    });
  }
})();
