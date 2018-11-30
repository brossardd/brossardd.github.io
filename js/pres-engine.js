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
      console.log('Message Received :');
      console.log(`Message Type : ${message.type}`);
      const messageData = JSON.stringify(message.data);
      console.log(`Message Data : ${messageData}`);
    }
    
    window.addEventListener('DOMContentLoaded', init);
  }
)();
