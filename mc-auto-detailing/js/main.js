/* MC Auto Detailing — interacciones + brasas del hero */
(function(){
  "use strict";

  // Menú móvil
  var burger = document.getElementById('burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.addEventListener('click', function(e){ if (e.target.tagName === 'A') nav.classList.remove('open'); });
  }

  // FAQ accordion
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var wasOpen = item.classList.contains('open');
      items.forEach(function(it){ it.classList.remove('open'); it.querySelector('.faq-a').style.maxHeight = null; });
      if (!wasOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Brasas flotantes en el hero (CSS 2D, sin fotos)
  var sparkles = document.getElementById('sparkles');
  if (sparkles) {
    for (var i = 0; i < 22; i++) {
      var s = document.createElement('span');
      s.className = 'spark';
      var size = 3 + Math.random() * 7;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.left = (Math.random() * 100) + '%';
      s.style.animationDuration = (7 + Math.random() * 9) + 's';
      s.style.animationDelay = (Math.random() * 10) + 's';
      sparkles.appendChild(s);
    }
  }

  // Reveal on scroll
  var els = document.querySelectorAll('.work, .fb-card, .svc, .step, .plan, .faq-item, .about-grid > *');
  els.forEach(function(el){ el.classList.add('reveal'); });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, {threshold: 0.12});
  els.forEach(function(el){ io.observe(el); });
})();
