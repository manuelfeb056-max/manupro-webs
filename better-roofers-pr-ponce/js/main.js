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
          wa = form.dataset.wa || '19394286747',
          nombre = document.getElementById('fNombre'),
          tel = document.getElementById('fTel'),
          pueblo = document.getElementById('fPueblo'),
          servicio = form.querySelector('input[name="servicio"]:checked'),
          msg = document.getElementById('fMsg').value.trim(),
          chips = form.querySelector('.chips');
      var ok = true;
      [nombre, tel].forEach(function(el){
        var bad = !el.value.trim();
        el.classList.toggle('err', bad);
        if(bad) ok = false;
      });
      var badS = !servicio;
      if(chips) chips.classList.toggle('err', badS);
      if(badS) ok = false;
      if(!ok) return;
      var texto = 'Hola ' + biz + ', soy ' + nombre.value.trim() + ' (' + tel.value.trim() + '). Servicio: ' + servicio.value + '.' +
        (pueblo.value.trim() ? ' Pueblo: ' + pueblo.value.trim() + '.' : '') +
        (msg ? ' Detalle: ' + msg : '');
      window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
    });
  }
})();

/* cerrar menú con botón X (overlay por encima del botón flotante) */
(function(){
  var c = document.querySelector('[data-mqclose]');
  if(!c) return;
  c.addEventListener('click', function(){
    var nav = c.closest('nav') || document.getElementById('menuOverlay');
    if(nav){ nav.classList.remove('open','show'); nav.setAttribute('aria-hidden','true'); }
    var scrim = document.getElementById('scrim2');
    if(scrim) scrim.classList.remove('on');
    ['floatMenu','menuBtn','burger'].forEach(function(id){
      var b=document.getElementById(id);
      if(b){ b.classList.remove('open','active'); b.setAttribute('aria-expanded','false'); }
    });
    document.querySelectorAll('.fab-menu,.menu-btn,.burger,.float-menu').forEach(function(b){
      b.classList.remove('open','active');
    });
    document.body.style.overflow = '';
  });
})();
