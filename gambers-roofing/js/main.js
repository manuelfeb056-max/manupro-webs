// Gambers Roofing Contractors
(function(){
  "use strict";
  var WA = "17879036604";

  // Floating hamburger menu
  var fab = document.getElementById("fabMenu");
  var nav = document.getElementById("fabNav");
  fab.addEventListener("click", function(){
    var open = nav.classList.toggle("open");
    fab.classList.toggle("open", open);
    nav.setAttribute("aria-hidden", open ? "false" : "true");
  });
  nav.querySelectorAll("a").forEach(function(a){
    a.addEventListener("click", function(){
      nav.classList.remove("open"); fab.classList.remove("open");
      nav.setAttribute("aria-hidden", "true");
    });
  });
  document.addEventListener("click", function(e){
    if(!nav.contains(e.target) && e.target !== fab && !fab.contains(e.target)){
      nav.classList.remove("open"); fab.classList.remove("open");
    }
  });

  // Gallery carousel
  var track = document.getElementById("galTrack");
  var slides = track ? track.children.length : 0;
  var idx = 0;
  var dotsWrap = document.getElementById("galDots");
  function renderDots(){
    dotsWrap.innerHTML = "";
    for(var i=0;i<slides;i++){
      (function(i){
        var b = document.createElement("button");
        b.setAttribute("aria-label","Ir a la foto "+(i+1));
        if(i===idx) b.classList.add("active");
        b.addEventListener("click", function(){ go(i); });
        dotsWrap.appendChild(b);
      })(i);
    }
  }
  function go(i){
    idx = (i+slides)%slides;
    track.style.transform = "translateX(-"+(idx*100)+"%)";
    renderDots();
  }
  if(track){
    document.getElementById("galPrev").addEventListener("click", function(){ go(idx-1); });
    document.getElementById("galNext").addEventListener("click", function(){ go(idx+1); });
    renderDots();
    setInterval(function(){ go(idx+1); }, 7000);
    // swipe
    var sx = 0;
    track.addEventListener("touchstart", function(e){ sx = e.touches[0].clientX; }, {passive:true});
    track.addEventListener("touchend", function(e){
      var dx = e.changedTouches[0].clientX - sx;
      if(dx < -40) go(idx+1); else if(dx > 40) go(idx-1);
    }, {passive:true});
  }

  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add("visible"); io.unobserve(en.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });

  // Contact form -> WhatsApp
  var form = document.getElementById("leadForm");
  form.addEventListener("submit", function(e){
    e.preventDefault();
    var d = new FormData(form);
    var msg = "Hola Gambers Roofing, soy " + d.get("nombre") +
      " (" + d.get("telefono") + "). Servicio: " + d.get("servicio") + "." +
      (d.get("mensaje") ? " " + d.get("mensaje") : "") +
      " Quiero una cotización gratis.";
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank");
  });
})();
