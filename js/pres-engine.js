(
  function() {
    
    function init(){
      console.log('Init presentation');
      const postMessageEventBus = new PostMessageEventBus(window, window.parent);
      postMessageEventBus.getMessages('TEST').subscribe(onTestMessage);
      postMessageEventBus.sendMessage('INIT', 'Presentation initialized');
    }
    
    function onTestMessage(message){
      console.log(`Message received ${message.data}`);
    }
    
    window.addEventListener('DOMContentLoaded', init);
  }
)();
