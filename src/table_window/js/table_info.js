// =====================================================================================================
// Control, for table info.
// =====================================================================================================
// Author: Anton Augustsson, 2021
//
//
// =====================================================================================================
// Varibles

// the Href for going back to table window
var tableWindow = "table_window.html";

// =====================================================================================================
// Helper functions

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

// =====================================================================================================
// Event functions

// checkout all items and update the database
function finish(){
  window.location.href = tableWindow;
  alert ("Checkout success!");
  //TODO: update model
}

// update the database and view with new quantity value
function changeItemQty(){
  //TODO:
}


// =====================================================================================================
// View update

// inserts new item in view
function setItem(idParent, name, info, stats){
  $("#"+idParent).append(createItem(name, info, stats));
}

// update view with items of the tables stock
function setAllTableItems(){
  var table = localStorage.getItem("selectedTable");
  var locationOfOrders = "orders";
  var item;
  var articleno;

  for(var i = 0; i < getNumOfOrders(table); ++i){
    articleno = getOrderByIndex(table,i);
    item = itemDetails(articleno);
    setItem(locationOfOrders, item.name, item.info, item.stats);
  }
}

// clear orders div from insertet items
function clear_view(){
    $('#orders').html('');
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

// Update view by clearing view and then insert the content that changes.
function update_view(){
  clear_view();
  setAllTableItems();
}

// when document has loaded execute the following commands
$(document).ready(function () {
  setCheckout();
  update_view();
});

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
