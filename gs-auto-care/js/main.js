/* GS Auto Care — menú móvil, lightbox con X, FAQ accordion */
(function(){
  "use strict";

  /* menú móvil */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  menuBtn.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function(e){
    if (e.target.closest('a')) nav.classList.remove('open');
  });

  /* lightbox */
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var items = Array.prototype.slice.call(document.querySelectorAll('.gal'));
  var cur = 0;

  function show(i){
    cur = (i + items.length) % items.length;
    var img = items[cur].querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = items[cur].getAttribute('data-cap') || '';
  }
  function open(i){ show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; }
  function close(){ lb.hidden = true; document.body.style.overflow = ''; }

  items.forEach(function(el, i){
    el.addEventListener('click', function(){ open(i); });
  });
  document.getElementById('lbX').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function(e){ e.stopPropagation(); show(cur - 1); });
  document.getElementById('lbNext').addEventListener('click', function(e){ e.stopPropagation(); show(cur + 1); });
  lb.addEventListener('click', function(e){ if (e.target === lb) close(); });
  document.addEventListener('keydown', function(e){
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var faq = btn.parentElement;
      var ans = faq.querySelector('.faq-a');
      var isOpen = faq.classList.contains('open');
      document.querySelectorAll('.faq.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen){
        faq.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
