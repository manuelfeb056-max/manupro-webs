/* ═══════════════════════════════════════════════════════════════════
   Omi Jumping · LA FIESTA — escena canvas interactiva (v11)
   Castillo inflable con 4 personajes brincando dentro, física
   squash & stretch, confetti + sonido al tocar. Sin dependencias,
   sin archivos externos. Se auto-inicializa si existe #fiestaCanvas.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  "use strict";
  var canvas = document.getElementById("fiestaCanvas");
  if(!canvas) return;
  var ctx = canvas.getContext("2d");
  if(!ctx) return;

  var COLORS = ["#ED1C24", "#FFD500", "#00AEEF", "#0B4DA2", "#FF5CA8", "#2FAE4E", "#FF8A00"];
  var W = 0, H = 0;
  var L = {};
  var skyGrad = null, grassGrad = null, baseGrad = null, bodyGrad = null;
  var t = 0, lastT = 0, rafId = 0, running = false, ioVisible = true;
  var reduced = false;
  try { reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch(e){}

  /* ── Física del castillo (resorte elástico) ── */
  var springX = 0, springV = 0;

  /* ── Personajes: siempre dentro de la abertura del castillo ── */
  var kids = [
    {fx: 0.16, skin: "#FFD9B3", shirt: "#ED1C24", pants: "#0B4DA2", hair: "#12233d", girl: false, jump: 1.00, y: 0, vy: 0, squash: 0, happyT: 0, sx: 1, sy: 1},
    {fx: 0.38, skin: "#C98B5E", shirt: "#FFD500", pants: "#ED1C24", hair: "#3a2417", girl: false, jump: 0.88, y: 0, vy: 0, squash: 0, happyT: 0, sx: 1, sy: 1},
    {fx: 0.60, skin: "#FFD9B3", shirt: "#00AEEF", pants: "#0B4DA2", hair: "#ED1C24", girl: true,  jump: 0.95, y: 0, vy: 0, squash: 0, happyT: 0, sx: 1, sy: 1},
    {fx: 0.82, skin: "#8D5524", shirt: "#FF5CA8", pants: "#0B4DA2", hair: "#12233d", girl: true,  jump: 1.06, y: 0, vy: 0, squash: 0, happyT: 0, sx: 1, sy: 1}
  ];
  /* Arranque desfasado: que no brinquen al mismo tiempo */
  kids[0].vy = 480; kids[1].vy = 120; kids[2].vy = 600; kids[3].vy = 300;

  var parts = [];
  var clouds = [
    {x: 0.06, y: 0.10, s: 1.00, v: 0.016},
    {x: 0.52, y: 0.22, s: 0.68, v: 0.011},
    {x: 0.84, y: 0.06, s: 0.85, v: 0.020}
  ];
  var balloons = [
    {x: 0.06, y: 0.30, c: "#ED1C24", ph: 0.0},
    {x: 0.11, y: 0.22, c: "#FFD500", ph: 1.4},
    {x: 0.16, y: 0.32, c: "#00AEEF", ph: 2.6}
  ];

  /* ── Layout (se recalcula en cada resize) ── */
  function layout(){
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if(!w || !h) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W = w; H = h;
    var groundY = H * 0.86;
    var cw = W * 0.60, ch = H * 0.60;
    var baseH = ch * 0.17, wallH = ch * 0.66, tw = cw * 0.17;
    L = {
      cx: W / 2, groundY: groundY, cw: cw, ch: ch, baseH: baseH, wallH: wallH, tw: tw,
      wallTop: groundY - baseH - wallH,
      openX0: W / 2 - cw / 2 + tw * 0.78,
      openX1: W / 2 + cw / 2 - tw * 0.78,
      openTop: groundY - baseH - wallH + wallH * 0.17,
      floorY: groundY - baseH,
      kidH: Math.min(H * 0.13, wallH * 0.55)
    };
    skyGrad = ctx.createLinearGradient(0, 0, 0, H);
    skyGrad.addColorStop(0, "#4fb0ef");
    skyGrad.addColorStop(0.62, "#a5e2ff");
    skyGrad.addColorStop(1, "#d8f3ff");
    grassGrad = ctx.createLinearGradient(0, groundY, 0, H);
    grassGrad.addColorStop(0, "#8fd45f");
    grassGrad.addColorStop(1, "#5da32f");
    baseGrad = ctx.createLinearGradient(0, groundY - baseH, 0, groundY);
    baseGrad.addColorStop(0, "#ff5a3c");
    baseGrad.addColorStop(1, "#c8102e");
    bodyGrad = ctx.createLinearGradient(0, L.wallTop, 0, L.floorY);
    bodyGrad.addColorStop(0, "#dff5ff");
    bodyGrad.addColorStop(1, "#8fd8ff");
  }

  function rr(x, y, w, h, r){
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* ── Sonido sintético (Web Audio, SOLO tras el tap del usuario) ── */
  var actx = null;
  function playPartySound(){
    try{
      if(!actx){
        var AC = window.AudioContext || window.webkitAudioContext;
        if(!AC) return;
        actx = new AC();
      }
      if(actx.state === "suspended") actx.resume();
      var now = actx.currentTime;
      var o = actx.createOscillator(), g = actx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(420, now);
      o.frequency.exponentialRampToValueAtTime(85, now + 0.28);
      g.gain.setValueAtTime(0.20, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      o.connect(g); g.connect(actx.destination);
      o.start(now); o.stop(now + 0.34);
      var notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach(function(f, i){
        var o2 = actx.createOscillator(), g2 = actx.createGain();
        o2.type = "triangle"; o2.frequency.value = f;
        var t0 = now + 0.05 + i * 0.09;
        g2.gain.setValueAtTime(0.0001, t0);
        g2.gain.exponentialRampToValueAtTime(0.12, t0 + 0.02);
        g2.gain.exponentialRampToValueAtTime(0.001, t0 + 0.22);
        o2.connect(g2); g2.connect(actx.destination);
        o2.start(t0); o2.stop(t0 + 0.24);
      });
    }catch(e){}
  }

  /* ── Partículas: confetti, serpentinas y estrellas ── */
  function spawnParticles(x, y, n){
    for(var i = 0; i < n; i++){
      var a = Math.random() * Math.PI * 2, sp = 130 + Math.random() * 380;
      parts.push({
        x: x, y: y,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 280,
        g: 640, rot: Math.random() * Math.PI * 2, vr: (Math.random() - 0.5) * 12,
        life: 1.4 + Math.random() * 0.9, age: 0,
        size: 5 + Math.random() * 6,
        color: COLORS[i % COLORS.length],
        type: i % 3
      });
    }
    if(parts.length > 180) parts.splice(0, parts.length - 180);
  }

  /* ── ¡BOOM! al tocar el castillo ── */
  function boom(){
    springV = -7;
    var JV = 600 * (H / 470);
    kids.forEach(function(k){
      k.vy = JV * k.jump * 1.85;
      k.y = Math.max(k.y, 8);
      k.happyT = 1.5;
    });
    spawnParticles(L.cx, L.floorY - L.wallH * 0.45, 90);
    playPartySound();
  }

  /* ── Física por frame ── */
  function step(dt){
    var G = 2600 * (H / 470);
    var JV = 600 * (H / 470);
    kids.forEach(function(k){
      if(k.happyT > 0) k.happyT -= dt;
      if(reduced && k.happyT <= 0){ k.y = 0; k.vy = 0; k.squash = 0; k.sx = 1; k.sy = 1; return; }
      k.vy -= G * dt;
      k.y += k.vy * dt;
      if(k.y <= 0){
        k.y = 0;
        if(k.vy < -90) k.squash = 1;
        k.vy = JV * k.jump * (0.92 + Math.random() * 0.16);
      }
      /* Tope: la cabeza nunca sale por arriba de la abertura */
      var maxY = (L.floorY - L.openTop) - 4 - L.kidH * 0.93;
      if(k.y > maxY){ k.y = maxY; if(k.vy > 0) k.vy = 0; }
      k.squash = Math.max(0, k.squash - dt * 6);
      var tsx = 1, tsy = 1;
      if(k.squash > 0){ tsy = 1 - 0.28 * k.squash; tsx = 1 + 0.30 * k.squash; }
      else if(k.vy > 60){ tsy = 1.10; tsx = 0.93; }
      else if(k.vy < -60){ tsy = 0.95; tsx = 1.04; }
      k.sx += (tsx - k.sx) * Math.min(1, dt * 18);
      k.sy += (tsy - k.sy) * Math.min(1, dt * 18);
    });
    /* Resorte del castillo */
    var acc = -170 * springX - 11 * springV;
    springV += acc * dt;
    springX += springV * dt;
    if(springX > 0.30) springX = 0.30;
    if(springX < -0.30) springX = -0.30;
    /* Nubes */
    clouds.forEach(function(c){
      c.x += c.v * dt;
      if(c.x > 1.28) c.x = -0.28;
    });
    /* Partículas */
    for(var i = parts.length - 1; i >= 0; i--){
      var p = parts[i];
      p.age += dt;
      if(p.age >= p.life){ parts.splice(i, 1); continue; }
      p.vy += p.g * dt;
      p.vx *= (1 - 0.6 * dt);
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
    }
  }

  /* ── Dibujo ── */
  function drawCloud(x, y, s){
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(s, s);
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.arc(22, -8, 26, 0, Math.PI * 2);
    ctx.arc(50, 0, 20, 0, Math.PI * 2);
    ctx.arc(26, 8, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawBalloon(b){
    var s = H / 470;
    var x = b.x * W, y = b.y * H + Math.sin(t * 1.3 + b.ph) * 7;
    ctx.save();
    ctx.fillStyle = b.c;
    ctx.beginPath();
    ctx.ellipse(x, y, 13 * s, 16 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x - 5 * s, y + 15 * s);
    ctx.lineTo(x + 5 * s, y + 15 * s);
    ctx.lineTo(x, y + 21 * s);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(18,35,61,0.55)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(x, y + 21 * s);
    ctx.quadraticCurveTo(x + 8 * s, y + 34 * s, x - 2 * s, y + 46 * s);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.beginPath();
    ctx.ellipse(x - 5 * s, y - 6 * s, 4 * s, 6 * s, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawKid(k){
    var s = L.kidH;
    var x = L.openX0 + (L.openX1 - L.openX0) * k.fx;
    var y = L.floorY - k.y;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(k.sx, k.sy);
    var u = s / 100;
    /* Piernas */
    ctx.fillStyle = k.pants;
    rr(-13 * u, -30 * u, 10 * u, 30 * u, 5 * u); ctx.fill();
    rr(3 * u, -30 * u, 10 * u, 30 * u, 5 * u); ctx.fill();
    /* Brazos: arriba cuando sube o está feliz, abajo al caer */
    var up = (k.vy > 60 || k.happyT > 0);
    ctx.strokeStyle = k.shirt;
    ctx.lineWidth = 9 * u;
    ctx.lineCap = "round";
    ctx.beginPath();
    if(up){
      ctx.moveTo(-13 * u, -56 * u); ctx.lineTo(-24 * u, -78 * u);
      ctx.moveTo(13 * u, -56 * u); ctx.lineTo(24 * u, -78 * u);
    } else {
      ctx.moveTo(-13 * u, -56 * u); ctx.lineTo(-21 * u, -34 * u);
      ctx.moveTo(13 * u, -56 * u); ctx.lineTo(21 * u, -34 * u);
    }
    ctx.stroke();
    /* Cuerpo */
    ctx.fillStyle = k.shirt;
    rr(-15 * u, -62 * u, 30 * u, 36 * u, 12 * u); ctx.fill();
    /* Cabeza */
    ctx.fillStyle = k.skin;
    ctx.beginPath();
    ctx.arc(0, -76 * u, 17 * u, 0, Math.PI * 2);
    ctx.fill();
    /* Pelo */
    ctx.fillStyle = k.hair;
    ctx.beginPath();
    ctx.arc(0, -79 * u, 17 * u, Math.PI * 1.02, Math.PI * 1.98);
    ctx.closePath();
    ctx.fill();
    if(k.girl){
      ctx.beginPath(); ctx.arc(-16 * u, -74 * u, 6 * u, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(16 * u, -74 * u, 6 * u, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#FFD500";
      ctx.beginPath(); ctx.arc(12 * u, -92 * u, 4 * u, 0, Math.PI * 2); ctx.fill();
    }
    /* Cara */
    ctx.fillStyle = "#12233d";
    if(k.happyT > 0){
      ctx.strokeStyle = "#12233d";
      ctx.lineWidth = 2 * u;
      ctx.beginPath(); ctx.arc(-6 * u, -77 * u, 3.4 * u, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
      ctx.beginPath(); ctx.arc(6 * u, -77 * u, 3.4 * u, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
      ctx.fillStyle = "#7a2e2e";
      ctx.beginPath(); ctx.ellipse(0, -68 * u, 5 * u, 6.5 * u, 0, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.beginPath(); ctx.arc(-6 * u, -77 * u, 2.2 * u, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(6 * u, -77 * u, 2.2 * u, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#12233d";
      ctx.lineWidth = 2 * u;
      ctx.lineCap = "round";
      ctx.beginPath(); ctx.arc(0, -70 * u, 5 * u, Math.PI * 0.15, Math.PI * 0.85); ctx.stroke();
    }
    /* Chapitas */
    ctx.fillStyle = "rgba(237,28,36,0.35)";
    ctx.beginPath(); ctx.arc(-11 * u, -70 * u, 3 * u, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(11 * u, -70 * u, 3 * u, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function drawCastle(){
    var cx = L.cx, gy = L.groundY, cw = L.cw, ch = L.ch, baseH = L.baseH, wallH = L.wallH, tw = L.tw;
    var wallTop = L.wallTop;
    /* Sombra proyectada */
    ctx.fillStyle = "rgba(11,77,162,0.20)";
    ctx.beginPath();
    ctx.ellipse(cx, gy + 10, cw * 0.48 * (1 - springX * 0.4), 13, 0, 0, Math.PI * 2);
    ctx.fill();
    var breath = reduced ? 0 : 0.016 * Math.sin(t * 1.7);
    var sy = 1 + springX + breath, sx = 1 - springX * 0.55 - breath * 0.6;
    ctx.save();
    ctx.translate(cx, gy);
    ctx.scale(sx, sy);
    ctx.translate(-cx, -gy);
    /* Base roja con franja verde */
    ctx.fillStyle = baseGrad;
    rr(cx - cw / 2, gy - baseH, cw, baseH, 12);
    ctx.fill();
    ctx.fillStyle = "#2FAE4E";
    rr(cx - cw / 2, gy - baseH * 0.30, cw, baseH * 0.30, 10);
    ctx.fill();
    ctx.fillStyle = "#1e7d33";
    ctx.fillRect(cx - cw / 2, gy - baseH * 0.30, cw, 3);
    /* Festón blanco en el borde superior de la base */
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    for(var fx = cx - cw / 2 + 14; fx < cx + cw / 2 - 6; fx += 26){
      ctx.beginPath();
      ctx.arc(fx, gy - baseH + 2, 7, 0, Math.PI);
      ctx.fill();
    }
    /* Torretas */
    [-1, 1].forEach(function(side){
      var tx = cx + side * (cw / 2 - tw / 2);
      var grad = ctx.createLinearGradient(tx - tw / 2, 0, tx + tw / 2, 0);
      grad.addColorStop(0, "#2aa9f0");
      grad.addColorStop(0.55, "#0B4DA2");
      grad.addColorStop(1, "#083a7a");
      ctx.fillStyle = grad;
      rr(tx - tw / 2, wallTop, tw, gy - baseH - wallTop, 9);
      ctx.fill();
      /* Brillo de vinilo */
      ctx.fillStyle = "rgba(255,255,255,0.28)";
      rr(tx - tw / 2 + tw * 0.12, wallTop + 8, tw * 0.20, gy - baseH - wallTop - 16, 6);
      ctx.fill();
      /* Ventana redonda */
      ctx.fillStyle = "#bfe9ff";
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(tx, wallTop + wallH * 0.42, tw * 0.24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      /* Cono rojo */
      var coneH = ch * 0.20;
      ctx.fillStyle = "#ED1C24";
      ctx.beginPath();
      ctx.moveTo(tx - tw * 0.62, wallTop);
      ctx.lineTo(tx, wallTop - coneH);
      ctx.lineTo(tx + tw * 0.62, wallTop);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.beginPath();
      ctx.moveTo(tx, wallTop - coneH);
      ctx.lineTo(tx + tw * 0.62, wallTop);
      ctx.lineTo(tx, wallTop);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.beginPath();
      ctx.moveTo(tx - tw * 0.30, wallTop - coneH * 0.55);
      ctx.lineTo(tx - tw * 0.08, wallTop - coneH * 0.92);
      ctx.lineTo(tx + tw * 0.05, wallTop - coneH * 0.45);
      ctx.closePath();
      ctx.fill();
      /* Bandera ondeando */
      var wave = reduced ? 0 : Math.sin(t * 3 + (side > 0 ? 1.2 : 0)) * 0.22;
      ctx.save();
      ctx.translate(tx, wallTop - coneH);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -16); ctx.stroke();
      ctx.rotate(wave);
      ctx.fillStyle = "#FFD500";
      ctx.beginPath();
      ctx.moveTo(0, -16); ctx.lineTo(16, -12); ctx.lineTo(0, -8);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    });
    /* Interior de la cámara (fondo claro) */
    ctx.fillStyle = bodyGrad;
    ctx.fillRect(L.openX0, L.openTop, L.openX1 - L.openX0, L.floorY - L.openTop);
    /* Malla del inflable */
    ctx.save();
    ctx.beginPath();
    ctx.rect(L.openX0, L.openTop, L.openX1 - L.openX0, L.floorY - L.openTop);
    ctx.clip();
    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth = 1;
    for(var mx = L.openX0 - (L.floorY - L.openTop); mx < L.openX1; mx += 16){
      ctx.beginPath(); ctx.moveTo(mx, L.floorY); ctx.lineTo(mx + (L.floorY - L.openTop), L.openTop); ctx.stroke();
    }
    ctx.restore();
    /* Banda superior amarilla con filo rojo */
    ctx.fillStyle = "#FFD500";
    ctx.fillRect(L.openX0, L.openTop, L.openX1 - L.openX0, wallH * 0.09);
    ctx.fillStyle = "#ED1C24";
    ctx.fillRect(L.openX0, L.openTop + wallH * 0.09, L.openX1 - L.openX0, 4);
    /* Brillo de vinilo en el cuerpo */
    ctx.fillStyle = "rgba(255,255,255,0.20)";
    ctx.beginPath();
    ctx.ellipse(cx - cw * 0.28, wallTop + wallH * 0.20, cw * 0.10, wallH * 0.30, -0.3, 0, Math.PI * 2);
    ctx.fill();
    /* Personajes DENTRO de la abertura (clip = nunca fuera) */
    ctx.save();
    ctx.beginPath();
    ctx.rect(L.openX0, L.openTop, L.openX1 - L.openX0, L.floorY - L.openTop);
    ctx.clip();
    kids.forEach(drawKid);
    ctx.restore();
    /* Arco de entrada (por delante de los pies) */
    var aw = (L.openX1 - L.openX0) * 0.34, ah = wallH * 0.42;
    ctx.strokeStyle = "#083a7a";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(cx - aw / 2, L.floorY);
    ctx.lineTo(cx - aw / 2, L.floorY - ah + aw / 2);
    ctx.arc(cx, L.floorY - ah + aw / 2, aw / 2, Math.PI, 0);
    ctx.lineTo(cx + aw / 2, L.floorY);
    ctx.stroke();
    ctx.restore();
  }

  function drawParticles(){
    parts.forEach(function(p){
      var a = Math.max(0, 1 - p.age / p.life);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if(p.type === 0){
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if(p.type === 1){
        ctx.fillRect(-p.size, -1.5, p.size * 2, 3);
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.quadraticCurveTo(2, -2, p.size, 0);
        ctx.quadraticCurveTo(2, 2, 0, p.size);
        ctx.quadraticCurveTo(-2, 2, -p.size, 0);
        ctx.quadraticCurveTo(-2, -2, 0, -p.size);
        ctx.fill();
      }
      ctx.restore();
    });
  }

  function draw(){
    if(!W || !H) return;
    /* Cielo */
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H);
    /* Sol con rayos giratorios y pulso */
    var sunX = W * 0.86, sunY = H * 0.15;
    var sunR = H * 0.075 * (1 + (reduced ? 0 : 0.05 * Math.sin(t * 2)));
    ctx.save();
    ctx.translate(sunX, sunY);
    ctx.rotate(reduced ? 0 : t * 0.12);
    ctx.strokeStyle = "rgba(255,213,0,0.75)";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    for(var i = 0; i < 12; i++){
      var a = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * sunR * 1.35, Math.sin(a) * sunR * 1.35);
      ctx.lineTo(Math.cos(a) * sunR * 1.75, Math.sin(a) * sunR * 1.75);
      ctx.stroke();
    }
    ctx.restore();
    var glow = ctx.createRadialGradient(sunX, sunY, sunR * 0.4, sunX, sunY, sunR * 2.6);
    glow.addColorStop(0, "rgba(255,246,176,0.95)");
    glow.addColorStop(0.45, "rgba(255,213,0,0.85)");
    glow.addColorStop(1, "rgba(255,213,0,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR * 2.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FFD500";
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
    ctx.fill();
    /* Nubes */
    clouds.forEach(function(c){ drawCloud(c.x * W, c.y * H, c.s * (H / 470) * 0.9 + 0.4); });
    /* Globos */
    balloons.forEach(drawBalloon);
    /* Pasto */
    ctx.fillStyle = grassGrad;
    ctx.fillRect(0, L.groundY, W, H - L.groundY);
    ctx.fillStyle = "#6fbf45";
    for(var gx = 8; gx < W; gx += 34){
      var gh = 6 + ((gx * 7) % 9);
      ctx.beginPath();
      ctx.moveTo(gx, L.groundY + 2);
      ctx.lineTo(gx + 5, L.groundY - gh);
      ctx.lineTo(gx + 10, L.groundY + 2);
      ctx.closePath();
      ctx.fill();
    }
    /* Flores */
    ["#fff", "#FFD500", "#FF5CA8"].forEach(function(c, i){
      var fx = W * (0.10 + i * 0.36), fy = L.groundY + (H - L.groundY) * 0.55;
      ctx.fillStyle = c;
      ctx.beginPath(); ctx.arc(fx, fy, 3.4, 0, Math.PI * 2); ctx.fill();
    });
    drawCastle();
    drawParticles();
  }

  function frame(ts){
    rafId = 0;
    if(!ioVisible || document.hidden){ running = false; return; }
    var dt = Math.min(0.033, (ts - lastT) / 1000 || 0.016);
    lastT = ts;
    t += dt;
    step(dt);
    draw();
    rafId = requestAnimationFrame(frame);
  }
  function start(){
    if(running) return;
    running = true;
    lastT = performance.now();
    rafId = requestAnimationFrame(frame);
  }
  function stop(){
    running = false;
    if(rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  /* ── Arranque ── */
  layout();
  draw();
  if("IntersectionObserver" in window){
    new IntersectionObserver(function(entries){
      ioVisible = entries[0].isIntersecting;
      if(ioVisible) start(); else stop();
    }, {threshold: 0.05}).observe(canvas);
  } else {
    start();
  }
  document.addEventListener("visibilitychange", function(){
    if(document.hidden) stop();
    else if(ioVisible) start();
  });
  if("ResizeObserver" in window){
    new ResizeObserver(function(){ layout(); if(!running) draw(); }).observe(canvas);
  }
  window.addEventListener("resize", function(){ layout(); if(!running) draw(); });
  canvas.addEventListener("pointerdown", function(e){ e.preventDefault(); boom(); });
  canvas.addEventListener("keydown", function(e){
    if(e.key === "Enter" || e.key === " "){ e.preventDefault(); boom(); }
  });
})();
