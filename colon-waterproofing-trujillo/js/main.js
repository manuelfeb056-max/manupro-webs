document.addEventListener('DOMContentLoaded',function(){
  var b=document.getElementById('burger'),p=document.getElementById('navPanel');
  b.addEventListener('click',function(){b.classList.toggle('open');p.classList.toggle('open');document.body.style.overflow=p.classList.contains('open')?'hidden':'';});
  p.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){b.classList.remove('open');p.classList.remove('open');document.body.style.overflow='';});});
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click',function(){
      var item=q.parentElement,a=item.querySelector('.faq-a'),open=item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;});
      if(!open){item.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}
    });
  });
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});
  var yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();
});

document.addEventListener('DOMContentLoaded',function(){
var f=document.getElementById('quoteForm');
if(f){f.addEventListener('submit',function(e){
e.preventDefault();
var fd=new FormData(f);
var n=(fd.get('nombre')||'').toString().trim(),t=(fd.get('telefono')||'').toString().trim();
if(!n||!t){alert('Por favor completa tu nombre y teléfono.');return;}
var msg='Hola Colon Waterproofing, soy '+n+'. Mi teléfono es '+t+'. Necesito: '+(fd.get('servicio')||'Cotización')+'. '+((fd.get('mensaje')||'').toString().trim()||'');
window.open('https://wa.me/17877686094?text='+encodeURIComponent(msg),'_blank');
});}
var nc=document.getElementById('navClose');
if(nc){nc.addEventListener('click',function(){var b=document.getElementById('burger'),p=document.getElementById('navPanel');b.classList.remove('open');p.classList.remove('open');document.body.style.overflow='';});}
});