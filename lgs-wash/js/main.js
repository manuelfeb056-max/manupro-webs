/* LG'S Wash & Detail — NIGHT GARAGE engine
   reel marquee, lightbox, FAQ, reveals, form->WA */
(function(){
  "use strict";

  /* ---------- reel: duplicar cinta para loop infinito + lightbox ---------- */
  var reel = document.getElementById('reel');
  var imgs = [];
  if (reel) {
    var track = document.getElementById('reelTrack');
    // duplicar tarjetas para loop perfecto (la animación translateX(-50%) lo exige)
    track.innerHTML += track.innerHTML;
    // pausar cinta al tocarla
    ['touchstart','pointerdown'].forEach(function(ev){
      reel.addEventListener(ev, function(){ reel.classList.add('paused'); }, {passive:true});
    });
    reel.addEventListener('touchend', function(){
      setTimeout(function(){ reel.classList.remove('paused'); }, 6000);
    }, {passive:true});

    // recolectar imágenes (solo el set original, antes del duplicado)
    document.querySelectorAll('#reelTrack .reel-card img').forEach(function(img, i){
      if (i < 10) imgs.push({src: img.dataset.full, alt: img.alt});
    });
  }

  /* ---------- lightbox ---------- */
  var lb = document.getElementById('lightbox'),
      lbImg = document.getElementById('lbImg'),
      idx = 0;
  function show(i){
    idx = (i + imgs.length) % imgs.length;
    lbImg.src = imgs[idx].src;
    lbImg.alt = imgs[idx].alt;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function hide(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
  }
  if (lb && imgs.length) {
    document.querySelectorAll('#reelTrack .reel-card img').forEach(function(img){
      img.addEventListener('click', function(){
        var src = img.dataset.full;
        for (var i = 0; i < imgs.length; i++) if (imgs[i].src === src) { show(i); break; }
      });
    });
    document.getElementById('lbClose').addEventListener('click', hide);
    document.getElementById('lbPrev').addEventListener('click', function(e){ e.stopPropagation(); show(idx - 1); });
    document.getElementById('lbNext').addEventListener('click', function(e){ e.stopPropagation(); show(idx + 1); });
    lb.addEventListener('click', function(e){ if (e.target === lb) hide(); });
    document.addEventListener('keydown', function(e){
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
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

  /* ---------- mobile menu ---------- */
  var btn = document.getElementById('menuBtn'), nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }

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
      var text = "Hola LG'S Wash, soy " + nombre + '. Me interesa: ' + servicio + '.' + (msg ? ' ' + msg : '');
      window.open('https://wa.me/17875130112?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();
