(
  function() {
    function createIframe(){
      console.log( "Create iframe" );
      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", "./pres.html");
      document.body.appendChild(iframe);
      return iframe;
    }
    
    
    window.addEventListener('DOMContentLoaded', function() {
      const iframe = createIframe();
      const postMessageEventBus = new PostMessageEventBus(window, iframe.contentWindow);
      postMessageEventBus.sendMessage('INIT', {message: 'Initialisation '});
    });
  }
)();



