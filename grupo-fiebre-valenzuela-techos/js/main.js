const burger=document.getElementById('burger'),menu=document.getElementById('sideMenu'),ov=document.getElementById('menuOverlay');
function toggle(force){const open=force!==undefined?force:!menu.classList.contains('open');menu.classList.toggle('open',open);ov.classList.toggle('open',open);burger.classList.toggle('open',open);document.body.style.overflow=open?'hidden':'';}
burger.addEventListener('click',()=>toggle());
ov.addEventListener('click',()=>toggle(false));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggle(false)));

// ---------- mejora elite 2026-10-15: botón cerrar del menú ----------
(function(){var c=document.getElementById('menuClose');if(c){c.addEventListener('click',function(){toggle(false);});}})();

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
    var txt='Hola Grupo La Fiebre Valenzuela, soy '+n+'. Mi tel\u00e9fono es '+t+'.'+(p?' Soy de '+p+'.':'')+' Necesito: '+s.value+'.'+(m?' '+m:'');
    window.open('https://wa.me/17873243022?text='+encodeURIComponent(txt),'_blank');
  });
})();