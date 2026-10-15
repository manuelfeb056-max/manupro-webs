/* Overall Contractors Group, Inc. */
(function(){
  "use strict";

  /* ---------- Menú flotante ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var overlay = document.getElementById("menuOverlay");
  var menuClose = document.getElementById("menuClose");
  function setMenu(open){
    overlay.classList.toggle("open", open);
    overlay.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.style.overflow = open ? "hidden" : "";
  }
  menuBtn.addEventListener("click", function(){ setMenu(true); });
  menuClose.addEventListener("click", function(){ setMenu(false); });
  overlay.querySelectorAll(".menu-link").forEach(function(l){
    l.addEventListener("click", function(){ setMenu(false); });
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape") setMenu(false);
  });

  /* ---------- FAQ acordeón ---------- */
  document.querySelectorAll(".faq-item").forEach(function(item){
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    q.addEventListener("click", function(){
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function(o){
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add("visible"); io.unobserve(en.target); }
    });
  }, {threshold: 0.12});
  document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });

  /* ---------- Lluvia del hero + escudo dorado ---------- */
  var canvas = document.getElementById("rainCanvas");
  var hero = document.querySelector(".hero");
  var shield = document.getElementById("heroShield");
  if(canvas && hero){
    var ctx = canvas.getContext("2d");
    var W = 0, H = 0, drops = [], ripples = [];
    var DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize(){
      var r = hero.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    /* La "línea del techo": diagonal donde la lluvia se detiene */
    function roofY(x){
      return H * 0.16 + (x / W) * H * 0.34;
    }

    function spawnDrop(){
      return {
        x: Math.random() * (W + 80) - 40,
        y: -30,
        len: 14 + Math.random() * 22,
        speed: 7 + Math.random() * 7,
        drift: 1.5 + Math.random() * 2
      };
    }
    var COUNT = W < 640 ? 70 : 130;
    for(var i = 0; i < COUNT; i++){
      var d = spawnDrop();
      d.y = Math.random() * H;
      drops.push(d);
    }

    function tick(){
      ctx.clearRect(0, 0, W, H);

      /* gotas */
      ctx.lineWidth = 1.6;
      for(var i = 0; i < drops.length; i++){
        var d = drops[i];
        d.y += d.speed;
        d.x += d.drift;
        var hit = roofY(d.x);
        if(d.y >= hit && d.y <= hit + 26){
          /* la lluvia choca con el techo: destello dorado */
          ripples.push({x: d.x, y: hit, r: 2, max: 16 + Math.random() * 14, alpha: 0.85});
          var nd = spawnDrop();
          nd.x = Math.random() * (W + 80) - 40;
          drops[i] = nd;
          continue;
        }
        if(d.y > H + 40){
          drops[i] = spawnDrop();
          continue;
        }
        ctx.strokeStyle = "rgba(174,213,180,0.42)";
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.drift * 1.4, d.y - d.len);
        ctx.stroke();
      }

      /* destellos dorados */
      for(var j = ripples.length - 1; j >= 0; j--){
        var rp = ripples[j];
        rp.r += 1.4;
        rp.alpha -= 0.045;
        if(rp.alpha <= 0 || rp.r >= rp.max){ ripples.splice(j, 1); continue; }
        ctx.strokeStyle = "rgba(201,162,39," + rp.alpha.toFixed(3) + ")";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, Math.PI, Math.PI * 2);
        ctx.stroke();
      }

      requestAnimationFrame(tick);
    }
    tick();

    /* parallax del escudo con el mouse */
    hero.addEventListener("mousemove", function(e){
      var r = hero.getBoundingClientRect();
      var dx = (e.clientX - r.left) / r.width - 0.5;
      var dy = (e.clientY - r.top) / r.height - 0.5;
      shield.style.transform = "translateY(-50%) translate(" + (-dx * 26) + "px," + (-dy * 18) + "px)";
    });
  }
})();

/* ===== ELITE-PACK JS (mejora ligera 2026-10-15) ===== */
(function(){
  if (window.__elitePack) return; window.__elitePack = true;

  /* 1. reveal on scroll — suave, sin tocar el diseño base */
  var rsel = '.g-card,.svc-card,.faq-item,.plan,.ci-row,.stat,.case,.qp';
  var rels = Array.prototype.slice.call(document.querySelectorAll(rsel)).filter(function(el){
    return !el.classList.contains('reveal') && !el.classList.contains('elite-reveal');
  });
  rels.forEach(function(el){ el.classList.add('elite-reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold: .1, rootMargin: '0px 0px -40px 0px'});
    document.querySelectorAll('.elite-reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.elite-reveal').forEach(function(el){ el.classList.add('in'); });
  }
  /* si el sitio ya trae .reveal sin observer propio, lo activamos también */
  var own = Array.prototype.slice.call(document.querySelectorAll('.reveal:not(.visible):not(.in)'));
  if (own.length && 'IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io2.unobserve(e.target); } });
    }, {threshold: .1});
    own.forEach(function(el){
      var cs = getComputedStyle(el);
      if (cs.opacity === '0' || el.style.opacity === '0' || cs.transform !== 'none') io2.observe(el);
    });
  }

  /* 2. hover premium en tarjetas */
  document.querySelectorAll('.g-card,.svc-card,.case,.plan').forEach(function(el){
    el.classList.add('elite-card');
  });

  /* 3. fix menú: overlay por encima del botón + botón cerrar propio */
  var overlays = document.querySelectorAll('.menu-overlay,#menuOverlay,.nav');
  overlays.forEach(function(ov){
    ov.style.zIndex = '400';
    if (!ov.querySelector('.elite-mclose')) {
      var b = document.createElement('button');
      b.className = 'elite-mclose'; b.setAttribute('aria-label', 'Cerrar menú'); b.textContent = '×';
      b.addEventListener('click', function(){
        ov.classList.remove('open');
        document.querySelectorAll('.fab-menu.x,.menu-btn.x,#menuBtn.x').forEach(function(m){ m.classList.remove('x'); });
      });
      ov.appendChild(b);
    }
  });
  document.querySelectorAll('.fab-menu,.menu-btn,#menuBtn').forEach(function(m){ m.style.zIndex = '390'; });

  /* 4. formulario de cotización -> WhatsApp del negocio */
  var qf = document.getElementById('qform');
  if (qf && !qf.__eliteWired) {
    qf.__eliteWired = true;
    qf.addEventListener('submit', function(e){
      e.preventDefault();
      var v = function(id){ var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var n = v('qNombre'), t = v('qTel'), s = v('qServicio'), m = v('qMsg');
      var biz = qf.getAttribute('data-biz') || 'nuestro negocio';
      var wa = qf.getAttribute('data-wa') || '';
      if (!wa) return;
      var txt = 'Hola ' + biz + ', soy ' + (n || 'un cliente') + (t ? ' (' + t + ')' : '') + '. Necesito: ' + s + '.' + (m ? ' ' + m : '');
      window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(txt), '_blank');
    });
  }
})();
