

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










