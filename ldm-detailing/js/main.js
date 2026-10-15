/* LDM Detailing — interacciones */
(function(){
  "use strict";

  /* Menú */
  var btn = document.getElementById('menuBtn'),
      overlay = document.getElementById('menuOverlay'),
      close = document.getElementById('menuClose');
  function openMenu(){ overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  function closeMenu(){ overlay.classList.remove('open'); overlay.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  if(btn) btn.addEventListener('click', openMenu);
  if(close) close.addEventListener('click', closeMenu);
  overlay.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeMenu(); });

  /* Reveal on scroll */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('visible'); io.unobserve(en.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* Formulario → WhatsApp del negocio */
  var form = document.getElementById('quoteForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var nombre = document.getElementById('qNombre').value.trim(),
          tel = document.getElementById('qTel').value.trim(),
          auto = document.getElementById('qAuto').value.trim(),
          msg = document.getElementById('qMsg').value.trim(),
          err = document.getElementById('qError'),
          serv = '';
      var checked = form.querySelector('input[name="qServ"]:checked');
      if(checked) serv = checked.value;
      if(!nombre || tel.replace(/\D/g,'').length < 7){
        err.hidden = false;
        form.classList.remove('shake'); void form.offsetWidth; form.classList.add('shake');
        (!nombre ? document.getElementById('qNombre') : document.getElementById('qTel')).focus();
        return;
      }
      err.hidden = true;
      var text = 'Hola LDM Detailing, quiero cotizar.%0A%0ANombre: ' + encodeURIComponent(nombre) +
        '%0ATeléfono: ' + encodeURIComponent(tel) +
        (serv ? '%0AServicio: ' + encodeURIComponent(serv) : '') +
        (auto ? '%0AVehículo: ' + encodeURIComponent(auto) : '') +
        (msg ? '%0ADetalles: ' + encodeURIComponent(msg) : '');
      window.open('https://wa.me/PEGAR_TELEFONO?text=' + text, '_blank', 'noopener');
    });
  }

  /* FAQ: solo uno abierto */
  document.querySelectorAll('.faq-list details').forEach(function(d){
    d.addEventListener('toggle', function(){
      if(d.open){
        document.querySelectorAll('.faq-list details').forEach(function(o){ if(o!==d) o.open = false; });
      }
    });
  });
})();
