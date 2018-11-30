

class LayoutEngine {
  constructor() {
    this.init.bind(this);
  }
  
  init(targetWin){
    const websocketEventBus = new MockWebSocketEventBus();
    const postMessageEventBus = new PostMessageEventBus(window, targetWin);
    
    websocketEventBus.getMessages().subscribe(postMessageEventBus.send);
    postMessageEventBus.getMessages().subscribe(websocketEventBus.send);
  }
}



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
    console.log(`Data : ${messageData}`);
  }
  
  function createIframe(){
    console.log( "Create iframe" );
    const iframe = document.createElement("iframe");
    iframe .id = 'stageFrame';
    iframe.setAttribute("src", "./pres.html");
    document.body.appendChild(iframe);
    return iframe;
  }
}










