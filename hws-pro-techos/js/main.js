/* HWS-PRO — site engine */
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
    function step(){ var c=cards[0]; return c?c.getBoundingClientRect().width+14:320; }
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
    topbar.style.boxShadow=window.scrollY>10?'0 8px 30px rgba(0,0,0,.45)':'none';
  },{passive:true});
})();

// ---------- mejora elite 2026-10-15: botón cerrar del menú ----------
(function(){var c=document.getElementById('navClose'),nav=document.getElementById('nav'),scrim=document.getElementById('navScrim');
if(c&&nav){c.addEventListener('click',function(){nav.classList.remove('open');if(scrim)scrim.classList.remove('on');});}})();

// ---------- mejora elite 2026-10-15: formulario de cotización → WhatsApp ----------
(function(){var qf=document.getElementById('qform');if(!qf)return;
qf.addEventListener('submit',function(e){e.preventDefault();
var n=document.getElementById('qNombre').value.trim(),
    t=document.getElementById('qTel').value.trim(),
    s=document.getElementById('qServicio').value,
    m=document.getElementById('qMsg').value.trim();
var txt='Hola HWS-PRO, soy '+(n||'un cliente')+'. Mi teléfono es '+(t||'—')+'. Necesito: '+s+'.'+(m?' '+m:'');
window.open('https://wa.me/17872105404?text='+encodeURIComponent(txt),'_blank');});})();
