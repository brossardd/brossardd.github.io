(
  function() {
    
    function init(){
      const iframe = createIframe();
      const postMessageEventBus = new PostMessageEventBus(window, iframe.contentWindow);
      postMessageEventBus.getMessages('INIT').subscribe(onInitMessage);

      const websocketEventBus = new MockWebSocketEventBus();
      websocketEventBus.getMessage('SNAPSHOT').subscribe(onSnapshotMessage);
      
      function onInitMessage(message){
        console.log(`Message received ${message.data}`);
        websocketEventBus.sendMessage('REQUEST-SNAPSHOT', 'Request snapshot message');
      }
      
      function onSnapshotMessage(message){
        console.log(`Message received ${message.data}`);
        postMessageEventBus.sendMessage('SNAPSHOT', message.data);
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



