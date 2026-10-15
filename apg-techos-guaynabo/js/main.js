// APG Techos — interacciones
(function(){
  var burger=document.getElementById('burger'), nav=document.getElementById('navOverlay');
  burger.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    burger.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',open);
    nav.setAttribute('aria-hidden',!open);
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      nav.classList.remove('open');burger.classList.remove('open');
      burger.setAttribute('aria-expanded','false');nav.setAttribute('aria-hidden','true');
    });
  });

  // acordeón FAQ
  document.querySelectorAll('.acc-q').forEach(function(q){
    q.addEventListener('click',function(){
      var a=q.nextElementSibling, open=q.getAttribute('aria-expanded')==='true';
      document.querySelectorAll('.acc-q').forEach(function(o){o.setAttribute('aria-expanded','false');o.nextElementSibling.style.maxHeight=null;});
      if(!open){q.setAttribute('aria-expanded','true');a.style.maxHeight=a.scrollHeight+'px';}
    });
  });

  // reveal on scroll
  var els=document.querySelectorAll('.gallery-grid figure,.card,.plan,.why-photo');
  els.forEach(function(e){e.classList.add('reveal');});
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  els.forEach(function(e){io.observe(e);});
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

/* Cotizador → WhatsApp (APG Techos: 1787-225-2625) */
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
    var txt='Hola APG Techos, soy '+n.value.trim()+' ('+t.value.trim()+'). Necesito: '+s.value+'.'+(m.value.trim()?' Detalle: '+m.value.trim():'');
    window.open('https://wa.me/17872252625?text='+encodeURIComponent(txt),'_blank');
  });
})();
