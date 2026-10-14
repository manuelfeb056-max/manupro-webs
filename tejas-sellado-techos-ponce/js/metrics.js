/* Tejas Y Sellado De Techos — métricas locales de clics (data-track) */
(function(){
  "use strict";
  var KEY = "mp_metrics_tejas-sellado-techos-ponce";
  function read(){ try{ return JSON.parse(localStorage.getItem(KEY)) || {}; }catch(e){ return {}; } }
  function write(d){ try{ localStorage.setItem(KEY, JSON.stringify(d)); }catch(e){} }
  document.addEventListener("click", function(ev){
    var el = ev.target.closest("[data-track]");
    if(!el) return;
    var d = read();
    var k = el.getAttribute("data-track");
    d[k] = (d[k] || 0) + 1;
    write(d);
  }, true);
})();
