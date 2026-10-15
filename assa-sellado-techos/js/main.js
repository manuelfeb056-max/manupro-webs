/* ASSA Sellado de Techos — interacción: menú, acordeón FAQ, reveals */
(function(){
  "use strict";

  // Menú hamburguesa
  var burger = document.getElementById('burger');
  var overlay = document.getElementById('navOverlay');
  burger.addEventListener('click', function(){
    var open = overlay.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    overlay.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  overlay.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      overlay.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
      document.body.style.overflow = '';
    });
  });

  // Acordeón FAQ
  document.querySelectorAll('.acc-item').forEach(function(item){
    var q = item.querySelector('.acc-q');
    var a = item.querySelector('.acc-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.acc-a').style.maxHeight = null;
        o.querySelector('.acc-q').setAttribute('aria-expanded','false');
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded','true');
      }
    });
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal-up').forEach(function(el){ io.observe(el); });
})();

/* Cotizador → WhatsApp (ASSA: 787-287-2772) */
(function(){
  "use strict";
  var f = document.getElementById('quoteForm');
  if(!f) return;
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var n = document.getElementById('qNombre'),
        t = document.getElementById('qTel'),
        p = document.getElementById('qPueblo'),
        s = f.querySelector('input[name="servicio"]:checked'),
        m = document.getElementById('qMsg'),
        chips = f.querySelector('.chips');
    var ok = true;
    [n,t].forEach(function(el){
      var bad = !el.value.trim();
      el.classList.toggle('err', bad);
      if(bad) ok = false;
    });
    var badS = !s;
    if(chips) chips.classList.toggle('err', badS);
    if(badS) ok = false;
    if(!ok) return;
    var txt = 'Hola ASSA Sellado de Techos, soy ' + n.value.trim() +
      ' (' + t.value.trim() + '). Servicio: ' + s.value + '.' +
      (p.value.trim() ? ' Pueblo: ' + p.value.trim() + '.' : '') +
      (m.value.trim() ? ' Detalle: ' + m.value.trim() : '');
    window.open('https://wa.me/17872872772?text=' + encodeURIComponent(txt), '_blank');
  });
})();

/* cerrar menú con botón X (overlay por encima del botón flotante) */
(function(){
  var c = document.querySelector('[data-mqclose]');
  if(!c) return;
  c.addEventListener('click', function(){
    var nav = c.closest('nav') || document.getElementById('menuOverlay');
    if(nav){ nav.classList.remove('open','show'); nav.setAttribute('aria-hidden','true'); }
    var scrim = document.getElementById('scrim2');
    if(scrim) scrim.classList.remove('on');
    ['floatMenu','menuBtn','burger'].forEach(function(id){
      var b=document.getElementById(id);
      if(b){ b.classList.remove('open','active'); b.setAttribute('aria-expanded','false'); }
    });
    document.querySelectorAll('.fab-menu,.menu-btn,.burger,.float-menu').forEach(function(b){
      b.classList.remove('open','active');
    });
    document.body.style.overflow = '';
  });
})();
