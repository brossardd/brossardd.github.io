function() {
  function createIframe(){
    document.createElement("iframe");
    ifrm.setAttribute("src", "http://google.com/");
    document.body.appendChild(ifrm);
  }
  
  createIframe();
}();



