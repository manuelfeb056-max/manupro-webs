/* M&N Professional Detailing — interacciones: menú, header, reveals, galería, lightbox, FAQ */
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
      btn.setAttribute('aria-expanded','false');
    });
  });

  /* ---- reveals ---- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* ---- galería: carrusel ---- */
  var track = document.querySelector('.gal-track');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.gal-card'));
  var dotsBox = document.getElementById('galDots');
  var perView = 1, page = 0, pages = 1;

  function measure(){
    if (!track || !cards.length) return;
    var gap = 18;
    var cardW = cards[0].getBoundingClientRect().width + gap;
    var viewW = document.getElementById('galViewport').getBoundingClientRect().width;
    perView = Math.max(1, Math.floor((viewW + gap) / cardW));
    pages = Math.max(1, Math.ceil(cards.length / perView));
    if (page > pages - 1) page = pages - 1;
    dotsBox.innerHTML = '';
    for (var i = 0; i < pages; i++){
      (function(i){
        var d = document.createElement('i');
        if (i === page) d.className = 'on';
        d.setAttribute('aria-label','Ir a página '+(i+1));
        d.addEventListener('click', function(){ go(i); });
        dotsBox.appendChild(d);
      })(i);
    }
    apply();
  }
  function apply(){
    if (!track) return;
    var gap = 18;
    var cardW = cards[0].getBoundingClientRect().width + gap;
    var maxShift = Math.max(0, track.scrollWidth - document.getElementById('galViewport').clientWidth);
    var shift = Math.min(page * perView * cardW, maxShift);
    track.style.transform = 'translateX(' + (-shift) + 'px)';
    Array.prototype.forEach.call(dotsBox.children, function(d, i){
      d.classList.toggle('on', i === page);
    });
  }
  function go(i){
    page = (i + pages) % pages;
    apply();
  }
  var prev = document.getElementById('galPrev'), next = document.getElementById('galNext');
  if (prev) prev.addEventListener('click', function(){ go(page - 1); });
  if (next) next.addEventListener('click', function(){ go(page + 1); });
  window.addEventListener('resize', measure);
  measure();

  /* ---- lightbox (fotos completas) ---- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var idx = 0;
  function show(i){
    idx = (i + cards.length) % cards.length;
    var img = cards[idx].querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = cards[idx].querySelector('figcaption').textContent;
  }
  function open(i){ show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; }
  function close(){ lb.hidden = true; document.body.style.overflow = ''; }
  cards.forEach(function(c, i){ c.addEventListener('click', function(){ open(i); }); });
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

  /* ---- FAQ: solo uno abierto ---- */
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function(it){
    it.querySelector('summary').addEventListener('click', function(){
      items.forEach(function(o){ if (o !== it && o.open) o.open = false; });
    });
  });
})();
