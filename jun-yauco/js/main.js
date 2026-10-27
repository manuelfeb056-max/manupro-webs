(function () {
  "use strict";
  var body = document.body;
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  var menuBtn = document.getElementById("menuBtn"),
      overlay = document.getElementById("menuOverlay"),
      menuClose = document.getElementById("menuClose");
  function toggleMenu(open) {
    overlay.classList.toggle("open", open);
    overlay.setAttribute("aria-hidden", String(!open));
    body.classList.toggle("locked", open);
  }
  menuBtn.addEventListener("click", function () { toggleMenu(true); });
  menuClose.addEventListener("click", function () { toggleMenu(false); });
  overlay.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { toggleMenu(false); });
  });
  function bindAccordion(itemSel, qSel, aSel) {
    document.querySelectorAll(itemSel).forEach(function (item) {
      var q = item.querySelector(qSel), a = item.querySelector(aSel);
      if (!q || !a) return;
      q.addEventListener("click", function () {
        var open = item.classList.contains("open");
        document.querySelectorAll(itemSel + ".open").forEach(function (o) {
          o.classList.remove("open");
          var oa = o.querySelector(aSel);
          if (oa) oa.style.maxHeight = null;
        });
        if (!open) { item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
      });
    });
  }
  bindAccordion(".acc-item", ".acc-q", ".acc-a");
  bindAccordion(".phase-item", ".phase-q", ".phase-a");
  var track = document.getElementById("galTrack");
  if (track) {
    var cards = track.children, prev = document.getElementById("galPrev"), next = document.getElementById("galNext"), dotsBox = document.getElementById("galDots"), dots = [], cur = 0, timer = null;
    function step() { var c = cards[0]; return c ? c.getBoundingClientRect().width + 16 : 356; }
    function visible() { var vp = document.getElementById("galViewport"); return Math.max(1, Math.floor(vp.getBoundingClientRect().width / step())); }
    function maxIdx() { return Math.max(0, cards.length - visible()); }
    function go(i) {
      cur = Math.min(Math.max(i, 0), maxIdx());
      track.style.transform = "translateX(" + (-cur * step()) + "px)";
      dots.forEach(function (d, j) { d.classList.toggle("on", j === cur); });
    }
    for (var i = 0; i < cards.length; i++) {
      (function (i) {
        var b = document.createElement("button"); b.setAttribute("aria-label", "Foto " + (i + 1));
        b.addEventListener("click", function () { go(i); restart(); });
        dotsBox.appendChild(b); dots.push(b);
      })(i);
    }
    function restart() {
      clearInterval(timer);
      timer = setInterval(function () { go(cur + 1 >= maxIdx() + 1 ? 0 : cur + 1); }, 4500);
    }
    prev.addEventListener("click", function () { go(cur - 1); restart(); });
    next.addEventListener("click", function () { go(cur + 1); restart(); });
    window.addEventListener("resize", function () { go(cur); });
    go(0); restart();
  }
  var form = document.getElementById("waForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("waName").value.trim();
      var svc = document.getElementById("waService").value;
      var msg = document.getElementById("waMsg").value.trim();
      var text = "Hola " + form.dataset.biz + ", ";
      if (name) text += "soy " + name + ". ";
      if (svc) text += "Me interesa: " + svc + ". ";
      if (msg) text += msg;
      if (!name && !msg) text += "quiero cotizar un servicio.";
      window.open("https://wa.me/" + form.dataset.wa + "?text=" + encodeURIComponent(text), "_blank");
    });
  }
})();
