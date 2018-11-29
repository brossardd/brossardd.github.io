(
  function() {
    
    function init(){
      console.log('Init presentation');
      const postMessageEventBus = new PostMessageEventBus(window, window.parent);
      postMessageEventBus.getMessages('SNAPSHOT').subscribe(onSnapshotMessage);
      postMessageEventBus.sendMessage('INIT', 'Presentation initialized');
    }
    
    function onSnapshotMessage(message){
      console.log('pres.postMessageEventBus.onSnapshotMessage');
    }
    
    window.addEventListener('DOMContentLoaded', init);
  }
)();
