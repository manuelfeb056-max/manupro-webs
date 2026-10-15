// Julio Roofing — interacciones
(function(){
  'use strict';

  // Menú hamburguesa
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('navOverlay');
  btn.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    btn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Acordeón FAQ
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // Contadores del hero
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var el = e.target, target = parseInt(el.getAttribute('data-count'), 10), start = null;
      function tick(t){
        if(!start) start = t;
        var p = Math.min((t - start) / 1200, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, {threshold: .5});
  document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });

  // Tilt 3D en tarjetas
  if(window.matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('[data-tilt]').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - .5;
        var y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = 'perspective(900px) rotateY(' + (x*10) + 'deg) rotateX(' + (-y*10) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function(){ card.style.transform = ''; });
    });
  }

  // Lightbox galería
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  document.querySelectorAll('.gal-card').forEach(function(card){
    card.addEventListener('click', function(){
      lbImg.src = card.getAttribute('data-full');
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLb(){
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('lbClose').addEventListener('click', closeLb);
  lb.addEventListener('click', function(e){ if(e.target === lb) closeLb(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeLb(); });
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
