/* ASSA Sellado de Techos — interacción: menú, acordeón FAQ, reveals */
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

/* ===== ManuPro elite: formulario de cotización a WhatsApp (ronda 2, 2026-10-15) ===== */
document.querySelectorAll('.qform, .qelite').forEach(function(f){
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var g = function(n){ return (f.elements[n] && f.elements[n].value || '').trim(); };
    var errBox = f.querySelector('.qelite-err');
    var nombre = g('nombre'), tel = g('telefono');
    var svc = f.querySelector('input[name="servicio"]:checked');
    var svcVal = svc ? svc.value.trim() : g('servicio');
    var faltan = [];
    if(!nombre) faltan.push('tu nombre');
    if(!tel) faltan.push('tu teléfono');
    if(!svcVal) faltan.push('un servicio');
    if(faltan.length){
      if(errBox){ errBox.textContent = 'Falta: ' + faltan.join(', ') + '.'; errBox.style.display = 'block'; errBox.scrollIntoView({behavior:'smooth',block:'center'}); }
      else if(f.elements['nombre']) f.elements['nombre'].focus();
      return;
    }
    if(errBox) errBox.style.display = 'none';
    var parts = ['Hola ' + f.dataset.biz + ', soy ' + nombre + ' y mi teléfono es ' + tel];
    parts.push('Servicio que necesito: ' + svcVal);
    if(g('mensaje')) parts.push('Detalles: ' + g('mensaje'));
    if(g('pueblo')) parts.push('Pueblo: ' + g('pueblo'));
    window.open('https://wa.me/' + f.dataset.wa + '?text=' + encodeURIComponent(parts.join('. ') + '.'), '_blank', 'noopener');
  });
});

/* ===== ManuPro elite touch: botón cerrar dentro del overlay (2026-10-15) ===== */
(function(){
  var ov = document.getElementById('menuOverlay'), c = document.getElementById('mClose');
  if(c && ov){ c.addEventListener('click', function(){
    ov.classList.remove('open');
    var b = document.getElementById('menuBtn');
    if(b) b.classList.remove('x');
    document.body.style.overflow = '';
  }); }
})();
