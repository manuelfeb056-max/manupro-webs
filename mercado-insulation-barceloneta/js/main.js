document.getElementById('year').textContent = new Date().getFullYear();

const fab = document.getElementById('menuFab');
const nav = document.getElementById('sideNav');
const scrim = document.getElementById('sideScrim');
const closeBtn = document.getElementById('sideClose');
function openNav(){ nav.classList.add('open'); scrim.classList.add('show'); }
function closeNav(){ nav.classList.remove('open'); scrim.classList.remove('show'); }
fab.addEventListener('click', openNav);
closeBtn.addEventListener('click', closeNav);
scrim.addEventListener('click', closeNav);
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

document.querySelectorAll('.acc-item').forEach(item => {
  const head = item.querySelector('.acc-head');
  const body = item.querySelector('.acc-body');
  head.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.acc-body').style.maxHeight = null;
      o.querySelector('.acc-head').setAttribute('aria-expanded','false');
    });
    if (!isOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
      head.setAttribute('aria-expanded','true');
    }
  });
});

const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold: .12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Blueprint parallax drift
const bp = document.querySelector('.blueprint');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight && bp) bp.style.transform = 'translateY(' + (y * 0.12) + 'px)';
}, {passive: true});
