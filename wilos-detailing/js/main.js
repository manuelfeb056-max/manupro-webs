/* Wilos Detailing — GLASS SHIELD engine: hero video, reveals, counters, gallery, FAQ, menu */
(function(){
  "use strict";

  /* ---------- hero video: fade in cuando corre ---------- */
  var hv = document.getElementById('heroVideo');
  if (hv) {
    var play = function(){ hv.classList.add('playing'); };
    if (hv.readyState >= 3) play();
    hv.addEventListener('canplay', play);
    hv.addEventListener('playing', play);
    var tryPlay = hv.play();
    if (tryPlay && tryPlay.catch) tryPlay.catch(function(){});
  }

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal:not(.in)').forEach(function(el){ io.observe(el); });

  if (/[?&]shots=1/.test(location.search)) {
    // QA mode: reveal everything + finalize counters + show hero poster for screenshots
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('visible'); });
    document.querySelectorAll('[data-count]').forEach(function(el){
      el.textContent = parseInt(el.dataset.count || '0', 10).toLocaleString('es-PR') + (el.dataset.suffix || '');
    });
    var hvq = document.getElementById('heroVideo');
    if (hvq) {
      try { hvq.pause(); } catch (e) {}
      // strip media sources in QA: headless video decode wedges the renderer;
      // the poster stays visible as the hero backdrop
      hvq.querySelectorAll('source').forEach(function(s){ s.remove(); });
      try { hvq.load(); } catch (e) {}
      hvq.classList.add('playing');
    }
  }

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
  window.addEventListener('scroll', function(){
    header.style.boxShadow = window.scrollY > 10 ? '0 8px 30px rgba(0,0,0,.45)' : 'none';
  }, {passive:true});

  /* ---------- gallery carousel: buttons + dots + swipe + auto ---------- */
  var vp = document.getElementById('galViewport');
  if (vp) {
    var track = vp.firstElementChild;
    var cards = track.children;
    var prev = document.getElementById('galPrev'), next = document.getElementById('galNext');
    var gDotsBox = document.getElementById('galDots');
    var gDots = [];
    if (gDotsBox && cards.length <= 12) {
      for (var i = 0; i < cards.length; i++) {
        (function(i){
          var b = document.createElement('button');
          b.setAttribute('aria-label', 'Foto ' + (i+1));
          b.addEventListener('click', function(){ ggo(i); grestart(); });
          gDotsBox.appendChild(b); gDots.push(b);
        })(i);
      }
    }
    function cardStep(){
      var c = cards[0];
      return c ? c.getBoundingClientRect().width + 16 : 320;
    }
    function current(){ return Math.round(vp.scrollLeft / cardStep()); }
    function ggo(i){
      i = (i + cards.length) % cards.length;
      vp.scrollTo({left: i * cardStep(), behavior: 'smooth'});
      setTimeout(gmark, 420);
    }
    function gmark(){
      if (!gDots.length) return;
      var c = Math.min(Math.max(current(), 0), gDots.length - 1);
      gDots.forEach(function(d, j){ d.classList.toggle('on', j === c); });
    }
    var gtimer = null, gidle = null;
    function grestart(){
      clearInterval(gtimer);
      gtimer = setInterval(function(){
        var c = current();
        ggo(c + 1 >= cards.length ? 0 : c + 1);
      }, 3800);
    }
    function pauseTemp(){
      clearInterval(gtimer);
      clearTimeout(gidle);
      gidle = setTimeout(grestart, 7000);
    }
    if (prev) prev.addEventListener('click', function(){ ggo(current() - 1); grestart(); });
    if (next) next.addEventListener('click', function(){ ggo(current() + 1); grestart(); });
    vp.addEventListener('scroll', gmark, {passive: true});
    vp.addEventListener('pointerdown', pauseTemp);
    var tx = 0;
    vp.addEventListener('touchstart', function(e){ tx = e.touches[0].clientX; pauseTemp(); }, {passive: true});
    vp.addEventListener('touchend', function(e){
      var dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 30) ggo(current() + (dx < 0 ? 1 : -1));
    }, {passive: true});
    document.addEventListener('visibilitychange', function(){
      if (document.hidden) clearInterval(gtimer); else grestart();
    });
    gmark(); grestart();
  }

  /* ---------- FAQ: solo una abierta a la vez ---------- */
  document.querySelectorAll('.faq-item').forEach(function(item){
    item.addEventListener('toggle', function(){
      if (!item.open) return;
      document.querySelectorAll('.faq-item').forEach(function(other){
        if (other !== item && other.open) other.open = false;
      });
    });
  });
})();
