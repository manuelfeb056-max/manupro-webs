/* HQ Auto Tint — site behavior: mobile nav, FAQ accordion, lightbox */
(function(){
  "use strict";

  // Mobile nav
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function(){ nav.classList.toggle('show'); });
    nav.addEventListener('click', function(e){
      if (e.target.tagName === 'A') nav.classList.remove('show');
    });
  }

  // FAQ accordion
  var items = document.querySelectorAll('.acc-item');
  items.forEach(function(item){
    var q = item.querySelector('.acc-q');
    var a = item.querySelector('.acc-a');
    q.addEventListener('click', function(){
      var open = item.classList.contains('open');
      items.forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.acc-a').style.maxHeight = null;
      });
      if (!open) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Lightbox
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbClose = document.getElementById('lbClose');
  function openLb(img){
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    var cap = img.closest('.g-item');
    lbCap.textContent = cap ? cap.querySelector('figcaption').textContent : img.alt;
    lb.classList.add('show');
    lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeLb(){
    lb.classList.remove('show');
    lb.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.g-item img').forEach(function(img){
    img.addEventListener('click', function(){ openLb(img); });
  });
  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', function(e){ if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeLb(); });
})();
