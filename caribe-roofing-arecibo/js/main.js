(function(){
var b=document.getElementById('burger'),n=document.getElementById('navOverlay');
if(b&&n){b.addEventListener('click',function(){b.classList.toggle('open');n.classList.toggle('show');document.body.classList.toggle('lock');});
n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){b.classList.remove('open');n.classList.remove('show');document.body.classList.remove('lock');});});}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
document.querySelectorAll('.faq-q').forEach(function(q){q.addEventListener('click',function(){
var it=q.parentElement,open=it.classList.contains('open');
document.querySelectorAll('.faq-item.open').forEach(function(o){o.classList.remove('open');});
if(!open)it.classList.add('open');});});
var ba=document.getElementById('baSlider');
if(ba){function setBA(x){var r=ba.getBoundingClientRect(),p=Math.max(4,Math.min(96,(x-r.left)/r.width*100));ba.style.setProperty('--pos',p+'%');}
var drag=false;
ba.addEventListener('pointerdown',function(e){drag=true;try{ba.setPointerCapture(e.pointerId);}catch(_){} setBA(e.clientX);});
ba.addEventListener('pointermove',function(e){if(drag)setBA(e.clientX);});
ba.addEventListener('pointerup',function(){drag=false;});
ba.addEventListener('pointercancel',function(){drag=false;});}
})();

/* cerrar menú con botón X (overlay por encima del botón flotante) */
(function(){
  var c = document.querySelector('[data-mqclose]');
  if(!c) return;
  c.addEventListener('click', function(){
    var nav = c.closest('nav') || document.getElementById('menuOverlay');
    if(nav){ nav.classList.remove('open','show'); nav.setAttribute('aria-hidden','true'); }
    var scrim = document.getElementById('scrim2');
    if(scrim) scrim.classList.remove('on');
    ['floatMenu','menuBtn','burger'].forEach(function(id){
      var b=document.getElementById(id);
      if(b){ b.classList.remove('open','active'); b.setAttribute('aria-expanded','false'); }
    });
    document.querySelectorAll('.fab-menu,.menu-btn,.burger,.float-menu').forEach(function(b){
      b.classList.remove('open','active');
    });
    document.body.style.overflow = '';
  });
})();

/* Cotizador → WhatsApp (Caribe Roofing: 1787-815-1521) */
(function(){
  var f=document.getElementById('quoteForm');
  if(!f) return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var n=document.getElementById('qNombre'),t=document.getElementById('qTel'),
        p=document.getElementById('qPueblo'),m=document.getElementById('qMsg'),
        sel=f.querySelector('input[name="qServicio"]:checked'),
        chips=document.getElementById('qChips');
    var ok=true;
    (function(){
      var badN=n.value.trim().length<2;
      n.classList.toggle('err',badN);if(badN)ok=false;
      var digits=(t.value.match(/\d/g)||[]).length;
      var badT=digits<7;
      t.classList.toggle('err',badT);if(badT)ok=false;
    })();/*VALID*/
        if(!sel){ok=false;chips.classList.add('err');}else{chips.classList.remove('err');}
    if(!ok) return;
    var parts=['Hola Caribe Roofing, soy '+n.value.trim()+' ('+t.value.trim()+').',
               'Me interesa: '+sel.value+'.'];
    if(p.value.trim())parts.push('Pueblo: '+p.value.trim()+'.');
    if(m.value.trim())parts.push(m.value.trim());
    window.open('https://wa.me/17878151521?text='+encodeURIComponent(parts.join(' ')),'_blank');
  });
})();
