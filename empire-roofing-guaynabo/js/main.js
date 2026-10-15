// Empire Roofing Solutions — interacciones
(function(){
  "use strict";

  // --- menú circular flotante ---
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('overlayNav');
  function toggleMenu(force){
    var open = typeof force === 'boolean' ? force : !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    btn.classList.toggle('open', open);
    nav.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  btn.addEventListener('click', function(){ toggleMenu(); });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ toggleMenu(false); });
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') toggleMenu(false);
  });

  // --- formulario de cotización → WhatsApp ---
  var qf = document.getElementById('quoteForm');
  if (qf) qf.addEventListener('submit', function(e){
    e.preventDefault();
    var n = document.getElementById('qNombre').value.trim();
    var t = document.getElementById('qTel').value.trim();
    var s = document.getElementById('qServicio').value;
    var m = document.getElementById('qMsg').value.trim();
    var txt = 'Hola Empire Roofing Solutions, soy ' + (n || 'un cliente') +
      '. Mi teléfono es ' + t + '. Necesito: ' + s + '.' +
      (m ? ' ' + m : '') + ' Quiero una cotización gratis.';
    window.open('https://wa.me/17872002782?text=' + encodeURIComponent(txt), '_blank');
  });

  // --- cerrar overlay con su propio botón ---
  var ovc = document.getElementById('ovClose');
  if (ovc) ovc.addEventListener('click', function(){ toggleMenu(false); });
  document.querySelectorAll('.acc-item').forEach(function(item){
    var q = item.querySelector('.acc-q');
    var a = item.querySelector('.acc-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.acc-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // --- reveal on scroll ---
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // --- tilt 3D en el hero (mouse) ---
  var visual = document.getElementById('heroVisual');
  var tilt = visual ? visual.querySelector('.tilt') : null;
  if(visual && tilt && window.matchMedia('(pointer:fine)').matches){
    visual.addEventListener('mousemove', function(e){
      var r = visual.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - .5;
      var y = (e.clientY - r.top) / r.height - .5;
      tilt.style.transform = 'rotateY(' + (x * 14) + 'deg) rotateX(' + (-y * 10) + 'deg)';
    });
    visual.addEventListener('mouseleave', function(){
      tilt.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }
})();
