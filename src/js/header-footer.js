var logInPage = "../login/login.html";

function setFooter(){
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

function setHeader(){
  /* In each file import this js file and add a empty footer at the end */
  var headerElement = document.createElement('div');
  var header = document.getElementById("header");
  var headerContent = `
    <nav>
    <link rel="stylesheet" type="text/css" href="../css/header-footer.css" />
      <button id="undo">undo</button>
      <button id="redo">redo</button>
      <button id="language">language</button>
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
  window.location.href = logInPage;
}

function swedish(){
  changeLanguage("Svenska");
}

function english(){
  changeLanguage("English");
}

function changeLanguage(lang){
  document.getElementById("selected-language").innerHTML = lang;
}

window.addEventListener("load",function(){
  setFooter();
  setHeader();
}, false);
