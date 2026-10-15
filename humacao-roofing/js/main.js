
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

// ---------- mejora elite 2026-10-15: botón cerrar del menú ----------
(function(){var c=document.getElementById('menuClose'),nav=document.getElementById('navOverlay'),burger=document.getElementById('burger');
if(c&&nav){c.addEventListener('click',function(){nav.classList.remove('open');if(burger)burger.classList.remove('open');document.body.style.overflow='';});}})();

// ---------- mejora elite 2026-10-15: formulario de cotización → WhatsApp ----------
(function(){var qf=document.getElementById('qform');if(!qf)return;
qf.addEventListener('submit',function(e){e.preventDefault();
var n=document.getElementById('qNombre').value.trim(),
    t=document.getElementById('qTel').value.trim(),
    s=document.getElementById('qServicio').value,
    m=document.getElementById('qMsg').value.trim();
var txt='Hola Humacao Roofing, soy '+(n||'un cliente')+'. Mi teléfono es '+(t||'—')+'. Necesito: '+s+'.'+(m?' '+m:'');
window.open('https://wa.me/17878504280?text='+encodeURIComponent(txt),'_blank');});})();
