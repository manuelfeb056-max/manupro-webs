
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
})();

(function(){
  var f=document.getElementById('quoteForm');if(!f)return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var fd=new FormData(f);
    var n=(fd.get('nombre')||'').toString().trim(),t=(fd.get('telefono')||'').toString().trim();
    if(!n||!t){alert('Por favor completa tu nombre y teléfono.');return;}
    var msg="Hola Corte's Landscaping, soy "+n+'. Mi teléfono es '+t+'. Necesito: '+(fd.get('servicio')||'Cotización')+'. '+((fd.get('mensaje')||'').toString().trim()||'');
    window.open('https://wa.me/17873218753?text='+encodeURIComponent(msg),'_blank');
  });
  var nc=document.getElementById('navClose');
  if(nc){nc.addEventListener('click',function(){var b=document.getElementById('burger'),nv=document.getElementById('navOverlay');nv.classList.remove('open');b.classList.remove('open');b.setAttribute('aria-expanded','false');nv.setAttribute('aria-hidden','true');document.body.style.overflow='';});}
})();
