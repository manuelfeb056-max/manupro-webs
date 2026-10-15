// Menu
const menuBtn = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  menuOverlay.classList.toggle('open');
});
menuOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuBtn.classList.remove('open');
  menuOverlay.classList.remove('open');
}));

// Accordion
document.querySelectorAll('.acc-head').forEach(head => {
  head.addEventListener('click', () => {
    const item = head.parentElement;
    const body = item.querySelector('.acc-body');
    const open = item.classList.contains('open');
    document.querySelectorAll('.acc-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.acc-body').style.maxHeight = null;
    });
    if (!open) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.gallery-grid figure, .service-card, .plan-card, .acc-item, .contact-box').forEach(el => {
  el.classList.add('reveal');
  io.observe(el);
});

// Formulario de cotización elite (ronda 2): pasos + validación -> WhatsApp del negocio
(function(){
var qf=document.getElementById('qform');if(!qf)return;
qf.addEventListener('submit',function(e){e.preventDefault();
var err=document.getElementById('qErr');
function fail(m,el){err.textContent=m;err.style.display='block';if(el){el.focus();}return;}
err.style.display='none';
var n=document.getElementById('qNombre').value.trim();
if(n.length<2){return fail('Escribe tu nombre para continuar.',document.getElementById('qNombre'));}
var t=document.getElementById('qTel').value.trim();
if(t.replace(/\D/g,'').length<7){return fail('Escribe un teléfono válido para poder llamarte.',document.getElementById('qTel'));}
var sel=qf.querySelector('input[name="servicio"]:checked');
if(!sel){return fail('Elige un servicio para continuar.');}
var s=sel.value;
var p=document.getElementById('qPueblo').value.trim();
var m=document.getElementById('qMsg').value.trim();
var txt='Hola V & A Roofing, soy '+n+'. Me interesa: '+s+'. Mi teléfono: '+t+'.'+(p?' Pueblo: '+p+'.':'')+(m?' Detalles: '+m:'');
window.open('https://wa.me/17875976536?text='+encodeURIComponent(txt),'_blank');});
})();

/* Cotizador elite qelite -> WhatsApp del negocio (ronda 2, 2026-10-15) */
(function(){
var f=document.querySelector('form.qelite');if(!f)return;
var errBox=f.querySelector('.qelite-err');
function showErr(m){if(errBox){errBox.textContent=m;errBox.style.display='block';}}
function clearErr(){if(errBox){errBox.textContent='';errBox.style.display='none';}}
f.addEventListener('submit',function(e){
e.preventDefault();clearErr();
var n=f.querySelector('input[name="nombre"]'),t=f.querySelector('input[name="telefono"]'),
p=f.querySelector('input[name="pueblo"]'),m=f.querySelector('textarea[name="mensaje"]');
var nv=n?n.value.trim():'',tv=t?t.value.trim():'',pv=p?p.value.trim():'',mv=m?m.value.trim():'';
if(nv.length<2){showErr('Escribe tu nombre para continuar.');if(n)n.focus();return;}
if(tv.replace(/\D/g,'').length<7){showErr('Escribe un teléfono válido para poder llamarte.');if(t)t.focus();return;}
var sel=f.querySelector('input[name="servicio"]:checked');
if(!sel){showErr('Elige un servicio para continuar.');return;}
var wa=f.getAttribute('data-wa')||'',biz=f.getAttribute('data-biz')||'';
var txt='Hola '+biz+', soy '+nv+'. Me interesa: '+sel.value+'. Mi teléfono: '+tv+'.'+(pv?' Pueblo: '+pv+'.':'')+(mv?' Detalles: '+mv:'');
window.open('https://wa.me/'+wa+'?text='+encodeURIComponent(txt),'_blank');
});
})();
