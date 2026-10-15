/* For Roofing Contractors Inc — site engine */
(function(){
  "use strict";

  var btn = document.getElementById('menuBtn'),
      nav = document.getElementById('nav'),
      scrim = document.getElementById('navScrim'),
      closeBtn = document.getElementById('navClose');
  function close(){ nav.classList.remove('open'); scrim.classList.remove('on'); document.body.style.overflow=''; }
  if (btn) btn.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    scrim.classList.toggle('on', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  if (closeBtn) closeBtn.addEventListener('click', close);
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
    topbar.style.boxShadow=window.scrollY>10?'0 8px 30px rgba(14,124,91,.16)':'none';
  },{passive:true});

})();


/* NQ formulario elite -> WhatsApp (ronda 2) */
(function(){
  var f=document.getElementById('nqForm'); if(!f) return;
  var chips=f.querySelectorAll('.nq-chip');
  chips.forEach(function(c){
    c.addEventListener('click',function(){
      chips.forEach(function(x){x.classList.remove('sel');});
      c.classList.add('sel');
      var e=document.getElementById('nqErrServ'); if(e) e.hidden=true;
    });
  });
  f.addEventListener('submit',function(ev){
    ev.preventDefault();
    var n=document.getElementById('nqNombre').value.trim(),
        t=document.getElementById('nqTel').value.trim(),
        p=document.getElementById('nqPueblo').value.trim(),
        m=document.getElementById('nqMsg').value.trim(),
        s=f.querySelector('input[name="nqServicio"]:checked'),
        ok=true;
    [document.getElementById('nqNombre'),document.getElementById('nqTel')].forEach(function(el){
      el.classList.remove('nq-shake'); void el.offsetWidth;
      if(!el.value.trim()){ el.classList.add('nq-shake'); el.style.borderColor='#ff8a8a'; ok=false; }
      else { el.style.borderColor=''; }
    });
    var es=document.getElementById('nqErrServ');
    if(!s){ if(es) es.hidden=false; ok=false; }
    if(!ok){
      var bad=f.querySelector('.nq-shake')||(!s?f.querySelector('.nq-chips'):null);
      if(bad) bad.scrollIntoView({behavior:'smooth',block:'center'});
      return;
    }
    var digits=t.replace(/\D/g,'');
    var txt='Hola For Roofing Contractors Inc, soy '+n+'. Mi tel\u00e9fono es '+t+'.'+(p?' Soy de '+p+'.':'')+' Necesito: '+s.value+'.'+(m?' '+m:'');
    window.open('https://wa.me/17877588709?text='+encodeURIComponent(txt),'_blank');
  });
})();