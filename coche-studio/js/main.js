/* COCHE STUDIO — main interactions: reveal, nav, FAQ accordion, lightbox */
(function(){
  'use strict';

  /* reveal on scroll */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  },{threshold:.12});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

  /* mobile nav */
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  burger.addEventListener('click', function(){ links.classList.toggle('open'); });
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ links.classList.remove('open'); });
  });

  /* FAQ accordion */
  document.querySelectorAll('.qa').forEach(function(qa){
    var btn = qa.querySelector('button');
    var a = qa.querySelector('.a');
    btn.addEventListener('click', function(){
      var open = qa.classList.contains('open');
      document.querySelectorAll('.qa.open').forEach(function(o){
        o.classList.remove('open'); o.querySelector('.a').style.maxHeight = '0px';
      });
      if(!open){ qa.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* lightbox */
  var items = Array.prototype.slice.call(document.querySelectorAll('.gitem'));
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var idx = 0;

  function show(i){
    idx = (i + items.length) % items.length;
    var img = items[idx].querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = items[idx].getAttribute('data-cap') || img.alt;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function hide(){
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  items.forEach(function(item, i){
    item.addEventListener('click', function(){ show(i); });
  });
  document.getElementById('lbX').addEventListener('click', hide);
  document.getElementById('lbPrev').addEventListener('click', function(e){ e.stopPropagation(); show(idx-1); });
  document.getElementById('lbNext').addEventListener('click', function(e){ e.stopPropagation(); show(idx+1); });
  lb.addEventListener('click', function(e){ if(e.target === lb) hide(); });
  document.addEventListener('keydown', function(e){
    if(!lb.classList.contains('open')) return;
    if(e.key === 'Escape') hide();
    if(e.key === 'ArrowLeft') show(idx-1);
    if(e.key === 'ArrowRight') show(idx+1);
  });
})();
