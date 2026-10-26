/* ============ CJ AUTO DETAILING ============ */
(function () {
  'use strict';
  var body = document.body;

  /* ---------- Reveal suave ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  function startReveals() { document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { io.observe(el); }); }
  window.startReveals = startReveals;

  /* ---------- Intro con video de fondo ---------- */
  var intro = document.getElementById('intro');
  if (document.documentElement.classList.contains('no-intro')) {
    if (intro) intro.remove();
    startReveals();
  } else if (intro) {
    body.classList.add('locked');
    var video = document.getElementById('introVideo'),
        skip = document.getElementById('introSkip'),
        enter = document.getElementById('splashEnter'),
        burstCv = document.getElementById('burstCanvas'),
        exiting = false;
    try { var pr = video.play(); if (pr && pr.catch) pr.catch(function () {}); } catch (e) {}
    function burstAndFinish() {
      var r = burstCv.getBoundingClientRect();
      burstCv.width = burstCv.offsetWidth; burstCv.height = burstCv.offsetHeight;
      var ctx = burstCv.getContext('2d'), parts = [];
      for (var i = 0; i < 130; i++) {
        var ang = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 7;
        parts.push({ x: r.width / 2, y: r.height / 2, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, r: 2 + Math.random() * 6, life: 1, decay: .008 + Math.random() * .014 });
      }
      (function frame() {
        ctx.clearRect(0, 0, r.width, r.height);
        for (var j = parts.length - 1; j >= 0; j--) {
          var p = parts[j]; p.x += p.vx; p.y += p.vy; p.vy += .12; p.vx *= .985; p.life -= p.decay;
          if (p.life <= 0) { parts.splice(j, 1); continue; }
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life + .5, 0, 7);
          ctx.strokeStyle = 'rgba(255,34,34,' + (p.life * .9) + ')'; ctx.lineWidth = 1.6; ctx.stroke();
        }
        if (parts.length) requestAnimationFrame(frame);
      })();
      setTimeout(finish, 1050);
    }
    function finish() {
      intro.style.transition = 'opacity .55s ease'; intro.style.opacity = '0';
      setTimeout(function () {
        intro.remove();
        body.classList.remove('locked');
        try { sessionStorage.setItem('cj_intro', 'seen'); } catch (e) {}
        requestAnimationFrame(startReveals);
      }, 520);
    }
    function exitIntro() {
      if (exiting) return; exiting = true;
      try { video.pause(); } catch (e) {}
      skip.classList.add('hide');
      burstAndFinish();
    }
    enter.addEventListener('click', exitIntro);
    skip.addEventListener('click', exitIntro);
  } else {
    startReveals();
  }

  /* ---------- Menu ---------- */
  var menuBtn = document.getElementById('menuBtn'),
      overlay = document.getElementById('menuOverlay'),
      menuClose = document.getElementById('menuClose');
  function toggleMenu(open) {
    overlay.classList.toggle('open', open);
    overlay.setAttribute('aria-hidden', String(!open));
    body.classList.toggle('locked', open && !document.getElementById('intro'));
  }
  menuBtn.addEventListener('click', function () { toggleMenu(true); });
  menuClose.addEventListener('click', function () { toggleMenu(false); });
  overlay.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { toggleMenu(false); });
  });

  /* ---------- FAQ ---------- */
  document.querySelectorAll('.acc-item').forEach(function (item) {
    var q = item.querySelector('.acc-q'), a = item.querySelector('.acc-a');
    q.addEventListener('click', function () {
      var open = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function (o) {
        o.classList.remove('open'); o.querySelector('.acc-a').style.maxHeight = null;
      });
      if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ---------- Galeria ---------- */
  var track = document.getElementById('galTrack');
  if (track) {
    var cards = track.children, prev = document.getElementById('galPrev'), next = document.getElementById('galNext'), dotsBox = document.getElementById('galDots'), dots = [], cur = 0, timer = null;
    function step() { var c = cards[0]; return c ? c.getBoundingClientRect().width + 16 : 356; }
    function visible() { var vp = document.getElementById('galViewport'); return Math.max(1, Math.floor(vp.getBoundingClientRect().width / step())); }
    function maxIdx() { return Math.max(0, cards.length - visible()); }
    function go(i) {
      cur = Math.min(Math.max(i, 0), maxIdx());
      track.style.transform = 'translateX(' + (-cur * step()) + 'px)';
      dots.forEach(function (d, j) { d.classList.toggle('on', j === cur); });
    }
    for (var i = 0; i < cards.length; i++) {
      (function (i) {
        var b = document.createElement('button'); b.setAttribute('aria-label', 'Foto ' + (i + 1));
        b.addEventListener('click', function () { go(i); restart(); });
        dotsBox.appendChild(b); dots.push(b);
      })(i);
    }
    function restart() {
      clearInterval(timer);
      timer = setInterval(function () { go(cur + 1 >= maxIdx() + 1 ? 0 : cur + 1); }, 4500);
    }
    prev.addEventListener('click', function () { go(cur - 1); restart(); });
    next.addEventListener('click', function () { go(cur + 1); restart(); });
    window.addEventListener('resize', function () { go(cur); });
    go(0); restart();
  }

  /* ---------- Tilt 3D suave en cards ---------- */
  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.tilt').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect(),
            x = (e.clientX - r.left) / r.width - .5,
            y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = 'perspective(800px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  }
})();
