/* Lightbox para la galería: foto completa, X para cerrar, flechas, ESC, clic fuera */
(function(){
  "use strict";
  var lb = document.getElementById('lb');
  if (!lb) return;
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbX = document.getElementById('lbX');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.gal-card'));
  var cur = 0;

  function open(i){
    cur = (i + cards.length) % cards.length;
    var card = cards[cur];
    var img = card.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = card.getAttribute('data-cap') || img.alt;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function step(d){ open(cur + d); }

  cards.forEach(function(card, i){
    card.addEventListener('click', function(e){
      if (e.target.closest('a')) return; // el link "Ver en Instagram" abre aparte
      open(i);
    });
  });

  lbX.addEventListener('click', close);
  lbPrev.addEventListener('click', function(e){ e.stopPropagation(); step(-1); });
  lbNext.addEventListener('click', function(e){ e.stopPropagation(); step(1); });
  lb.addEventListener('click', function(e){ if (e.target === lb) close(); });
  document.addEventListener('keydown', function(e){
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });
})();
