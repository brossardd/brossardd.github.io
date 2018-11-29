(
  function() {
    function createIframe(){
      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", "http://google.com/");
      document.body.appendChild(iframe);
    }
    createIframe();
  }
)();



