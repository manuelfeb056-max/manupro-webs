// FLEX SEAL — interactions
(function(){
  "use strict";

  // Hamburger / overlay nav
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('overlayNav');
  btn.addEventListener('click', function(){
    var open = nav.classList.toggle('show');
    btn.classList.toggle('open', open);
    nav.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('show');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // FAQ accordion (one open at a time)
  document.querySelectorAll('.acc-item').forEach(function(item){
    var head = item.querySelector('.acc-head');
    var body = item.querySelector('.acc-body');
    head.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.acc-body').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Scroll reveal
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // 3D tilt on hero photo stack (desktop only)
  var tilt = document.querySelector('.tilt');
  if(tilt && window.matchMedia('(pointer:fine)').matches){
    var stack = tilt.closest('.photo-stack');
    stack.addEventListener('mousemove', function(e){
      var r = stack.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - .5;
      var y = (e.clientY - r.top) / r.height - .5;
      tilt.style.transform = 'rotateY(' + (x*14) + 'deg) rotateX(' + (-y*10) + 'deg)';
    });
    stack.addEventListener('mouseleave', function(){
      tilt.style.transform = '';
    });
  }
})();
