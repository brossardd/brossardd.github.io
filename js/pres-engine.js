(
  function() {
    
    function init(){
      const postMessageEventBus = new PostMessageEventBus(window, iframe.contentWindow);
      postMessageEventBus.getMessages('INIT').subscribe(onInitMessage);
    }
    
    function onInitMessage(message){
      console.log(message.data);
    }
    
    window.addEventListener('DOMContentLoaded', init);
  }
)();
