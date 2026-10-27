(function () {
  'use strict';
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  var btn = document.getElementById('menuBtn'), ov = document.getElementById('menuOverlay'), cl = document.getElementById('menuClose');
  function tog(open) { ov.classList.toggle('open', open); ov.setAttribute('aria-hidden', String(!open)); document.body.classList.toggle('locked', open); }
  btn.addEventListener('click', function () { tog(true); });
  cl.addEventListener('click', function () { tog(false); });
  ov.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { tog(false); }); });
  document.querySelectorAll('.acc-item').forEach(function (item) {
    var q = item.querySelector('.acc-q'), a = item.querySelector('.acc-a');
    q.addEventListener('click', function () {
      var open = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function (o) { o.classList.remove('open'); o.querySelector('.acc-a').style.maxHeight = null; });
      if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });
  var track = document.getElementById('galTrack');
  if (track) {
    var vp = document.getElementById('galViewport'), prev = document.getElementById('galPrev'), next = document.getElementById('galNext');
    function step() { var c = track.children[0]; return c ? c.getBoundingClientRect().width + 16 : 340; }
    prev.addEventListener('click', function () { vp.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { vp.scrollBy({ left: step(), behavior: 'smooth' }); });
  }
  var form = document.getElementById('waForm');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = document.getElementById('fName').value.trim();
      var svc = document.getElementById('fSvc').value;
      var msg = document.getElementById('fMsg').value.trim();
      var biz = form.getAttribute('data-biz');
      var phone = form.getAttribute('data-phone');
      var text = "Hola " + biz + ", soy " + name + ". Quiero cotizar: " + svc + ". " + msg;
      window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(text), "_blank");
    });
  }
})();
