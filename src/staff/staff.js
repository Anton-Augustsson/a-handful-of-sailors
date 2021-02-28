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

// =====================================================================================================
// Helper functions

// create new item with its content
function createItem(articleno, name, info, stats){
  var newItem = `
        <div class="item">
            <div class="item-general">
                <div class="name"><p>${name}</p></div>
                <div class="info"><p>${info}</p></div>
            </div>
            <div class="stats"><p>${stats}</p></div>
            <div class="item-options">
                <button class="on-the-house" id="on-house-${articleno}" onclick=onHouse(${articleno})></button>
                <button class="not-on-the-house" id="not-on-house-${articleno}" onclick=notOnHouse(${articleno})></button>
            </div>
        </div>`;
  return newItem;
}

// Creates a html table object
function createTable(tableNr) {
    var table = "table" + tableNr;
    var newTable = `
    <div class="table" id=${table} onclick=clickTable(${tableNr})>
        <span class="content-table">
          <p class="table-text">Table ${tableNr}</p>
          <button class="remove-table" onclick=removeTableWindow(${tableNr})>-</button>
        </span>
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
            <div id="content-table-window">
              <div class="tables" id="extraTables"></div>
              <div id="options-table-window">
                <button id="addTable" onclick=addTable()></button>
              </div>
            </div>
            <div id="security">
              <button id="notify-security" onclick=notifySecurity()></button>
            </div>
        </div>
        <div id="table-info">
            <div id="orders"></div>
            <div id="options-table-info">
                <button id="new-oder" onclick=newOrder()></button>
                <button id="payment"></button>
                <div id="modal-payment" class="modal">
                    <div class="modal-content-payment">
                        <span class="close">&times;</span>
                        <p id="payment-checkout"></p>
                        <button id="finish-payment" onclick=finishPayment()></button>
                        <button id="cancel-payment"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

// =====================================================================================================
// Reset function
var defaultSelectedTable = 1;

function setDefaultSelectedTable(){
  localStorage.setItem("selectedTable", defaultSelectedTable);
}

function resetStaff(){
  resetDBTable();
  resetDBWarehouse();
  setDefaultSelectedTable();
}

// =====================================================================================================
// Event functions

function addTable(){
    doit(addTableUD());
    update_view_staff();
}

function removeTableWindow(tableid){
    setDefaultSelectedTable();
    update_view_staff();
    //doit(removeTableWindowUD(tableid));
}

// Got to the table info page for a spesific table
// tableid is the same as tableNr
// "selectedTable" is the name of the table with we are curently in
function clickTable(tableid) {
    localStorage.setItem("selectedTable", tableid);
    update_view_staff();
    $(".not-on-the-house").fadeOut(0);
}

// checkout all items and update the database
function finishPayment(){
  //TODO: update model
  alert ("Checkout success!");
  update_view();
}

// update the database and view with new quantity value
function changeItemQty(){
  //TODO:
}

function newOrder() {
  console.log("newOrder");
  // change mode to customer
  // primary mode is set to staff
}

function onHouse(articleno){
  // hide not on house
  $("#not-on-house-" + articleno).fadeIn(0);
  $("#on-house-" + articleno).fadeOut(0);
}

function notOnHouse(articleno){
  // hide on the house
  $("#on-house-" + articleno).fadeIn(0);
  $("#not-on-house-" + articleno).fadeOut(0);
}

function notifySecurity(){
  alert ("Security has been notifyed!");
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
function setItem(articleno, idParent, name, info, stats){
  $("#"+idParent).append(createItem(articleno, name, info, stats));
}

// update view with items of the tables stock
function setAllTableItems(){
  var table = localStorage.getItem("selectedTable");
  var locationOfOrders = "orders";
  var item;
  var articleno;
  var length = getNumOfOrders(table);

  if(length >= 0){
     for(i = 0; i < length; ++i){
       articleno = getOrderByIndex(table,i);
       item = itemDetails(articleno);
       // TODO: set if it is on the house or not
       setItem(articleno, locationOfOrders, item.name, item.info, item.stats);

     }
  }
  else{
    throw("Failed to set all tables");
  }
}

function clear_view_staff(){
    $('#orders').html('');
    $('#extraTables').html('');
    //tableNr = 0;
}

// create the chekcout menue and popup
function setCheckout(){
  var modal    = document.getElementById("modal-payment");
  var span     = document.getElementsByClassName("close")[0];
  var payment  = document.getElementById("payment");
  var cancel   = document.getElementById("cancel-payment");

  payment.onclick = function() {
    modal.style.display = "block";
    console.log("payment.onclick");
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
            update_view_staff();
        },
        unexecute: function (){
            tableNr = this.oldTableNr;
            setDBTable(JSON.parse(this.oldDB));
            update_view_staff();
        },
        reexecute: function () {
            tableNr = this.newTableNr;
            setDBTable(JSON.parse(this.newDB));
            update_view_staff();
        },
    };
    return temp;
}

function removeTableWindowUD(tableid) {
    var temp = {
        oldDB: JSON.stringify(getDBTable()),
        newDB: null, // dummy value will be updated in execute
        oldTableNr: tableNr,
        newTableNr: null, //nummy value will be updated in execute

        execute: function (){
            removeTable(tableid);
            setDefaultSelectedTable();
            this.newDB = JSON.stringify(getDBTable());
            this.newTableNr = tableNr;
            //update_view_staff();
        },
        unexecute: function (){
            tableNr = this.oldTableNr;
            setDBTable(JSON.parse(this.oldDB));
            //update_view_staff();
        },
        reexecute: function () {
            tableNr = this.newTableNr;
            setDBTable(JSON.parse(this.newDB));
            //update_view_staff();
        },
    };
    return temp;
}

function update_view_staff(){
    //clear_view_staff();

    setStaff(modeHtmlId+staff);
    setAllTableItems();

    for(i = 0; i < getNumTables(); i++){
        tableNr++;
        tableid = getTableId(i);
        setTable(tableid);
    }

    update_view_dictionary();
    setCheckout();
}

function init_staff(){
  update_view_staff();
  setDefaultSelectedTable();
  setCheckout();
  $(".not-on-the-house").fadeOut(0);
}

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
