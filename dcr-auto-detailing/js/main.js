/* DCR Auto Detailing — interacciones */
(function(){
  "use strict";

  // Menú móvil
  var burger = document.getElementById('burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.addEventListener('click', function(e){ if (e.target.tagName === 'A') nav.classList.remove('open'); });
  }

  // FAQ accordion
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var wasOpen = item.classList.contains('open');
      items.forEach(function(it){ it.classList.remove('open'); it.querySelector('.faq-a').style.maxHeight = null; });
      if (!wasOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Lightbox
  var figs = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var idx = 0;
  function show(i){
    idx = (i + figs.length) % figs.length;
    var img = figs[idx].querySelector('img');
    lbImg.src = img.getAttribute('data-full') || img.src;
    lbImg.alt = img.alt;
  }
  figs.forEach(function(f, i){
    f.addEventListener('click', function(){ show(i); lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden'; });
  });
  function close(){
    lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); document.body.style.overflow = '';
  }
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function(e){ e.stopPropagation(); show(idx - 1); });
  document.getElementById('lbNext').addEventListener('click', function(e){ e.stopPropagation(); show(idx + 1); });
  lb.addEventListener('click', function(e){ if (e.target === lb) close(); });
  document.addEventListener('keydown', function(e){
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  // Reveal on scroll
  var els = document.querySelectorAll('.svc, .step, .g-item, .plan, .faq-item, .about-grid > *');
  els.forEach(function(el){ el.classList.add('reveal'); });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, {threshold: 0.12});
  els.forEach(function(el){ io.observe(el); });

  // Hero carousel: rota las 10 fotos del carrusel de Instagram
  var hcImgs = document.querySelectorAll('.hero-carousel img');
  if (hcImgs.length > 1) {
    var hcIdx = 0;
    setInterval(function(){
      hcImgs[hcIdx].classList.remove('hc-active');
      hcIdx = (hcIdx + 1) % hcImgs.length;
      hcImgs[hcIdx].classList.add('hc-active');
    }, 4500);
  }
})();
