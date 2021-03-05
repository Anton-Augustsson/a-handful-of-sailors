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
       <button id="settings">settings</button>
        <label for="showButtonCheckbox" class="login-btn"> Log In </label>
    </div>`;
}

function createHeader(){
  return `
    <div id=header-content>
      <span id=title>The Flying Dutchman</span>
      <div id=header-buttons>
        <button id="undo" onclick=undoit()></button>
        <button id="redo" onclick=redoit()></button>
        <label for="showButtonCheckbox" class="login-btn" id=login></label>
      </div>
      <div class="lang">
        <div class="lang-menu">
          <div class="selected-lang" id="selected-language"></div>
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
      </div>
    </div>
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
  //setFooter();
  setHeader();
});

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
