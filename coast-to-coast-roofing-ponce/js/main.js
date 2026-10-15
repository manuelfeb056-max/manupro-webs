// Coast to Coast Roofing Contractors — interacciones
(function(){
  "use strict";

  /* Menú flotante */
  var btn=document.getElementById("menuBtn"),
      nav=document.getElementById("nav"),
      scrim=document.getElementById("navScrim");
  function toggleNav(force){
    var open=typeof force==="boolean"?force:!nav.classList.contains("open");
    nav.classList.toggle("open",open);
    btn.classList.toggle("open",open);
    scrim.classList.toggle("on",open);
    document.body.style.overflow=open?"hidden":"";
  }
  btn.addEventListener("click",function(){toggleNav();});
  scrim.addEventListener("click",function(){toggleNav(false);});
  nav.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){toggleNav(false);});});

  /* Rayos del sol del hero (generados) */
  var rays=document.getElementById("rays");
  if(rays){
    var ns="http://www.w3.org/2000/svg", svg=document.createElementNS(ns,"svg");
    svg.setAttribute("viewBox","0 0 560 560");svg.style.width="100%";svg.style.height="100%";
    for(var i=0;i<24;i++){
      var l=document.createElementNS(ns,"line");
      var a=(i/24)*Math.PI*2;
      l.setAttribute("x1",280+Math.cos(a)*120);l.setAttribute("y1",280+Math.sin(a)*120);
      l.setAttribute("x2",280+Math.cos(a)*270);l.setAttribute("y2",280+Math.sin(a)*270);
      l.setAttribute("stroke","#FFE9B8");l.setAttribute("stroke-width","6");l.setAttribute("stroke-linecap","round");
      svg.appendChild(l);
    }
    rays.appendChild(svg);
  }

  /* Reveal on scroll */
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});
  },{threshold:0.12});
  document.querySelectorAll(".reveal").forEach(function(el){io.observe(el);});
})();

/* Formulario de cotización → WhatsApp */
(function(){

  var c=document.getElementById('navClose');
  if(c){c.addEventListener('click',function(){document.getElementById('nav').classList.remove('open');document.getElementById('menuBtn').classList.remove('open');document.getElementById('navScrim').classList.remove('on');document.body.style.overflow='';});}
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
    var txt='Hola Coast to Coast Roofing Contractors, soy '+n+'. Mi tel\u00e9fono es '+t+'.'+(p?' Soy de '+p+'.':'')+' Necesito: '+s.value+'.'+(m?' '+m:'');
    window.open('https://wa.me/17876371547?text='+encodeURIComponent(txt),'_blank');
  });
})();