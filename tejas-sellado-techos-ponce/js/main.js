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


  var form = document.getElementById('cform');
  if (form){
    var pills = form.querySelectorAll('.qpill');
    pills.forEach(function(p){
      p.addEventListener('click', function(){
        pills.forEach(function(x){ x.classList.remove('sel'); });
        p.classList.add('sel');
      });
    });
    var qErr = document.getElementById('qErr');
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var biz = form.dataset.biz || 'el negocio',
          wa = form.dataset.wa || '',
          nombre = document.getElementById('fNombre').value.trim(),
          tel = document.getElementById('fTel').value.trim(),
          sel = form.querySelector('input[name="fServicio"]:checked'),
          servicio = sel ? sel.value : '',
          puebloEl = document.getElementById('fPueblo'),
          pueblo = puebloEl ? puebloEl.value.trim() : '',
          msg = document.getElementById('fMsg').value.trim();
      if (!nombre || !tel || !servicio){
        if (qErr){
          qErr.hidden = false;
          qErr.textContent = 'Falta ' + (!nombre ? 'tu nombre' : (!tel ? 'tu teléfono' : 'elegir un servicio')) + ' para enviar tu cotización.';
        }
        return;
      }
      if (qErr){ qErr.hidden = true; }
      var text = 'Hola ' + biz + ', soy ' + nombre + ' (' + tel + '). Servicio: ' + servicio + '.' +
                 (pueblo ? ' Pueblo: ' + pueblo + '.' : '') + (msg ? ' ' + msg : '');
      window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  }
})();


/* stagger elite: reveal escalonado en grupos de tarjetas (los hovers quedan intactos) */
(function(){
  "use strict";
  var groups = document.querySelectorAll('.serv-grid,.svc-grid,.gal-viewport,.gallery-grid,.g-grid,.plan-grid,.plans,.why-grid,.steps,.faq-list,.contact-grid,.about-grid,.stack,.process-steps,.p-grid,.services-grid,.plans-grid');
  groups.forEach(function(g){
    var kids = g.querySelectorAll('.reveal:not(.visible):not(.on)');
    kids.forEach(function(k, i){ k.style.transitionDelay = (Math.min(i, 6) * 70) + 'ms'; });
  });
  document.addEventListener('transitionend', function(e){
    var t = e.target;
    if (t.classList && (t.classList.contains('visible') || t.classList.contains('on'))){
      t.style.transitionDelay = '0ms';
    }
  }, true);
})();
