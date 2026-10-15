/* Suarez Professional Roofing — site engine */
(function(){
  "use strict";

  /* floating menu */
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

  /* reveal on scroll */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* gallery carousel */
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

  /* topbar shadow */
  var topbar=document.getElementById('topbar');
  window.addEventListener('scroll',function(){
    topbar.style.boxShadow=window.scrollY>10?'0 8px 30px rgba(0,0,0,.45)':'none';
  },{passive:true});
})();

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
