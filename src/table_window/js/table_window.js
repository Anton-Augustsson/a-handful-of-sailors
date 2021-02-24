var tableNr = 0;
var tableInfo = "table_info.html";

function createTable(tableNr) {
    var newTable = `
    <div class="table" id="table${tableNr}" onclick=clickTable()>
        <span>Table ${tableNr}</span>
        <div class="dropdown">
          <p>Antal personer: 3</p>
          <p>Pris: 500kr</p>
        </div>
      </div> `;
    return newTable;
}

function setTable(tableNr){
    var tableElement = document.createElement('div');
    var tableBody = document.getElementById("extraTables");
    tableElement.innerHTML= createTable(tableNr);
    tableBody.append(tableElement);
}

function clear_view(){
    $('#extraTables').html('');
    tableNr = 0;
}

function update_view_table(){
    clear_view();
    for(i = 0; i < getNumTables(); i++){
        tableNr++;
        tableid = getTableId(i);
        setTable(tableid);
    }
}

function header_undo(){
    undoit();
    update_view_table();
}

function header_redo(){
    redoit();
    update_view_table();
}

function addTable(){
    doit(addTableUD());
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
            update_view_table();//setTable(tableid);
        },
        unexecute: function (){
            tableNr = this.oldTableNr;
            setDBTable(JSON.parse(this.oldDB));
            update_view_table();
        },
        reexecute: function () {
            tableNr = this.newTableNr;
            setDBTable(JSON.parse(this.newDB));
            update_view_table();
        },
    };
    return temp;
}

function clickTable() {
    window.location.href = tableInfo;
}

$(document).ready(function(){
    update_view_table();
});
