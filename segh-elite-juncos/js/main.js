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
  var msg = "Hola SEGH Elite, soy " + nombre + ". Tengo un " + vehiculo + " y quiero separar un espacio para: " + servicio + ".";
  window.open("https://wa.me/17876151461?text=" + encodeURIComponent(msg), "_blank");
});
