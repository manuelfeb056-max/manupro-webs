// Grúas Metro — métricas locales del sitio (dashboard por sitio)
(function () {
  "use strict";
  var KEY = "metrics_gruas-metro";
  var data;
  try {
    data = JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch (e) { data = {}; }
  data.visits = (data.visits || 0) + 1;
  data.events = data.events || {};

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  }
  document.querySelectorAll("[data-track]").forEach(function (el) {
    el.addEventListener("click", function () {
      var k = el.getAttribute("data-track");
      data.events[k] = (data.events[k] || 0) + 1;
      save();
    });
  });
  save();
  window.__siteMetrics = function () { return data; };
})();
