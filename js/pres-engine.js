(
  function() {
    
    function init(){
      const postMessageEventBus = new PostMessageEventBus(window, iframe.contentWindow);
      postMessageEventBus.getMessages('TEST').subscribe(onTestMessage);
      postMessageEventBus.sendMessage('INIT', 'Presentation initialized');
    }
    
    function onTestMessage(message){
      console.log(message.data);
    }
    
    window.addEventListener('DOMContentLoaded', init);
  }
)();
