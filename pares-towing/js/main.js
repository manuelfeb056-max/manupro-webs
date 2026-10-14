(function(){
  var menuBtn=document.getElementById('menuBtn');
  var mpNav=document.getElementById('mpNav');
  var navClose=document.getElementById('navClose');
  function openNav(){mpNav.classList.add('open');document.body.style.overflow='hidden';}
  function closeNav(){mpNav.classList.remove('open');document.body.style.overflow='';}
  if(menuBtn){menuBtn.addEventListener('click',openNav);}
  if(navClose){navClose.addEventListener('click',closeNav);}
  if(mpNav){mpNav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeNav);});}

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
})();
