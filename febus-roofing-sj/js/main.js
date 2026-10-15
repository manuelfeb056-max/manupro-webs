// Febus Roofing
(function(){
  "use strict";
  var WA = "17875935986";

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

  // Rain canvas in hero
  var canvas = document.getElementById("rainCanvas");
  if(canvas){
    var ctx = canvas.getContext("2d");
    var drops = [];
    function sizeCanvas(){
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);
    for(var i=0;i<130;i++){
      drops.push({x:Math.random(), y:Math.random(), len:10+Math.random()*18, sp:.008+Math.random()*.014, o:.25+Math.random()*.5});
    }
    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.lineWidth = 1.4;
      for(var j=0;j<drops.length;j++){
        var d = drops[j];
        ctx.strokeStyle = "rgba(140,190,255,"+d.o+")";
        ctx.beginPath();
        var x = d.x*canvas.width, y = d.y*canvas.height;
        ctx.moveTo(x,y);
        ctx.lineTo(x-3, y+d.len);
        ctx.stroke();
        d.y += d.sp;
        if(d.y>1.05){ d.y = -0.05; d.x = Math.random(); }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

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
    var msg = "Hola Febus Roofing, soy " + (d.get("nombre") || "un cliente") +
      ". Mi teléfono es " + d.get("telefono") +
      ". Necesito: " + d.get("servicio") + "." +
      (d.get("mensaje") ? " " + d.get("mensaje") : "") +
      " Quiero una cotización gratis.";
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank");
  });
})();
