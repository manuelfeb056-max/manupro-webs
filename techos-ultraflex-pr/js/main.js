/* Techos Ultraflex — interactions */
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
  var navClose = document.getElementById('navClose');
  if(navClose) navClose.addEventListener('click', function(){ toggle(false); });
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

  // gentle parallax on hero bubbles
  var bubbles = document.querySelectorAll('.bubble');
  var hero = document.querySelector('.hero');
  if(hero && window.matchMedia('(pointer:fine)').matches){
    hero.addEventListener('mousemove', function(e){
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - .5;
      var y = (e.clientY - r.top) / r.height - .5;
      bubbles.forEach(function(b, i){
        var d = (i + 1) * 14;
        b.style.translate = (x * d) + 'px ' + (y * d) + 'px';
      });
    });
  }

  window.addEventListener('resize', function(){
    if(window.innerWidth > 980 && nav.classList.contains('show')) toggle(false);
  });

  // Formulario de cotización -> WhatsApp del negocio
  var qf = document.getElementById('quoteForm');
  if(qf) qf.addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('qName').value.trim();
    var phone = document.getElementById('qPhone').value.trim();
    var service = document.getElementById('qService').value;
    var msg = document.getElementById('qMsg').value.trim();
    if(!name){ alert('Por favor escribe tu nombre.'); document.getElementById('qName').focus(); return; }
    var text = 'Hola Techos Ultraflex, soy ' + name + (phone ? ' (' + phone + ')' : '') + '. Necesito: ' + service + '.' + (msg ? ' ' + msg : '');
    window.open('https://wa.me/17879445946?text=' + encodeURIComponent(text), '_blank');
  });
})();
