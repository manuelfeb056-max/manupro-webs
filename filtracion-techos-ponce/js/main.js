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
  var qf=document.getElementById("qform");
  if(qf) qf.addEventListener("submit",function(e){
    e.preventDefault();
    var n=document.getElementById("qNombre").value.trim(),
        t=document.getElementById("qTel").value.trim(),
        s=document.getElementById("qServicio").value,
        m=document.getElementById("qMsg").value.trim();
    if(!n||!t||!s){
      if(!n)document.getElementById("qNombre").focus();
      else if(!t)document.getElementById("qTel").focus();
      else document.getElementById("qServicio").focus();
      return;
    }
    var txt="Hola Filtración Techos, soy "+n+". Mi teléfono es "+t+". Necesito: "+s+"."+(m?" "+m:"");
    window.open("https://wa.me/19392683546?text="+encodeURIComponent(txt),"_blank");
  });
})();
