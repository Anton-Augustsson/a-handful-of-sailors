var logInPage = "../login/login.html";

function setFooter(){
  console.log("Start footer script");
  /* In each file import this js file and add a empty footer at the end */
  var footerElement = document.createElement('div');
  var footer = document.getElementById("footer");
  var footerContent = `
    <div id="footer-options">
    <link rel="stylesheet" type="text/css" href="../css/header-footer.css" />
       <button id="settings">settings</button>
       <button id="login" onclick=goToLoginPage()>login</button>
    </div>`;
  footerElement.innerHTML = footerContent;
  footer.append(footerElement);

}

function goToLoginPage() {
  window.location.href = logInPage;
}

window.addEventListener("load",function(){
  setFooter();
}, false);
