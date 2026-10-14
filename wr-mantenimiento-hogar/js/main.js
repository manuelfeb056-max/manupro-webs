// WR Mantenimiento a tu Hogar — interactividad
(function(){
  "use strict";

  // Menú hamburguesa flotante
  var fab = document.getElementById('menuFab');
  var overlay = document.getElementById('navOverlay');
  fab.addEventListener('click', function(){
    var open = overlay.classList.toggle('open');
    fab.classList.toggle('open', open);
    overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  overlay.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      overlay.classList.remove('open'); fab.classList.remove('open');
      overlay.setAttribute('aria-hidden','true'); document.body.style.overflow = '';
    });
  });

  // Header al hacer scroll
  var header = document.getElementById('header');
  function onScroll(){ header.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  // Hero: pestañas de servicios
  var tabs = [
    {t:'Pintura que <span class="hl">renueva</span> tu casa',
     s:'Interior y exterior con preparación seria y acabado limpio. Un solo contacto para todo el mantenimiento de tu hogar.',
     img:'img/hero1.jpg', alt:'Pintando el exterior de una casa en Juncos, Puerto Rico'},
    {t:'Lavado a presión que <span class="hl">lo deja nuevo</span>',
     s:'Paredes, marquesinas, aceras y techos: sacamos moho, sucio y manchas antes de pintar o sellar.',
     img:'img/g1.jpg', alt:'Lavado a presión en pared exterior de casa'},
    {t:'Sellado de techo <span class="hl">contra la lluvia</span>',
     s:'Impermeabilización para que el agua no entre más. Limpieza, preparación y sellador aplicado como manda.',
     img:'img/g2.jpg', alt:'Aplicando sellador blanco en techo de casa'},
    {t:'Levantamos casas <span class="hl">deterioradas</span>',
     s:'Arreglo y limpieza de casas descuidadas: las dejamos habitables y presentables otra vez.',
     img:'img/g4.jpg', alt:'Reparando y limpiando casa deteriorada'}
  ];
  var htabs = document.querySelectorAll('.htab');
  var heroTitle = document.getElementById('heroTitle');
  var heroSub = document.getElementById('heroSub');
  var heroImg = document.getElementById('heroImg');
  htabs.forEach(function(btn){
    btn.addEventListener('click', function(){
      htabs.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var d = tabs[parseInt(btn.dataset.tab, 10)];
      heroImg.style.opacity = 0;
      setTimeout(function(){
        heroTitle.innerHTML = d.t; heroSub.textContent = d.s;
        heroImg.src = d.img; heroImg.alt = d.alt;
        heroImg.onload = function(){ heroImg.style.opacity = 1; };
        setTimeout(function(){ heroImg.style.opacity = 1; }, 400);
      }, 200);
    });
  });

  // FAQ acordeón
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
})();
