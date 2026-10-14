(function(){
var b=document.getElementById('burger'),n=document.getElementById('navOverlay');
if(b&&n){b.addEventListener('click',function(){b.classList.toggle('open');n.classList.toggle('show');document.body.classList.toggle('lock');});
n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){b.classList.remove('open');n.classList.remove('show');document.body.classList.remove('lock');});});}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
document.querySelectorAll('.faq-q').forEach(function(q){q.addEventListener('click',function(){
var it=q.parentElement,open=it.classList.contains('open');
document.querySelectorAll('.faq-item.open').forEach(function(o){o.classList.remove('open');});
if(!open)it.classList.add('open');});});
var ba=document.getElementById('baSlider');
if(ba){function setBA(x){var r=ba.getBoundingClientRect(),p=Math.max(4,Math.min(96,(x-r.left)/r.width*100));ba.style.setProperty('--pos',p+'%');}
var drag=false;
ba.addEventListener('pointerdown',function(e){drag=true;try{ba.setPointerCapture(e.pointerId);}catch(_){} setBA(e.clientX);});
ba.addEventListener('pointermove',function(e){if(drag)setBA(e.clientX);});
ba.addEventListener('pointerup',function(){drag=false;});
ba.addEventListener('pointercancel',function(){drag=false;});}
})();
