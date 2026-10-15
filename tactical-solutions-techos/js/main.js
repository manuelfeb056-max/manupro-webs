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
})();

/* ===== ManuPro elite touch: formulario de cotización a WhatsApp (2026-10-15) ===== */
document.querySelectorAll('.qform').forEach(function(f){
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var g = function(n){ return (f.elements[n].value || '').trim(); };
    var nombre = g('nombre');
    if(!nombre){ f.elements['nombre'].focus(); return; }
    var parts = ['Hola ' + f.dataset.biz + ', soy ' + nombre];
    if(g('telefono')) parts.push('mi teléfono es ' + g('telefono'));
    parts.push('Servicio que necesito: ' + g('servicio'));
    if(g('mensaje')) parts.push('Mensaje: ' + g('mensaje'));
    window.open('https://wa.me/' + f.dataset.wa + '?text=' + encodeURIComponent(parts.join('. ') + '.'), '_blank', 'noopener');
  });
});

/* ===== ManuPro elite touch: botón cerrar dentro del overlay (2026-10-15) ===== */
(function(){
  var ov = document.getElementById('menuOverlay'), c = document.getElementById('mClose');
  if(c && ov){ c.addEventListener('click', function(){
    ov.classList.remove('open');
    var b = document.getElementById('menuBtn');
    if(b) b.classList.remove('x');
    document.body.style.overflow = '';
  }); }
})();
