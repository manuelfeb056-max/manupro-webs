/* Aura Car Wash — interacciones: menú off-canvas, lightbox, reveal */
(function(){
  "use strict";

  /* ---- menú off-canvas ---- */
  var btn = document.getElementById('menuBtn');
  var drawer = document.getElementById('drawer');
  var closeBtn = document.getElementById('drawerClose');
  var scrim = document.getElementById('scrim');
  function openMenu(){ drawer.classList.add('open'); scrim.classList.add('show'); btn.setAttribute('aria-expanded','true'); }
  function closeMenu(){ drawer.classList.remove('open'); scrim.classList.remove('show'); btn.setAttribute('aria-expanded','false'); }
  btn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  scrim.addEventListener('click', closeMenu);
  drawer.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  /* ---- lightbox ---- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  document.querySelectorAll('.shot').forEach(function(fig){
    fig.addEventListener('click', function(){
      var img = fig.querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lb.classList.add('show');
      lb.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLb(){
    lb.classList.remove('show');
    lb.setAttribute('aria-hidden','true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }
  document.getElementById('lbClose').addEventListener('click', closeLb);
  lb.addEventListener('click', function(e){ if(e.target === lb) closeLb(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ closeLb(); closeMenu(); } });

  /* ---- reveal on scroll ---- */
  var els = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {threshold: .12});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('in'); });
  }
})();
