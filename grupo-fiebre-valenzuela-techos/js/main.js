const burger=document.getElementById('burger'),menu=document.getElementById('sideMenu'),ov=document.getElementById('menuOverlay');
function toggle(force){const open=force!==undefined?force:!menu.classList.contains('open');menu.classList.toggle('open',open);ov.classList.toggle('open',open);burger.classList.toggle('open',open);document.body.style.overflow=open?'hidden':'';}
burger.addEventListener('click',()=>toggle());
ov.addEventListener('click',()=>toggle(false));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggle(false)));

// ---------- mejora elite 2026-10-15: botón cerrar del menú ----------
(function(){var c=document.getElementById('menuClose');if(c){c.addEventListener('click',function(){toggle(false);});}})();

// ---------- mejora elite 2026-10-15: formulario de cotización → WhatsApp ----------
(function(){var qf=document.getElementById('qform');if(!qf)return;
qf.addEventListener('submit',function(e){e.preventDefault();
var n=document.getElementById('qNombre').value.trim(),
    t=document.getElementById('qTel').value.trim(),
    s=document.getElementById('qServicio').value,
    m=document.getElementById('qMsg').value.trim();
var txt='Hola Grupo La Fiebre Valenzuela, soy '+(n||'un cliente')+'. Mi teléfono es '+(t||'—')+'. Necesito: '+s+'.'+(m?' '+m:'');
window.open('https://wa.me/17873243022?text='+encodeURIComponent(txt),'_blank');});})();
