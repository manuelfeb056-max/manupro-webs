// AXA ROOFING · interactividad
(function(){
  "use strict";

  /* ---- menú flotante ---- */
  var btn = document.getElementById('menuBtn'),
      overlay = document.getElementById('menuOverlay'),
      close = document.getElementById('menuClose');
  function openMenu(){ overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  function closeMenu(){ overlay.classList.remove('open'); overlay.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  btn.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  overlay.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeMenu(); });

  /* ---- acordeón FAQ ---- */
  document.querySelectorAll('.acc-item').forEach(function(item){
    var q = item.querySelector('.acc-q'), a = item.querySelector('.acc-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function(o){
        o.classList.remove('open'); o.querySelector('.acc-a').style.maxHeight = null;
      });
      if(!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ---- parallax de tarjetas con el mouse (desktop) ---- */
  var stack = document.getElementById('cardStack');
  if(stack && window.matchMedia('(pointer:fine)').matches){
    var cards = stack.querySelectorAll('[data-depth]');
    stack.addEventListener('mousemove', function(e){
      var r = stack.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width - .5,
          y = (e.clientY - r.top) / r.height - .5;
      cards.forEach(function(c){
        var d = parseFloat(c.getAttribute('data-depth')) || 20;
        c.style.marginLeft = (-x * d) + 'px';
        c.style.marginTop = (-y * d) + 'px';
      });
    });
    stack.addEventListener('mouseleave', function(){
      cards.forEach(function(c){ c.style.marginLeft = '0'; c.style.marginTop = '0'; });
    });
  }

  /* ---- reveal on scroll ---- */
  var rev = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.12});
    rev.forEach(function(el){ io.observe(el); });
  } else { rev.forEach(function(el){ el.classList.add('in'); }); }
})();
