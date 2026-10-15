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
var hb=document.querySelector('.hero-bg');
if(hb){var tick=false;window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(function(){var y=Math.min(window.scrollY,900);hb.style.transform='translateY('+(y*.22)+'px) scale(1.06)';tick=false;});}},{passive:true});}
/* quote form */
var chips=document.querySelectorAll('#q-chips .chip');
var sel=null;
chips.forEach(function(c){c.addEventListener('click',function(){
chips.forEach(function(x){x.classList.remove('on');x.setAttribute('aria-pressed','false');});
c.classList.add('on');c.setAttribute('aria-pressed','true');sel=c.textContent.trim();});});
var f=document.getElementById('qform');
if(f){f.addEventListener('submit',function(e){
e.preventDefault();
var err=document.getElementById('q-err');
var nom=document.getElementById('q-nombre').value.trim();
var tel=document.getElementById('q-tel').value.trim();
var det=document.getElementById('q-det').value.trim();
var digs=tel.replace(/\D/g,'');
function bad(m){err.textContent=m;err.hidden=false;err.scrollIntoView({block:'nearest',behavior:'smooth'});return false;}
if(nom.length<2)return bad('Escribe tu nombre para poder atenderte.');
if(digs.length<7)return bad('Escribe un tel\u00e9fono v\u00e1lido (al menos 7 d\u00edgitos).');
if(!sel)return bad('Elige el servicio que necesitas tocando una de las opciones.');
err.hidden=true;
var msg='Hola '+f.dataset.biz+', soy '+nom+' ('+tel+'). Me interesa: '+sel+'.'+(det?' Detalles: '+det:'');
window.open('https://wa.me/'+f.dataset.wa+'?text='+encodeURIComponent(msg),'_blank','noopener');});}
})();
