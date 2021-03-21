// =====================================================================================================
// Control, for Staff.
// =====================================================================================================
// Author: Anton Augustsson, 2021
//
//
// =====================================================================================================
// Varibles

var tableNr = 0;

// =====================================================================================================
// Helper functions

// create new item with its content
function createItem(tableid, articleno, name, info, stats, qty, oldPrice, newPrice){
  var newItem = `
        <div class="item">
            <input type="checkbox" name="selectItem" id="checkbox-${tableid}-${articleno}"><br/>
            <div class="item-general">
                <div class="name"><p>${name}</p></div>
                <div class="info"><p>${info}</p></div>
            </div>
            <div class="stats"><p>${stats}</p></div>
            <div class="item-options">

                <button class="on-the-house" id="on-house-${tableid}-${articleno}" onclick=onHouse(${tableid},${articleno})></button>
                <button class="not-on-the-house" id="not-on-house-${tableid}-${articleno}" onclick=notOnHouse(${tableid},${articleno})></button>
                <button class="remove-item-order" id="remove-item-${tableid}-${articleno}" onclick=removeItemOrder(${tableid},${articleno})>remove</button>
                <forum>
                  <label class="item-mod-qty" for="quantity-${tableid}-${articleno}"></label>
                  <input type="number" id="quantity-${tableid}-${articleno}" name="quantity" min="1" max="10" value="${qty}" onchange=updateTableOrderQty(${tableid},${articleno})>
                </forum>
                <forum>
                  <label class="item-mod-price" for="price-${tableid}-${articleno}"></label>
                  <input type="number" id="price-${tableid}-${articleno}" name="price" min="1" max="10000" value="${newPrice}" onchange=updateTableOrderPrice(${tableid},${articleno})>
                </forum>
                <span class="item-price" id="old-price-${tableid}-${articleno}"></span>
            </div>
        </div>`;
  return newItem;
}

