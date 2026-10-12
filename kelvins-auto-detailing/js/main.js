/* Kelvin's Auto Detailing — interacciones */
(function(){
  "use strict";

  /* menú móvil */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function(){
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ links.classList.remove('open'); });
    });
  }

  /* acordeón FAQ */
  var items = document.querySelectorAll('.acc-item');
  items.forEach(function(item){
    var q = item.querySelector('.acc-q');
    var a = item.querySelector('.acc-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      items.forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.acc-a').style.maxHeight = null;
        o.querySelector('.acc-q').setAttribute('aria-expanded','false');
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded','true');
      }
    });
  });

  /* la primera pregunta abierta por defecto */
  if (items.length) { items[0].querySelector('.acc-q').click(); }

  /* Lightbox recuadros */
  var lb = document.getElementById('lightbox');
  var lbImg = lb ? lb.querySelector('img') : null;
  if (lb && lbImg){
    document.querySelectorAll('.frame img').forEach(function(im){
      im.addEventListener('click', function(){
        lbImg.src = im.src; lbImg.alt = im.alt;
        lb.classList.add('open'); lb.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
      });
    });
    lb.addEventListener('click', function(){
      lb.classList.remove('open'); lb.setAttribute('aria-hidden','true');
      lbImg.src = ''; document.body.style.overflow = '';
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && lb.classList.contains('open')) lb.click();
    });
  }
})();
