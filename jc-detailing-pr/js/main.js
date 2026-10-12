/* JC Detailing — CHECKER GARAGE engine
   marquee trabajos, lightbox, FAQ, reveals, counters, menú, form->WA */
(function(){
  "use strict";

  /* ---------- marquee: duplicar cinta + pausar al tocar ---------- */
  var mq = document.getElementById('marquee');
  if (mq) {
    var track = document.getElementById('marqueeTrack');
    track.innerHTML += track.innerHTML; /* loop infinito */
    var paused = false, idle = null;
    function pause(){
      mq.classList.add('paused'); paused = true;
      clearTimeout(idle);
      idle = setTimeout(function(){ mq.classList.remove('paused'); paused = false; }, 10000);
    }
    mq.addEventListener('touchstart', pause, {passive: true});
    mq.addEventListener('pointerdown', pause);
  }

  /* ---------- lightbox ---------- */
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = document.getElementById('lbImg'),
        lbCap = document.getElementById('lbCap'),
        cards = Array.prototype.slice.call(document.querySelectorAll('.polaroid')),
        idx = 0;
    function show(i){
      idx = (i + cards.length) % cards.length;
      var img = cards[idx].querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = cards[idx].dataset.caption || img.alt;
    }
    function open(i){ show(i); lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden'; }
    function close(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }
    cards.forEach(function(c, i){ c.addEventListener('click', function(){ open(i); }); });
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
    /* swipe en lightbox */
    var sx = 0;
    lb.addEventListener('touchstart', function(e){ sx = e.touches[0].clientX; }, {passive:true});
    lb.addEventListener('touchend', function(e){
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) show(dx < 0 ? idx + 1 : idx - 1);
    }, {passive:true});
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

  /* ---------- mobile menu (off-canvas con transform) ---------- */
  var btn = document.getElementById('menuBtn'), nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }

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
      var text = 'Hola JC Detailing, soy ' + nombre + '. Me interesa: ' + servicio + '.' + (msg ? ' ' + msg : '');
      window.open('https://wa.me/17873141215?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();
