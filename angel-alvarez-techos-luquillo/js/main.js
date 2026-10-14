const burger=document.getElementById('burger'),menu=document.getElementById('sideMenu'),ov=document.getElementById('menuOverlay');
function toggle(force){const open=force!==undefined?force:!menu.classList.contains('open');menu.classList.toggle('open',open);ov.classList.toggle('open',open);burger.classList.toggle('open',open);document.body.style.overflow=open?'hidden':'';}
burger.addEventListener('click',()=>toggle());
ov.addEventListener('click',()=>toggle(false));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggle(false)));
