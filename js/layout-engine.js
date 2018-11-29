(
  function() {
    
    function init(){
      const iframe = createIframe();
      const postMessageEventBus = new PostMessageEventBus(window, iframe.contentWindow);
      postMessageEventBus.getMessages('INIT').subscribe(onInitMessage);
      
      function onInitMessage(message){
        console.log('Message received ${message.data}');
        postMessageEventBus.sendMessage('TEST', 'Test message');
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



