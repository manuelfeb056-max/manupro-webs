// Menu
const menuBtn = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  menuOverlay.classList.toggle('open');
});
menuOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuBtn.classList.remove('open');
  menuOverlay.classList.remove('open');
}));

// Accordion
document.querySelectorAll('.acc-head').forEach(head => {
  head.addEventListener('click', () => {
    const item = head.parentElement;
    const body = item.querySelector('.acc-body');
    const open = item.classList.contains('open');
    document.querySelectorAll('.acc-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.acc-body').style.maxHeight = null;
    });
    if (!open) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.gallery-grid figure, .service-card, .plan-card, .process-steps li, .acc-item, .quote-form').forEach(el => {
  el.classList.add('reveal');
  io.observe(el);
});

// Formulario a WhatsApp
var qform = document.getElementById('cform');
if (qform){
  qform.addEventListener('submit', function(ev){
    ev.preventDefault();
    var biz = qform.dataset.biz || 'el negocio',
        wa = qform.dataset.wa || '17877869850',
        nombre = document.getElementById('fNombre').value.trim(),
        tel = document.getElementById('fTel').value.trim(),
        servicio = document.getElementById('fServicio').value,
        msg = document.getElementById('fMsg').value.trim();
    var text = 'Hola ' + biz + ', soy ' + nombre + ' (' + tel + '). Me interesa: ' + servicio + '.' + (msg ? ' ' + msg : '');
    window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });
}

/* stagger elite: reveal escalonado en grupos de tarjetas (los hovers quedan intactos) */
(function(){
  "use strict";
  var groups = document.querySelectorAll('.serv-grid,.svc-grid,.gal-viewport,.gallery-grid,.g-grid,.plan-grid,.plans,.why-grid,.steps,.faq-list,.contact-grid,.about-grid,.stack,.process-steps,.p-grid,.services-grid,.plans-grid');
  groups.forEach(function(g){
    var kids = g.querySelectorAll('.reveal:not(.visible):not(.on)');
    kids.forEach(function(k, i){ k.style.transitionDelay = (Math.min(i, 6) * 70) + 'ms'; });
  });
  document.addEventListener('transitionend', function(e){
    var t = e.target;
    if (t.classList && (t.classList.contains('visible') || t.classList.contains('on'))){
      t.style.transitionDelay = '0ms';
    }
  }, true);
})();
