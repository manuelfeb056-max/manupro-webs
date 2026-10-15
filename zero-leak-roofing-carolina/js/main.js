/* Masso Roofing Inc — site engine */
(function(){
  "use strict";

  var btn = document.getElementById('menuBtn'),
      nav = document.getElementById('nav'),
      scrim = document.getElementById('navScrim');
  function close(){ nav.classList.remove('open'); scrim.classList.remove('on'); }
  if (btn) btn.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    scrim.classList.toggle('on', open);
  });
  if (scrim) scrim.addEventListener('click', close);
  nav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', close); });

  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  var vp = document.getElementById('galViewport');
  if (vp){
    var track = vp.firstElementChild, cards = track.children,
        dotsBox = document.getElementById('galDots'), dots = [],
        timer = null, idle = null;
    for (var i=0;i<cards.length;i++){
      (function(i){
        var b=document.createElement('button');
        b.setAttribute('aria-label','Foto '+(i+1));
        b.addEventListener('click',function(){ go(i); restart(); });
        dotsBox.appendChild(b); dots.push(b);
      })(i);
    }
    function step(){ var c=cards[0]; return c?c.getBoundingClientRect().width+16:320; }
    function cur(){ return Math.round(vp.scrollLeft/step()); }
    function go(i){
      i=(i+cards.length)%cards.length;
      vp.scrollTo({left:i*step(),behavior:'smooth'});
      setTimeout(mark,400);
    }
    function mark(){
      var c=Math.min(Math.max(cur(),0),dots.length-1);
      dots.forEach(function(d,j){ d.classList.toggle('on',j===c); });
    }
    function restart(){
      clearInterval(timer);
      timer=setInterval(function(){ var c=cur(); go(c+1>=cards.length?0:c+1); },3500);
    }
    function pauseTemp(){ clearInterval(timer); clearTimeout(idle); idle=setTimeout(restart,6000); }
    document.getElementById('galPrev').addEventListener('click',function(){ go(cur()-1); restart(); });
    document.getElementById('galNext').addEventListener('click',function(){ go(cur()+1); restart(); });
    vp.addEventListener('scroll',mark,{passive:true});
    vp.addEventListener('pointerdown',pauseTemp);
    vp.addEventListener('touchstart',pauseTemp,{passive:true});
    document.addEventListener('visibilitychange',function(){
      if(document.hidden)clearInterval(timer);else restart();
    });
    mark(); restart();
  }

  var topbar=document.getElementById('topbar');
  window.addEventListener('scroll',function(){
    topbar.style.boxShadow=window.scrollY>10?'0 8px 30px rgba(58,44,34,.18)':'none';
  },{passive:true});
})();

/* Formulario de cotización -> WhatsApp del negocio (mejora 2026-10-15) */
(function(){
  "use strict";
  var qf = document.getElementById('qform');
  if (!qf) return;
  qf.addEventListener('submit', function(e){
    e.preventDefault();
    var n = document.getElementById('qNombre').value.trim();
    if (!n) { document.getElementById('qNombre').focus(); return; }
    var t = document.getElementById('qTel').value.trim();
    var s = document.getElementById('qServicio').value;
    var m = document.getElementById('qMsg').value.trim();
    var txt = 'Hola Zero Leak Roofing, soy ' + n + '. Me interesa: ' + s + '.' + (t ? ' Mi teléfono: ' + t + '.' : '') + (m ? ' ' + m : '');
    window.open('https://wa.me/17879027405?text=' + encodeURIComponent(txt), '_blank');
  });
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
