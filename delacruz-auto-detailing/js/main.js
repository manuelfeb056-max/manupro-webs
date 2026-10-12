// Lightbox para la galería
(function(){
  var f = document.getElementById('flow');
  if(!f) return;
  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = '<img alt=""><span class="lb-close">✕</span>';
  document.body.appendChild(overlay);
  var img = overlay.querySelector('img');
  f.addEventListener('click', function(e){
    var fig = e.target.closest('figure');
    if(!fig) return;
    img.src = fig.querySelector('img').src;
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
