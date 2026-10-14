// interactividad (menú, acordeón, contador, reveal, parallax)
(function(){
  "use strict";
  var btn = document.getElementById('menuBtn'),
      overlay = document.getElementById('menuOverlay'),
      close = document.getElementById('menuClose');
  function openMenu(){ overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  function closeMenu(){ overlay.classList.remove('open'); overlay.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  btn.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  overlay.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeMenu(); });
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
  var num = document.querySelector('.giant-num');
  if(num){
    var target = parseInt(num.getAttribute('data-count'), 10) || 100, done = false;
    function count(){
      if(done) return; done = true;
      var start = null, dur = 1600;
      function tick(t){
        if(!start) start = t;
        var p = Math.min((t - start) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        num.textContent = Math.round(target * e);
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    new IntersectionObserver(function(es, ob){
      es.forEach(function(e){ if(e.isIntersecting){ count(); ob.disconnect(); } });
    }, {threshold:.4}).observe(num);
  }
  var rev = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.12});
    rev.forEach(function(el){ io.observe(el); });
  } else { rev.forEach(function(el){ el.classList.add('in'); }); }
  var heroBg = document.querySelector('.hero-bg'), hero = document.querySelector('.hero');
  window.addEventListener('scroll', function(){
    if(!heroBg || !hero) return;
    var y = window.scrollY;
    if(y < hero.offsetHeight) heroBg.style.translate = '0 ' + (y * 0.18) + 'px';
  }, {passive:true});
})();
