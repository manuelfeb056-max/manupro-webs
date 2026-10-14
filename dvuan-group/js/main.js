// menu
const btn=document.getElementById('menuBtn'),menu=document.getElementById('menu');
btn.addEventListener('click',()=>{btn.classList.toggle('open');menu.classList.toggle('open');document.body.style.overflow=menu.classList.contains('open')?'hidden':'';});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{btn.classList.remove('open');menu.classList.remove('open');document.body.style.overflow='';}));
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// faq accordion
document.querySelectorAll('.faq-item').forEach(it=>{
  it.querySelector('.faq-q').addEventListener('click',()=>{
    const open=it.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o=>{o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;});
    if(!open){it.classList.add('open');const a=it.querySelector('.faq-a');a.style.maxHeight=a.scrollHeight+'px';}
  });
});
// 3d tilt (hero-tilt cards)
const stack=document.getElementById('tiltStack');
if(stack){
  stack.addEventListener('mousemove',e=>{
    const r=stack.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    stack.querySelectorAll('.tilt-card').forEach((cd,i)=>{
      const f=(i+1)*4;
      cd.style.transform=`rotateY(${x*f}deg) rotateX(${-y*f}deg) translateZ(${20+i*8}px)`;
    });
  });
  stack.addEventListener('mouseleave',()=>{stack.querySelectorAll('.tilt-card').forEach(cd=>cd.style.transform='');});
}
// smooth anchor offset for fixed content
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const t=document.querySelector(a.getAttribute('href'));
  if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
}));
