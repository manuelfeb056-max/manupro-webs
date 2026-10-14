// Jargen Roofing — interactions
(function(){
  // menu
  var btn = document.getElementById('menuBtn'),
      nav = document.getElementById('nav'),
      scrim = document.getElementById('navScrim');
  function toggle(open){
    var will = open !== undefined ? open : !nav.classList.contains('open');
    nav.classList.toggle('open', will);
    btn.classList.toggle('open', will);
    scrim.classList.toggle('show', will);
    document.body.style.overflow = will ? 'hidden' : '';
  }
  btn.addEventListener('click', function(){ toggle(); });
  scrim.addEventListener('click', function(){ toggle(false); });
  nav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ toggle(false); }); });

  // reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // gallery
  var vp = document.getElementById('galViewport'),
      track = vp.querySelector('.gal-track'),
      cards = track.querySelectorAll('.gal-card'),
      dots = document.getElementById('galDots'),
      idx = 0;
  function perView(){ return window.innerWidth <= 560 ? 1 : (window.innerWidth <= 960 ? 2 : 3); }
  function maxIdx(){ return Math.max(0, cards.length - perView()); }
  cards.forEach(function(_, i){
    var b = document.createElement('button');
    b.setAttribute('aria-label','Ir a foto '+(i+1));
    b.addEventListener('click', function(){ go(i); });
    dots.appendChild(b);
  });
  function paint(){
    dots.querySelectorAll('button').forEach(function(b, i){ b.classList.toggle('active', i === idx); });
  }
  function go(i){
    idx = Math.max(0, Math.min(i, maxIdx()));
    var w = cards[0].getBoundingClientRect().width + 18;
    track.style.transform = 'translateX(' + (-idx * w) + 'px)';
    paint();
  }
  document.getElementById('galPrev').addEventListener('click', function(){ go(idx - 1 < 0 ? maxIdx() : idx - 1); });
  document.getElementById('galNext').addEventListener('click', function(){ go(idx + 1 > maxIdx() ? 0 : idx + 1); });
  window.addEventListener('resize', function(){ go(idx); });
  go(0);
})();
