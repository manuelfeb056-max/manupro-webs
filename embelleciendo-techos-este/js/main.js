// Embelleciendo Techos del Este — interacciones
(function(){
  var burger=document.getElementById('burger'), nav=document.getElementById('navOverlay');
  burger.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    burger.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',open);
    nav.setAttribute('aria-hidden',!open);
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      nav.classList.remove('open');burger.classList.remove('open');
      burger.setAttribute('aria-expanded','false');nav.setAttribute('aria-hidden','true');
    });
  });
  document.querySelectorAll('.acc-q').forEach(function(q){
    q.addEventListener('click',function(){
      var a=q.nextElementSibling, open=q.getAttribute('aria-expanded')==='true';
      document.querySelectorAll('.acc-q').forEach(function(o){o.setAttribute('aria-expanded','false');o.nextElementSibling.style.maxHeight=null;});
      if(!open){q.setAttribute('aria-expanded','true');a.style.maxHeight=a.scrollHeight+'px';}
    });
  });
  var els=document.querySelectorAll('.gallery-grid figure,.card,.plan,.why-photo,.quote-form');
  els.forEach(function(e){e.classList.add('reveal');});
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  els.forEach(function(e){io.observe(e);});

  // formulario de cotización → WhatsApp (Manupro recibe los leads)


  // cerrar overlay con su propio botón
  var ovc=document.getElementById('ovClose');
  if(ovc){ovc.addEventListener('click',function(){
    nav.classList.remove('open');burger.classList.remove('open');
    burger.setAttribute('aria-expanded','false');nav.setAttribute('aria-hidden','true');});}
})();


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
    var txt='Hola Embelleciendo Techos del Este y Pintura, soy '+n+'. Mi tel\u00e9fono es '+t+'.'+(p?' Soy de '+p+'.':'')+' Necesito: '+s.value+'.'+(m?' '+m:'');
    window.open('https://wa.me/17873128042?text='+encodeURIComponent(txt),'_blank');
  });
})();