(function(){
  var burger = document.getElementById('burger');
  var overlay = document.getElementById('navOverlay');
  burger.addEventListener('click', function(){
    var open = overlay.classList.toggle('show');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    overlay.setAttribute('aria-hidden', !open);
  });
  overlay.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      overlay.classList.remove('show');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      overlay.setAttribute('aria-hidden', 'true');
    });
  });

  document.querySelectorAll('.acc-item').forEach(function(item){
    var q = item.querySelector('.acc-q');
    var a = item.querySelector('.acc-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.acc-a').style.maxHeight = null;
        o.querySelector('.acc-q').setAttribute('aria-expanded', 'false');
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
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

/* Cotizador → WhatsApp (AAA Contractor: 1787-335-0003) */
(function(){
  var f=document.getElementById('quoteForm');
  if(!f) return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var n=document.getElementById('qNombre'),t=document.getElementById('qTel'),
        s=document.getElementById('qServicio'),m=document.getElementById('qMsg');
    var ok=true;
    [n,t,s].forEach(function(el){var bad=!el.value.trim();el.classList.toggle('err',bad);if(bad)ok=false;});
    if(!ok) return;
    var txt='Hola AAA Contractor, soy '+n.value.trim()+' ('+t.value.trim()+'). Necesito: '+s.value+'.'+(m.value.trim()?' Detalle: '+m.value.trim():'');
    window.open('https://wa.me/17873350003?text='+encodeURIComponent(txt),'_blank');
  });
})();
