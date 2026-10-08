/* Manupro Advanced Metrics — tracker liviano: pageviews, scroll, clics, WhatsApp, tiempo en página */
(function(){
  "use strict";
  var SITE = (document.body && document.body.dataset.site) || 'demo';
  var EP = '/manupro-metrics/collect.php?site=' + encodeURIComponent(SITE);
  var t0 = Date.now();
  var sent = {};

  function send(type, extra){
    var p = {t: type, url: location.pathname, ref: document.referrer || '', vw: window.innerWidth};
    if (extra) for (var k in extra) p[k] = extra[k];
    try {
      if (navigator.sendBeacon) navigator.sendBeacon(EP, JSON.stringify(p));
      else {
        var x = new XMLHttpRequest(); x.open('POST', EP, true);
        x.setRequestHeader('Content-Type', 'text/plain'); x.send(JSON.stringify(p));
      }
    } catch(e){}
  }

  send('pv', {ua: navigator.userAgent.slice(0, 140)});

  // hitos de scroll
  [25, 50, 75, 100].forEach(function(m){
    sent['s'+m] = false;
  });
  var ticking = false;
  window.addEventListener('scroll', function(){
    if (ticking) return; ticking = true;
    requestAnimationFrame(function(){
      var h = document.documentElement;
      var pct = Math.round((h.scrollTop) / ((h.scrollHeight - h.clientHeight) || 1) * 100);
      [25, 50, 75, 100].forEach(function(m){
        if (pct >= m && !sent['s'+m]) { sent['s'+m] = true; send('scroll', {pct: m}); }
      });
      ticking = false;
    });
  }, {passive:true});

  // clics rastreados
  document.addEventListener('click', function(ev){
    var el = ev.target.closest('[data-track]');
    if (el) send('click', {el: el.dataset.track, href: (el.getAttribute('href')||'').slice(0,120)});
  }, {passive:true});

  // tiempo en página al salir
  function bye(){ send('time', {sec: Math.round((Date.now() - t0)/1000)}); }
  document.addEventListener('visibilitychange', function(){ if (document.hidden) bye(); });
  window.addEventListener('pagehide', bye);
})();
