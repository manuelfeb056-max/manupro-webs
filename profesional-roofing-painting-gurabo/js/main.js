/* Profesional Roofing and Painting PR - site engine */
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

/* ===== ELITE-PACK JS (mejora ligera 2026-10-15) ===== */
(function(){
  if (window.__elitePack) return; window.__elitePack = true;

  /* 1. reveal on scroll — suave, sin tocar el diseño base */
  var rsel = '.g-card,.svc-card,.faq-item,.plan,.ci-row,.stat,.case,.qp';
  var rels = Array.prototype.slice.call(document.querySelectorAll(rsel)).filter(function(el){
    return !el.classList.contains('reveal') && !el.classList.contains('elite-reveal');
  });
  rels.forEach(function(el){ el.classList.add('elite-reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold: .1, rootMargin: '0px 0px -40px 0px'});
    document.querySelectorAll('.elite-reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.elite-reveal').forEach(function(el){ el.classList.add('in'); });
  }
  /* si el sitio ya trae .reveal sin observer propio, lo activamos también */
  var own = Array.prototype.slice.call(document.querySelectorAll('.reveal:not(.visible):not(.in)'));
  if (own.length && 'IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io2.unobserve(e.target); } });
    }, {threshold: .1});
    own.forEach(function(el){
      var cs = getComputedStyle(el);
      if (cs.opacity === '0' || el.style.opacity === '0' || cs.transform !== 'none') io2.observe(el);
    });
  }

  /* 2. hover premium en tarjetas */
  document.querySelectorAll('.g-card,.svc-card,.case,.plan').forEach(function(el){
    el.classList.add('elite-card');
  });

  /* 3. fix menú: overlay por encima del botón + botón cerrar propio */
  var overlays = document.querySelectorAll('.menu-overlay,#menuOverlay,.nav');
  overlays.forEach(function(ov){
    ov.style.zIndex = '400';
    if (!ov.querySelector('.elite-mclose')) {
      var b = document.createElement('button');
      b.className = 'elite-mclose'; b.setAttribute('aria-label', 'Cerrar menú'); b.textContent = '×';
      b.addEventListener('click', function(){
        ov.classList.remove('open');
        document.querySelectorAll('.fab-menu.x,.menu-btn.x,#menuBtn.x').forEach(function(m){ m.classList.remove('x'); });
      });
      ov.appendChild(b);
    }
  });
  document.querySelectorAll('.fab-menu,.menu-btn,#menuBtn').forEach(function(m){ m.style.zIndex = '390'; });

  /* 4. formulario de cotización -> WhatsApp del negocio */
  var qf = document.getElementById('qform');
  if (qf && !qf.__eliteWired) {
    qf.__eliteWired = true;
    qf.addEventListener('submit', function(e){
      e.preventDefault();
      var v = function(id){ var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var n = v('qNombre'), t = v('qTel'), s = v('qServicio'), m = v('qMsg');
      var biz = qf.getAttribute('data-biz') || 'nuestro negocio';
      var wa = qf.getAttribute('data-wa') || '';
      if (!wa) return;
      var txt = 'Hola ' + biz + ', soy ' + (n || 'un cliente') + (t ? ' (' + t + ')' : '') + '. Necesito: ' + s + '.' + (m ? ' ' + m : '');
      window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(txt), '_blank');
    });
  }
})();
