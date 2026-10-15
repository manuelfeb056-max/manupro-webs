(function(){
var btn=document.getElementById('menuBtn'),ov=document.getElementById('menuOverlay');
if(btn&&ov){btn.addEventListener('click',function(){var o=ov.classList.toggle('open');btn.classList.toggle('x',o);});
ov.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){ov.classList.remove('open');btn.classList.remove('x');});});}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
document.querySelectorAll('.faq-item').forEach(function(it){
var q=it.querySelector('.faq-q'),a=it.querySelector('.faq-a');
q.addEventListener('click',function(){
var open=it.classList.contains('open');
document.querySelectorAll('.faq-item.open').forEach(function(o){o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;});
if(!open){it.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}
});});
var ghost=document.getElementById('ghostText');
window.addEventListener('scroll',function(){
if(!ghost)return;
var y=window.scrollY;
if(y<900){ghost.style.transform='translate(calc(-50% + '+(y*.25)+'px),-50%)';}
},{passive:true});
})();

// ---------- mejora elite 2026-10-15: botón cerrar del menú ----------
(function(){var mc=document.getElementById('menuClose'),ov=document.getElementById('menuOverlay'),btn=document.getElementById('menuBtn');
if(mc&&ov){mc.addEventListener('click',function(){ov.classList.remove('open');if(btn)btn.classList.remove('x');});}})();

// ---------- mejora elite 2026-10-15: formulario de cotización → WhatsApp ----------
(function(){var qf=document.getElementById('qform');if(!qf)return;
qf.addEventListener('submit',function(e){e.preventDefault();
var n=document.getElementById('qNombre').value.trim(),
    t=document.getElementById('qTel').value.trim(),
    s=document.getElementById('qServicio').value,
    m=document.getElementById('qMsg').value.trim();
var txt='Hola GG Services, soy '+(n||'un cliente')+'. Mi teléfono es '+(t||'—')+'. Necesito: '+s+'.'+(m?' '+m:'');
window.open('https://wa.me/17874690017?text='+encodeURIComponent(txt),'_blank');});})();
