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
var bg=document.getElementById('heroBg'),veil=document.getElementById('heroVeil'),tick=false;
function par(){var y=window.scrollY;if(y<window.innerHeight*1.2){bg.style.transform='translateY('+(y*0.22)+'px) scale(1.06)';veil.style.transform='translateY('+(y*0.1)+'px)';}tick=false;}
window.addEventListener('scroll',function(){if(!tick){requestAnimationFrame(par);tick=true;}},{passive:true});
par();
});
