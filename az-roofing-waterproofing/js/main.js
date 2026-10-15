// AZ ROOFING & WATERPROOFING — interactions
(function(){
  "use strict";

  // Hamburger / overlay nav
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('overlayNav');
  btn.addEventListener('click', function(){
    var open = nav.classList.toggle('show');
    btn.classList.toggle('open', open);
    nav.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('show');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // FAQ accordion (one open at a time)
  document.querySelectorAll('.acc-item').forEach(function(item){
    var head = item.querySelector('.acc-head');
    var body = item.querySelector('.acc-body');
    head.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.acc-body').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Scroll reveal
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // Subtle parallax on hero background
  var heroBg = document.querySelector('.hero-bg');
  if(heroBg){
    window.addEventListener('scroll', function(){
      var y = window.scrollY;
      if(y < window.innerHeight){
        heroBg.style.translate = '0 ' + (y * .18) + 'px';
      }
    }, {passive:true});
  }
})();

// Cotizador → WhatsApp (AZ: 787-603-2240)
(function(){
  "use strict";
  var f = document.getElementById('quoteForm');
  if(!f) return;
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var n = document.getElementById('qNombre'),
        t = document.getElementById('qTel'),
        p = document.getElementById('qPueblo'),
        s = f.querySelector('input[name="servicio"]:checked'),
        m = document.getElementById('qMsg'),
        chips = f.querySelector('.chips');
    var ok = true;
    [n,t].forEach(function(el){
      var bad = !el.value.trim();
      el.classList.toggle('err', bad);
      if(bad) ok = false;
    });
    var badS = !s;
    if(chips) chips.classList.toggle('err', badS);
    if(badS) ok = false;
    if(!ok) return;
    var txt = 'Hola AZ Roofing & Waterproofing, soy ' + n.value.trim() +
      ' (' + t.value.trim() + '). Servicio: ' + s.value + '.' +
      (p.value.trim() ? ' Pueblo: ' + p.value.trim() + '.' : '') +
      (m.value.trim() ? ' Detalle: ' + m.value.trim() : '');
    window.open('https://wa.me/17876032240?text=' + encodeURIComponent(txt), '_blank');
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
