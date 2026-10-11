/* Executive Car Care — minimal engine: reveal on scroll, mobile menu, form→WhatsApp */
(function(){
  "use strict";

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* ---------- mobile menu ---------- */
  var btn = document.getElementById('menuBtn'), nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }

  /* ---------- header shadow ---------- */
  var header = document.getElementById('header');
  window.addEventListener('scroll', function(){
    if (header) header.style.boxShadow = window.scrollY > 10 ? '0 8px 30px rgba(0,0,0,.45)' : 'none';
  }, {passive:true});

  /* ---------- form → WhatsApp ---------- */
  var form = document.getElementById('cform');
  if (form) {
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var nombre = (document.getElementById('fNombre').value || '').trim();
      var servicio = document.getElementById('fServicio').value;
      var msg = (document.getElementById('fMsg').value || '').trim();
      var text = 'Hola Executive Car Care' + (nombre ? ', soy ' + nombre : '') + '. Me interesa: ' + servicio + '.' + (msg ? ' ' + msg : '');
      window.open('https://wa.me/17878435664?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();
