// Menú flotante de 3 rayas
(function(){
  var btn = document.getElementById('menuFloat'), nav = document.getElementById('menuNav');
  if(btn && nav){
    btn.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }
})();
// Lightbox para la galería
(function(){
  var g = document.getElementById('photoGrid');
  if(!g) return;
  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = '<img alt=""><span class="lb-close">✕</span>';
  document.body.appendChild(overlay);
  var img = overlay.querySelector('img');
  g.addEventListener('click', function(e){
    var f = e.target.closest('figure');
    if(!f) return;
    img.src = f.querySelector('img').src;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  overlay.addEventListener('click', function(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){ overlay.classList.remove('open'); document.body.style.overflow=''; }
  });
})();
// Reveal on scroll
(function(){
  var els = document.querySelectorAll('.gallery .wrap, .services .wrap, .faq .wrap, .plans .wrap, .numbers .wrap');
  els.forEach(function(el){ el.classList.add('reveal'); });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, {threshold:.12});
  els.forEach(function(el){ io.observe(el); });
})();
// Contadores
(function(){
  var stats = document.querySelectorAll('.stat-n[data-count]');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting) return;
      var el = en.target, target = parseInt(el.dataset.count, 10), t0 = null;
      function tick(t){
        if(!t0) t0 = t;
        var p = Math.min((t - t0) / 1200, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, {threshold:.4});
  stats.forEach(function(s){ io.observe(s); });
})();
