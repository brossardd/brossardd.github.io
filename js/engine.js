(
  function() {
    function createIframe(){
      console.log( "Create iframe" );
      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", "./pres.html");
      document.body.appendChild(iframe);
    }
    
    
    window.addEventListener('DOMContentLoaded', function() {
      createIframe();
		});
  }
)();



