// =====================================================================================================
// Control, for table info.
// =====================================================================================================
// Author: Anton Augustsson, 2021
//
/* Requires
 * UNDOmanager
 */
//
// =====================================================================================================
// Varibles

// the href for the login page
var logInPage = "../login/login.html";

// =====================================================================================================
// Helper functions

function createFooter(user){
  return `
    <div id="footer-options">
    <link rel="stylesheet" type="text/css" href="../css/header-footer.css">
       <button id="settings">settings</button>
        
        
        <button>Log In</button>
        <label for="showButtonCheckbox" class="login-btn" id="logout"> Log In </label>
    </div>`;
}

function createHeader(){
  return `
    <nav>
    <link rel="stylesheet" type="text/css" href="../css/header-footer.css">
      <button id="undo" onclick="undoit()"> </button>
      <button id="redo" onclick="redoit()"> </button>
      <div class="lang">
        <div class="lang-menu">
          <div class="selected-lang" id="selected-language">
            English
          </div>
          <ul>
            <li>
              <a href="#" class="se" onclick="swedish()">Svenska</a>
            </li>
            <li>
              <a href="#" class="en" onclick="english()">English</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
}

// =====================================================================================================
// Event functions

// Go to the login page
function goToLoginPage() {
  localStorage.setItem("username", null);
  window.location.href = logInPage;
}

// =====================================================================================================
// View update

// insert the footer html elemnt on top of the screen
function setFooter(){
  /* In each file import this js file and add a empty footer at the end */
  $("#footer").append(createFooter(localStorage.getItem("username")));
}

// there needs to exist a header_undo() and a header_redo() function in the imported page
function setHeader(){
  /* In each file import this js file and add a empty footer at the end */
  $("#header").append(createHeader());
}

// insert the header and footer when the page has loaded
$(document).ready(function(){
  setFooter();
  setHeader();
});

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
