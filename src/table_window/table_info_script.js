
window.onload = function(){
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  var checkout = document.getElementById("checkout");
  var cancel = document.getElementById("cancel");

  checkout.onclick = function() {
    modal.style.display = "block";
    console.log("checkout.onclick");
  }

  cancel.onclick = function() {
    modal.style.display = "none";
    console.log("cancel.onclick");
  }

  span.onclick = function() {
    modal.style.display = "none";
    console.log("span.onclick");
  }

  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }
  //TODO: make a script that callse model for all added items in cart

  var footerElement = document.createElement('div')
  var footer = document.getElementById("footer");
  var footerContent = `
    <button id="settings">settings</button>
    <button id="login">login</button>`
  footerElement.innerHTML = footerContent;
  footer.append(footerElement);
}

function finish(){
  window.location.href = "index.html";
  alert ("Checkout success!");
  //TODO: update model
}
