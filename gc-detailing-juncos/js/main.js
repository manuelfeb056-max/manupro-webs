document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("menuBtn");
  var nav = document.getElementById("menuNav");
  if (btn && nav) {
    btn.addEventListener("click", function () { nav.classList.toggle("open"); });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  }
  document.querySelectorAll(".faq .q").forEach(function (q) {
    q.addEventListener("click", function () {
      q.parentElement.classList.toggle("open");
    });
  });
  var lb = document.getElementById("lb");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var lbX = document.getElementById("lbX");
  document.querySelectorAll(".grid img").forEach(function (img) {
    img.addEventListener("click", function () {
      lbImg.src = img.src;
      lbCap.textContent = img.alt;
      lb.classList.add("open");
    });
  });
  if (lbX) { lbX.addEventListener("click", function () { lb.classList.remove("open"); }); }
  if (lb) { lb.addEventListener("click", function (e) { if (e.target === lb) { lb.classList.remove("open"); } }); }
  var form = document.getElementById("resForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = document.getElementById("fNombre").value.trim();
      var vehiculo = document.getElementById("fVehiculo").value.trim();
      var mensaje = document.getElementById("fMensaje").value.trim();
      var texto = "Hola G&C Detailing, soy " + nombre + ". Mi vehiculo es: " + vehiculo + ". " + mensaje;
      window.open("https://wa.me/17879093812?text=" + encodeURIComponent(texto), "_blank");
    });
  }
});
