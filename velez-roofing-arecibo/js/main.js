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

/* Formulario de cotización -> WhatsApp del negocio (mejora 2026-10-15) */
(function(){
var qf=document.getElementById('qform');if(!qf)return;
qf.addEventListener('submit',function(e){e.preventDefault();
var n=document.getElementById('qNombre').value.trim();
if(!n){document.getElementById('qNombre').focus();return;}
var t=document.getElementById('qTel').value.trim();
var s=document.getElementById('qServicio').value;
var m=document.getElementById('qMsg').value.trim();
var txt='Hola Vélez Roofing, soy '+n+'. Me interesa: '+s+'.'+(t?' Mi teléfono: '+t+'.':'')+(m?' '+m:'');
window.open('https://wa.me/17873561797?text='+encodeURIComponent(txt),'_blank');});
})();

/* Cotizador elite qelite -> WhatsApp del negocio (ronda 2, 2026-10-15) */
(function(){
var f=document.querySelector("form.qelite");if(!f)return;
var errBox=f.querySelector(".qelite-err");
function showErr(m){if(errBox){errBox.textContent=m;errBox.style.display="block";}}
function clearErr(){if(errBox){errBox.textContent="";errBox.style.display="none";}}
f.addEventListener("submit",function(e){
e.preventDefault();clearErr();
var n=f.querySelector("input[name=nombre]"),t=f.querySelector("input[name=telefono]"),
p=f.querySelector("input[name=pueblo]"),m=f.querySelector("textarea[name=mensaje]");
var nv=n?n.value.trim():"",tv=t?t.value.trim():"",pv=p?p.value.trim():"",mv=m?m.value.trim():"";
if(nv.length<2){showErr("Escribe tu nombre para continuar.");if(n)n.focus();return;}
if(tv.replace(/\D/g,"").length<7){showErr("Escribe un teléfono válido para poder llamarte.");if(t)t.focus();return;}
var sel=f.querySelector("input[name=servicio]:checked");
if(!sel){showErr("Elige un servicio para continuar.");return;}
var wa=f.getAttribute("data-wa")||"",biz=f.getAttribute("data-biz")||"";
var txt="Hola "+biz+", soy "+nv+". Me interesa: "+sel.value+". Mi teléfono: "+tv+"."+(pv?" Pueblo: "+pv+".":"")+(mv?" Detalles: "+mv:"");
window.open("https://wa.me/"+wa+"?text="+encodeURIComponent(txt),"_blank");
});
})();
