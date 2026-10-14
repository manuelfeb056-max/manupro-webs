// Techero Rivera — interactividad
document.addEventListener('DOMContentLoaded', () => {
  // Menú hamburguesa
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('mainNav');
  const toggle = (force) => {
    const open = force !== undefined ? force : !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  btn.addEventListener('click', () => toggle());
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));

  // Acordeón FAQ
  document.querySelectorAll('.acc-item').forEach(item => {
    const head = item.querySelector('.acc-head');
    const body = item.querySelector('.acc-body');
    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.acc-body').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Lightbox galería
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<img alt="Foto ampliada"><button aria-label="Cerrar">✕</button>';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  const lbClose = lb.querySelector('button');
  const close = () => lb.classList.remove('open');
  lbClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  document.querySelectorAll('.g-item img').forEach(img => {
    img.addEventListener('click', () => { lbImg.src = img.src; lb.classList.add('open'); });
  });

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
});