// Creates a html table object
function createTable(tableNr) {
    var table = "table" + tableNr;
    var newTable = `
    <div class="table" id=${table} >
        <span class="content-table">
          <p class="table-text" onclick=clickTable(${tableNr})>Table ${tableNr}</p>
          <button class="remove-table" onclick=removeTableWindow(${tableNr})>-</button>
        </span>
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
            <label for="select-all-items" id="select-all-items-label"></label>
            <input type="checkbox" id="select-all-items" onclick=selectAllItems(this)><br/>
            <div id="orders"></div>
            <div id="options-table-info">
                <button id="new-order" onclick=newOrderCustomer()></button>
                <button id="payment"></button>
                <span id="total-price-table"></span>
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
// Helper function

function isSelected(tableid, articleno){
  var checkbox = document.getElementById('checkbox-'+ tableid + '-' + articleno);
  return checkbox.checked;
}

function selectAllItems(source) {
  var checkboxes = document.getElementsByName('selectItem');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = source.checked;
  }
}

function resetStaff(){
  reset();
  setDefaultSelectedTable();
}

function calculatePriceForTable() {
  var table = getCurrentTable();
  var articleno;
  var sum = 0;
  var onHouse;

  for(var i = 0; i < getNumOfOrders(table); ++i){
    articleno = getOrderByIndex(table,i);
    onHouse = getOrderOnHouseStatus(table, articleno);
    if(!onHouse){
      sum += getOrderPrice(table,articleno)*getOrderQty(table,articleno);
    }
  }

  return sum;
}

function alertLowStock(articlenoQty){
  for(i = 0; i < articlenoQty.length; i++){
    if(articlenoQty[i][1]<10){
      alert("Running low on " + articlenoQty[i][0]);
    }
  }
}

// =====================================================================================================
// Event functions

function addTable(){
    doit(addTableUD());
}

function removeTableWindow(tableid){
    setDefaultSelectedTable();
    doit(removeTableWindowUD(tableid));
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
  doit(finishPaymentUD());
  alert ("Checkout success!");
  update_view();
}
// update the database and view with new quantity value
function changeItemQty(articleno, qty){
  replenishStock(articleno, qty);
}

function newOrderCustomer() {
  console.log("newOrder");
  setMode(customer);
  // change mode to customer
  // primary mode is set to staff
}

function onHouse(tableid, articleno){
  // hide not on house
  setOnHouse(tableid,articleno,true);
  update_view_staff();
}

function notOnHouse(tableid, articleno){
  // hide on the house
  setOnHouse(tableid,articleno,false);
  update_view_staff();
}

function notifySecurity(){
  alert ("Security has been notifyed!");
}

function removeItemOrder(tableid, articleno){
  console.log("remove");
  console.log(tableid);
  console.log(articleno);
  doit(removeItemOrderUD(tableid, articleno));
}

function updateTableOrderQty(tableid, articleno){
  console.log("Update qty");
  var value = $("#quantity-"+tableid+"-"+articleno).val();
  if(value <= 10){
    setOrderQty(tableid, articleno, value);
    update_view_staff();
  }
  else{
    alert("Can not add more then 10 quantity of a items");
    $("#quantity-"+tableid+"-"+articleno).val('10');
  }
}

function updateTableOrderPrice(tableid, articleno){
  console.log("Update price");
  var value = $("#price-"+tableid+"-"+articleno).val();
  if(value <= 10000){
    setOrderPrice(tableid, articleno, value);
    update_view_staff();
  }
  else{
    alert("Can not add more then 10000 in price");
    $("#price-"+tableid+"-"+articleno).val(getItemPrice(articleno));
  }
}

// =====================================================================================================
// Undo redo functions

function removeItemOrderUD(tableid, articleno){
    var temp = {
        oldDB: JSON.stringify(getDBTable()),
        newDB: null, // dummy value will be updated in execute

        execute: function (){
            removeOrder(tableid, articleno);
            this.newDB = JSON.stringify(getDBTable());
            update_view_staff();
        },
        unexecute: function (){
            setDBTable(JSON.parse(this.oldDB));
            update_view_staff();
        },
        reexecute: function () {
            setDBTable(JSON.parse(this.newDB));
            update_view_staff();
        },
    };
    return temp;
}

function finishPaymentUD(){
   var temp = {
        oldDB: JSON.stringify(getDBTable()),
        newDB: null, // dummy value will be updated in execute

        execute: function (){
          result = checkoutTable(getCurrentTable());
          alertLowStock(result);
          this.newDB = JSON.stringify(getDBTable());
          update_view_staff();
        },
        unexecute: function (){
            setDBTable(JSON.parse(this.oldDB));
            update_view_staff();
        },
        reexecute: function () {
            setDBTable(JSON.parse(this.newDB));
            update_view_staff();
        },
    };
    return temp;
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
function setItem(table, articleno, name, info, stats, qty, oldPrice, newPrice){
  $("#orders").append(createItem(table, articleno, name, info, stats, qty, oldPrice, newPrice));
}

function setTotalPriceTable(){
    // need to update language before
    getLanguage();
    $("#total-price-table").text(get_string('vars', 'total-price-table-message') + calculatePriceForTable());
}

function setPriceOrder(table, articleno){
    // need to update language before
    getLanguage();
    $("#old-price-"+table+"-"+articleno).text(get_string('vars', 'item-price-message') + getItemPrice(articleno));
}

// update view with items of the tables stock
function setAllTableItems(){
  var table = getCurrentTable();
  var item;
  var articleno;
  var length = getNumOfOrders(table);
  var onHouse;
  var qty;
  var price;

  if(length >= 0){
     for(i = 0; i < length; ++i){
       articleno = getOrderByIndex(table,i);
       item = itemDetails(articleno);
       qty = getOrderQty(table, articleno);
       oldPrice = getItemPrice(articleno);
       newPrice = getOrderPrice(table, articleno);
       getLanguage();
       stats = get_string('vars', 'alcohol-content-message') + item.stats;
       setItem(table, articleno, item.name, item.info, stats, qty, oldPrice, newPrice);
       setPriceOrder(table, articleno);

       onHouse = getOrderOnHouseStatus(table, articleno);
       if(onHouse){
         $("#not-on-house-"+table+"-"+articleno).fadeIn(0);
         $("#on-house-"+table+"-"+articleno).fadeOut(0);
       }
       else if(!onHouse){
         $("#on-house-"+table+"-"+articleno).fadeIn(0);
         $("#not-on-house-"+table+"-"+articleno).fadeOut(0);
       }
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

function update_view_staff(){
    //clear_view_staff();

    setStaff(modeHtmlId+staff);
    setAllTableItems();
    setTotalPriceTable();

    for(i = 0; i < getNumTables(); i++){
        tableNr++;
        tableid = getTableId(i);
        setTable(tableid);
    }

    setCheckout();
    update_view_dictionary();
}

function init_staff(){
  update_view_staff();
  setDefaultSelectedTable();
  setCheckout();
}

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
