// menu
const menuBtn=document.getElementById('menuBtn'),menuOverlay=document.getElementById('menuOverlay');
menuBtn.addEventListener('click',()=>menuOverlay.classList.toggle('open'));
menuOverlay.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menuOverlay.classList.remove('open')));
// faq accordion
document.querySelectorAll('.faq-item').forEach(item=>{
  const q=item.querySelector('.faq-q'),a=item.querySelector('.faq-a');
  q.addEventListener('click',()=>{
    const open=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o=>{o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;});
    if(!open){item.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}
  });
});
// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
