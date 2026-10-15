// Auto-Lux Plaza Guaynabo
(function(){
  var btn=document.getElementById('menuBtn'),drawer=document.getElementById('drawer'),scrim=document.getElementById('scrim');
  function toggle(o){drawer.classList.toggle('open',o);scrim.classList.toggle('on',o);}
  btn.addEventListener('click',function(){toggle(!drawer.classList.contains('open'));});
  scrim.addEventListener('click',function(){toggle(false);});
  drawer.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){toggle(false);});});
  // formulario -> WhatsApp del negocio
  var f=document.getElementById('quoteForm');
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var nombre=document.getElementById('qNombre').value.trim();
    var tel=document.getElementById('qTel').value.trim();
    var serv=(f.querySelector('input[name="qServ"]:checked')||{}).value||'';
    var msg=document.getElementById('qMsg').value.trim();
    var err=document.getElementById('qError');
    function fail(m){err.textContent=m;err.hidden=false;err.scrollIntoView({behavior:'smooth',block:'center'});}
    if(nombre.length<2)return fail('Escribe tu nombre.');
    if(tel.replace(/\D/g,'').length<7)return fail('Escribe un teléfono válido.');
    if(!serv)return fail('Elige un servicio.');
    err.hidden=true;
    var texto='Hola Auto-Lux, quiero una cotización.%0A%0ANombre: '+encodeURIComponent(nombre)+'%0ATeléfono: '+encodeURIComponent(tel)+'%0AServicio: '+encodeURIComponent(serv)+(msg?'%0ADetalles: '+encodeURIComponent(msg):'');
    window.open('https://wa.me/17879754545?text='+texto,'_blank');
  });
})();
