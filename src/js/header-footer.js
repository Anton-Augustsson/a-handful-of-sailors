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
// Viewer

function createHeader(){
  return `
    <div id=header-content>
      <span id=title>The Flying Dutchman</span>
      <span id="header-username">Manager: User</span>
      <div id=header-buttons>
        <button id="undo" onclick=undoit()></button>
        <button id="redo" onclick=redoit()></button>
        <button id="logout" onclick=logout()></button>
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
// Control

function setUser(modeAndUser){
  $("#header-username").html(modeAndUser);
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
