/* Christian Window Tints — main.js: FAQ accordion, lightbox, reveal-on-scroll, header shrink */
(function () {
  "use strict";

  /* ---------- FAQ accordion ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
  items.forEach(function (it) {
    var q = it.querySelector(".faq-q"), a = it.querySelector(".faq-a");
    q.addEventListener("click", function () {
      var open = it.classList.contains("open");
      items.forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!open) {
        it.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ---------- galería: lightbox con X ---------- */
  var frames = Array.prototype.slice.call(document.querySelectorAll(".work-frame"));
  var lb = document.getElementById("lb");
  if (frames.length && lb) {
    var lbImg = document.getElementById("lbImg"), lbCap = document.getElementById("lbCap");
    var cur = 0;
    function show(n) {
      cur = (n + frames.length) % frames.length;
      var img = frames[cur].querySelector("img");
      lbImg.src = img.src; lbImg.alt = img.alt;
      lbCap.textContent = frames[cur].querySelector("figcaption").textContent;
    }
    function openLb(n) {
      show(n);
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeLb() {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    frames.forEach(function (f, i) {
      f.addEventListener("click", function () { openLb(i); });
      f.setAttribute("tabindex", "0");
      f.setAttribute("role", "button");
      f.addEventListener("keydown", function (e) { if (e.key === "Enter") openLb(i); });
    });
    document.getElementById("lbX").addEventListener("click", closeLb);
    document.getElementById("lbPrev").addEventListener("click", function (e) { e.stopPropagation(); show(cur - 1); });
    document.getElementById("lbNext").addEventListener("click", function (e) { e.stopPropagation(); show(cur + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
  }

  /* ---------- reveal on scroll ---------- */
  var rev = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && rev.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    rev.forEach(function (el) { io.observe(el); });
  } else {
    rev.forEach(function (el) { el.classList.add("in"); });
  }
})();
