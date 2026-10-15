// Selladores Elite — interacciones
(function(){
  'use strict';

  // Menú hamburguesa
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('navOverlay');
  btn.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    btn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Acordeón FAQ
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // Tilt 3D en tarjetas
  if(window.matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('[data-tilt]').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - .5;
        var y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = 'perspective(900px) rotateY(' + (x*10) + 'deg) rotateX(' + (-y*10) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function(){ card.style.transform = ''; });
    });
  }

  // Lightbox galería
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  document.querySelectorAll('.gal-card').forEach(function(card){
    card.addEventListener('click', function(){
      lbImg.src = card.getAttribute('data-full');
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLb(){
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('lbClose').addEventListener('click', closeLb);
  lb.addEventListener('click', function(e){ if(e.target === lb) closeLb(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeLb(); });
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
