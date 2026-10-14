/* The Detailing Corner — EL MUELLE DORADO engine
   gallery cinta, lightbox, FAQ, reveals, counters, form->WA */
(function() {
  "use strict";

  /* ---------- gallery cinta: auto-scroll + drag ---------- */
  var vp = document.getElementById('galViewport');
  if (vp) {
    var timer = null, idle = null;
    function cardStep(){
      var c = vp.querySelector('.gal-card');
      return c ? c.getBoundingClientRect().width + 18 : 308;
    }
    function restart(){
      clearInterval(timer);
      timer = setInterval(function(){
        if (document.hidden) return;
        var max = vp.scrollWidth - vp.clientWidth - 4;
        if (vp.scrollLeft >= max) vp.scrollTo({left: 0, behavior: 'smooth'});
        else vp.scrollBy({left: cardStep(), behavior: 'smooth'});
      }, 3600);
    }
    function pauseTemp(){
      clearInterval(timer); clearTimeout(idle);
      idle = setTimeout(restart, 9000);
    }
    vp.addEventListener('pointerdown', pauseTemp);
    vp.addEventListener('touchstart', pauseTemp, {passive: true});
    restart();
  }

  /* ---------- lightbox ---------- */
  var cards = Array.prototype.slice.call(document.querySelectorAll('.gal-card'));
  var lb = document.getElementById('lb'), lbImg = document.getElementById('lbImg'),
      lbCap = document.getElementById('lbCap'), lbIdx = 0;
  function showLb(i){
    lbIdx = (i + cards.length) % cards.length;
    var fig = cards[lbIdx];
    lbImg.src = fig.querySelector('img').src;
    lbImg.alt = fig.querySelector('img').alt;
    lbCap.textContent = fig.getAttribute('data-cap') || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb(){
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  cards.forEach(function(fig, i){
    fig.addEventListener('click', function(){ showLb(i); });
  });
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbPrev').addEventListener('click', function(e){ e.stopPropagation(); showLb(lbIdx - 1); });
  document.getElementById('lbNext').addEventListener('click', function(e){ e.stopPropagation(); showLb(lbIdx + 1); });
  lb.addEventListener('click', function(e){ if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function(e){
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') showLb(lbIdx - 1);
    if (e.key === 'ArrowRight') showLb(lbIdx + 1);
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* ---------- counters ---------- */
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target, target = parseInt(el.dataset.count || '0', 10), suf = el.dataset.suffix || '';
      var t0 = null, dur = 1400;
      function tick(t){
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * ease).toLocaleString('es-PR') + suf;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, {threshold: .5});
  document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });

  /* ---------- mobile menu ---------- */
  var btn = document.getElementById('menuBtn'), nav = document.getElementById('nav');
  if (btn) btn.addEventListener('click', function(){ nav.classList.toggle('open'); });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ nav.classList.remove('open'); });
  });

  /* ---------- header shadow ---------- */
  var header = document.getElementById('header');
  window.addEventListener('scroll', function(){
    header.style.boxShadow = window.scrollY > 10 ? '0 8px 30px rgba(0,0,0,.5)' : 'none';
  }, {passive:true});

  /* ---------- form -> WhatsApp ---------- */
  var form = document.getElementById('cform');
  if (form) {
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var nombre = document.getElementById('fNombre').value.trim();
      var servicio = document.getElementById('fServicio').value;
      var msg = document.getElementById('fMsg').value.trim();
      var text = 'Hola The Detailing Corner, soy ' + nombre + '. Me interesa: ' + servicio + '.' + (msg ? ' ' + msg : '');
      window.open('https://wa.me/17876744680?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();
