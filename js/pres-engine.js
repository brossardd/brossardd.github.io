(
  function() {
    
    function init(){
      console.log('Init presentation');
      const postMessageEventBus = new PostMessageEventBus(window, window.parent);
      postMessageEventBus.getMessages().subscribe(onMessage);
      postMessageEventBus.getMessages('SNAPSHOT').subscribe(onSnapshotMessage);
      postMessageEventBus.sendMessage({type:'REQUEST-SNAPSHOT', data:'Request a snapshot'});
    }
    
    function onSnapshotMessage(message){
      console.log('pres.postMessageEventBus.onSnapshotMessage');
    }
    
    function onMessage(message){
      console.log('PRES : Message Received');
      console.log(`Message Type : ${message.type}`);
      const messageData = JSON.stringify(message.data);
      console.log(`Data : ${messageData}`);
    }
    
    window.addEventListener('DOMContentLoaded', init);
  }
)();
