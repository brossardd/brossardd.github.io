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
        postMessageEventBus.sendMessage('SNAPSHOT', message.data);
      }
      
      function onMessage(message){
        console.log('LAYOUT : Message Received');
        console.log(`Message Type : ${message.type}`);
        const messageString = JSON.stringify(message);
        console.log(`Message Data : ${messageString}`);
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



