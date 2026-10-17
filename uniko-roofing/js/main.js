/* Uniko Roofing Service - motor: cinta + lightbox, FAQ, reveals, counters, menu, form->WA */
(function(){
  "use strict";
  var WAF = "https://wa.me/17877571985?text=";
  var BIZ = "Uniko Roofing Service";
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  function openLb(fig){
    var im = fig.querySelector('img');
    lbImg.src = im.src; lbImg.alt = im.alt;
    lbCap.textContent = fig.getAttribute('data-cap') || '';
    lb.classList.add('open'); document.body.style.overflow = 'hidden';
  }
  function closeLb(){ lb.classList.remove('open'); document.body.style.overflow = ''; }
  document.querySelectorAll('.pol').forEach(function(fig){ fig.addEventListener('click', function(){ openLb(fig); }); });
  var lbx = document.getElementById('lbClose');
  if (lbx) lbx.addEventListener('click', closeLb);
  lb.addEventListener('click', function(e){ if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeLb(); });
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; q.setAttribute('aria-expanded', 'true'); }
    });
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target, target = parseInt(el.dataset.count || '0', 10), suf = el.dataset.suffix || '';
      var t0 = null, dur = 1400;
      function tick(t){
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * ease).toLocaleString('es-PR') + suf;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick); cio.unobserve(el);
    });
  }, {threshold: .5});
  document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });
  var btn = document.getElementById('menuBtn'), nav = document.getElementById('nav');
  if (btn) btn.addEventListener('click', function(){ nav.classList.toggle('open'); });
  nav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ nav.classList.remove('open'); }); });
  var header = document.getElementById('header');
  window.addEventListener('scroll', function(){
    header.style.boxShadow = window.scrollY > 10 ? '0 8px 30px rgba(0,0,0,.5)' : 'none';
  }, {passive:true});
  var form = document.getElementById('cform');
  if (form) {
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var nombre = document.getElementById('fNombre').value.trim();
      var servicio = document.getElementById('fServicio').value;
      var msg = document.getElementById('fMsg').value.trim();
      var text = 'Hola ' + BIZ + ', soy ' + nombre + '. Me interesa: ' + servicio + '.' + (msg ? ' ' + msg : '');
      window.open(WAF + encodeURIComponent(text), '_blank');
    });
  }
})();
