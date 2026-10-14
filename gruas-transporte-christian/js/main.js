(function(){
var fab=document.getElementById('menuFab'),drawer=document.getElementById('drawer'),scrim=document.getElementById('scrim');
function toggle(open){var will=open!==undefined?open:!drawer.classList.contains('open');drawer.classList.toggle('open',will);scrim.classList.toggle('show',will);drawer.setAttribute('aria-hidden',will?'false':'true');}
fab.addEventListener('click',function(){toggle();});
scrim.addEventListener('click',function(){toggle(false);});
drawer.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){toggle(false);});});
document.addEventListener('keydown',function(e){if(e.key==='Escape')toggle(false);});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
})();
