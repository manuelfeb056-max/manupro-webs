/* RODZ — DEL FUTURO: hero carousel cinematográfico, lightbox, reveals, counters, menú móvil */
(function(){
  "use strict";

  /* Menú móvil */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if (menuBtn && nav){
    menuBtn.addEventListener('click', function(){
      nav.classList.toggle('open');
      menuBtn.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('open');
        menuBtn.classList.remove('open');
      });
    });
  }

  /* Hero carousel cinematográfico */
  var slides = document.querySelectorAll('#heroSlides .hero-slide');
  var dotsWrap = document.getElementById('heroDots');
  var cur = 0, timer = null;
  if (slides.length){
    slides.forEach(function(_, i){
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Foto ' + (i + 1));
      if (i === 0) b.classList.add('on');
      b.addEventListener('click', function(){ go(i); restart(); });
      dotsWrap.appendChild(b);
    });
    var dots = dotsWrap.querySelectorAll('button');
    function go(i){
      slides[cur].classList.remove('active');
      dots[cur].classList.remove('on');
      cur = (i + slides.length) % slides.length;
      slides[cur].classList.add('active');
      dots[cur].classList.add('on');
    }
    function restart(){
      if (timer) clearInterval(timer);
      timer = setInterval(function(){ go(cur + 1); }, 6000);
    }
    restart();
  }

  /* Reveal on scroll */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* Contadores */
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      var el = e.target, target = parseInt(el.dataset.count, 10) || 0;
      var suffix = el.dataset.suffix || '';
      var t0 = null, dur = 1600;
      function tick(t){
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var v = Math.floor(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = v.toLocaleString('es-PR') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, {threshold: .5});
  document.querySelectorAll('.stat-num').forEach(function(el){ cio.observe(el); });

  /* Lightbox galería */
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  if (lb && lbImg){
    var items = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
    var idx = 0;
    function show(i){
      idx = (i + items.length) % items.length;
      var img = items[idx].querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = items[idx].dataset.cap || img.alt;
    }
    items.forEach(function(fig, i){
      fig.addEventListener('click', function(){
        show(i);
        lb.classList.add('open');
        lb.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });
    function close(){
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      lbImg.src = '';
      document.body.style.overflow = '';
    }
    document.getElementById('lbX').addEventListener('click', function(e){ e.stopPropagation(); close(); });
    document.getElementById('lbPrev').addEventListener('click', function(e){ e.stopPropagation(); show(idx - 1); });
    document.getElementById('lbNext').addEventListener('click', function(e){ e.stopPropagation(); show(idx + 1); });
    lb.addEventListener('click', close);
    document.addEventListener('keydown', function(e){
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* Header sólido al hacer scroll */
  var header = document.getElementById('header');
  window.addEventListener('scroll', function(){
    header.style.background = window.scrollY > 40 ? 'rgba(7,8,10,.95)' : 'rgba(7,8,10,.82)';
  }, {passive: true});
})();
