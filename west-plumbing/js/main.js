// West Plumbing — interacciones
(function(){
  // menú hamburguesa
  var b=document.getElementById('mpMenuBtn'),n=document.getElementById('mpNav');
  if(b&&n){
    b.addEventListener('click',function(){n.classList.toggle('open')});
    n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('open')})});
  }
  // acordeón FAQ
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q=item.querySelector('.faq-q');
    q.addEventListener('click',function(){
      var wasOpen=item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('open')});
      if(!wasOpen)item.classList.add('open');
    });
  });
  // formulario -> WhatsApp con mensaje pre-llenado
  var f=document.getElementById('quoteForm');
  if(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var nom=document.getElementById('fNombre').value.trim();
      var pueblo=document.getElementById('fPueblo').value.trim();
      var serv=document.getElementById('fServicio').value;
      var desc=document.getElementById('fDesc').value.trim();
      var msg='Hola West Plumbing, soy '+nom+' de '+pueblo+'. Necesito: '+serv+'. '+desc;
      window.open('https://wa.me/19392559713?text='+encodeURIComponent(msg),'_blank');
    });
  }
})();
