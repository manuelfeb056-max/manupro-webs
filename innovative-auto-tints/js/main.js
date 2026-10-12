/* Innovative Auto Tints — main.js */
(function(){
  "use strict";

  /* menú off-canvas */
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      document.body.classList.toggle('menu-open');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ document.body.classList.remove('menu-open'); });
    });
    document.addEventListener('click', function(e){
      if (document.body.classList.contains('menu-open') &&
          !nav.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        document.body.classList.remove('menu-open');
      }
    });
  }

  /* reveal on scroll */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting) { en.target.classList.add('on'); io.unobserve(en.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* lightbox */
  var jobs = Array.prototype.slice.call(document.querySelectorAll('.job'));
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var idx = 0;
  function show(i){
    idx = (i + jobs.length) % jobs.length;
    lbImg.src = jobs[idx].getAttribute('data-full');
  }
  jobs.forEach(function(j, i){
    j.addEventListener('click', function(){
      show(i);
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
  function close(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
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

  /* auto-scroll suave de la cinta de trabajos */
  var strip = document.querySelector('.strip');
  if (strip) {
    var dir = 1, paused = false;
    strip.addEventListener('pointerenter', function(){ paused = true; });
    strip.addEventListener('pointerleave', function(){ paused = false; });
    setInterval(function(){
      if (paused || document.hidden) return;
      strip.scrollLeft += dir;
      if (strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4) dir = -1;
      if (strip.scrollLeft <= 0) dir = 1;
    }, 40);
  }
})();
