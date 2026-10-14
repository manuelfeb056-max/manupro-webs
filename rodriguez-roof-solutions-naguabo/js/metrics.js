
(function(){
  var site=document.body.getAttribute('data-site')||'unknown';
  function send(ev,data){
    try{
      var k='mp_'+site+'_events',arr=JSON.parse(localStorage.getItem(k)||'[]');
      arr.push({ev:ev,data:data||null,t:Date.now(),u:location.href});
      localStorage.setItem(k,JSON.stringify(arr.slice(-200)));
    }catch(e){}
  }
  send('pageview');
  var t0=Date.now();
  window.addEventListener('beforeunload',function(){send('timespent',{ms:Date.now()-t0});});
  window.MPMetrics={track:function(ev){send('click',{label:ev});},site:site};
})();
