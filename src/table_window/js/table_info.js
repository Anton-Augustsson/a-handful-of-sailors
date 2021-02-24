var tableWindow = "table_window.html";

// create new item with its content
function createItem(name, info, stats){
  var newItem = `
        <div class="item">
            <div class="name"><p>${name}</p></div>
            <div class="info"><p>${info}</p></div>
            <div class="stats"><p>${stats}</p></div>
            <button ></button>
        </div>`;
  return newItem;
}

// inserts new item in view
function setItem(idParent, name, info, stats){
  var itemElement = document.createElement('div');
  var itemBody = document.getElementById(idParent);
  var newItem = createItem(name, info, stats);
  itemElement.innerHTML= newItem;
  itemBody.append(itemElement);
}

// update the database and view with new quantity value
function changeItemQty(){

}

// checkout all items and update the database
function finish(){
  window.location.href = tableWindow;
  alert ("Checkout success!");
  //TODO: update model
}

// update view with items of the tables stock
function setAllTableItems(){
  //setItem("orders", "name", "where when who", "alcahol package");
  //setItem("orders", "some name", "some info", "some stats");
  var item1 = 25053;
  var item2 = 638574;
  var details1 = itemDetails(item1);
  var details2 = itemDetails(item2);
  setItem("orders", details1.name, details1.info, details1.stats);
  setItem("orders", details2.name, details2.info, details2.stats);

}

// create the chekcout menue and popup
function setCheckout(){
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

}

// when document has loaded execute the following commands
$(document).ready(function () {
  setCheckout();
  setAllTableItems();
});
