// =====================================================================================================
// Control, for table info.
// =====================================================================================================
// Author: Anton Augustsson, 2021
//
//
// =====================================================================================================
// Varibles

var tableNr = 0;
//var tableInfo = "table_info.html";
//var tableWindow = "table_window.html";

//TODO: update_view should be a general function that is caled appon in undomanager
// =====================================================================================================
// Helper functions

// create new item with its content
function createItem(name, info, stats){
  var newItem = `
        <div class="item">
            <div class="item-general">
                <div class="name"><p>${name}</p></div>
                <div class="info"><p>${info}</p></div>
            </div>
            <div class="stats"><p>${stats}</p></div>
            <div class="item-options">
                <button>on the house</button>
            </div>
        </div>`;
  return newItem;
}

// Creates a html table object
function createTable(tableNr) {
    var table = "table" + tableNr;
    var newTable = `
    <div class="table" id=${table} onclick=clickTable(${tableNr})>
        <span>Table ${tableNr}</span>
        <div class="dropdown">
          <p>Antal personer: 3</p>
          <p>Pris: 500kr</p>
        </div>
      </div> `;
    return newTable;
}

function createStaff(){
    return `
    <div id="staff">
        <div id="table-window">
            <div class="tables" id="extraTables"></div>
            <div id="options-table-window">
                <button id="addTable" onclick=addTable()>Add Table</button>
            </div>
        </div>
        <div id="table-info">
            <div id="orders"></div>
            <div id="options-table-info">
                <button id="add">add</button>
                <button id="checkout">checkout</button>
                <div id="myModal" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <p>the itmes that you have added</p>
                        <button id="finish" onclick=finish()>Checkout</button>
                        <button id="cancel">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

// =====================================================================================================
// Event functions

function addTable(){
    doit(addTableUD());
}

// Got to the table info page for a spesific table
// tableid is the same as tableNr
// "selectedTable" is the name of the table with we are curently in
function clickTable(tableid) {
    localStorage.setItem("selectedTable", tableid);
    update_view_staff();
}

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

// Insert html in view
function setTable(tableNr){
    $('#extraTables').append(createTable(tableNr));
}

function setStaff(id){
    $("#"+id).html(createStaff());

}

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

function clear_view_staff(){
    $('#orders').html('');
    $('#extraTables').html('');
    tableNr = 0;
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

// We need to evaluate DBTable therfore we use JSON.stringify if you remove it the oldDB will be
// the new DB
function addTableUD() {
    var temp = {
        oldDB: JSON.stringify(getDBTable()),
        newDB: null, // dummy value will be updated in execute
        oldTableNr: tableNr,
        newTableNr: null, //nummy value will be updated in execute

        execute: function (){
            var tableid = newTable();
            tableNr = tableNr + 1;
            this.newDB = JSON.stringify(getDBTable());
            this.newTableNr = tableNr;
            update_view();//setTable(tableid);
        },
        unexecute: function (){
            tableNr = this.oldTableNr;
            setDBTable(JSON.parse(this.oldDB));
            update_view();
        },
        reexecute: function () {
            tableNr = this.newTableNr;
            setDBTable(JSON.parse(this.newDB));
            update_view();
        },
    };
    return temp;
}

function update_view_staff(id){
    setStaff(id);
    clear_view_staff();
    setAllTableItems();
    for(i = 0; i < getNumTables(); i++){
        tableNr++;
        tableid = getTableId(i);
        setTable(tableid);
    }
}
/*
$(document).ready(function(){
    update_view();
});
*/
// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
