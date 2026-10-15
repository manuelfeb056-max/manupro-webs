
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
  document.getElementById('navClose').addEventListener('click',function(){
    nav.classList.remove('open');burger.classList.remove('open');document.body.style.overflow='';
  });
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click',function(){
      var item=q.parentElement,a=item.querySelector('.faq-a'),open=item.classList.toggle('open');
      a.style.maxHeight=open?a.scrollHeight+'px':'0';
      q.querySelector('.pm').textContent=open?'\u2212':'+';
    });
  });
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}})},{threshold:.12});
  document.querySelectorAll('.reveal,.g-item,.svc,.step').forEach(function(el){io.observe(el);});
  var qf=document.getElementById('quoteForm');
  if(qf){qf.addEventListener('submit',function(e){
    e.preventDefault();
    var name=document.getElementById('qName').value.trim();
    var phone=document.getElementById('qPhone').value.trim();
    var service=document.getElementById('qService').value;
    var msg=document.getElementById('qMsg').value.trim();
    if(!name){alert('Por favor escribe tu nombre.');document.getElementById('qName').focus();return;}
    var text='Hola Techeros del Caribe Inc., soy '+name+(phone?' ('+phone+')':'')+'. Necesito: '+service+'.'+(msg?' '+msg:'');
    window.open('https://wa.me/17878003174?text='+encodeURIComponent(text),'_blank');
    try{window.MPMetrics&&MPMetrics.track('quote_submit');}catch(e2){}
  });}
  document.querySelectorAll('[data-track]').forEach(function(el){
    el.addEventListener('click',function(){try{window.MPMetrics&&MPMetrics.track(el.getAttribute('data-track'));}catch(e){}});
  });
})();
