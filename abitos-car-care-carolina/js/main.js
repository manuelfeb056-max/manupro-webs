/* interactividad del sitio */
(function(){
  "use strict";
  // menú
  var menuBtn = document.getElementById('menuBtn'), nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
    document.addEventListener('click', function(e){
      if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) nav.classList.remove('open');
    });
  }
  // reveal
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  // galería slider
  var vp = document.getElementById('galViewport'), track = document.getElementById('galTrack');
  var cards = track ? Array.prototype.slice.call(track.querySelectorAll('.case')) : [];
  var dotsBox = document.getElementById('galDots'), dots = [];
  if (vp && dotsBox) {
    cards.forEach(function(_, i){
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Ir a la foto ' + (i+1));
      b.addEventListener('click', function(){ cards[i].scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'}); });
      dotsBox.appendChild(b); dots.push(b);
    });
    function mark(){
      var best = 0, bd = Infinity, vc = vp.scrollLeft + vp.clientWidth/2;
      cards.forEach(function(c, i){
        var d = Math.abs((c.offsetLeft + c.offsetWidth/2) - vc);
        if (d < bd) { bd = d; best = i; }
      });
      dots.forEach(function(d, i){ d.classList.toggle('on', i === best); });
    }
    vp.addEventListener('scroll', function(){
      if (!vp._t) vp._t = setTimeout(function(){ vp._t = null; mark(); }, 120);
    }, {passive:true});
    mark();
    var prev = document.getElementById('galPrev'), next = document.getElementById('galNext');
    if (prev) prev.addEventListener('click', function(){ vp.scrollBy({left:-380, behavior:'smooth'}); });
    if (next) next.addEventListener('click', function(){ vp.scrollBy({left:380, behavior:'smooth'}); });
  }
  // lightbox (todas las galerías)
  var allCards = Array.prototype.slice.call(document.querySelectorAll('.case'));
  var lb = document.getElementById('lightbox'), lbImg = document.getElementById('lbImg'), lbCap = document.getElementById('lbCap');
  var idx = 0;
  function openLb(i){
    if (!allCards.length) return;
    idx = (i + allCards.length) % allCards.length;
    var img = allCards[idx].querySelector('img');
    lbImg.src = img.src; lbImg.alt = img.alt;
    lbCap.textContent = img.alt;
    lb.classList.add('open'); lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeLb(){
    lb.classList.remove('open'); lb.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  allCards.forEach(function(c, i){ c.addEventListener('click', function(){ openLb(i); }); });
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbPrev').addEventListener('click', function(e){ e.stopPropagation(); openLb(idx-1); });
  document.getElementById('lbNext').addEventListener('click', function(e){ e.stopPropagation(); openLb(idx+1); });
  lb.addEventListener('click', function(e){ if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeLb(); });
  // parallax hero
  var hero = document.querySelector('.hero-spotlight, .hero-marquee');
  if (hero) {
    window.addEventListener('scroll', function(){
      var y = window.scrollY;
      if (y < window.innerHeight) hero.style.backgroundPosition = 'center ' + (y * .35) + 'px';
    }, {passive:true});
  }
  // formulario -> WhatsApp del negocio
  var form = document.getElementById('quoteForm');
  var chosen = [];
  document.querySelectorAll('.chip').forEach(function(ch){
    ch.addEventListener('click', function(){
      ch.classList.toggle('on');
      var s = ch.getAttribute('data-svc');
      var i = chosen.indexOf(s);
      if (i > -1) chosen.splice(i,1); else chosen.push(s);
    });
  });
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var err = document.getElementById('formErr');
      var name = document.getElementById('qName').value.trim();
      var phone = document.getElementById('qPhone').value.trim();
      var msg = document.getElementById('qMsg').value.trim();
      var digits = phone.replace(/\D/g, '');
      if (name.length < 2) { err.textContent = 'Escribe tu nombre.'; return; }
      if (digits.length < 7) { err.textContent = 'Escribe un teléfono válido.'; return; }
      if (!chosen.length && !msg) { err.textContent = 'Elige un servicio o cuéntanos qué necesitas.'; return; }
      err.textContent = '';
      var text = 'Hola, soy ' + name + ' (' + phone + '). Me interesa: ' +
                 (chosen.length ? chosen.join(', ') : 'cotización general') +
                 (msg ? '. Detalles: ' + msg : '');
      window.open(SITE_WA + '?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();
