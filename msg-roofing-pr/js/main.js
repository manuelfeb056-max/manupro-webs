/* MSG Roofing — interactions */
(function(){
  // burger + overlay nav
  var burger = document.getElementById('burger');
  var nav = document.getElementById('overlayNav');
  function toggle(force){
    var open = typeof force === 'boolean' ? force : !nav.classList.contains('show');
    nav.classList.toggle('show', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function(){ toggle(); });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ toggle(false); });
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && nav.classList.contains('show')) toggle(false);
  });

  // scroll reveal
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // 3D tilt on hero frame
  var frame = document.querySelector('.hero-frame.tilt');
  if(frame && window.matchMedia('(pointer:fine)').matches){
    frame.addEventListener('mousemove', function(e){
      var r = frame.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - .5;
      var y = (e.clientY - r.top) / r.height - .5;
      frame.style.transform = 'perspective(900px) rotateY(' + (x*7) + 'deg) rotateX(' + (-y*7) + 'deg)';
    });
    frame.addEventListener('mouseleave', function(){
      frame.style.transform = '';
    });
  }

  // close burger if resized to large while open (keeps state clean)
  window.addEventListener('resize', function(){
    if(window.innerWidth > 980 && nav.classList.contains('show')) toggle(false);
  });
})();

/* Mejora elite: stagger en reveals */
(function(){
  try{
    document.querySelectorAll('.gallery-grid,.gal-track,.svc-grid,.services-grid,.steps,.proceso-steps').forEach(function(grid){
      Array.prototype.forEach.call(grid.children,function(el,i){
        if(el.classList.contains('reveal'))el.style.transitionDelay=Math.min(i*70,420)+'ms';
      });
    });
  }catch(e){}
})();
