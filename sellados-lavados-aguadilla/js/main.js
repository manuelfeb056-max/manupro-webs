/* Sellados y Lavados — menú flotante, reveal, galería carrusel */
(function(){
  "use strict";

  /* ---------- menú flotante hamburguesa ---------- */
  var fab = document.getElementById('menuFab'),
      side = document.getElementById('sideNav'),
      close = document.getElementById('sideClose'),
      scrim = document.getElementById('sideScrim');
  function openNav(){ side.classList.add('open'); scrim.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeNav(){ side.classList.remove('open'); scrim.classList.remove('open'); document.body.style.overflow = ''; }
  if (fab) fab.addEventListener('click', openNav);
  if (close) close.addEventListener('click', closeNav);
  if (scrim) scrim.addEventListener('click', closeNav);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeNav(); });
  side.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeNav); });

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
})();

/* ---------- galería carrusel: botones + táctil + auto ---------- */
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
  function current(){ return Math.round(vp.scrollLeft / cardStep()); }
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

/* ===== ManuPro elite: formulario de cotización a WhatsApp (ronda 2, 2026-10-15) ===== */
document.querySelectorAll('.qform, .qelite').forEach(function(f){
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var g = function(n){ return (f.elements[n] && f.elements[n].value || '').trim(); };
    var errBox = f.querySelector('.qelite-err');
    var nombre = g('nombre'), tel = g('telefono');
    var svc = f.querySelector('input[name="servicio"]:checked');
    var svcVal = svc ? svc.value.trim() : g('servicio');
    var faltan = [];
    if(!nombre) faltan.push('tu nombre');
    if(!tel) faltan.push('tu teléfono');
    if(!svcVal) faltan.push('un servicio');
    if(faltan.length){
      if(errBox){ errBox.textContent = 'Falta: ' + faltan.join(', ') + '.'; errBox.style.display = 'block'; errBox.scrollIntoView({behavior:'smooth',block:'center'}); }
      else if(f.elements['nombre']) f.elements['nombre'].focus();
      return;
    }
    if(errBox) errBox.style.display = 'none';
    var parts = ['Hola ' + f.dataset.biz + ', soy ' + nombre + ' y mi teléfono es ' + tel];
    parts.push('Servicio que necesito: ' + svcVal);
    if(g('mensaje')) parts.push('Detalles: ' + g('mensaje'));
    if(g('pueblo')) parts.push('Pueblo: ' + g('pueblo'));
    window.open('https://wa.me/' + f.dataset.wa + '?text=' + encodeURIComponent(parts.join('. ') + '.'), '_blank', 'noopener');
  });
});
