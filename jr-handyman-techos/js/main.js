/* JR Handyman Contractors & Multiservices — interacción: menú, acordeón FAQ, reveals */
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
