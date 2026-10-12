/* Koli's Auto Detailing — interacciones: menú off-canvas, FAQ, lightbox, reveal, form→WhatsApp */
(function(){
  "use strict";

  // menú off-canvas
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function(){
      nav.classList.toggle('open');
      menuBtn.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('open');
        menuBtn.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded','true');
      }
    });
  });

  // lightbox de la orden de trabajo
  var woPhoto = document.getElementById('woPhoto');
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbClose = document.getElementById('lbClose');
  if (woPhoto && lightbox) {
    function openLb(img){
      lbImg.src = img.getAttribute('data-full') || img.src;
      lbImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    woPhoto.addEventListener('click', function(){
      openLb(woPhoto.querySelector('img'));
    });
    document.querySelectorAll('.kcard img').forEach(function(im){
      im.addEventListener('click', function(){ openLb(im); });
    });
    function closeLb(){
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    lbClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function(e){ if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeLb(); });
  }

  // reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // formulario → WhatsApp del negocio
  var form = document.getElementById('cform');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var n = document.getElementById('fNombre').value.trim();
      var s = document.getElementById('fServicio').value;
      var m = document.getElementById('fMsg').value.trim();
      var txt = 'Hola Koli\'s Auto Detailing, soy ' + n + '. Me interesa: ' + s + '.';
      if (m) txt += ' ' + m;
      window.open('https://wa.me/17879434530?text=' + encodeURIComponent(txt), '_blank', 'noopener');
    });
  }
})();
