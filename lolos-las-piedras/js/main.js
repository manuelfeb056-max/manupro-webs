(function () {
  "use strict";
  var btn = document.getElementById("menuBtn");
  var ov = document.getElementById("menuOverlay");
  var close = document.getElementById("menuClose");
  function openMenu() { ov.classList.add("open"); ov.setAttribute("aria-hidden", "false"); }
  function closeMenu() { ov.classList.remove("open"); ov.setAttribute("aria-hidden", "true"); }
  if (btn) btn.addEventListener("click", openMenu);
  if (close) close.addEventListener("click", closeMenu);
  ov.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.querySelectorAll(".faq-q").forEach(function (b) {
    b.addEventListener("click", function () {
      var f = b.parentNode; var was = f.classList.contains("open");
      document.querySelectorAll(".faq").forEach(function (x) { x.classList.remove("open"); });
      if (!was) f.classList.add("open");
    });
  });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  var form = document.getElementById("waForm");
  if (form) form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var nombre = document.getElementById("fNombre").value.trim();
    var veh = document.getElementById("fVehiculo").value.trim();
    var serv = document.getElementById("fServicio").value;
    var msg = document.getElementById("fMensaje").value.trim();
    var text = "Hola Lolo's Car Wash and Detailing, soy " + nombre + ". Quiero cotizar: " + serv + ".";
    if (veh) text += " Vehiculo: " + veh + ".";
    if (msg) text += " " + msg;
    window.open("https://wa.me/19394847076?text=" + encodeURIComponent(text), "_blank");
  });
})();
