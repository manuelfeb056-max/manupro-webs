// Amuria Corp — interacciones
(function(){
  "use strict";

  // --- menú circular flotante ---
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('overlayNav');
  function toggleMenu(force){
    var open = typeof force === 'boolean' ? force : !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    btn.classList.toggle('open', open);
    nav.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  btn.addEventListener('click', function(){ toggleMenu(); });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ toggleMenu(false); });
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') toggleMenu(false);
  });

  // --- acordeón FAQ ---
  document.querySelectorAll('.acc-item').forEach(function(item){
    var q = item.querySelector('.acc-q');
    var a = item.querySelector('.acc-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.acc-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // --- reveal on scroll ---
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // --- parallax sutil en hero ---
  var heroImg = document.querySelector('.hero-bg img');
  var ticking = false;
  window.addEventListener('scroll', function(){
    if(!ticking){
      window.requestAnimationFrame(function(){
        var y = window.scrollY;
        if(y < window.innerHeight && heroImg){
          heroImg.style.transform = 'scale(1.06) translateY(' + (y * .18) + 'px)';
        }
        ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});
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

/* Cotizador elite por pasos -> WhatsApp (Amuria Corp: 1787-220-9068) */
(function(){
  var f=document.getElementById('quoteForm');
  if(!f) return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var n=document.getElementById('qNombre'),t=document.getElementById('qTel'),
        m=document.getElementById('qMsg'),p=document.getElementById('qPueblo'),
        s=f.querySelector('input[name="qServ"]:checked'),
        chips=f.querySelector('.q-chips');
    var ok=true;
    [n,t].forEach(function(el){var bad=!el.value.trim();el.classList.toggle('err',bad);if(bad)ok=false;});
    var badS=!s; if(chips)chips.classList.toggle('err',badS); if(badS)ok=false;
    if(!ok) return;
    var parts=['Hola Amuria Corp, soy '+n.value.trim()+' ('+t.value.trim()+').',
               'Servicio: '+s.value+'.'];
    if(p&&p.value.trim())parts.push('Pueblo: '+p.value.trim()+'.');
    if(m.value.trim())parts.push('Detalle: '+m.value.trim());
    window.open('https://wa.me/17872209068?text='+encodeURIComponent(parts.join(' ')),'_blank');
  });
})();
