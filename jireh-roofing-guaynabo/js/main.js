/* Jireh Roofing - motor + partículas del hero */
(function(){
  "use strict";

  /* partículas doradas ascendentes */
  var pc = document.getElementById('particles');
  if (pc){
    for (var i = 0; i < 34; i++){
      var s = document.createElement('span');
      var sz = 4 + Math.random() * 9;
      s.style.width = s.style.height = sz + 'px';
      s.style.left = (Math.random() * 100) + '%';
      s.style.animationDuration = (7 + Math.random() * 9) + 's';
      s.style.animationDelay = (-Math.random() * 12) + 's';
      pc.appendChild(s);
    }
  }

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

  /* formulario a WhatsApp */
  var form = document.getElementById('cform');
  if (form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var biz = form.dataset.biz || 'el negocio',
          wa = form.dataset.wa || '17876307704',
          nombre = document.getElementById('fNombre').value.trim(),
          telefono = document.getElementById('fTelefono').value.trim(),
          servicio = document.getElementById('fServicio').value,
          msg = document.getElementById('fMsg').value.trim();
      if(!telefono){alert('Por favor escribe tu teléfono.');return;}
      var text = 'Hola ' + biz + ', soy ' + nombre + ' (' + telefono + '). Me interesa: ' + servicio + '.' + (msg ? ' ' + msg : '');
      window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();

/* galería carrusel */
(function(){
  var vp = document.getElementById('galViewport');
  if (!vp) return;
  var cards = vp.children; if (!cards.length) return;
  var prev = document.getElementById('galPrev'), next = document.getElementById('galNext'),
      dotsBox = document.getElementById('galDots'), dots = [];
  if (dotsBox) for (var i = 0; i < cards.length; i++){
    (function(i){
      var b = document.createElement('button');
      b.setAttribute('aria-label','Foto '+(i+1));
      b.addEventListener('click', function(){ go(i); restart(); });
      dotsBox.appendChild(b); dots.push(b);
    })(i);
  }
  function step(){ var c = cards[0]; return c ? c.getBoundingClientRect().width + 16 : 340; }
  function current(){ return Math.round(vp.scrollLeft / step()); }
  function go(i){
    i = (i + cards.length) % cards.length;
    vp.scrollTo({left: i * step(), behavior:'smooth'});
    setTimeout(mark, 420);
  }
  function mark(){
    var c = Math.min(Math.max(current(), 0), dots.length - 1);
    dots.forEach(function(d, j){ d.classList.toggle('on', j === c); });
  }
  var timer = null, idle = null;
  function restart(){ clearInterval(timer); timer = setInterval(function(){ var c = current(); go(c + 1 >= cards.length ? 0 : c + 1); }, 3600); }
  function pauseTemp(){ clearInterval(timer); clearTimeout(idle); idle = setTimeout(restart, 6000); }
  if (prev) prev.addEventListener('click', function(){ go(current() - 1); restart(); });
  if (next) next.addEventListener('click', function(){ go(current() + 1); restart(); });
  vp.addEventListener('scroll', mark, {passive:true});
  vp.addEventListener('pointerdown', pauseTemp);
  vp.addEventListener('touchstart', pauseTemp, {passive:true});
  document.addEventListener('visibilitychange', function(){ if (document.hidden) clearInterval(timer); else restart(); });
  mark(); restart();
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
