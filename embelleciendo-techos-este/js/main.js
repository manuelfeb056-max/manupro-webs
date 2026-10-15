// Embelleciendo Techos del Este — interacciones
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
  document.querySelectorAll('.acc-q').forEach(function(q){
    q.addEventListener('click',function(){
      var a=q.nextElementSibling, open=q.getAttribute('aria-expanded')==='true';
      document.querySelectorAll('.acc-q').forEach(function(o){o.setAttribute('aria-expanded','false');o.nextElementSibling.style.maxHeight=null;});
      if(!open){q.setAttribute('aria-expanded','true');a.style.maxHeight=a.scrollHeight+'px';}
    });
  });
  var els=document.querySelectorAll('.gallery-grid figure,.card,.plan,.why-photo,.quote-form');
  els.forEach(function(e){e.classList.add('reveal');});
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  els.forEach(function(e){io.observe(e);});

  // formulario de cotización → WhatsApp (Manupro recibe los leads)
  var qf=document.getElementById('quoteForm');
  if(qf){qf.addEventListener('submit',function(e){e.preventDefault();
    var n=document.getElementById('qNombre').value.trim();
    var t=document.getElementById('qTel').value.trim();
    var sv=document.getElementById('qServicio').value;
    var m=document.getElementById('qMsg').value.trim();
    var txt='Hola, soy '+(n||'un cliente')+'. Mi teléfono es '+t+'. Necesito: '+sv+' (Embelleciendo Techos del Este y Pintura).'+(m?' '+m:'');
    window.open('https://wa.me/17873128042?text='+encodeURIComponent(txt),'_blank');});}

  // cerrar overlay con su propio botón
  var ovc=document.getElementById('ovClose');
  if(ovc){ovc.addEventListener('click',function(){
    nav.classList.remove('open');burger.classList.remove('open');
    burger.setAttribute('aria-expanded','false');nav.setAttribute('aria-hidden','true');});}
})();
