/* metrics stub: data-track hooks */
(function(){"use strict";
document.querySelectorAll('[data-track]').forEach(function(el){
  el.addEventListener('click',function(){try{(window.__mp9track=window.__mp9track||[]).push({e:el.getAttribute('data-track'),t:Date.now()});}catch(_){}});
});
})();
