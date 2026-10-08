/* Manupro site engine — hero slider 2s, photo strip 2s, reveals, counters, form→WhatsApp */
(function(){
  "use strict";

  /* ---------- hero slider: cambia cada 2 segundos ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
  var dotsBox = document.getElementById('heroDots');
  var hi = 0, timer = null;

  if (slides.length) {
    slides.forEach(function(_, i){
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Foto ' + (i+1));
      if (i === 0) b.classList.add('on');
      b.addEventListener('click', function(){ go(i); restart(); });
      dotsBox.appendChild(b);
    });
    var dots = dotsBox.querySelectorAll('button');
    function go(n){
      slides[hi].classList.remove('active'); dots[hi].classList.remove('on');
      hi = (n + slides.length) % slides.length;
      slides[hi].classList.add('active'); dots[hi].classList.add('on');
    }
    function restart(){ clearInterval(timer); timer = setInterval(function(){ go(hi+1); }, 2000); }
    restart();
    // pausa cuando la pestaña no se ve (ahorra batería)
    document.addEventListener('visibilitychange', function(){
      if (document.hidden) clearInterval(timer); else restart();
    });
  }

  /* ---------- photo strip: avanza una foto cada 2 segundos ---------- */
  var track = document.getElementById('photoTrack');
  var strip = document.getElementById('photoStrip');
  if (track) {
    var items = track.children.length;
    // duplicar para loop infinito
    track.innerHTML += track.innerHTML;
    var idx = 0, step = 0, stimer = null, paused = false;
    function measure(){
      var fig = track.querySelector('figure');
      if (fig) step = fig.getBoundingClientRect().width + 18;
    }
    measure(); window.addEventListener('resize', measure);
    function advance(){
      if (paused || !step) return;
      idx++;
      track.style.transform = 'translateX(' + (-idx * step) + 'px)';
      if (idx >= items) {
        setTimeout(function(){
          track.style.transition = 'none';
          idx = 0;
          track.style.transform = 'translateX(0)';
          void track.offsetWidth;
          track.style.transition = '';
        }, 950);
      }
    }
    stimer = setInterval(advance, 2000);
    strip.addEventListener('mouseenter', function(){ paused = true; });
    strip.addEventListener('mouseleave', function(){ paused = false; });
    strip.addEventListener('touchstart', function(){ paused = true; }, {passive:true});
    strip.addEventListener('touchend', function(){ setTimeout(function(){ paused = false; }, 3000); }, {passive:true});
    document.addEventListener('visibilitychange', function(){
      if (document.hidden) { clearInterval(stimer); stimer = null; }
      else if (!stimer) stimer = setInterval(advance, 2000);
    });
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
    header.style.boxShadow = window.scrollY > 10 ? '0 8px 30px rgba(0,0,0,.45)' : 'none';
  }, {passive:true});

  /* ---------- form → WhatsApp ---------- */
  var form = document.getElementById('cform');
  if (form) {
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var nombre = document.getElementById('fNombre').value.trim();
      var servicio = document.getElementById('fServicio').value;
      var msg = document.getElementById('fMsg').value.trim();
      var waLink = form.closest('body').querySelector('[data-track="wa_float"]');
      var waNum = '17877451110';
      var text = 'Hola Heladería Artesanal Jendy\'s, soy ' + nombre + '. Me interesa: ' + servicio + '.'
        + (msg ? ' ' + msg : '');
      window.open('https://wa.me/' + waNum + '?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();

/* ---------- galería carrusel: botones + toque + auto ---------- */
(function(){
  var vp = document.getElementById('galViewport');
  if (!vp) return;
  var track = vp.firstElementChild;
  var cards = track.children;
  if (!cards.length) return;
  var prev = document.getElementById('galPrev'), next = document.getElementById('galNext');
  var dotsBox = document.getElementById('galDots');
  var dots = [];
  if (dotsBox && cards.length <= 12) {
    for (var i = 0; i < cards.length; i++) {
      (function(i){
        var b = document.createElement('button');
        b.setAttribute('aria-label', 'Foto ' + (i+1));
        b.addEventListener('click', function(){ go(i); restart(); });
        dotsBox.appendChild(b); dots.push(b);
      })(i);
    }
  }
  function cardStep(){
    var c = cards[0];
    return c ? c.getBoundingClientRect().width + 16 : 320;
  }
  function current(){
    return Math.round(vp.scrollLeft / cardStep());
  }
  function go(i){
    i = (i + cards.length) % cards.length;
    vp.scrollTo({left: i * cardStep(), behavior: 'smooth'});
    setTimeout(mark, 400);
  }
  function mark(){
    if (!dots.length) return;
    var c = Math.min(Math.max(current(), 0), dots.length - 1);
    dots.forEach(function(d, j){ d.classList.toggle('on', j === c); });
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
    clearInterval(timer);
    clearTimeout(idle);
    idle = setTimeout(restart, 6000);
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
})();

/* ---------- zona 3D: anillo que gira solo 360° + botones + toque ---------- */
(function(){
  var ring = document.getElementById('ring3d');
  if (!ring) return;
  var stage = document.getElementById('stage3d');
  var nameEl = document.getElementById('ringName');
  var prods = ring.children;
  var names = ['Bizcochitos mojaditos', 'Vasito de tres leches', 'Nuestra vitrina', 'Pasta de pistacho'];
  var angle = 0, auto = true, dragging = false, lastX = 0, idleT = null;
  function render(){
    ring.style.transform = 'rotateY(' + angle + 'deg)';
    var best = 0, bestD = -2;
    for (var k = 0; k < prods.length; k++) {
      var a = (((k * 90 + angle) % 360) + 360) % 360;
      if (a > 180) a -= 360;
      var depth = Math.cos(a * Math.PI / 180);
      prods[k].style.opacity = (0.3 + 0.7 * Math.max(0, depth)).toFixed(2);
      if (depth > bestD) { bestD = depth; best = k; }
    }
    if (nameEl && names[best] !== nameEl.textContent) nameEl.textContent = names[best];
  }
  function tick(){
    if (auto && !dragging) { angle = (angle + 0.4) % 360; render(); }
    requestAnimationFrame(tick);
  }
  function poke(){
    auto = false; clearTimeout(idleT);
    idleT = setTimeout(function(){ auto = true; }, 5000);
  }
  document.getElementById('ringPrev').addEventListener('click', function(){ angle -= 90; poke(); render(); });
  document.getElementById('ringNext').addEventListener('click', function(){ angle += 90; poke(); render(); });
  stage.addEventListener('pointerdown', function(e){ dragging = true; lastX = e.clientX; poke(); try{ stage.setPointerCapture(e.pointerId); }catch(_){} });
  stage.addEventListener('pointermove', function(e){ if (dragging) { angle += (e.clientX - lastX) * 0.45; lastX = e.clientX; render(); } });
  ['pointerup','pointercancel','pointerleave'].forEach(function(ev){ stage.addEventListener(ev, function(){ dragging = false; }); });
  document.addEventListener('visibilitychange', function(){ auto = !document.hidden && auto; });
  render(); tick();
})();

/* ---------- lookbook: filtros por estilo ---------- */
(function(){
  var fbox = document.getElementById('galFilters');
  if (!fbox) return;
  var cards = document.querySelectorAll('#galViewport .gal-card');
  var vp = document.getElementById('galViewport');
  fbox.addEventListener('click', function(e){
    var b = e.target.closest('button'); if (!b) return;
    fbox.querySelectorAll('button').forEach(function(x){ x.classList.toggle('on', x === b); });
    var f = b.getAttribute('data-f');
    cards.forEach(function(c){
      c.style.display = (f === 'todos' || c.getAttribute('data-cat') === f) ? '' : 'none';
    });
    if (vp) vp.scrollTo({left: 0, behavior: 'smooth'});
  });
})();

/* ---------- mini carruseles en tarjetas de servicio: auto 2s + táctil ---------- */
document.querySelectorAll('.card-imgs').forEach(function(box){
  var imgs = box.querySelectorAll('img');
  var dots = box.querySelectorAll('.card-dots i');
  if (imgs.length < 2) return;
  var cur = 0, timer = null, held = false;
  function go(n){
    cur = (n + imgs.length) % imgs.length;
    imgs.forEach(function(im, k){ im.classList.toggle('on', k === cur); });
    dots.forEach(function(d, k){ d.classList.toggle('on', k === cur); });
  }
  function play(){ stop(); timer = setInterval(function(){ if (!held) go(cur + 1); }, 2000); }
  function stop(){ if (timer) clearInterval(timer); timer = null; }
  play();
  var sx = 0;
  box.addEventListener('touchstart', function(e){ sx = e.touches[0].clientX; held = true; }, {passive: true});
  box.addEventListener('touchend', function(e){
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 28) go(cur + (dx < 0 ? 1 : -1));
    setTimeout(function(){ held = false; }, 3500);
  }, {passive: true});
  box.addEventListener('mouseenter', function(){ held = true; });
  box.addEventListener('mouseleave', function(){ held = false; });
});
