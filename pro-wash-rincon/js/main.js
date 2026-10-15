/* Interactividad — Manupro batch d59 grupo AB */
(function(){
  "use strict";
  // menú
  var menuBtn = document.getElementById('menuBtn');
  var drawer = document.getElementById('drawer');
  var scrim = document.getElementById('scrim');
  var drawerClose = document.getElementById('drawerClose');
  function setMenu(open){
    drawer.classList.toggle('open', open);
    scrim.classList.toggle('on', open);
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (menuBtn && drawer){
    menuBtn.addEventListener('click', function(){ setMenu(!drawer.classList.contains('open')); });
    if (drawerClose) drawerClose.addEventListener('click', function(){ setMenu(false); });
    if (scrim) scrim.addEventListener('click', function(){ setMenu(false); });
    drawer.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ setMenu(false); }); });
  }
  // reveal
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  // galería
  var vp = document.getElementById('galViewport');
  var track = document.getElementById('galTrack');
  var cards = track ? Array.prototype.slice.call(track.querySelectorAll('.shot')) : [];
  var dotsBox = document.getElementById('galDots');
  var dots = [];
  if (vp && dotsBox){
    cards.forEach(function(_, i){
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Ir a la foto ' + (i+1));
      b.addEventListener('click', function(){ cards[i].scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'}); });
      dotsBox.appendChild(b); dots.push(b);
    });
    function mark(){
      var best = 0, bestD = Infinity, vc = vp.scrollLeft + vp.clientWidth/2;
      cards.forEach(function(c, i){ var d = Math.abs((c.offsetLeft + c.offsetWidth/2) - vc); if (d < bestD){ bestD = d; best = i; } });
      dots.forEach(function(d, i){ d.classList.toggle('on', i === best); });
    }
    vp.addEventListener('scroll', function(){ if (!vp._t) vp._t = setTimeout(function(){ vp._t = null; mark(); }, 120); }, {passive:true});
    mark();
    var prev = document.getElementById('galPrev'), next = document.getElementById('galNext');
    if (prev) prev.addEventListener('click', function(){ vp.scrollBy({left: -360, behavior:'smooth'}); });
    if (next) next.addEventListener('click', function(){ vp.scrollBy({left: 360, behavior:'smooth'}); });
  }
  // lightbox
  var lb = document.getElementById('lightbox'), lbImg = document.getElementById('lbImg'), lbCap = document.getElementById('lbCap'), idx = 0;
  function openLb(i){
    if (!cards.length) return;
    idx = (i + cards.length) % cards.length;
    var img = cards[idx].querySelector('img');
    lbImg.src = img.src; lbImg.alt = img.alt; lbCap.textContent = img.alt;
    lb.classList.add('open'); lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeLb(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }
  cards.forEach(function(c, i){ c.addEventListener('click', function(){ openLb(i); }); });
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
  // faq
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      if (!open){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; q.setAttribute('aria-expanded','true'); }
    });
  });
  // chips de servicio
  var chipsBox = document.getElementById('chips');
  if (chipsBox){
    chipsBox.querySelectorAll('.chip').forEach(function(ch){
      ch.addEventListener('click', function(){
        chipsBox.querySelectorAll('.chip').forEach(function(o){ o.classList.remove('on'); });
        ch.classList.add('on');
      });
    });
  }
  // formulario → WhatsApp del negocio (con validación)
  var form = document.getElementById('cform');
  if (form) form.addEventListener('submit', function(e){
    e.preventDefault();
    var err = document.getElementById('qfErr');
    var n = document.getElementById('fNombre').value.trim();
    var t = document.getElementById('fTel').value.trim();
    var m = document.getElementById('fMsg').value.trim();
    var svcEl = chipsBox ? chipsBox.querySelector('.chip.on') : null;
    var svc = svcEl ? svcEl.dataset.svc : '';
    var fails = [];
    if (n.length < 2) fails.push('tu nombre');
    var digits = t.replace(/\D/g, '');
    if (digits.length < 7) fails.push('un teléfono válido');
    if (!svc) fails.push('un servicio');
    if (fails.length){
      err.hidden = false;
      err.textContent = 'Falta: ' + fails.join(', ') + '.';
      return;
    }
    err.hidden = true;
    var cfg = window.__QUOTE_CFG__ || {};
    var txt = 'Hola ' + (cfg.biz || '') + ', soy ' + n + ' (' + t + '). Me interesa: ' + svc + '.' + (m ? ' Detalles: ' + m : '');
    window.open('https://wa.me/' + (cfg.wa || '') + '?text=' + encodeURIComponent(txt), '_blank');
  });
})();
