/* The Perfect Tint — PRECISION TINT LAB engine
   menu, lightbox, FAQ, reveals, counters, form->WA, VLT chips */
(function(){
  "use strict";

  /* ---------- menu off-canvas ---------- */
  var nav = document.getElementById('nav'), menuBtn = document.getElementById('menuBtn');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.addEventListener('click', function(e){
      if (e.target.closest('a')) nav.classList.remove('open');
    });
    document.addEventListener('click', function(e){
      if (nav.classList.contains('open') && !e.target.closest('#nav') && !e.target.closest('#menuBtn'))
        nav.classList.remove('open');
    });
  }

  /* ---------- lightbox ---------- */
  var cards = Array.prototype.slice.call(document.querySelectorAll('.gcard'));
  var lb = document.getElementById('lb'), lbImg = document.getElementById('lbImg'),
      lbCap = document.getElementById('lbCap'), cur = 0;
  function show(i){
    cur = (i + cards.length) % cards.length;
    var img = cards[cur].querySelector('img'), cap = cards[cur].querySelector('figcaption');
    lbImg.src = img.src; lbImg.alt = img.alt;
    lbCap.textContent = cap ? cap.textContent : '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function hide(){ lb.classList.remove('open'); document.body.style.overflow = ''; }
  cards.forEach(function(c, i){ c.addEventListener('click', function(){ show(i); }); });
  document.getElementById('lbX').addEventListener('click', hide);
  document.getElementById('lbPrev').addEventListener('click', function(e){ e.stopPropagation(); show(cur - 1); });
  document.getElementById('lbNext').addEventListener('click', function(e){ e.stopPropagation(); show(cur + 1); });
  lb.addEventListener('click', function(e){ if (e.target === lb) hide(); });
  document.addEventListener('keydown', function(e){
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
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

  /* ---------- reveals ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* ---------- counters ---------- */
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      var el = en.target, target = parseInt(el.dataset.count, 10) || 0,
          suf = el.dataset.suffix || '', t0 = null, dur = 1400;
      cio.unobserve(el);
      function step(ts){
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * e).toLocaleString('en-US') + suf;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, {threshold: .5});
  document.querySelectorAll('.stat-num').forEach(function(el){ cio.observe(el); });

  /* ---------- VLT chips -> WhatsApp ---------- */
  document.querySelectorAll('.vlt-chip').forEach(function(chip){
    chip.addEventListener('click', function(){
      var pct = chip.querySelector('b').textContent.trim();
      var msg = encodeURIComponent('Hola The Perfect Tint, quiero cotizar un tinte de ' + pct + ' para mi vehículo.');
      window.open('https://wa.me/17872431558?text=' + msg, '_blank', 'noopener');
    });
  });

  /* ---------- form -> WhatsApp ---------- */
  var form = document.getElementById('cform');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var n = document.getElementById('fNombre').value.trim(),
          s = document.getElementById('fServicio').value,
          m = document.getElementById('fMsg').value.trim(),
          txt = 'Hola The Perfect Tint, soy ' + n + '. Quiero cotizar: ' + s + (m ? '. ' + m : '');
      window.open('https://wa.me/17872431558?text=' + encodeURIComponent(txt), '_blank', 'noopener');
    });
  }
})();
