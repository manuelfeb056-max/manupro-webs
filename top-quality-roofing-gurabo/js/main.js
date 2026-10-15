document.addEventListener('DOMContentLoaded',function(){
var btn=document.getElementById('menuBtn'),ov=document.getElementById('menuOverlay');
btn.addEventListener('click',function(){var o=ov.classList.toggle('open');btn.classList.toggle('x',o);document.body.style.overflow=o?'hidden':'';});
ov.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){ov.classList.remove('open');btn.classList.remove('x');document.body.style.overflow='';});});
document.querySelectorAll('.faq-item').forEach(function(it){
var q=it.querySelector('.faq-q'),a=it.querySelector('.faq-a');
q.addEventListener('click',function(){
var open=it.classList.contains('open');
document.querySelectorAll('.faq-item.open').forEach(function(o){o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;});
if(!open){it.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}
});});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
/* Formulario de cotización a WhatsApp */
var qform=document.getElementById('cform');
if(qform){
qform.addEventListener('submit',function(ev){
ev.preventDefault();
var biz=qform.dataset.biz||'el negocio',wa=qform.dataset.wa||'17874690959',
nombre=document.getElementById('fNombre').value.trim(),
tel=document.getElementById('fTel').value.trim(),
servicio=document.getElementById('fServicio').value,
msg=document.getElementById('fMsg').value.trim();
var texto='Hola '+biz+', soy '+nombre+' ('+tel+'). Me interesa: '+servicio+'.'+(msg?' '+msg:'');
window.open('https://wa.me/'+wa+'?text='+encodeURIComponent(texto),'_blank');
});
}
});

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
