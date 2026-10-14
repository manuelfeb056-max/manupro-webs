(function(){
  "use strict";

  /* topbar on scroll */
  var topbar = document.getElementById('topbar');
  function onScroll(){ topbar.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  /* hamburger menu */
  var burger = document.getElementById('burger');
  var overlay = document.getElementById('menuOverlay');
  function toggleMenu(force){
    var open = typeof force === 'boolean' ? force : !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function(){ toggleMenu(); });
  overlay.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ toggleMenu(false); });
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') toggleMenu(false);
  });

  /* reveal on scroll */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded','true');
      }
    });
  });

  /* quote form -> WhatsApp */
  var WA = '17877879055';
  var form = document.getElementById('quoteForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var d = new FormData(form);
    var nombre = (d.get('nombre')||'').toString().trim();
    var tel = (d.get('telefono')||'').toString().trim();
    if(!nombre || !tel){
      alert('Por favor completa tu nombre y teléfono.');
      return;
    }
    var msg = 'Hola D Waterproofing Corp, soy ' + nombre +
      '. Me interesa: ' + (d.get('servicio')||'Sellado residencial') +
      '. Pueblo: ' + ((d.get('pueblo')||'').toString().trim() || 'N/A') +
      '. Mi teléfono: ' + tel + '.' +
      ((d.get('mensaje')||'').toString().trim() ? ' Detalle: ' + d.get('mensaje').toString().trim() : '');
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank');
  });
})();
