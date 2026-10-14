// AZ ROOFING & WATERPROOFING — interactions
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

  // Subtle parallax on hero background
  var heroBg = document.querySelector('.hero-bg');
  if(heroBg){
    window.addEventListener('scroll', function(){
      var y = window.scrollY;
      if(y < window.innerHeight){
        heroBg.style.translate = '0 ' + (y * .18) + 'px';
      }
    }, {passive:true});
  }
})();
