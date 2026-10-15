
(function(){
  var burger=document.getElementById('burger'),nav=document.getElementById('navOverlay');
  burger.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    burger.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',open);nav.setAttribute('aria-hidden',!open);
    document.body.style.overflow=open?'hidden':'';
  });
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){
    nav.classList.remove('open');burger.classList.remove('open');document.body.style.overflow='';
  });});
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click',function(){
      var item=q.parentElement,a=item.querySelector('.faq-a'),open=item.classList.toggle('open');
      a.style.maxHeight=open?a.scrollHeight+'px':'0';
      q.querySelector('.pm').textContent=open?'\u2212':'+';
    });
  });
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}})},{threshold:.12});
  document.querySelectorAll('.reveal,.g-item,.svc,.step').forEach(function(el){io.observe(el);});
  document.querySelectorAll('[data-track]').forEach(function(el){
    el.addEventListener('click',function(){try{window.MPMetrics&&MPMetrics.track(el.getAttribute('data-track'));}catch(e){}});
  });
})();

// ---------- mejora elite 2026-10-15: botón cerrar del menú ----------
(function(){var c=document.getElementById('menuClose'),nav=document.getElementById('navOverlay'),burger=document.getElementById('burger');
if(c&&nav){c.addEventListener('click',function(){nav.classList.remove('open');if(burger)burger.classList.remove('open');document.body.style.overflow='';});}})();

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
    var txt='Hola Humacao Roofing, soy '+n+'. Mi tel\u00e9fono es '+t+'.'+(p?' Soy de '+p+'.':'')+' Necesito: '+s.value+'.'+(m?' '+m:'');
    window.open('https://wa.me/17878504280?text='+encodeURIComponent(txt),'_blank');
  });
})();