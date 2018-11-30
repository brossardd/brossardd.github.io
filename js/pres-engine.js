(
  function() {
    
    function init(){
      console.log('Init presentation');
      const postMessageEventBus = new PostMessageEventBus(window, window.parent);
      postMessageEventBus.getMessages().subscribe(onMessage);
      postMessageEventBus.getMessages('SNAPSHOT').subscribe(onSnapshotMessage);
      postMessageEventBus.sendMessage('INIT', 'Presentation initialized');
    }
    
    function onSnapshotMessage(message){
      console.log('pres.postMessageEventBus.onSnapshotMessage');
    }
    
    function onMessage(message){
      console.log('PRES : Message Received');
      console.log(`Message Type : ${message.type}`);
      const messageString = JSON.stringify(message);
        console.log(`Message Data : ${messageString}`);
    }
    
    window.addEventListener('DOMContentLoaded', init);
  }
)();
