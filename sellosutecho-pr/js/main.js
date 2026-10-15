document.addEventListener('DOMContentLoaded',function(){
var btn=document.getElementById('menuBtn'),ov=document.getElementById('menuOverlay');
btn.addEventListener('click',function(){var o=ov.classList.toggle('open');btn.classList.toggle('x',o);document.body.style.overflow=o?'hidden':'';});
ov.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){ov.classList.remove('open');btn.classList.remove('x');document.body.style.overflow='';});});
document.querySelectorAll('.faq-item').forEach(function(it){
var q=it.querySelector('.faq-q'),a=it.querySelector('.faq-a');
q.addEventListener('click',function(){
var open=it.classList.contains('open');
document.querySelectorAll('.faq-item.open').forEach(function(o){o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;});
if(!open){it.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}
});});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
});

/* ===== ManuPro elite: formulario de cotización a WhatsApp (ronda 2, 2026-10-15) ===== */
document.querySelectorAll('.qform, .qelite').forEach(function(f){
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var g = function(n){ return (f.elements[n] && f.elements[n].value || '').trim(); };
    var errBox = f.querySelector('.qelite-err');
    var nombre = g('nombre'), tel = g('telefono');
    var svc = f.querySelector('input[name="servicio"]:checked');
    var svcVal = svc ? svc.value.trim() : g('servicio');
    var faltan = [];
    if(!nombre) faltan.push('tu nombre');
    if(!tel) faltan.push('tu teléfono');
    if(!svcVal) faltan.push('un servicio');
    if(faltan.length){
      if(errBox){ errBox.textContent = 'Falta: ' + faltan.join(', ') + '.'; errBox.style.display = 'block'; errBox.scrollIntoView({behavior:'smooth',block:'center'}); }
      else if(f.elements['nombre']) f.elements['nombre'].focus();
      return;
    }
    if(errBox) errBox.style.display = 'none';
    var parts = ['Hola ' + f.dataset.biz + ', soy ' + nombre + ' y mi teléfono es ' + tel];
    parts.push('Servicio que necesito: ' + svcVal);
    if(g('mensaje')) parts.push('Detalles: ' + g('mensaje'));
    if(g('pueblo')) parts.push('Pueblo: ' + g('pueblo'));
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
