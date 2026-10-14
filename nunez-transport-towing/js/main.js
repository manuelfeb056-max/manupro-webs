/* Nuñez Transport and Towing — menú flotante, galería, FAQ, contadores, lightbox */
(function(){
  "use strict";

  /* ---------- drawer / menú flotante ---------- */
  var btn = document.getElementById('menuBtn'),
      drawer = document.getElementById('drawer'),
      scrim = document.getElementById('drawerScrim'),
      x = document.getElementById('drawerX');
  function openD(){ drawer.classList.add('open'); scrim.classList.add('on'); }
  function closeD(){ drawer.classList.remove('open'); scrim.classList.remove('on'); }
  if (btn) btn.addEventListener('click', openD);
  if (x) x.addEventListener('click', closeD);
  if (scrim) scrim.addEventListener('click', closeD);
  drawer.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeD); });

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* ---------- contadores ---------- */
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target, target = parseInt(el.dataset.count || '0', 10), suf = el.dataset.suffix || '';
      var t0 = null, dur = 1400;
      function tick(t){
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * ease) + suf;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, {threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });

  /* ---------- FAQ acordeón ---------- */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      if (!open){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; q.setAttribute('aria-expanded','true'); }
    });
  });

  /* ---------- galería carrusel + lightbox ---------- */
  var vp = document.getElementById('galViewport');
  if (vp){
    var track = document.getElementById('galTrack'),
        cards = track.children,
        prev = document.getElementById('galPrev'),
        next = document.getElementById('galNext'),
        dotsBox = document.getElementById('galDots'),
        dots = [];
    for (var i = 0; i < cards.length; i++){
      (function(i){
        var b = document.createElement('button');
        b.setAttribute('aria-label','Foto ' + (i+1));
        b.addEventListener('click', function(){ go(i); restart(); });
        dotsBox.appendChild(b); dots.push(b);
      })(i);
    }
    function step(){ var c = cards[0]; return c ? c.getBoundingClientRect().width + 16 : 320; }
    function cur(){ return Math.round(vp.scrollLeft / step()); }
    function go(i){
      i = (i + cards.length) % cards.length;
      vp.scrollTo({left: i * step(), behavior:'smooth'});
      setTimeout(mark, 420);
    }
    function mark(){
      var c = Math.min(Math.max(cur(),0), dots.length - 1);
      dots.forEach(function(d,j){ d.classList.toggle('on', j === c); });
    }
    var timer = null, idle = null;
    function restart(){
      clearInterval(timer);
      timer = setInterval(function(){ var c = cur(); go(c + 1 >= cards.length ? 0 : c + 1); }, 3800);
    }
    function pauseTemp(){ clearInterval(timer); clearTimeout(idle); idle = setTimeout(restart, 7000); }
    prev.addEventListener('click', function(){ go(cur()-1); restart(); });
    next.addEventListener('click', function(){ go(cur()+1); restart(); });
    vp.addEventListener('scroll', mark, {passive:true});
    vp.addEventListener('pointerdown', pauseTemp);
    document.addEventListener('visibilitychange', function(){
      if (document.hidden) clearInterval(timer); else restart();
    });
    mark(); restart();

    /* lightbox */
    var lb = document.getElementById('lightbox'),
        lbImg = document.getElementById('lbImg'),
        lbCap = document.getElementById('lbCap'),
        li = 0;
    function show(n){
      li = (n + cards.length) % cards.length;
      var img = cards[li].querySelector('img');
      lbImg.src = img.src; lbImg.alt = img.alt;
      lbCap.textContent = cards[li].querySelector('figcaption').textContent;
      lb.classList.add('on'); lb.setAttribute('aria-hidden','false');
    }
    function hide(){ lb.classList.remove('on'); lb.setAttribute('aria-hidden','true'); }
    Array.prototype.forEach.call(cards, function(c, i){
      c.addEventListener('click', function(){ clearInterval(timer); show(i); });
    });
    document.getElementById('lbClose').addEventListener('click', function(){ hide(); restart(); });
    document.getElementById('lbPrev').addEventListener('click', function(e){ e.stopPropagation(); show(li-1); });
    document.getElementById('lbNext').addEventListener('click', function(e){ e.stopPropagation(); show(li+1); });
    lb.addEventListener('click', function(e){ if (e.target === lb) { hide(); restart(); } });
    document.addEventListener('keydown', function(e){
      if (!lb.classList.contains('on')) return;
      if (e.key === 'Escape'){ hide(); restart(); }
      if (e.key === 'ArrowLeft') show(li-1);
      if (e.key === 'ArrowRight') show(li+1);
    });
  }

  /* ---------- form → WhatsApp ---------- */
  var form = document.getElementById('cform');
  if (form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var nombre = document.getElementById('fNombre').value.trim();
      var servicio = document.getElementById('fServicio').value;
      var msg = document.getElementById('fMsg').value.trim();
      var text = 'Hola Nuñez Transport and Towing, soy ' + nombre + '. Necesito: ' + servicio + '.'
        + (msg ? ' Mi ubicación: ' + msg : '');
      window.open('https://wa.me/17873581190?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();
