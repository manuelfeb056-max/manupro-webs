/* Five Star Roofing — interactions */
(function(){
  "use strict";
  var WA_NUMBER = "17879429627";

  // Header shrink
  var topbar = document.getElementById("topbar");
  window.addEventListener("scroll", function(){
    topbar.classList.toggle("scrolled", window.scrollY > 30);
  }, {passive:true});

  // Overlay nav
  var burger = document.getElementById("burger");
  var overlay = document.getElementById("overlayNav");
  function toggleNav(force){
    var open = typeof force === "boolean" ? force : !overlay.classList.contains("open");
    overlay.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    overlay.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", function(){ toggleNav(); });
  overlay.querySelectorAll("a").forEach(function(a){
    a.addEventListener("click", function(){ toggleNav(false); });
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && overlay.classList.contains("open")) toggleNav(false);
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add("visible"); io.unobserve(en.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });

  // FAQ accordion
  document.querySelectorAll(".acc-item").forEach(function(item){
    var q = item.querySelector(".acc-q");
    var a = item.querySelector(".acc-a");
    q.addEventListener("click", function(){
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".acc-item.open").forEach(function(o){
        o.classList.remove("open");
        o.querySelector(".acc-a").style.maxHeight = null;
        o.querySelector(".acc-q").setAttribute("aria-expanded","false");
      });
      if(!isOpen){
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded","true");
      }
    });
  });

  // Contact form -> WhatsApp
  var form = document.getElementById("waForm");
  form.addEventListener("submit", function(e){
    e.preventDefault();
    var nombre = document.getElementById("fNombre").value.trim();
    var tel = document.getElementById("fTel").value.trim();
    var tipo = document.getElementById("fTipo").value;
    var msg = document.getElementById("fMsg").value.trim();
    if(!nombre || !tel){
      alert("Escribe tu nombre y tu teléfono para enviarte por WhatsApp.");
      return;
    }
    var text = "Hola Five Star Roofing, soy " + nombre + ". Mi teléfono: " + tel +
               ". Tipo de propiedad: " + tipo + "." + (msg ? " " + msg : "") +
               " Quiero cotizar el sellado de mi techo.";
    window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text), "_blank");
  });

  // Gallery lightbox (simple)
  document.querySelectorAll(".g-item").forEach(function(fig){
    fig.addEventListener("click", function(){
      var img = fig.querySelector("img");
      var lb = document.createElement("div");
      lb.style.cssText = "position:fixed;inset:0;z-index:120;background:rgba(5,8,14,.94);display:flex;align-items:center;justify-content:center;padding:24px;cursor:zoom-out";
      var clone = img.cloneNode();
      clone.style.cssText = "max-width:100%;max-height:100%;border-radius:14px;border:2px solid #e8b64c";
      lb.appendChild(clone);
      lb.addEventListener("click", function(){ lb.remove(); });
      document.body.appendChild(lb);
    });
  });
})();
