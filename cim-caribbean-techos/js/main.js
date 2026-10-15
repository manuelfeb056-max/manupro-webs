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
});
document.addEventListener('DOMContentLoaded',function(){
var f=document.getElementById('quoteForm');
if(f){f.addEventListener('submit',function(e){
e.preventDefault();
var fd=new FormData(f);
var n=(fd.get('nombre')||'').toString().trim(),t=(fd.get('telefono')||'').toString().trim();
if(!n||!t){alert('Por favor completa tu nombre y teléfono.');return;}
var msg='Hola CIM Caribbean, soy '+n+'. Mi teléfono es '+t+'. Necesito: '+(fd.get('servicio')||'Cotización')+'. '+((fd.get('mensaje')||'').toString().trim()||'');
window.open('https://wa.me/17872531512?text='+encodeURIComponent(msg),'_blank');
});}
var mc=document.getElementById('menuClose');
if(mc){mc.addEventListener('click',function(){var ov=document.getElementById('menuOverlay'),b=document.getElementById('menuBtn');ov.classList.remove('open');b.classList.remove('x');document.body.style.overflow='';});}
});