(function(){
"use strict";
var menuBtn=document.getElementById('menuBtn'),nav=document.getElementById('navOverlay');
menuBtn.addEventListener('click',function(){
  var open=nav.classList.toggle('open');menuBtn.classList.toggle('open',open);
  nav.setAttribute('aria-hidden',open?'false':'true');
});
nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){
  nav.classList.remove('open');menuBtn.classList.remove('open');nav.setAttribute('aria-hidden','true');});});
/* galería */
var track=document.getElementById('galTrack'),dotsBox=document.getElementById('galDots'),gi=0,timer=null;
var slides=track.children.length;
for(var i=0;i<slides;i++){var b=document.createElement('button');b.setAttribute('aria-label','Foto '+(i+1));
  (function(n){b.addEventListener('click',function(){go(n);restart();});})(i);
  if(i===0)b.classList.add('on');dotsBox.appendChild(b);}
var dots=dotsBox.querySelectorAll('button');
function go(n){gi=(n+slides)%slides;track.style.transform='translateX('+(-gi*100)+'%)';
  dots.forEach(function(d,j){d.classList.toggle('on',j===gi);});}
function restart(){clearInterval(timer);timer=setInterval(function(){go(gi+1);},4000);}restart();
document.getElementById('galPrev').addEventListener('click',function(){go(gi-1);restart();});
document.getElementById('galNext').addEventListener('click',function(){go(gi+1);restart();});
/* faq */
document.querySelectorAll('.faq-item').forEach(function(it){
  var q=it.querySelector('.faq-q'),a=it.querySelector('.faq-a');
  q.addEventListener('click',function(){
    var open=it.classList.toggle('open');
    a.style.maxHeight=open?a.scrollHeight+'px':'0';
  });
});
/* reveal */
var io=new IntersectionObserver(function(es){es.forEach(function(e){
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
})();
