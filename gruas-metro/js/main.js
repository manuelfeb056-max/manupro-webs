// Grúas Metro — interacciones
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
})();
