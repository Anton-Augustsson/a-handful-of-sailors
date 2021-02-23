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

function update_view_table(){
    for(i = 0; i < getNumTables(); i++){
        tableid = getTableId(i);
        setTable(tableid);
    }
}

function addTable() {
    var tableid = newTable();
    setTable(tableid);
    tableNr = tableNr + 1;
}

function clickTable() {
    window.location.href = tableInfo;
}

$(document).ready(function(){
    update_view_table();
});
