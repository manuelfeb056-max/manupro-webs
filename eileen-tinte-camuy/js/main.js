/* Eileen Tinte Camuy — TINT QUEEN engine
   gallery tape (seamless marquee), lightbox, FAQ, reveals, counters, form->WA */
(function(){
  "use strict";

  /* ---------- gallery tape: duplicate for seamless loop ---------- */
  ['tape1', 'tape2'].forEach(function(id){
    var tape = document.getElementById(id);
    if (!tape) return;
    tape.innerHTML += tape.innerHTML; // duplicar para loop perfecto
  });

  /* ---------- lightbox ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var items = [];
  document.querySelectorAll('.tape-card').forEach(function(card){
    var img = card.querySelector('img');
    if (!img) return;
    var entry = {src: img.getAttribute('src'), alt: img.getAttribute('alt') || '', cap: (card.querySelector('figcaption')||{}).textContent || ''};
    card.dataset.idx = items.length;
    items.push(entry);
    card.addEventListener('click', function(){ openLb(items.length > 0 ? parseInt(card.dataset.idx, 10) : 0); });
  });
  var cur = 0;
  function openLb(i){
    if (!items.length) return;
    cur = (i + items.length) % items.length;
    lbImg.src = items[cur].src;
    lbImg.alt = items[cur].alt;
    lbCap.textContent = items[cur].cap;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb(){
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbPrev').addEventListener('click', function(){ openLb(cur - 1); });
  document.getElementById('lbNext').addEventListener('click', function(){ openLb(cur + 1); });
  lb.addEventListener('click', function(e){ if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function(e){
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') openLb(cur - 1);
    if (e.key === 'ArrowRight') openLb(cur + 1);
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
      var el = e.target, target = parseInt(el.dataset.count || '0', 10),
          suf = el.dataset.suffix || '', pre = el.dataset.prefix || '';
      var t0 = null, dur = 1400;
      function tick(t){
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + Math.round(target * ease).toLocaleString('es-PR') + suf;
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
      var text = 'Hola Eileen Tinte Camuy, soy ' + nombre + '. Me interesa: ' + servicio + '.' + (msg ? ' ' + msg : '');
      window.open('https://wa.me/19396398234?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();
