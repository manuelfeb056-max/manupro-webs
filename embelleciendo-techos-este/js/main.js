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
  var els=document.querySelectorAll('.gallery-grid figure,.card,.plan,.why-photo');
  els.forEach(function(e){e.classList.add('reveal');});
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  els.forEach(function(e){io.observe(e);});
})();
