/* Hamal Detailing and Tint — interacciones */
(function(){
  "use strict";

  /* carrusel de fondo del hero */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-bg .hs'));
  if (slides.length > 1){
    var cur = 0;
    setInterval(function(){
      slides[cur].classList.remove('active');
      cur = (cur + 1) % slides.length;
      slides[cur].classList.add('active');
    }, 5200);
  }

  /* menú móvil */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Abrir menú');
      });
    });
  }

  /* FAQ acordeón */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* lightbox */
  var items = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lb-img');
  var idx = 0;

  function show(i){
    idx = (i + items.length) % items.length;
    var full = items[idx].getAttribute('data-full');
    var alt = items[idx].querySelector('img').getAttribute('alt');
    lbImg.src = full;
    lbImg.alt = alt || 'Foto ampliada de trabajo de Hamal';
  }
  function openLb(i){
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeLb(){
    lb.hidden = true;
    document.body.style.overflow = '';
  }
  items.forEach(function(b, i){
    b.addEventListener('click', function(){ openLb(i); });
  });
  document.getElementById('lb-x').addEventListener('click', closeLb);
  document.getElementById('lb-prev').addEventListener('click', function(e){ e.stopPropagation(); show(idx - 1); });
  document.getElementById('lb-next').addEventListener('click', function(e){ e.stopPropagation(); show(idx + 1); });
  lb.addEventListener('click', function(e){ if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function(e){
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  /* reveal on scroll */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* header con sombra al hacer scroll */
  var hdr = document.getElementById('hdr');
  window.addEventListener('scroll', function(){
    hdr.style.boxShadow = window.scrollY > 10 ? '0 8px 30px rgba(0,0,0,.5)' : 'none';
  }, {passive: true});
})();
