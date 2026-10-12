/* K.Y Auto Detailing - interacciones */
(function(){
  "use strict";

  // menú móvil
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function(){
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }

  // reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold: 0.12});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('in'); });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      if (!open) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded','true');
      }
    });
  });

  // lightbox
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbClose = document.getElementById('lbClose');
  function openLb(src, alt){
    lbImg.src = src; lbImg.alt = alt || 'Vista ampliada';
    lb.classList.add('open'); lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeLb(){
    lb.classList.remove('open'); lb.setAttribute('aria-hidden','true');
    lbImg.src = ''; document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-lightbox]').forEach(function(el){
    el.addEventListener('click', function(){
      openLb(el.getAttribute('data-lightbox'), el.querySelector('img') ? el.querySelector('img').alt : '');
    });
  });
  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', function(e){ if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeLb(); });
})();
