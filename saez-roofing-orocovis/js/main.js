// Sáez Roofing — interacciones + parallax
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
  // parallax del hero
  var layers=document.querySelectorAll('.plx[data-speed]');
  var ticking=false;
  window.addEventListener('scroll',function(){
    if(!ticking){
      requestAnimationFrame(function(){
        var y=window.scrollY;
        layers.forEach(function(l){
          l.style.transform='translateY('+(y*parseFloat(l.dataset.speed))+'px)';
        });
        ticking=false;
      });
      ticking=true;
    }
  },{passive:true});
  var els=document.querySelectorAll('.gallery-strip figure,.serv,.plan,.why-photo');
  els.forEach(function(e){e.classList.add('reveal');});
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  els.forEach(function(e){io.observe(e);});
})();
