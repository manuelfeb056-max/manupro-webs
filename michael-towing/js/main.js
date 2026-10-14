document.getElementById('year').textContent = new Date().getFullYear();

const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('show');
  burger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('show');
  burger.classList.remove('open');
  document.body.style.overflow = '';
}));
