(function(){
var btn=document.getElementById('menuBtn'),ov=document.getElementById('menuOverlay');
if(btn&&ov){btn.addEventListener('click',function(){var o=ov.classList.toggle('open');btn.classList.toggle('x',o);});
ov.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){ov.classList.remove('open');btn.classList.remove('x');});});}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
document.querySelectorAll('.faq-item').forEach(function(it){
var q=it.querySelector('.faq-q'),a=it.querySelector('.faq-a');
q.addEventListener('click',function(){
var open=it.classList.contains('open');
document.querySelectorAll('.faq-item.open').forEach(function(o){o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;});
if(!open){it.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}
});});
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

/* Cotizador → WhatsApp (Borinquen Roofing: 1787-833-0728) */
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
    var parts=['Hola Borinquen Roofing, soy '+n.value.trim()+' ('+t.value.trim()+').',
               'Me interesa: '+sel.value+'.'];
    if(p.value.trim())parts.push('Pueblo: '+p.value.trim()+'.');
    if(m.value.trim())parts.push(m.value.trim());
    window.open('https://wa.me/17878330728?text='+encodeURIComponent(parts.join(' ')),'_blank');
  });
})();
