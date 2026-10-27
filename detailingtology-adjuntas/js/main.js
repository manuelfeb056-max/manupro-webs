document.getElementById("menuBtn").addEventListener("click", function () {
  document.getElementById("menuOverlay").classList.add("open");
});
document.getElementById("menuClose").addEventListener("click", function () {
  document.getElementById("menuOverlay").classList.remove("open");
});
document.querySelectorAll(".menu-nav a").forEach(function (a) {
  a.addEventListener("click", function () {
    document.getElementById("menuOverlay").classList.remove("open");
  });
});
document.getElementById("waForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var nombre = document.getElementById("fNombre").value.trim();
  var vehiculo = document.getElementById("fVehiculo").value.trim();
  var servicio = document.getElementById("fServicio").value;
  var msg = "Hola DetailingTology Clinic, soy " + nombre + ". Tengo un " + vehiculo + " y quiero cotizar: " + servicio + ".";
  window.open("https://wa.me/17873789751?text=" + encodeURIComponent(msg), "_blank");
});
