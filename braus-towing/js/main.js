(function(){
var fab=document.getElementById('menuFab'),drawer=document.getElementById('drawer'),scrim=document.getElementById('scrim');
function close(){drawer.classList.remove('open');scrim.classList.remove('show');drawer.setAttribute('aria-hidden','true');}
fab.addEventListener('click',function(){
var open=drawer.classList.toggle('open');scrim.classList.toggle('show',open);drawer.setAttribute('aria-hidden',open?'false':'true');
});
scrim.addEventListener('click',close);
drawer.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close);});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
})();
