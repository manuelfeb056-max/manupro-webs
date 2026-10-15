/* Miguelo Welding Services — interacción: menú, acordeón FAQ, reveals, chispas de soldadura */
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

  // Chispas de soldadura en el hero (canvas)
  var cv = document.getElementById('sparks');
  if (cv && cv.getContext) {
    var ctx = cv.getContext('2d');
    var W, H, sparks = [];
    function size(){
      W = cv.width = cv.offsetWidth;
      H = cv.height = cv.offsetHeight;
    }
    size();
    window.addEventListener('resize', size);
    function spawn(){
      var x = Math.random() * W;
      return {
        x: x, y: H * (0.55 + Math.random() * 0.45),
        vx: (Math.random() - 0.5) * 1.6,
        vy: -(1.5 + Math.random() * 3.5),
        life: 1, decay: 0.008 + Math.random() * 0.02,
        r: 1 + Math.random() * 2.2,
        hue: 20 + Math.random() * 25
      };
    }
    var MAX = 90;
    function tick(){
      ctx.clearRect(0, 0, W, H);
      if (sparks.length < MAX && Math.random() < 0.7) sparks.push(spawn());
      for (var i = sparks.length - 1; i >= 0; i--) {
        var s = sparks[i];
        s.x += s.vx; s.y += s.vy; s.vy += 0.05; s.life -= s.decay;
        if (s.life <= 0 || s.y < -10) { sparks.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.fillStyle = 'hsla(' + s.hue + ', 100%, ' + (50 + s.life * 20) + '%, ' + (s.life * 0.9) + ')';
        ctx.shadowColor = 'hsla(' + s.hue + ', 100%, 55%, .9)';
        ctx.shadowBlur = 12 * s.life;
        ctx.arc(s.x, s.y, s.r * s.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      requestAnimationFrame(tick);
    }
    // Solo animar cuando el hero está visible
    var hero = document.querySelector('.hero');
    var heroIO = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (e.isIntersecting) { requestAnimationFrame(tick); heroIO.disconnect(); }
      });
    });
    heroIO.observe(hero);
  }
})();

  // cerrar menú: botón X y click en fondo del overlay
  (function(){
    var nav=document.getElementById('navOverlay');if(!nav)return;
    var burger=document.getElementById('burger')||document.querySelector('.menu-btn');
    function closeNav(){nav.classList.remove('open');if(burger)burger.classList.remove('open');document.body.style.overflow='';nav.setAttribute('aria-hidden','true');}
    var x=nav.querySelector('.ov-close');if(x)x.addEventListener('click',closeNav);
    nav.addEventListener('click',function(e){if(e.target===nav)closeNav();});
  })();

/* Mejora elite: stagger en reveals */
(function(){
  try{
    document.querySelectorAll('.gallery-grid,.gal-track,.svc-grid,.services-grid,.steps,.proceso-steps').forEach(function(grid){
      Array.prototype.forEach.call(grid.children,function(el,i){
        if(el.classList.contains('reveal'))el.style.transitionDelay=Math.min(i*70,420)+'ms';
      });
    });
  }catch(e){}
})();
