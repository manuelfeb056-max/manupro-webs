/* JR Window Tint P.R. — BLACKOUT engine
   film-strip marquee + lightbox, FAQ, reveals, counters, form->WA */
(function(){
  "use strict";

  var PHOTOS = [
    {src:"img/real/foto-1.jpg", cap:"Tesla Model 3 · tint instalado a domicilio"},
    {src:"img/real/foto-2.jpg", cap:"SUV con tint cerámico · frente a nuestra unidad móvil"},
    {src:"img/real/foto-3.jpg", cap:"Yamaha YXZ · frente al taller"},
    {src:"img/real/foto-4.jpg", cap:"Mazda CX-50 · tint completo"},
    {src:"img/real/foto-5.jpg", cap:"Detalle: centros de aro personalizados"},
    {src:"img/real/foto-6.jpg", cap:"Toyota Highlander · dentro del estudio de instalación"},
    {src:"img/real/foto-7.jpg", cap:"Scion tC · tint y estilo frente al taller"},
    {src:"img/real/foto-8.jpg", cap:"Lámina plata/reflectiva lista para instalar"},
    {src:"img/real/foto-9.jpg", cap:"Camión de trabajo · tint a domicilio"},
    {src:"img/real/foto-10.jpg", cap:"Nuestro taller · Carr 111 KM 23.4, Lares"}
  ];

  /* ---------- strip marquee: pause on touch, resume when idle ---------- */
  var strip = document.getElementById('strip');
  if (strip) {
    var idle = null;
    function pauseTemp(){
      strip.classList.add('paused');
      clearTimeout(idle);
      idle = setTimeout(function(){ strip.classList.remove('paused'); }, 7000);
    }
    strip.addEventListener('pointerdown', pauseTemp);
    strip.addEventListener('touchstart', pauseTemp, {passive:true});
    document.addEventListener('visibilitychange', function(){
      strip.classList.toggle('paused', document.hidden);
    });
  }

  /* ---------- lightbox ---------- */
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbCount = document.getElementById('lbCount');
  var lbIdx = 0;
  function lbShow(i){
    lbIdx = (i + PHOTOS.length) % PHOTOS.length;
    var p = PHOTOS[lbIdx];
    lbImg.src = p.src;
    lbImg.alt = p.cap;
    lbCap.textContent = p.cap;
    lbCount.textContent = (lbIdx + 1) + " / " + PHOTOS.length;
  }
  function lbOpen(i){ lbShow(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function lbClose(){ lb.classList.remove('open'); document.body.style.overflow = ''; }
  if (lb) {
    document.querySelectorAll('.shot').forEach(function(el){
      el.addEventListener('click', function(){ lbOpen(parseInt(el.dataset.i, 10) || 0); });
    });
    document.getElementById('lbClose').addEventListener('click', lbClose);
    document.getElementById('lbPrev').addEventListener('click', function(ev){ ev.stopPropagation(); lbShow(lbIdx - 1); });
    document.getElementById('lbNext').addEventListener('click', function(ev){ ev.stopPropagation(); lbShow(lbIdx + 1); });
    lb.addEventListener('click', function(ev){ if (ev.target === lb) lbClose(); });
    document.addEventListener('keydown', function(ev){
      if (!lb.classList.contains('open')) return;
      if (ev.key === 'Escape') lbClose();
      if (ev.key === 'ArrowLeft') lbShow(lbIdx - 1);
      if (ev.key === 'ArrowRight') lbShow(lbIdx + 1);
    });
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

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* ---------- counters ---------- */
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target, target = parseInt(el.dataset.count || '0', 10), suf = el.dataset.suffix || '';
      var t0 = null, dur = 1400;
      function tick(t){
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * ease).toLocaleString('es-PR') + suf;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, {threshold: .5});
  document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });

  /* ---------- mobile menu ---------- */
  var btn = document.getElementById('menuBtn'), nav = document.getElementById('nav');
  if (btn) btn.addEventListener('click', function(){ nav.classList.toggle('open'); });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ nav.classList.remove('open'); });
  });

  /* ---------- header shadow ---------- */
  var header = document.getElementById('header');
  window.addEventListener('scroll', function(){
    header.style.boxShadow = window.scrollY > 10 ? '0 8px 30px rgba(0,0,0,.5)' : 'none';
  }, {passive:true});

  /* ---------- form -> WhatsApp ---------- */
  var form = document.getElementById('cform');
  if (form) {
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var nombre = document.getElementById('fNombre').value.trim();
      var servicio = document.getElementById('fServicio').value;
      var msg = document.getElementById('fMsg').value.trim();
      var text = 'Hola JR Window Tint P.R., soy ' + nombre + '. Me interesa: ' + servicio + '.' + (msg ? ' ' + msg : '');
      window.open('https://wa.me/19392197715?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();
