/* Nathan's Auto Lab — NEON NIGHT BOUTIQUE interactions */
(function(){
  "use strict";

  /* mobile menu */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if (menuBtn && nav){
    menuBtn.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.addEventListener('click', function(e){ if (e.target.tagName === 'A') nav.classList.remove('open'); });
  }

  /* hero entrance */
  var heroEnter = document.querySelector('.hero-enter');
  function kick(){ if (heroEnter) heroEnter.classList.add('in'); }
  if (document.readyState === 'complete') kick();
  else window.addEventListener('load', kick);
  setTimeout(kick, 1200);

  /* reveal on scroll */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {threshold: .12, rootMargin: '0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* protocol steps — tap to expand */
  var steps = Array.prototype.slice.call(document.querySelectorAll('.proto-step'));
  steps.forEach(function(step){
    step.addEventListener('click', function(){
      steps.forEach(function(s){ s.classList.remove('on'); s.setAttribute('aria-expanded','false'); });
      step.classList.add('on');
      step.setAttribute('aria-expanded','true');
    });
  });

  /* lightbox */
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.work-tile'));
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbX = document.getElementById('lbX');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var idx = 0;

  function capOf(tile){
    var tag = tile.querySelector('.wt-tag');
    var sub = tile.querySelector('.wt-sub');
    return (tag ? tag.textContent : '') + (sub ? ' — ' + sub.textContent : '');
  }
  function show(i){
    idx = (i + tiles.length) % tiles.length;
    var img = tiles[idx].querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = capOf(tiles[idx]);
  }
  function open(i){
    show(i);
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  tiles.forEach(function(tile, i){
    tile.addEventListener('click', function(){ open(i); });
    tile.setAttribute('tabindex','0');
    tile.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
  });
  lbX.addEventListener('click', close);
  lbPrev.addEventListener('click', function(e){ e.stopPropagation(); show(idx - 1); });
  lbNext.addEventListener('click', function(e){ e.stopPropagation(); show(idx + 1); });
  lb.addEventListener('click', function(e){ if (e.target === lb) close(); });
  document.addEventListener('keydown', function(e){
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
