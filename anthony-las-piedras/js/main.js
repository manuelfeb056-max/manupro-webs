
document.addEventListener("DOMContentLoaded", function () {
  var menuBtn = document.getElementById("menuBtn");
  var overlay = document.getElementById("menuOverlay");
  var closeBtn = document.getElementById("menuClose");
  if (menuBtn && overlay) {
    menuBtn.addEventListener("click", function () { overlay.classList.add("open"); overlay.setAttribute("aria-hidden", "false"); });
  }
  if (closeBtn && overlay) {
    closeBtn.addEventListener("click", function () { overlay.classList.remove("open"); overlay.setAttribute("aria-hidden", "true"); });
  }
  if (overlay) {
    overlay.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { overlay.classList.remove("open"); overlay.setAttribute("aria-hidden", "true"); });
    });
  }
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var open = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(function (i) { i.classList.remove("open"); });
      if (!open) { item.classList.add("open"); }
    });
  });
  var form = document.getElementById("waForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = document.getElementById("fNombre").value.trim();
      var servicio = document.getElementById("fServicio").value;
      var mensaje = document.getElementById("fMensaje").value.trim();
      var texto = "Hola " + form.dataset.business + ", soy " + nombre + ". Me interesa: " + servicio + ". " + mensaje;
      window.open("https://wa.me/" + form.dataset.wa + "?text=" + encodeURIComponent(texto), "_blank");
    });
  }
  var reveal = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add("visible"); });
  }
});
