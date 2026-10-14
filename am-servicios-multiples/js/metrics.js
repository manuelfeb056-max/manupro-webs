// metrics: conteo local de visitas por sitio (sin trackers externos)
(function(){
  var key='mp_metrics_am-servicios-multiples';
  try{
    var d=JSON.parse(localStorage.getItem(key)||'{}');
    var today=new Date().toISOString().slice(0,10);
    d.total=(d.total||0)+1; d[today]=(d[today]||0)+1;
    localStorage.setItem(key,JSON.stringify(d));
  }catch(e){}
  // tiempo en pagina
  var t0=Date.now();
  window.addEventListener('pagehide',function(){
    try{var m=JSON.parse(localStorage.getItem(key)||'{}');m.secs=(m.secs||0)+Math.round((Date.now()-t0)/1000);localStorage.setItem(key,JSON.stringify(m));}catch(e){}
  });
})();
