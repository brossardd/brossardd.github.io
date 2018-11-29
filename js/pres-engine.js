(
  function() {
    
    function init(){
      console.log('Init presentation');
      const postMessageEventBus = new PostMessageEventBus(window, window.parent);
      postMessageEventBus.getMessages('SNAPSHOT').subscribe(onSnapshotMessage);
      postMessageEventBus.sendMessage('INIT', 'Presentation initialized');
    }
    
    function onSnapshotMessage(message){
      console.log(`Message received ${message.data}`);
    }
    
    window.addEventListener('DOMContentLoaded', init);
  }
)();
