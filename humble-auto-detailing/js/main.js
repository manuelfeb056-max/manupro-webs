/* Humble Auto Detailing — PRECISION DETAILING LAB: scan-stage hero slideshow, gallery carousel (buttons + swipe), FAQ, reveals, counters */
(function () {
  "use strict";

  /* ---------- gallery carousel ---------- */
  var track = document.getElementById('galTrack');
  var viewport = document.getElementById('galViewport');
  var prev = document.getElementById('galPrev');
  var next = document.getElementById('galNext');
  if (track && viewport) {
    var slides = track.querySelectorAll('.gal-slide');
    var i = 0;
    var step = function () {
      var s = track.querySelector('.gal-slide');
      return s ? s.getBoundingClientRect().width + 18 : 320;
    };
    var perView = function () {
      var w = viewport.getBoundingClientRect().width;
      return Math.max(1, Math.floor((w + 18) / step()));
    };
    function maxI() { return Math.max(0, slides.length - perView()); }
    function go(n) {
      i = Math.min(maxI(), Math.max(0, n));
      track.style.transform = 'translateX(' + (-i * step()) + 'px)';
    }
    if (prev) prev.addEventListener('click', function () { go(i - 1); });
    if (next) next.addEventListener('click', function () { go(i + 1); });
    window.addEventListener('resize', function () { go(i); });
    // touch / swipe
    var x0 = null, dx = 0;
    viewport.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; dx = 0; }, { passive: true });
    viewport.addEventListener('touchmove', function (e) {
      if (x0 === null) return;
      dx = e.touches[0].clientX - x0;
    }, { passive: true });
    viewport.addEventListener('touchend', function () {
      if (x0 === null) return;
      if (dx < -40) go(i + 1);
      else if (dx > 40) go(i - 1);
      else go(i);
      x0 = null;
    }, { passive: true });
    // mouse drag
    var mdown = false, mx0 = 0, mdx = 0;
    viewport.addEventListener('mousedown', function (e) { mdown = true; mx0 = e.clientX; mdx = 0; });
    window.addEventListener('mouseup', function () {
      if (!mdown) return; mdown = false;
      if (mdx < -40) go(i + 1); else if (mdx > 40) go(i - 1); else go(i);
    });
    window.addEventListener('mousemove', function (e) { if (mdown) mdx = e.clientX - mx0; });
  }

  /* ---------- ticker: duplicate for seamless loop ---------- */
  var tick = document.getElementById('tickTrack');
  if (tick) tick.innerHTML += tick.innerHTML;

  /* ---------- hero scan-stage slideshow ---------- */
  var heroSlides = Array.prototype.slice.call(document.querySelectorAll('.scan-slide'));
  if (heroSlides.length > 1) {
    var h = 0;
    setInterval(function () {
      heroSlides[h].classList.remove('on');
      h = (h + 1) % heroSlides.length;
      heroSlides[h].classList.add('on');
    }, 4000);
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (el) { el.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* ---------- counters ---------- */
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      cio.unobserve(el);
      var target = parseFloat(el.dataset.count);
      var dec = parseInt(el.dataset.dec || '0', 10);
      var suf = el.dataset.suffix || '';
      var t0 = null, dur = 1200;
      function frame(t) {
        if (!t0) t0 = t;
        var p = Math.min(1, (t - t0) / dur);
        var v = target * (1 - Math.pow(1 - p, 3));
        el.textContent = v.toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(function (el) { cio.observe(el); });

  /* ---------- smooth anchor ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
})();
