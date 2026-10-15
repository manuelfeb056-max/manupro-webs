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

/* Formulario de cotización -> WhatsApp del negocio (mejora 2026-10-15) */
(function(){
var qf=document.getElementById('qform');if(!qf)return;
qf.addEventListener('submit',function(e){e.preventDefault();
var n=document.getElementById('qNombre').value.trim();
if(!n){document.getElementById('qNombre').focus();return;}
var t=document.getElementById('qTel').value.trim();
var s=document.getElementById('qServicio').value;
var m=document.getElementById('qMsg').value.trim();
var txt='Hola Vision Roofing, soy '+n+'. Me interesa: '+s+'.'+(t?' Mi teléfono: '+t+'.':'')+(m?' '+m:'');
window.open('https://wa.me/17874782710?text='+encodeURIComponent(txt),'_blank');});
})();
