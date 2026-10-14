/* Willo's CarWash Auto Detailing - MAREA ROJA engine
   menú off-canvas, burbujas del hero, FAQ, reveals, contadores, form->WA */
(function() {
  "use strict";

  /* ---------- header scroll ---------- */
  var header = document.getElementById('header');
  function onScroll(){ header.classList.toggle('scrolled', window.scrollY > 30); }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- menú off-canvas (transform, no right:-100%) ---------- */
  var nav = document.getElementById('nav');
  var menuBtn = document.getElementById('menuBtn');
  menuBtn.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    menuBtn.classList.toggle('x', open);
    menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('open');
      menuBtn.classList.remove('x');
      document.body.style.overflow = '';
    });
  });

  /* ---------- burbujas del hero (espuma de costa) ---------- */
  var bubbles = document.getElementById('bubbles');
  if (bubbles) {
    for (var i = 0; i < 16; i++) {
      var b = document.createElement('i');
      var s = 6 + Math.random() * 22;
      b.style.width = s + 'px';
      b.style.height = s + 'px';
      b.style.left = (Math.random() * 100) + '%';
      b.style.animationDuration = (7 + Math.random() * 9) + 's';
      b.style.animationDelay = (-Math.random() * 12) + 's';
      b.style.opacity = (0.25 + Math.random() * 0.5).toFixed(2);
      bubbles.appendChild(b);
    }
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- reveals ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* ---------- contadores ---------- */
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target, end = parseInt(el.dataset.count, 10) || 0, suf = el.dataset.suffix || '';
      cio.unobserve(el);
      var t0 = null, dur = 1100;
      function step(t){
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, {threshold: 0.5});
  document.querySelectorAll('.stat-num').forEach(function(el){ cio.observe(el); });

  /* ---------- form -> WhatsApp ---------- */
  var form = document.getElementById('cform');
  if (form) {
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var nombre = document.getElementById('fNombre').value.trim();
      var servicio = document.getElementById('fServicio').value;
      var msg = document.getElementById('fMsg').value.trim();
      var texto = "Hola Willo's CarWash, soy " + nombre + ". Me interesa: " + servicio + ".";
      if (msg) texto += " " + msg;
      window.open('https://wa.me/17873855805?text=' + encodeURIComponent(texto), '_blank');
    });
  }
})();
