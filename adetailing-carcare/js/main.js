/* ADetailing&CarCare — interacciones */
(function(){
  "use strict";

  // menú móvil
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }

  // reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // contadores
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target, target = parseInt(el.dataset.count, 10) || 0, suf = el.dataset.suffix || '';
      var t0 = null;
      function step(ts){
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / 1200, 1);
        el.textContent = Math.round(target * p) + suf;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, {threshold: .5});
  document.querySelectorAll('.stat-num').forEach(function(el){ cio.observe(el); });

  // galería: flechas + dots
  var vp = document.getElementById('galViewport');
  var dots = document.getElementById('galDots');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.gal-card'));
  if (vp && dots && cards.length) {
    cards.forEach(function(_, i){
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Ir a la foto ' + (i + 1));
      b.addEventListener('click', function(){
        cards[i].scrollIntoView({behavior:'smooth', inline:'start', block:'nearest'});
      });
      dots.appendChild(b);
    });
    var dotBtns = dots.querySelectorAll('button');
    function mark(){
      var idx = 0, best = Infinity;
      cards.forEach(function(c, i){
        var d = Math.abs(c.offsetLeft - vp.scrollLeft);
        if (d < best) { best = d; idx = i; }
      });
      dotBtns.forEach(function(b, i){ b.classList.toggle('on', i === idx); });
    }
    vp.addEventListener('scroll', mark, {passive:true});
    mark();
    document.getElementById('galPrev').addEventListener('click', function(){
      vp.scrollBy({left: -360, behavior: 'smooth'});
    });
    document.getElementById('galNext').addEventListener('click', function(){
      vp.scrollBy({left: 360, behavior: 'smooth'});
    });
  }

  // lightbox con X
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbIg = document.getElementById('lbIg');
  var idx = 0;
  function show(i){
    idx = (i + cards.length) % cards.length;
    var c = cards[idx];
    lbImg.src = c.dataset.full;
    lbImg.alt = c.querySelector('img').alt;
    lbCap.textContent = c.dataset.cap || '';
    lbIg.href = c.dataset.ig || '#';
    lbIg.style.display = c.dataset.ig ? '' : 'none';
  }
  function open(i){ show(i); lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden'; }
  function close(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }
  cards.forEach(function(c, i){
    c.addEventListener('click', function(){ open(i); });
  });
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
})();
