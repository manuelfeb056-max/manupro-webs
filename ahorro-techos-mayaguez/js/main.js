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

  /* galería: botones + dots */
  var vp = document.getElementById('galViewport'),
      dots = document.getElementById('galDots'),
      cards = vp ? vp.querySelectorAll('.gal-card') : [];
  if (vp && dots){
    cards.forEach(function(_, i){
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Ir a la foto ' + (i + 1));
      b.addEventListener('click', function(){
        cards[i].scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
      });
      dots.appendChild(b);
    });
    function syncDots(){
      var idx = 0, best = 1e9, vr = vp.getBoundingClientRect();
      cards.forEach(function(c, i){
        var r = c.getBoundingClientRect();
        var d = Math.abs((r.left + r.right) / 2 - (vr.left + vr.right) / 2);
        if (d < best){ best = d; idx = i; }
      });
      dots.querySelectorAll('button').forEach(function(b, i){ b.classList.toggle('on', i === idx); });
    }
    vp.addEventListener('scroll', syncDots, {passive:true});
    syncDots();
    var step = function(dir){
      var r = vp.getBoundingClientRect();
      var idx = 0, best = 1e9;
      cards.forEach(function(c, i){
        var cr = c.getBoundingClientRect();
        var d = Math.abs((cr.left + cr.right) / 2 - (r.left + r.right) / 2);
        if (d < best){ best = d; idx = i; }
      });
      var next = Math.min(cards.length - 1, Math.max(0, idx + dir));
      cards[next].scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
    };
    document.getElementById('galPrev').addEventListener('click', function(){ step(-1); });
    document.getElementById('galNext').addEventListener('click', function(){ step(1); });
  }

  /* FAQ acordeón */
  document.querySelectorAll('.faq button').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.parentElement, ans = item.querySelector('.ans');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq.open').forEach(function(o){
        o.classList.remove('open'); o.querySelector('.ans').style.maxHeight = null;
      });
      if (!isOpen){ item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; }
    });
  });
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

/* Cotizador elite → WhatsApp (Ahorro Techos: 17874589995) */
(function(){
  var f=document.getElementById('cform');
  if(!f) return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var n=document.getElementById('fNombre'),t=document.getElementById('fTel'),
        p=document.getElementById('fPueblo'),m=document.getElementById('fMsg'),
        s=f.querySelector('input[name="fServicio"]:checked'),
        chips=f.querySelector('.qe-chips'),ok=true;
    [n,t].forEach(function(el){var bad=!el.value.trim();el.classList.toggle('err',bad);if(bad)ok=false;});
    var sb=!s;chips.classList.toggle('err',sb);if(sb)ok=false;
    if(!ok) return;
    var txt='Hola Ahorro Techos, soy '+n.value.trim()+' ('+t.value.trim()+').\nServicio: '+s.value+'.'
      +(p.value.trim()?'\nPueblo: '+p.value.trim()+'.':'')
      +(m.value.trim()?'\nDetalles: '+m.value.trim():'');
    window.open('https://wa.me/17874589995?text='+encodeURIComponent(txt),'_blank');
  });
})();
