/* ============ TRANSIT WASH ============ */
(function () {
  'use strict';
  var body = document.body;

  /* ---------- Sistema de burbujas ---------- */
  function makeBubbles(canvas, count) {
    if (!canvas) return null;
    var ctx = canvas.getContext('2d'), W, H, parts = [], bursts = [];
    function size() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    size(); window.addEventListener('resize', size);
    function bubble(anywhere) {
      return { x: Math.random() * W, y: anywhere ? Math.random() * H : H + 20,
        r: 1.5 + Math.random() * 5, s: .4 + Math.random() * 1.4,
        wob: Math.random() * Math.PI * 2, ws: .01 + Math.random() * .03,
        a: .12 + Math.random() * .3 };
    }
    for (var i = 0; i < count; i++) parts.push(bubble(true));
    function burst(x, y, n, done) {
      for (var i = 0; i < n; i++) {
        var ang = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 7;
        bursts.push({ x: x, y: y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp,
          r: 2 + Math.random() * 7, life: 1, decay: .008 + Math.random() * .014 });
      }
      if (done) setTimeout(done, 1100);
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      var i, p;
      for (i = 0; i < parts.length; i++) {
        p = parts[i]; p.y -= p.s; p.wob += p.ws; p.x += Math.sin(p.wob) * .5;
        if (p.y < -20) parts[i] = bubble(false);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.strokeStyle = 'rgba(126,224,255,' + p.a + ')'; ctx.lineWidth = 1.2; ctx.stroke();
        ctx.beginPath(); ctx.arc(p.x - p.r * .3, p.y - p.r * .3, p.r * .3, 0, 7);
        ctx.fillStyle = 'rgba(255,255,255,' + (p.a * .8) + ')'; ctx.fill();
      }
      for (i = bursts.length - 1; i >= 0; i--) {
        p = bursts[i]; p.x += p.vx; p.y += p.vy; p.vy += .12; p.vx *= .985; p.life -= p.decay;
        if (p.life <= 0) { bursts.splice(i, 1); continue; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life + .5, 0, 7);
        ctx.strokeStyle = 'rgba(126,224,255,' + (p.life * .9) + ')'; ctx.lineWidth = 1.6; ctx.stroke();
      }
      requestAnimationFrame(frame);
    }
    frame();
    return { burst: burst };
  }

  var introBubbles = makeBubbles(document.getElementById('introBubbles'), 40);
  makeBubbles(document.getElementById('heroBubbles'), 26);
  makeBubbles(document.getElementById('brandBubbles'), 20);

  /* ---------- Intro cinematografica ---------- */
  var intro = document.getElementById('intro');
  if (document.documentElement.classList.contains('no-intro')) {
    if (intro) intro.remove();
  } else if (intro) {
    body.classList.add('locked');
    var splash = document.getElementById('introSplash'),
        cinema = document.getElementById('introCinema'),
        video = document.getElementById('introVideo'),
        skip = document.getElementById('introSkip'),
        enter = document.getElementById('splashEnter'),
        loading = document.getElementById('splashLoading'),
        prog = document.getElementById('introProg'),
        burstCv = document.getElementById('burstCanvas'),
        state = 'loading', exiting = false, tried = false;

    function showEnter(label, icon) {
      loading.style.display = 'none'; enter.hidden = false;
      enter.innerHTML = icon + label;
    }
    var ICON_SPK = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9.4 9.4 0 0 1 0 13"/></svg>';
    var ICON_GO = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

    function enterCinema() {
      if (state === 'cinema') return;
      state = 'cinema';
      splash.classList.add('hide');
      cinema.classList.add('open');
      cinema.setAttribute('aria-hidden', 'false');
    }
    function exitIntro() {
      if (exiting) return; exiting = true;
      try { video.pause(); } catch (e) {}
      skip.classList.add('hide');
      var r = burstCv.getBoundingClientRect();
      var fx = makeBubbles(burstCv, 0);
      if (fx) fx.burst(r.width / 2, r.height / 2, 130, finish);
      else finish();
      function finish() {
        intro.style.transition = 'opacity .5s ease'; intro.style.opacity = '0';
        setTimeout(function () {
          intro.remove();
          body.classList.remove('locked');
          try { sessionStorage.setItem('tw_intro', 'seen'); } catch (e) {}
          requestAnimationFrame(startReveals);
        }, 480);
      }
    }
    function attemptPlay() {
      if (tried) return; tried = true;
      video.muted = false; video.volume = 1;
      var pr = video.play();
      if (pr && pr.catch) pr.then(enterCinema, function () {
        state = 'tap';
        showEnter('TOCA PARA VER CON SONIDO', ICON_SPK);
      });
    }
    video.addEventListener('canplay', attemptPlay);
    video.addEventListener('error', function () {
      state = 'novid';
      showEnter('ENTRAR AL SITIO', ICON_GO);
    }, true);
    video.addEventListener('timeupdate', function () {
      if (video.duration) prog.style.width = (video.currentTime / video.duration * 100) + '%';
    });
    video.addEventListener('ended', exitIntro);
    enter.addEventListener('click', function () {
      if (state === 'tap') {
        video.muted = false;
        video.play().then(enterCinema, exitIntro);
      } else exitIntro();
    });
    skip.addEventListener('click', exitIntro);
    setTimeout(function () { /* video ausente o lento: modo entrada directa */
      if (state === 'loading' && video.readyState < 2) {
        state = 'novid';
        showEnter('ENTRAR AL SITIO', ICON_GO);
      }
    }, 9000);
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

  /* ---------- Acordeon FAQ ---------- */
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

  /* ---------- Reveal on scroll ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  function startReveals() { document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { io.observe(el); }); }
  window.startReveals = startReveals;
  startReveals();

  /* ---------- Tilt 3D en cards ---------- */
  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.tilt').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect(),
            x = (e.clientX - r.left) / r.width - .5,
            y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = 'perspective(800px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  }
})();
