// =====================================================================================================
// Control, for table info.
// =====================================================================================================
// Author: Anton Augustsson, 2021
//
//
// =====================================================================================================
// Varibles

var tableNr = 0;
var tableInfo = "table_info.html";

//TODO: update_view should be a general function that is caled appon in undomanager
// =====================================================================================================
// Helper functions

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
    //  selected table
    window.location.href = tableInfo;
}

// =====================================================================================================
// View update

// Insert html in view
function setTable(tableNr){
    $('#extraTables').append(createTable(tableNr));
}

function clear_view(){
    $('#extraTables').html('');
    tableNr = 0;
}

function header_undo(){
    undoit();
    update_view_table();
}

function header_redo(){
    redoit();
    update_view_table();
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

function update_view(){
    clear_view();
    for(i = 0; i < getNumTables(); i++){
        tableNr++;
        tableid = getTableId(i);
        setTable(tableid);
    }

}

$(document).ready(function(){
    update_view();
});

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
