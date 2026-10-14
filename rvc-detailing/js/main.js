/* RVC Detailing — main.js */
(function(){
  "use strict";

  var header = document.getElementById('header');
  function onScroll(){
    if(window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  menuBtn.addEventListener('click', function(){ nav.classList.toggle('open'); });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ nav.classList.remove('open'); });
  });

  // reveal on scroll
  var els = document.querySelectorAll('.card, .step, .g-item, .faq-item, .plan, .about-text, .about-media');
  els.forEach(function(e){ e.classList.add('rv'); });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {threshold: .12});
  els.forEach(function(e){ io.observe(e); });

  // lightbox with X
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbClose = document.getElementById('lbClose');
  document.getElementById('gallery').addEventListener('click', function(ev){
    var fig = ev.target.closest('.g-item');
    if(!fig) return;
    lbImg.src = fig.getAttribute('data-full');
    lbImg.alt = fig.querySelector('img').alt;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  });
  function closeLb(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }
  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', function(ev){ if(ev.target === lb) closeLb(); });
  document.addEventListener('keydown', function(ev){ if(ev.key === 'Escape') closeLb(); });

  // data-track clicks for metrics
  document.addEventListener('click', function(ev){
    var t = ev.target.closest('[data-track]');
    if(!t) return;
    try{
      var p = {t:'click', label:t.getAttribute('data-track'), url:location.pathname};
      if(navigator.sendBeacon) navigator.sendBeacon('/manupro-metrics/collect.php?site=' + encodeURIComponent((document.body.dataset.site||'demo')), JSON.stringify(p));
    }catch(e){}
  });
})();
