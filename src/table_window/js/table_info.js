var tableWindow = "table_window.html";

function allTableItems(){
  //setItem("orders", "name", "where when who", "alcahol package");
  //setItem("orders", "some name", "some info", "some stats");
  var item1 = 25053;
  var item2 = 638574;
  var details1 = itemDetails(item1);
  var details2 = itemDetails(item2);
  setItem("orders", details1.name, details1.info, details1.stats);
  setItem("orders", details2.name, details2.info, details2.stats);

}

window.onload = function(){
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  var checkout = document.getElementById("checkout");
  var cancel = document.getElementById("cancel");

  checkout.onclick = function() {
    modal.style.display = "block";
    console.log("checkout.onclick");
  };

  cancel.onclick = function() {
    modal.style.display = "none";
    console.log("cancel.onclick");
  };

  span.onclick = function() {
    modal.style.display = "none";
    console.log("span.onclick");
  };

  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  };

  allTableItems();
  //TODO: make a script that callse model for all added items in cart

};

function finish(){
  window.location.href = tableWindow;
  alert ("Checkout success!");
  //TODO: update model
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
