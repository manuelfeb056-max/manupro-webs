/* Black Tint — interacciones: menú, header, reveals, lightbox, acordeón FAQ */
(function(){
  "use strict";

  /* ---- header scroll ---- */
  var head = document.getElementById('siteHead');
  function onScroll(){ head.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---- menú móvil ---- */
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('headNav');
  btn.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- reveal on scroll ---- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* ---- lightbox galería ---- */
  var works = Array.prototype.slice.call(document.querySelectorAll('.work'));
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var idx = 0;

  function show(i){
    idx = (i + works.length) % works.length;
    var img = works[idx].querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = works[idx].querySelector('figcaption').textContent;
  }
  function open(i){ show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; }
  function close(){ lb.hidden = true; document.body.style.overflow = ''; }

  works.forEach(function(w, i){ w.addEventListener('click', function(){ open(i); }); });
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function(e){ e.stopPropagation(); show(idx - 1); });
  document.getElementById('lbNext').addEventListener('click', function(e){ e.stopPropagation(); show(idx + 1); });
  lb.addEventListener('click', function(e){ if (e.target === lb) close(); });
  document.addEventListener('keydown', function(e){
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  /* ---- acordeón FAQ ---- */
  document.querySelectorAll('.acc-item').forEach(function(item){
    var q = item.querySelector('.acc-q');
    var a = item.querySelector('.acc-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.acc-a').style.maxHeight = null;
        o.querySelector('.acc-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---- hero video: si falla, el póster queda ---- */
  var v = document.getElementById('heroVideo');
  v.addEventListener('error', function(){ v.style.display = 'none'; }, true);
})();
