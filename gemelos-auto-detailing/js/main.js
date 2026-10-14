/* Gemelos Auto Detailing - PODER GEMELO engine
   gallery carousel + lightbox, FAQ, reveals, counters, menu, form->WA */
(function(){
  "use strict";

  /* ---------- gallery carousel: buttons + swipe + auto ---------- */
  var vp = document.getElementById('galViewport');
  var cardImgs = [];
  if (vp) {
    var track = document.getElementById('galTrack');
    var cards = track.children;
    var prev = document.getElementById('galPrev'), next = document.getElementById('galNext');
    var dotsBox = document.getElementById('galDots');
    var dots = [];
    for (var i = 0; i < cards.length; i++) {
      var im = cards[i].querySelector('img');
      var cp = cards[i].querySelector('figcaption');
      cardImgs.push({src: im.getAttribute('src'), alt: im.getAttribute('alt') || '', cap: cp ? cp.textContent.trim() : ''});
    }
    if (dotsBox && cards.length <= 12) {
      for (var j = 0; j < cards.length; j++) {
        (function(k){
          var b = document.createElement('button');
          b.setAttribute('aria-label', 'Foto ' + (k+1));
          b.addEventListener('click', function(){ go(k); restart(); });
          dotsBox.appendChild(b); dots.push(b);
        })(j);
      }
    }
    function cardStep(){
      var c = cards[0];
      return c ? c.getBoundingClientRect().width + 18 : 358;
    }
    function current(){ return Math.round(vp.scrollLeft / cardStep()); }
    function go(i){
      i = (i + cards.length) % cards.length;
      vp.scrollTo({left: i * cardStep(), behavior: 'smooth'});
      setTimeout(mark, 420);
    }
    function mark(){
      if (!dots.length) return;
      var c = Math.min(Math.max(current(), 0), dots.length - 1);
      dots.forEach(function(d, idx){ d.classList.toggle('on', idx === c); });
    }
    var timer = null, idle = null;
    function restart(){
      clearInterval(timer);
      timer = setInterval(function(){
        var c = current();
        go(c + 1 >= cards.length ? 0 : c + 1);
      }, 4200);
    }
    function pauseTemp(){
      clearInterval(timer);
      clearTimeout(idle);
      idle = setTimeout(restart, 9000);
    }
    if (prev) prev.addEventListener('click', function(){ go(current() - 1); restart(); });
    if (next) next.addEventListener('click', function(){ go(current() + 1); restart(); });
    vp.addEventListener('scroll', mark, {passive: true});
    vp.addEventListener('pointerdown', pauseTemp);
    vp.addEventListener('touchstart', pauseTemp, {passive: true});
    document.addEventListener('visibilitychange', function(){
      if (document.hidden) clearInterval(timer); else restart();
    });
    mark(); restart();
  }

  /* ---------- lightbox ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg'), lbCap = document.getElementById('lbCap');
  var lbIdx = 0;
  function showLb(i){
    if (!cardImgs.length) return;
    lbIdx = (i + cardImgs.length) % cardImgs.length;
    lbImg.src = cardImgs[lbIdx].src;
    lbImg.alt = cardImgs[lbIdx].alt;
    lbCap.textContent = cardImgs[lbIdx].cap;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb(){
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (lb && cardImgs.length) {
    document.querySelectorAll('.gal-card').forEach(function(card, i){
      card.addEventListener('click', function(){ showLb(i); });
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
  }

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
  if (btn && nav) {
    btn.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }

  /* ---------- header shadow ---------- */
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function(){
      header.style.boxShadow = window.scrollY > 10 ? '0 8px 30px rgba(0,0,0,.5)' : 'none';
    }, {passive:true});
  }

  /* ---------- form -> WhatsApp ---------- */
  var form = document.getElementById('cform');
  if (form) {
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var nombre = document.getElementById('fNombre').value.trim();
      var servicio = document.getElementById('fServicio').value;
      var msg = document.getElementById('fMsg').value.trim();
      var text = 'Hola Gemelos Auto Detailing, soy ' + nombre + '. Me interesa: ' + servicio + '.' + (msg ? ' ' + msg : '');
      window.open('https://wa.me/17875289294?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();
