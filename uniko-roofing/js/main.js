
(function(){
  var burger=document.getElementById('burger'),nav=document.getElementById('navOverlay');
  burger.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    burger.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',open);nav.setAttribute('aria-hidden',!open);
    document.body.style.overflow=open?'hidden':'';
  });
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){
    nav.classList.remove('open');burger.classList.remove('open');document.body.style.overflow='';
  });});
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click',function(){
      var item=q.parentElement,a=item.querySelector('.faq-a'),open=item.classList.toggle('open');
      a.style.maxHeight=open?a.scrollHeight+'px':'0';
      q.querySelector('.pm').textContent=open?'\u2212':'+';
    });
  });
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}})},{threshold:.12});
  document.querySelectorAll('.reveal,.g-item,.svc,.step').forEach(function(el){io.observe(el);});
  document.querySelectorAll('[data-track]').forEach(function(el){
    el.addEventListener('click',function(){try{window.MPMetrics&&MPMetrics.track(el.getAttribute('data-track'));}catch(e){}});
  });
  /* Formulario de cotización a WhatsApp */
  var qform=document.getElementById('cform');
  if(qform){
    qform.addEventListener('submit',function(ev){
      ev.preventDefault();
      var biz=qform.dataset.biz||'el negocio',wa=qform.dataset.wa||'17877571985',
        nombre=document.getElementById('fNombre').value.trim(),
        tel=document.getElementById('fTel').value.trim(),
        servicio=document.getElementById('fServicio').value,
        msg=document.getElementById('fMsg').value.trim();
      var texto='Hola '+biz+', soy '+nombre+' ('+tel+'). Me interesa: '+servicio+'.'+(msg?' '+msg:'');
      window.open('https://wa.me/'+wa+'?text='+encodeURIComponent(texto),'_blank','noopener');
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
