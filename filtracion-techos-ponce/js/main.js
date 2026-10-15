// Filtración Techos — interacciones
(function(){
  "use strict";

  /* Menú flotante */
  var btn=document.getElementById("menuBtn"),
      nav=document.getElementById("nav"),
      scrim=document.getElementById("navScrim"),
      closeBtn=document.getElementById("navClose");
  function toggleNav(force){
    var open=typeof force==="boolean"?force:!nav.classList.contains("open");
    nav.classList.toggle("open",open);
    btn.classList.toggle("open",open);
    scrim.classList.toggle("on",open);
    document.body.style.overflow=open?"hidden":"";
  }
  btn.addEventListener("click",function(){toggleNav();});
  if(closeBtn) closeBtn.addEventListener("click",function(){toggleNav(false);});
  scrim.addEventListener("click",function(){toggleNav(false);});
  nav.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){toggleNav(false);});});

  /* Lluvia del hero */
  var rain=document.getElementById("rain");
  if(rain){
    for(var i=0;i<70;i++){
      var d=document.createElement("span");
      d.className="drop";
      d.style.left=(Math.random()*100)+"%";
      d.style.animationDuration=(0.7+Math.random()*0.9)+"s";
      d.style.animationDelay=(Math.random()*1.6)+"s";
      d.style.opacity=(0.25+Math.random()*0.4);
      rain.appendChild(d);
    }
  }

  /* Galería */
  var track=document.querySelector(".gal-track"),
      viewport=document.getElementById("galViewport"),
      dots=document.getElementById("galDots"),
      idx=0;
  function cardsPerView(){return window.innerWidth<=720?1:2;}
  function maxIdx(){return Math.max(0,track.children.length-cardsPerView());}
  function go(i){
    idx=Math.max(0,Math.min(i,maxIdx()));
    var card=track.children[0],
        gap=16,
        w=card.getBoundingClientRect().width+gap;
    track.style.transform="translateX("+(-idx*w)+"px)";
    Array.prototype.forEach.call(dots.children,function(b,j){b.classList.toggle("on",j===idx);});
  }
  if(track){
    for(var k=0;k<=maxIdx();k++){
      (function(n){var b=document.createElement("button");b.setAttribute("aria-label","Ir a la foto "+(n+1));b.addEventListener("click",function(){go(n);});dots.appendChild(b);})(k);
    }
    document.getElementById("galPrev").addEventListener("click",function(){go(idx-1);});
    document.getElementById("galNext").addEventListener("click",function(){go(idx+1);});
    window.addEventListener("resize",function(){go(idx);});
    var sx=0;
    viewport.addEventListener("touchstart",function(e){sx=e.touches[0].clientX;},{passive:true});
    viewport.addEventListener("touchend",function(e){
      var dx=e.changedTouches[0].clientX-sx;
      if(Math.abs(dx)>40)go(idx+(dx<0?1:-1));
    },{passive:true});
    go(0);
  }

  /* Reveal on scroll */
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});
  },{threshold:0.12});
  document.querySelectorAll(".reveal").forEach(function(el){io.observe(el);});
})();

(function(){
  "use strict";
  /* Formulario de cotización -> WhatsApp del negocio */

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
    var txt='Hola Filtración Techos, soy '+n+'. Mi tel\u00e9fono es '+t+'.'+(p?' Soy de '+p+'.':'')+' Necesito: '+s.value+'.'+(m?' '+m:'');
    window.open('https://wa.me/19392683546?text='+encodeURIComponent(txt),'_blank');
  });
})();