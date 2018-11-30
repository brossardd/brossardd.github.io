

class LayoutEngine {
  constructor() {
    this.init.bind(this);
    this.log.bind(this);
  }
  
  init(targetWin){
    const websocketEventBus = new MockWebSocketEventBus();
    const postMessageEventBus = new PostMessageEventBus(window, targetWin);
    
    websocketEventBus.getMessages().subscribe(postMessageEventBus.sendMessage);
    postMessageEventBus.getMessages().subscribe(websocketEventBus.sendMessage);
    
    postMessageEventBus.getMessages().subscribe(this.log);
  }
  
  log(message){
    console.log('LAYOUT MESSAGE RECEIVED');
    console.log('MESSAGE TYPE : ' + message.type);
    console.log('MESSAGE DATA : ' + JSON.stringify(message.data));
  }
}


function init(){
  const iframe = createIframe();
  const layoutEngine = new LayoutEngine();
  layoutEngine.init(iframe.contentWindow);
  
  function createIframe(){
    console.log( "Create iframe" );
    const iframe = document.createElement("iframe");
    iframe .id = 'stageFrame';
    iframe.setAttribute("src", "./pres.html");
    document.body.appendChild(iframe);
    return iframe;
  }
}
