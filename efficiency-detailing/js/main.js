/* Efficiency Detailing — ED VELOCITY engine
   hero video fallback, infinite photo tape, lightbox, FAQ, reveals, counters, menu, form->WA */
(function(){
  "use strict";

  /* ---------- hero video: si el mp4 aún no llegó, el poster cubre ---------- */
  var hv = document.getElementById('heroVideo');
  if (hv) {
    hv.addEventListener('error', function(){ hv.style.display = 'none'; }, true);
    var src = hv.querySelector('source');
    if (src) src.addEventListener('error', function(){ hv.style.display = 'none'; });
    var p = hv.play && hv.play();
    if (p && p.catch) p.catch(function(){});
  }

  /* ---------- infinite tape: duplicar tarjetas para loop perfecto ---------- */
  var track = document.getElementById('tapeTrack');
  if (track) {
    var cards = Array.prototype.slice.call(track.children);
    cards.forEach(function(c){ track.appendChild(c.cloneNode(true)); });
    track.addEventListener('pointerdown', function(){
      track.style.animationPlayState = 'paused';
      clearTimeout(track._rt);
      track._rt = setTimeout(function(){ track.style.animationPlayState = ''; }, 4000);
    });
  }

  /* ---------- lightbox ---------- */
  var lb = document.getElementById('lightbox'), lbImg = document.getElementById('lbImg'), lbCap = document.getElementById('lbCap');
  var items = [];
  if (track) {
    Array.prototype.forEach.call(track.querySelectorAll('.tape-card'), function(c){
      var img = c.querySelector('img'), cap = c.querySelector('figcaption');
      items.push({full: c.getAttribute('data-full') || img.src, alt: img.alt, cap: cap ? cap.textContent : ''});
    });
    // quitar duplicados del loop infinito (primeros N únicos)
    items = items.slice(0, Math.round(items.length / 2) || items.length);
  }
  var idx = 0;
  function show(i){
    idx = (i + items.length) % items.length;
    lbImg.src = items[idx].full;
    lbImg.alt = items[idx].alt;
    lbCap.textContent = items[idx].cap;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function hide(){
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (track) {
    track.addEventListener('click', function(ev){
      var card = ev.target.closest('.tape-card');
      if (!card) return;
      var cards = Array.prototype.slice.call(track.querySelectorAll('.tape-card'));
      show(cards.indexOf(card) % items.length);
    });
  }
  var lbClose = document.getElementById('lbClose');
  if (lbClose) lbClose.addEventListener('click', hide);
  document.getElementById('lbPrev').addEventListener('click', function(ev){ ev.stopPropagation(); show(idx - 1); });
  document.getElementById('lbNext').addEventListener('click', function(ev){ ev.stopPropagation(); show(idx + 1); });
  lb.addEventListener('click', function(ev){ if (ev.target === lb) hide(); });
  document.addEventListener('keydown', function(ev){
    if (!lb.classList.contains('open')) return;
    if (ev.key === 'Escape') hide();
    if (ev.key === 'ArrowLeft') show(idx - 1);
    if (ev.key === 'ArrowRight') show(idx + 1);
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
      var text = 'Hola Efficiency Detailing, soy ' + nombre + '. Me interesa: ' + servicio + '.' + (msg ? ' ' + msg : '');
      window.open('https://wa.me/17875122983?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();
