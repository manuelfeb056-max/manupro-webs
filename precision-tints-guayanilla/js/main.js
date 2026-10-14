(function(){
  "use strict";

  /* ---------- hero video: si el mp4 aún no existe, queda la foto ---------- */
  var hv = document.getElementById('heroVideo');
  if (hv) {
    hv.addEventListener('canplay', function(){ hv.classList.add('on'); });
    var killed = false;
    function kill(){ if(!killed){ killed = true; hv.remove(); } }
    hv.addEventListener('error', kill, true);
    setTimeout(function(){ if (hv.readyState < 2) kill(); }, 6000);
  }

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* ---------- mobile menu ---------- */
  var btn = document.getElementById('menuBtn'), nav = document.getElementById('nav');
  if (btn) btn.addEventListener('click', function(){ nav.classList.toggle('open'); });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ nav.classList.remove('open'); });
  });

  /* ---------- header shadow ---------- */
  var header = document.getElementById('header');
  window.addEventListener('scroll', function(){
    header.style.boxShadow = window.scrollY > 10 ? '0 8px 30px rgba(0,0,0,.5)' : 'none';
  }, {passive:true});

  /* ---------- gallery carousel ---------- */
  var track = document.getElementById('galTrack'),
      vp = document.getElementById('galViewport'),
      dots = document.getElementById('galDots'),
      cards = track ? Array.prototype.slice.call(track.children) : [];
  if (track) {
    cards.forEach(function(_, i){
      var d = document.createElement('button');
      d.setAttribute('aria-label', 'Ir a la foto ' + (i+1));
      d.addEventListener('click', function(){ goTo(i); });
      dots.appendChild(d);
    });
    function cardW(){ return cards[0].getBoundingClientRect().width + 18; }
    function cur(){ return Math.round(track.scrollLeft / cardW()); }
    function goTo(i){
      i = Math.max(0, Math.min(cards.length - 1, i));
      track.scrollTo({left: i * cardW(), behavior: 'smooth'});
    }
    function paintDots(){
      var c = cur();
      Array.prototype.forEach.call(dots.children, function(d, i){
        d.classList.toggle('on', i === c);
      });
    }
    document.getElementById('galPrev').addEventListener('click', function(){ goTo(cur() - 1); });
    document.getElementById('galNext').addEventListener('click', function(){ goTo(cur() + 1); });
    var t;
    track.addEventListener('scroll', function(){ clearTimeout(t); t = setTimeout(paintDots, 120); }, {passive:true});
    window.addEventListener('resize', paintDots);
    paintDots();
  }

  /* ---------- lightbox ---------- */
  var lb = document.getElementById('lightbox'),
      lbImg = document.getElementById('lbImg'),
      lbCap = document.getElementById('lbCap'),
      lbIdx = 0;
  function openLb(i){
    lbIdx = (i + cards.length) % cards.length;
    var img = cards[lbIdx].querySelector('img');
    lbImg.src = img.src; lbImg.alt = img.alt;
    lbCap.textContent = cards[lbIdx].querySelector('figcaption').textContent;
    lb.classList.add('open'); lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeLb(){
    lb.classList.remove('open'); lb.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  if (cards.length) {
    cards.forEach(function(c, i){ c.addEventListener('click', function(){ openLb(i); }); });
    document.getElementById('lbClose').addEventListener('click', closeLb);
    document.getElementById('lbPrev').addEventListener('click', function(e){ e.stopPropagation(); openLb(lbIdx - 1); });
    document.getElementById('lbNext').addEventListener('click', function(e){ e.stopPropagation(); openLb(lbIdx + 1); });
    lb.addEventListener('click', function(e){ if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function(e){
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') openLb(lbIdx - 1);
      if (e.key === 'ArrowRight') openLb(lbIdx + 1);
    });
  }

  /* ---------- faq accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      if (!open){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded','true');
      }
    });
  });

  /* ---------- counters ---------- */
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(el){
      if (!el.isIntersecting) return;
      var end = parseInt(el.getAttribute('data-count'), 10) || 0,
          suf = el.getAttribute('data-suffix') || '',
          start = null, dur = 1200;
      function tick(ts){
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1),
            v = Math.round(end * (1 - Math.pow(1 - p, 3)));
        el.textContent = v.toLocaleString('es-PR') + suf;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, {threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });

  /* ---------- form -> WhatsApp ---------- */
  var form = document.getElementById('cform');
  if (form) {
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var nombre = document.getElementById('fNombre').value.trim();
      var servicio = document.getElementById('fServicio').value;
      var msg = document.getElementById('fMsg').value.trim();
      var text = 'Hola Precision Tints, soy ' + nombre + '. Me interesa: ' + servicio + '.' + (msg ? ' ' + msg : '');
      window.open('https://wa.me/17876362451?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();
