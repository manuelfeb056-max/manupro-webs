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
var ghost=document.getElementById('ghostText');
window.addEventListener('scroll',function(){
if(!ghost)return;
var y=window.scrollY;
if(y<900){ghost.style.transform='translate(calc(-50% + '+(y*.25)+'px),-50%)';}
},{passive:true});
})();

// ---------- mejora elite 2026-10-15: botón cerrar del menú ----------
(function(){var mc=document.getElementById('menuClose'),ov=document.getElementById('menuOverlay'),btn=document.getElementById('menuBtn');
if(mc&&ov){mc.addEventListener('click',function(){ov.classList.remove('open');if(btn)btn.classList.remove('x');});}})();

/* (handler anterior removido en ronda 2) */


/* NQ formulario elite -> WhatsApp (ronda 2) */
(function(){
  var f=document.getElementById('nqForm'); if(!f) return;
  var chips=f.querySelectorAll('.nq-chip');
  chips.forEach(function(c){
    c.addEventListener('click',function(){
      chips.forEach(function(x){x.classList.remove('sel');});
      c.classList.add('sel');
      var e=document.getElementById('nqErrServ'); if(e) e.hidden=true;
    });
  });
  f.addEventListener('submit',function(ev){
    ev.preventDefault();
    var n=document.getElementById('nqNombre').value.trim(),
        t=document.getElementById('nqTel').value.trim(),
        p=document.getElementById('nqPueblo').value.trim(),
        m=document.getElementById('nqMsg').value.trim(),
        s=f.querySelector('input[name="nqServicio"]:checked'),
        ok=true;
    [document.getElementById('nqNombre'),document.getElementById('nqTel')].forEach(function(el){
      el.classList.remove('nq-shake'); void el.offsetWidth;
      if(!el.value.trim()){ el.classList.add('nq-shake'); el.style.borderColor='#ff8a8a'; ok=false; }
      else { el.style.borderColor=''; }
    });
    var es=document.getElementById('nqErrServ');
    if(!s){ if(es) es.hidden=false; ok=false; }
    if(!ok){
      var bad=f.querySelector('.nq-shake')||(!s?f.querySelector('.nq-chips'):null);
      if(bad) bad.scrollIntoView({behavior:'smooth',block:'center'});
      return;
    }
    var digits=t.replace(/\D/g,'');
    var txt='Hola GG Services, soy '+n+'. Mi tel\u00e9fono es '+t+'.'+(p?' Soy de '+p+'.':'')+' Necesito: '+s.value+'.'+(m?' '+m:'');
    window.open('https://wa.me/17874690017?text='+encodeURIComponent(txt),'_blank');
  });
})();