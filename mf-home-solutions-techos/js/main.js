document.addEventListener('DOMContentLoaded', () => {
  // Floating menu
  const btn = document.getElementById('menuBtn');
  const ov = document.getElementById('menuOverlay');
  btn.addEventListener('click', () => ov.classList.toggle('open'));
  ov.querySelectorAll('a').forEach(a => a.addEventListener('click', () => ov.classList.remove('open')));

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!open) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // 3D tilt on .tilt cards (desktop pointers only)
  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('mousemove', ev => {
        const r = card.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  // Hero parallax on scroll
  const heroVisual = document.querySelector('.hero-visual');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < 700 && heroVisual) heroVisual.style.transform = `translateY(${y * 0.08}px)`;
  }, { passive: true });
});
