/* Executive Car Care — "El sello 5.0": reveal on scroll, mobile menu, header, form→WhatsApp */
(function(){
  "use strict";

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold: .1, rootMargin: '0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* ---------- mobile menu ---------- */
  var btn = document.getElementById('menuBtn'), nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
    document.addEventListener('click', function(ev){
      if (nav.classList.contains('open') && !nav.contains(ev.target) && !btn.contains(ev.target)) {
        nav.classList.remove('open');
      }
    });
  }

  /* ---------- header shadow ---------- */
  var header = document.getElementById('header');
  window.addEventListener('scroll', function(){
    if (header) header.style.boxShadow = window.scrollY > 10 ? '0 8px 30px rgba(20,18,14,.12)' : 'none';
  }, {passive:true});

  /* ---------- form → WhatsApp ---------- */
  var form = document.getElementById('cform');
  if (form) {
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var nombre = (document.getElementById('fNombre').value || '').trim();
      var servicio = document.getElementById('fServicio').value;
      var auto = (document.getElementById('fMsg').value || '').trim();
      var text = 'Hola Executive Car Care' + (nombre ? ', soy ' + nombre : '') +
        '. Quiero cotizar: ' + servicio + '.' + (auto ? ' Mi auto: ' + auto : '');
      window.open('https://wa.me/17878435664?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();
