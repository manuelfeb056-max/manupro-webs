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

/* cerrar menú con botón X (overlay por encima del botón flotante) */
(function(){
  var c = document.querySelector('[data-mqclose]');
  if(!c) return;
  c.addEventListener('click', function(){
    var nav = c.closest('nav') || document.getElementById('menuOverlay');
    if(nav){ nav.classList.remove('open','show'); nav.setAttribute('aria-hidden','true'); }
    var scrim = document.getElementById('scrim2');
    if(scrim) scrim.classList.remove('on');
    ['floatMenu','menuBtn','burger'].forEach(function(id){
      var b=document.getElementById(id);
      if(b){ b.classList.remove('open','active'); b.setAttribute('aria-expanded','false'); }
    });
    document.querySelectorAll('.fab-menu,.menu-btn,.burger,.float-menu').forEach(function(b){
      b.classList.remove('open','active');
    });
    document.body.style.overflow = '';
  });
})();

/* Cotizador elite por pasos -> WhatsApp (A.M. Roofing Inc: 1787-261-3118) */
(function(){
  var f=document.getElementById('quoteForm');
  if(!f) return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var n=document.getElementById('qNombre'),t=document.getElementById('qTel'),
        m=document.getElementById('qMsg'),p=document.getElementById('qPueblo'),
        s=f.querySelector('input[name="qServ"]:checked'),
        chips=f.querySelector('.q-chips');
    var ok=true;
    [n,t].forEach(function(el){var bad=!el.value.trim();el.classList.toggle('err',bad);if(bad)ok=false;});
    var badS=!s; if(chips)chips.classList.toggle('err',badS); if(badS)ok=false;
    if(!ok) return;
    var parts=['Hola A.M. Roofing Inc, soy '+n.value.trim()+' ('+t.value.trim()+').',
               'Servicio: '+s.value+'.'];
    if(p&&p.value.trim())parts.push('Pueblo: '+p.value.trim()+'.');
    if(m.value.trim())parts.push('Detalle: '+m.value.trim());
    window.open('https://wa.me/17872613118?text='+encodeURIComponent(parts.join(' ')),'_blank');
  });
})();
