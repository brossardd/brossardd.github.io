(
  function() {
    
    function init(){
      const iframe = createIframe();
      const postMessageEventBus = new PostMessageEventBus(window, iframe.contentWindow);
      postMessageEventBus.getMessages('INIT').subscribe(onInitMessage);
      postMessageEventBus.getMessages().subscribe(onMessage);

      const websocketEventBus = new MockWebSocketEventBus();
      websocketEventBus.getMessages('SNAPSHOT').subscribe(onSnapshotMessage);
      
      function onInitMessage(message){
        console.log('layout.postMessageEventBus.onInitMessage');
        websocketEventBus.sendMessage('REQUEST-SNAPSHOT', 'Request snapshot message');
      }
      
      function onSnapshotMessage(message){
        console.log('layout.websocketEventBus.onSnapshotMessage');
        postMessageEventBus.sendMessage('SNAPSHOT', {});
      }
      
      function onMessage(message){
        console.log('LAYOUT : Message Received');
        console.log(`Message Type : ${message.type}`);
        const messageData = JSON.stringify(message.data);
        console.log(`Message : ${messageData}`);
      }
    }
    
    function createIframe(){
      console.log( "Create iframe" );
      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", "./pres.html");
      document.body.appendChild(iframe);
      return iframe;
    }
    
    window.addEventListener('DOMContentLoaded', init);
  }
)();



