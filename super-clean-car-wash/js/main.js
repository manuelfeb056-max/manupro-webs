// Lightbox para la galería
(function(){
  var rail = document.getElementById('rail');
  if(!rail) return;
  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = '<img alt=""><span class="lb-close">✕</span>';
  document.body.appendChild(overlay);
  var img = overlay.querySelector('img');
  rail.addEventListener('click', function(e){
    var f = e.target.closest('figure');
    if(!f) return;
    var src = f.querySelector('img').src;
    img.src = src;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  overlay.addEventListener('click', function(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){ overlay.classList.remove('open'); document.body.style.overflow=''; }
  });
})();
