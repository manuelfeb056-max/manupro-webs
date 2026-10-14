// Jeremy Towing — interacciones
(function () {
  "use strict";

  // Menú hamburguesa flotante
  var btn = document.getElementById("menuBtn");
  var nav = document.getElementById("sideNav");
  var scrim = document.getElementById("navScrim");

  function closeNav() {
    btn.classList.remove("open");
    nav.classList.remove("open");
    scrim.classList.remove("on");
    document.body.style.overflow = "";
  }
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.classList.toggle("open", open);
    scrim.classList.toggle("on", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  scrim.addEventListener("click", closeNav);
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  // FAQ: solo una abierta a la vez
  var items = document.querySelectorAll(".faq-item");
  items.forEach(function (it) {
    it.addEventListener("toggle", function () {
      if (it.open) {
        items.forEach(function (o) { if (o !== it && o.open) o.open = false; });
      }
    });
  });

  // Carrusel de galería
  var track = document.getElementById("galTrack");
  var cards = track ? track.querySelectorAll(".gal-card") : [];
  var dotsWrap = document.getElementById("galDots");
  var idx = 0;

  function go(i) {
    if (!cards.length) return;
    idx = (i + cards.length) % cards.length;
    track.style.transform = "translateX(-" + idx * 100 + "%)";
    if (dotsWrap) {
      dotsWrap.querySelectorAll("i").forEach(function (d, n) {
        d.classList.toggle("on", n === idx);
      });
    }
  }

  if (cards.length && dotsWrap) {
    cards.forEach(function (_, n) {
      var d = document.createElement("i");
      d.setAttribute("aria-label", "Ir a la foto " + (n + 1));
      d.addEventListener("click", function () { go(n); });
      dotsWrap.appendChild(d);
    });
    document.getElementById("galPrev").addEventListener("click", function () { go(idx - 1); });
    document.getElementById("galNext").addEventListener("click", function () { go(idx + 1); });

    // swipe táctil
    var startX = 0;
    track.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (dx < -40) go(idx + 1);
      else if (dx > 40) go(idx - 1);
    }, { passive: true });

    go(0);
  }
})();
