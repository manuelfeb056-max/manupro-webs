/* Aredam Custom Detailing - RACE SHOP engine
   gallery strip + lightbox, FAQ, reveals, counters, form->WA, menu */
(function(){
  "use strict";
  var WA = "https://wa.me/17876367668";

  /* ---------- gallery strip: arrows ---------- */
  var strip = document.getElementById('galStrip');
  var prev = document.getElementById('galPrev'), next = document.getElementById('galNext');
  function stepAmt(){
    var c = strip.querySelector('.ph');
    return c ? c.getBoundingClientRect().width + 14 : 320;
  }
  if (strip) {
    if (prev) prev.addEventListener('click', function(){ strip.scrollBy({left: -stepAmt()*2, behavior:'smooth'}); });
    if (next) next.addEventListener('click', function(){ strip.scrollBy({left: stepAmt()*2, behavior:'smooth'}); });
  }

  /* ---------- lightbox ---------- */
  var lb = document.getElementById('lightbox'), lbImg = document.getElementById('lbImg');
  var lbClose = document.getElementById('lbClose');
  document.querySelectorAll('.ph').forEach(function(f){
    f.addEventListener('click', function(){
      lbImg.src = f.getAttribute('data-full');
      lbImg.alt = f.querySelector('img').alt;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLb(){
    lb.classList.remove('open');
    lbImg.src = '';
    document.body.style.overflow = '';
  }
  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', function(e){ if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && lb.classList.contains('open')) closeLb(); });

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

  /* ---------- mobile menu (off-canvas con transform) ---------- */
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
  if (form) form.addEventListener('submit', function(e){
    e.preventDefault();
    var n = document.getElementById('fNombre').value.trim();
    var s = document.getElementById('fServicio').value;
    var m = document.getElementById('fMsg').value.trim();
    var txt = 'Hola Aredam Custom Detailing, soy ' + n + '. Servicio: ' + s + '. ' + m;
    window.open(WA + '?text=' + encodeURIComponent(txt), '_blank', 'noopener');
  });
})();
