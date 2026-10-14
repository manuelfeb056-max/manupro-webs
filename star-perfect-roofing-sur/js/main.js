/* Star Perfect Roofing — interacción: menú, acordeón FAQ, reveals, cielo estrellado */
(function(){
  "use strict";

  // Menú hamburguesa
  var burger = document.getElementById('burger');
  var overlay = document.getElementById('navOverlay');
  burger.addEventListener('click', function(){
    var open = overlay.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    overlay.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  overlay.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      overlay.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
      document.body.style.overflow = '';
    });
  });

  // Acordeón FAQ
  document.querySelectorAll('.acc-item').forEach(function(item){
    var q = item.querySelector('.acc-q');
    var a = item.querySelector('.acc-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.acc-a').style.maxHeight = null;
        o.querySelector('.acc-q').setAttribute('aria-expanded','false');
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded','true');
      }
    });
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal-up').forEach(function(el){ io.observe(el); });

  // Cielo estrellado en el hero
  var canvas = document.getElementById('stars');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var ctx = canvas.getContext('2d');
    var stars = [];
    var W, H;
    function size(){
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      stars = [];
      var n = Math.min(170, Math.floor(W * H / 9000));
      for (var i = 0; i < n; i++){
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H * 0.72,
          r: Math.random() * 1.6 + 0.4,
          gold: Math.random() < 0.14,
          ph: Math.random() * Math.PI * 2,
          sp: 0.4 + Math.random() * 1.1
        });
      }
    }
    size();
    window.addEventListener('resize', size);
    var t = 0;
    (function draw(){
      t += 0.016;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++){
        var s = stars[i];
        var tw = 0.35 + 0.65 * Math.abs(Math.sin(t * s.sp + s.ph));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.gold
          ? 'rgba(242,205,78,' + (tw * 0.95).toFixed(2) + ')'
          : 'rgba(235,240,250,' + (tw * 0.85).toFixed(2) + ')';
        ctx.fill();
      }
      requestAnimationFrame(draw);
    })();
  }
})();
