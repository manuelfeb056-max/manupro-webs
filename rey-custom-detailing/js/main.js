/* Rey Custom Detailing — interacciones: nav móvil, acordeón FAQ, reveal on scroll */
(function(){
  "use strict";

  // Nav móvil
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links){
    toggle.addEventListener('click', function(){ links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ links.classList.remove('open'); });
    });
  }

  // Acordeón FAQ
  document.querySelectorAll('.acc-item').forEach(function(item){
    var q = item.querySelector('.acc-q');
    var a = item.querySelector('.acc-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.acc-a').style.maxHeight = null;
      });
      if (!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Reveal on scroll
  var io;
  function revealAll(){
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('visible'); });
  }
  if ('IntersectionObserver' in window){
    io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, {threshold: 0.12});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    revealAll();
  }
  // Lightbox galería
  var lb = document.getElementById('lightbox');
  var lbImg = lb ? lb.querySelector('img') : null;
  if (lb && lbImg){
    var gImgs = Array.prototype.slice.call(document.querySelectorAll('.g-item img'));
    var lbIdx = 0;
    function lbShow(i){
      lbIdx = (i + gImgs.length) % gImgs.length;
      lbImg.src = gImgs[lbIdx].getAttribute('data-full') || gImgs[lbIdx].src;
      lbImg.alt = gImgs[lbIdx].alt;
    }
    gImgs.forEach(function(im, i){
      im.addEventListener('click', function(){
        lbShow(i);
        lb.classList.add('open'); lb.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
      });
    });
    function lbClose(){
      lb.classList.remove('open'); lb.setAttribute('aria-hidden','true');
      lbImg.src = ''; document.body.style.overflow = '';
    }
    document.getElementById('lbClose').addEventListener('click', function(e){ e.stopPropagation(); lbClose(); });
    document.getElementById('lbPrev').addEventListener('click', function(e){ e.stopPropagation(); lbShow(lbIdx - 1); });
    document.getElementById('lbNext').addEventListener('click', function(e){ e.stopPropagation(); lbShow(lbIdx + 1); });
    lb.addEventListener('click', function(){ lbClose(); });
    document.addEventListener('keydown', function(e){
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') lbClose();
      if (e.key === 'ArrowLeft') lbShow(lbIdx - 1);
      if (e.key === 'ArrowRight') lbShow(lbIdx + 1);
    });
  }
})();
