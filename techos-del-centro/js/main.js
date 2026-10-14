/* Motor del sitio: menú flotante, galería, reveal, contadores, FAQ, formulario a WhatsApp */
(function(){
  "use strict";

  /* menú flotante + panel lateral */
  var fm = document.getElementById('floatMenu'),
      sp = document.getElementById('sidepanel'),
      sc = document.getElementById('scrim2');
  function closeMenu(){ fm.classList.remove('open'); sp.classList.remove('open'); sc.classList.remove('on'); }
  fm.addEventListener('click', function(){
    var open = sp.classList.toggle('open');
    fm.classList.toggle('open', open);
    sc.classList.toggle('on', open);
  });
  sc.addEventListener('click', closeMenu);
  sp.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  /* reveal */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* contadores */
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target, target = parseInt(el.dataset.count || '0', 10), suf = el.dataset.suffix || '';
      var t0 = null, dur = 1400;
      function tick(t){
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1), ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * ease).toLocaleString('es-PR') + suf;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick); cio.unobserve(el);
    });
  }, {threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });

  /* FAQ acordeón */
  document.querySelectorAll('.faq button').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.faq'), ans = item.querySelector('.ans'),
          open = item.classList.contains('open');
      document.querySelectorAll('.faq.open').forEach(function(o){
        o.classList.remove('open'); o.querySelector('.ans').style.maxHeight = null;
      });
      if (!open){ item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; }
    });
  });

  /* galería carrusel */
  var vp = document.getElementById('galViewport'),
      dots = document.getElementById('galDots'),
      cards = vp ? vp.querySelectorAll('.gal-card') : [];
  if (vp && cards.length){
    cards.forEach(function(_, i){
      var d = document.createElement('i');
      if (i === 0) d.classList.add('on');
      d.setAttribute('aria-label', 'Ir a la foto ' + (i + 1));
      d.addEventListener('click', function(){ scrollToCard(i); });
      dots.appendChild(d);
    });
    function cardStep(){ return cards[0].offsetWidth + 18; }
    function scrollToCard(i){ vp.scrollTo({left: i * cardStep(), behavior:'smooth'}); }
    document.getElementById('galPrev').addEventListener('click', function(){ vp.scrollBy({left:-cardStep(), behavior:'smooth'}); });
    document.getElementById('galNext').addEventListener('click', function(){ vp.scrollBy({left:cardStep(), behavior:'smooth'}); });
    vp.addEventListener('scroll', function(){
      var i = Math.round(vp.scrollLeft / cardStep());
      dots.querySelectorAll('i').forEach(function(d, j){ d.classList.toggle('on', j === i); });
    }, {passive:true});
  }

  /* formulario a WhatsApp */
  var form = document.getElementById('cform');
  if (form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var biz = form.dataset.biz || 'el negocio',
          wa = form.dataset.wa || '17878624646',
          nombre = document.getElementById('fNombre').value.trim(),
          servicio = document.getElementById('fServicio').value,
          msg = document.getElementById('fMsg').value.trim();
      var texto = 'Hola ' + biz + ', soy ' + nombre + '. Me interesa: ' + servicio + '.' + (msg ? ' ' + msg : '');
      window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
    });
  }
})();
