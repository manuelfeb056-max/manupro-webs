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

var rev=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
rev.forEach(function(r){io.observe(r);});
}else{rev.forEach(function(r){r.classList.add('in');});}

var bg=document.getElementById('heroBg'),tick=false;
function parallax(){var y=window.scrollY;if(y<window.innerHeight){bg.style.transform='translateY('+(y*.28)+'px)';}tick=false;}
window.addEventListener('scroll',function(){if(!tick){requestAnimationFrame(parallax);tick=true;}},{passive:true});
});
