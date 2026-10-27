
document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("menuBtn");
  var overlay = document.getElementById("menuOverlay");
  var close = document.getElementById("menuClose");
  function openMenu() { overlay.classList.add("open"); overlay.setAttribute("aria-hidden", "false"); }
  function closeMenu() { overlay.classList.remove("open"); overlay.setAttribute("aria-hidden", "true"); }
  if (btn) btn.addEventListener("click", openMenu);
  if (close) close.addEventListener("click", closeMenu);
  overlay.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  var form = document.getElementById("waForm");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var nombre = document.getElementById("fNombre").value.trim();
      var tel = document.getElementById("fTel").value.trim();
      var serv = document.getElementById("fServ").value;
      var msg = document.getElementById("fMsg").value.trim();
      var err = document.getElementById("fError");
      if (!nombre || !tel || !serv || serv === "Selecciona un servicio") {
        err.textContent = "Completa nombre, telefono y servicio para enviar tu solicitud.";
        err.style.display = "block";
        return;
      }
      err.style.display = "none";
      var text = "Hola JM Detailing & Window Tint, soy " + nombre + " (" + tel + "). Quiero cotizar: " + serv + "." + (msg ? " " + msg : "");
      window.open("https://wa.me/17872411776?text=" + encodeURIComponent(text), "_blank");
    });
  }
});
