/* Larregui Detailing — menú móvil + reveals */
(function(){
  "use strict";
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.addEventListener('click', function(e){
      if (e.target.tagName === 'A') nav.classList.remove('open');
    });
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {threshold: .12});
  var all = document.querySelectorAll('.reveal');
  if (/[?&]shots=1/.test(location.search)) {
    // QA mode: reveal everything instantly for full-page screenshots
    all.forEach(function(el){ el.classList.add('in'); });
    document.documentElement.classList.add('shots');
  } else {
    all.forEach(function(el){ io.observe(el); });
  }
})();
