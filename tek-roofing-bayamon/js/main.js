// Menu
const menuBtn = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  menuOverlay.classList.toggle('open');
});
menuOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuBtn.classList.remove('open');
  menuOverlay.classList.remove('open');
}));

// Accordion
document.querySelectorAll('.acc-head').forEach(head => {
  head.addEventListener('click', () => {
    const item = head.parentElement;
    const body = item.querySelector('.acc-body');
    const open = item.classList.contains('open');
    document.querySelectorAll('.acc-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.acc-body').style.maxHeight = null;
    });
    if (!open) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.gallery-grid figure, .service-card, .plan-card, .process-steps li, .acc-item').forEach(el => {
  el.classList.add('reveal');
  io.observe(el);
});
