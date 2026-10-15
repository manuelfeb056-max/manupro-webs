var BUSINESS_NAME='The Tint Shop';
var BUSINESS_WA='17874491726';
document.addEventListener('DOMContentLoaded',function(){
 var b=document.getElementById('burger'),n=document.getElementById('nav');
 b.addEventListener('click',function(){var o=n.classList.toggle('open');b.classList.toggle('open',o);});
 n.addEventListener('click',function(e){if(e.target===n||e.target.tagName==='A'){n.classList.remove('open');b.classList.remove('open');}});
 document.querySelectorAll('.faq-q').forEach(function(q){q.addEventListener('click',function(){
  var it=q.parentElement,a=it.querySelector('.faq-a'),open=it.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(o){o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;});
  if(!open){it.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}});});
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.12});
 document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
 var hb=document.querySelector('.hero .photo-bg');
 if(hb){window.addEventListener('scroll',function(){var y=window.scrollY;if(y<window.innerHeight){hb.style.transform='scale(1.08) translateY('+(y*.18)+'px)';}},{passive:true});}
 var chips=document.querySelectorAll('.chip'),sel='';
 chips.forEach(function(c){c.addEventListener('click',function(){chips.forEach(function(x){x.classList.remove('sel')});c.classList.add('sel');sel=c.dataset.v;document.getElementById('f-err').textContent='';});});
 var form=document.getElementById('quote');
 form.addEventListener('submit',function(e){e.preventDefault();
  var err=document.getElementById('f-err'),name=document.getElementById('q-nombre').value.trim(),phone=document.getElementById('q-tel').value.trim(),det=document.getElementById('q-det').value.trim();
  if(name.length<2){err.textContent='Escribe tu nombre.';return;}
  var d=phone.replace(/\D/g,'');if(d.length<7){err.textContent='Escribe un teléfono válido.';return;}
  if(!sel){err.textContent='Elige un servicio.';return;}
  err.textContent='';
  var msg='Hola '+BUSINESS_NAME+', soy '+name+'. Me interesa: '+sel+'.'+(det?' Detalles: '+det:'')+' Mi teléfono: '+phone;
  window.open('https://wa.me/'+BUSINESS_WA+'?text='+encodeURIComponent(msg),'_blank');});
});