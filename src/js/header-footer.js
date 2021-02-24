var logInPage = "../login/login.html";

function setFooter(){
  /* In each file import this js file and add a empty footer at the end */
  var footerElement = document.createElement('div');
  var footer = document.getElementById("footer");
  var user = localStorage.getItem("username");
  var footerContent = `
    <div id="footer-options">
    <link rel="stylesheet" type="text/css" href="../css/header-footer.css" />
       <button id="settings"></button>
       <button id="logout" onclick=goToLoginPage()></button>
       <span id="username">${user}</span>
    </div>`;
  footerElement.innerHTML = footerContent;
  footer.append(footerElement);
}

// there needs to exist a header_undo() and a header_redo() function in the imported page
function setHeader(){
  /* In each file import this js file and add a empty footer at the end */
  var headerElement = document.createElement('div');
  var header = document.getElementById("header");
  var headerContent = `
    <nav>
    <link rel="stylesheet" type="text/css" href="../css/header-footer.css" />
      <button id="undo" onclick=header_undo()></button>
      <button id="redo" onclick=header_redo()></button>
      <div class="lang">
      <div class="lang-menu">
        <div class="selected-lang" id="selected-language">
          English
        </div>
          <ul>
            <li>
              <a href="#" class="se" onclick=swedish()>Svenska</a>
            </li>
            <li>
              <a href="" class="en" onclick=english()>English</a>
            </li>
          </ul>
      </div>
      </div>
    </nav>
  `;
  headerElement.innerHTML = headerContent;
  header.append(headerElement);
}

function goToLoginPage() {
  localStorage.setItem("username", null);
  window.location.href = logInPage;
}

$(document).ready(function(){
  setFooter();
  setHeader();
});
