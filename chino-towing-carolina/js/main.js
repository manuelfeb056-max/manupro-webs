// Carolina Grúas Chino — menú hamburguesa + acordeón FAQ
document.addEventListener('DOMContentLoaded', function () {
  var fab = document.getElementById('menuFab');
  var overlay = document.getElementById('menuOverlay');
  fab.addEventListener('click', function () {
    var open = overlay.classList.toggle('open');
    fab.classList.toggle('open', open);
    overlay.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  overlay.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      overlay.classList.remove('open');
      fab.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.querySelectorAll('.acc-item').forEach(function (item) {
    var q = item.querySelector('.acc-q');
    var a = item.querySelector('.acc-a');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.acc-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
});
