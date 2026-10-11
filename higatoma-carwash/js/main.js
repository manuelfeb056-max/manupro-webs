/* Higatoma Detailing — TEAL & GOLD: floating gold dust, reveals, gallery carousel (buttons + touch/swipe), counters, mobile menu */
(function(){
  "use strict";

  /* ---------- floating gold dust ---------- */
  var layer = document.getElementById('bubblesLayer');
  if (layer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var N = 22;
    for (var i = 0; i < N; i++) {
      var b = document.createElement('span');
      b.className = 'bubble';
      var size = 4 + Math.random() * 14;
      b.style.width = size + 'px';
      b.style.height = size + 'px';
      b.style.left = (Math.random() * 100) + 'vw';
      b.style.setProperty('--bx', ((Math.random() - .5) * 120).toFixed(0) + 'px');
      b.style.setProperty('--bo', (0.25 + Math.random() * 0.45).toFixed(2));
      b.style.animationDuration = (9 + Math.random() * 12).toFixed(1) + 's';
      b.style.animationDelay = (-Math.random() * 18).toFixed(1) + 's';
      layer.appendChild(b);
    }
  }

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
      var el = e.target, target = parseInt(el.dataset.count || '0', 10);
      var t0 = null, dur = 1400;
      function tick(t){
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * ease).toLocaleString('es-PR');
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

  /* ---------- gallery carousel: buttons + touch/swipe + dots ---------- */
  var vp = document.getElementById('galViewport');
  if (vp) {
    var track = vp.querySelector('.gal-track');
    var cards = track.children;
    var prev = document.getElementById('galPrev'), next = document.getElementById('galNext');
    var dotsBox = document.getElementById('galDots');
    var dots = [];
    for (var d = 0; d < cards.length; d++) {
      (function(i){
        var b = document.createElement('button');
        b.setAttribute('aria-label', 'Ir a la foto ' + (i + 1));
        b.addEventListener('click', function(){ go(i); restart(); });
        dotsBox.appendChild(b); dots.push(b);
      })(d);
    }
    function cardStep(){
      var c = cards[0];
      return c ? c.getBoundingClientRect().width + 16 : 346;
    }
    function current(){
      return Math.round(vp.scrollLeft / cardStep());
    }
    function go(i){
      i = (i + cards.length) % cards.length;
      vp.scrollTo({left: i * cardStep(), behavior: 'smooth'});
      setTimeout(mark, 420);
    }
    function mark(){
      if (!dots.length) return;
      var c = Math.min(Math.max(current(), 0), dots.length - 1);
      dots.forEach(function(dt, j){ dt.classList.toggle('on', j === c); });
    }
    var timer = null, idle = null;
    function restart(){
      clearInterval(timer);
      timer = setInterval(function(){
        var c = current();
        go(c + 1 >= cards.length ? 0 : c + 1);
      }, 3500);
    }
    function pauseTemp(){
      clearInterval(timer); clearTimeout(idle);
      idle = setTimeout(restart, 7000);
    }
    if (prev) prev.addEventListener('click', function(){ go(current() - 1); restart(); });
    if (next) next.addEventListener('click', function(){ go(current() + 1); restart(); });
    vp.addEventListener('scroll', mark, {passive: true});
    vp.addEventListener('pointerdown', pauseTemp);
    vp.addEventListener('touchstart', pauseTemp, {passive: true});
    // touch swipe manual
    var sx = 0, swiping = false;
    vp.addEventListener('touchstart', function(e){ sx = e.touches[0].clientX; swiping = true; }, {passive: true});
    vp.addEventListener('touchend', function(e){
      if (!swiping) return; swiping = false;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 34) { go(current() + (dx < 0 ? 1 : -1)); restart(); }
    }, {passive: true});
    document.addEventListener('visibilitychange', function(){
      if (document.hidden) { clearInterval(timer); timer = null; }
      else if (!timer) restart();
    });
    mark(); restart();
  }

  /* ---------- FAQ: solo una abierta a la vez ---------- */
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function(it){
    it.addEventListener('toggle', function(){
      if (it.open) items.forEach(function(o){ if (o !== it) o.open = false; });
    });
  });
})();
