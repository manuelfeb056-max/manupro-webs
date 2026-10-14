/* 911 AutoDetailing & Car Wash — interactividad */
(function(){
  "use strict";

  // ---------- menú off-canvas ----------
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }

  // ---------- reveal ----------
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // ---------- galería: flechas + dots ----------
  var vp = document.getElementById('galViewport');
  var track = document.getElementById('galTrack');
  var cards = track ? Array.prototype.slice.call(track.querySelectorAll('.case')) : [];
  var dotsBox = document.getElementById('galDots');
  var dots = [];
  if (vp && dotsBox) {
    cards.forEach(function(_, i){
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Ir a la foto ' + (i+1));
      b.addEventListener('click', function(){ cards[i].scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'}); });
      dotsBox.appendChild(b); dots.push(b);
    });
    function mark(){
      var best = 0, bestD = Infinity;
      var vc = vp.scrollLeft + vp.clientWidth/2;
      cards.forEach(function(c, i){
        var cc = c.offsetLeft + c.offsetWidth/2;
        var d = Math.abs(cc - vc);
        if (d < bestD) { bestD = d; best = i; }
      });
      dots.forEach(function(d, i){ d.classList.toggle('on', i === best); });
    }
    vp.addEventListener('scroll', function(){
      if (!vp._t) vp._t = setTimeout(function(){ vp._t = null; mark(); }, 120);
    }, {passive:true});
    mark();
    var prev = document.getElementById('galPrev'), next = document.getElementById('galNext');
    if (prev) prev.addEventListener('click', function(){ vp.scrollBy({left: -360, behavior:'smooth'}); });
    if (next) next.addEventListener('click', function(){ vp.scrollBy({left: 360, behavior:'smooth'}); });
  }

  // ---------- lightbox ----------
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var idx = 0;
  function openLb(i){
    idx = (i + cards.length) % cards.length;
    var img = cards[idx].querySelector('img');
    lbImg.src = img.src; lbImg.alt = img.alt;
    lbCap.textContent = img.alt;
    lb.classList.add('open'); lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeLb(){
    lb.classList.remove('open'); lb.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  cards.forEach(function(c, i){
    c.addEventListener('click', function(){ openLb(i); });
  });
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbPrev').addEventListener('click', function(e){ e.stopPropagation(); openLb(idx-1); });
  document.getElementById('lbNext').addEventListener('click', function(e){ e.stopPropagation(); openLb(idx+1); });
  lb.addEventListener('click', function(e){ if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function(e){
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') openLb(idx-1);
    if (e.key === 'ArrowRight') openLb(idx+1);
  });

  // ---------- faq ----------
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      if (!open) {
        item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded','true');
      }
    });
  });

  // ---------- contadores ----------
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      var el = e.target, target = parseInt(el.dataset.count, 10) || 0, suf = el.dataset.suffix || '';
      var t0 = performance.now(), dur = 1400;
      (function step(t){
        var p = Math.min(1, (t - t0)/dur);
        el.textContent = Math.round(target * (1 - Math.pow(1-p, 3))) + suf;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, {threshold:.5});
  document.querySelectorAll('.stat-num').forEach(function(el){ cio.observe(el); });

  // ---------- formulario → WhatsApp ----------
  var form = document.getElementById('cform');
  if (form) form.addEventListener('submit', function(e){
    e.preventDefault();
    var n = document.getElementById('fNombre').value.trim();
    var s = document.getElementById('fServicio').value;
    var m = document.getElementById('fMsg').value.trim();
    var txt = 'Hola 911 AutoDetailing, soy ' + (n || 'un cliente') + '. Me interesa: ' + s + '.' + (m ? ' ' + m : '');
    window.open('https://wa.me/17873246677?text=' + encodeURIComponent(txt), '_blank');
  });
})();
