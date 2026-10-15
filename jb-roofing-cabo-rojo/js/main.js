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

  /* formulario → WhatsApp */
  var form = document.getElementById('cform');
  if (form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var wa = form.getAttribute('data-wa'), biz = form.getAttribute('data-biz');
      var nombre = document.getElementById('fNombre').value.trim();
      var telefono = document.getElementById('fTelefono').value.trim();
      if(!telefono){alert('Por favor escribe tu teléfono.');return;}
      var servicio = document.getElementById('fServicio').value;
      var msg = document.getElementById('fMsg').value.trim();
      var texto = 'Hola ' + biz + ', soy ' + nombre + ' (' + telefono + '). Me interesa: ' + servicio + '.' + (msg ? ' ' + msg : '');
      window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(texto), '_blank');
    });
  }
})();
/* Menú hamburguesa flotante */
(function(){
  var b=document.getElementById('mpBurger'),n=document.getElementById('mpNavOverlay');if(!b||!n)return;
  function set(o){n.classList.toggle('open',o);b.setAttribute('aria-expanded',o);n.setAttribute('aria-hidden',!o);document.body.style.overflow=o?'hidden':'';}
  b.addEventListener('click',function(){set(!n.classList.contains('open'));});
  n.querySelector('.mp-ov-close').addEventListener('click',function(){set(false);});
  n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false);});});
  n.addEventListener('click',function(e){if(e.target===n)set(false);});
})();

/* Mejora elite: stagger en reveals */
(function(){
  try{
    document.querySelectorAll('.gallery-grid,.gal-track,.svc-grid,.services-grid,.steps,.proceso-steps').forEach(function(grid){
      Array.prototype.forEach.call(grid.children,function(el,i){
        if(el.classList.contains('reveal'))el.style.transitionDelay=Math.min(i*70,420)+'ms';
      });
    });
  }catch(e){}
})();
