function setFooter(){
  console.log("Start footer script");
  /* In each file import this js file and add a empty footer at the end */
  var footerElement = document.createElement('div');
  var footer = document.getElementById("footer");
  var footerContent = `
    <div id="footer-options">
    <link rel="stylesheet" type="text/css" href="../css/header-footer.css" />
       <button id="settings">settings</button>
       <button id="login">login</button>
    </div>`;
  footerElement.innerHTML = footerContent;
  footer.append(footerElement);

}

window.addEventListener("load",function(){
  setFooter();
}, false);
