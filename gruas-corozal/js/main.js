document.addEventListener('DOMContentLoaded',function(){
var btn=document.getElementById('menuBtn'),ov=document.getElementById('menuOverlay'),cl=document.getElementById('menuClose');
function openMenu(){ov.classList.add('open');ov.setAttribute('aria-hidden','false');}
function closeMenu(){ov.classList.remove('open');ov.setAttribute('aria-hidden','true');}
if(btn)btn.addEventListener('click',openMenu);
if(cl)cl.addEventListener('click',closeMenu);
ov.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeMenu);});

var items=document.querySelectorAll('.faq-item');
items.forEach(function(it){
var q=it.querySelector('.faq-q'),a=it.querySelector('.faq-a');
q.addEventListener('click',function(){
var open=it.classList.contains('open');
items.forEach(function(o){o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;});
if(!open){it.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}
});
});

/* hero parallax on scroll */
var heroImg=document.getElementById('heroImg'),ticking=false;
function par(){var y=window.scrollY;if(heroImg&&y<window.innerHeight*1.2){heroImg.style.transform='translateY('+(y*0.28)+'px)';}ticking=false;}
window.addEventListener('scroll',function(){if(!ticking){requestAnimationFrame(par);ticking=true;}},{passive:true});
par();

var rev=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
rev.forEach(function(r){io.observe(r);});
}else{rev.forEach(function(r){r.classList.add('in');});}
});
