// Menú flotante
const menuBtn = document.getElementById('menuBtn');
const overlayNav = document.getElementById('overlayNav');

function toggleMenu(force) {
  const open = typeof force === 'boolean' ? force : !overlayNav.classList.contains('open');
  overlayNav.classList.toggle('open', open);
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
  overlayNav.setAttribute('aria-hidden', !open);
  document.body.style.overflow = open ? 'hidden' : '';
}
menuBtn.addEventListener('click', () => toggleMenu());
overlayNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });

// Acordeón FAQ
document.querySelectorAll('.acc-item').forEach(item => {
  const head = item.querySelector('.acc-head');
  const body = item.querySelector('.acc-body');
  head.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.acc-body').style.maxHeight = null;
      o.querySelector('.acc-head').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
      head.setAttribute('aria-expanded', 'true');
    }
  });
});

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Formulario -> WhatsApp
document.getElementById('quoteForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('fName').value.trim();
  const phone = document.getElementById('fPhone').value.trim();
  const town = document.getElementById('fTown').value.trim();
  const service = document.getElementById('fService').value;
  const msg = document.getElementById('fMsg').value.trim();
  if (!name || !phone) {
    alert('Por favor escribe tu nombre y teléfono.');
    return;
  }
  let text = 'Hola, soy ' + name + ' (' + phone + ')';
  if (town) text += ' de ' + town;
  text += '. Me interesa: ' + service + '.' + (msg ? ' ' + msg : '');
  window.open('https://wa.me/17879252187?text=' + encodeURIComponent(text), '_blank');
});
