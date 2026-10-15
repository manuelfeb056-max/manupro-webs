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

// ---------- formulario de cotización → WhatsApp ----------
var qf=document.getElementById('quoteForm');
if(qf){qf.addEventListener('submit',function(e){e.preventDefault();
var n=document.getElementById('qNombre').value.trim();
var t=document.getElementById('qTel').value.trim();
var s=document.getElementById('qServicio').value;
var m=document.getElementById('qMsg').value.trim();
var txt='Hola De la Cruz Construction, soy '+(n||'un cliente')+'. Mi teléfono es '+t+'. Necesito: '+s+'.'+(m?' '+m:'')+' Quiero mi estimado gratis.';
window.open('https://wa.me/19396404188?text='+encodeURIComponent(txt),'_blank');});}

// ---------- cerrar overlay con su propio botón ----------
var ovc=document.getElementById('ovClose');
if(ovc){ovc.addEventListener('click',function(){ov.classList.remove('open');btn.classList.remove('x');document.body.style.overflow='';});}
});
