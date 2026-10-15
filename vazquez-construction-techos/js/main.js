(function(){
  var burger = document.getElementById('burger');
  var overlay = document.getElementById('navOverlay');
  burger.addEventListener('click', function(){
    var open = overlay.classList.toggle('show');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    overlay.setAttribute('aria-hidden', !open);
  });
  overlay.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      overlay.classList.remove('show');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      overlay.setAttribute('aria-hidden', 'true');
    });
  });

  document.querySelectorAll('.acc-item').forEach(function(item){
    var q = item.querySelector('.acc-q');
    var a = item.querySelector('.acc-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.acc-a').style.maxHeight = null;
        o.querySelector('.acc-q').setAttribute('aria-expanded', 'false');
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
})();

// Formulario de cotización -> WhatsApp del negocio (mejora 2026-10-15)
(function(){
var qf=document.getElementById('qform');if(!qf)return;
qf.addEventListener('submit',function(e){e.preventDefault();
var n=document.getElementById('qNombre').value.trim();
if(!n){document.getElementById('qNombre').focus();return;}
var t=document.getElementById('qTel').value.trim();
var s=document.getElementById('qServicio').value;
var m=document.getElementById('qMsg').value.trim();
var txt='Hola Vazquez Construction Group, soy '+n+'. Me interesa: '+s+'.'+(t?' Mi teléfono: '+t+'.':'')+(m?' '+m:'');
window.open('https://wa.me/17873645335?text='+encodeURIComponent(txt),'_blank');});
})();
