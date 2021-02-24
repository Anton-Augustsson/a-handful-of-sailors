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
        oldTableNr: tableNr,

        execute: function (){
            var tableid = newTable();
            tableNr = tableNr + 1;
            update_view_table();//setTable(tableid);
        },
        unexecute: function (){
            tableNr = this.oldTableNr;
            setDBTable(JSON.parse(this.oldDB));
            update_view_table();
        },
        reexecute: function () {

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
