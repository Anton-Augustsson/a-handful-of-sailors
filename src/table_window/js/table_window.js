var tableNr = 3;
var tableInfo = "table_info.html";

function createTable(tableNr) {
    var tableElement = document.createElement('div');
    var tableBody = document.getElementById("extraTables");
    var newTable = `
    <div class="table" id="table${tableNr}" onclick=clickTable()>
        <span>${tableNr}</span>
        <div class="dropdown">
          <p>Antal personer: 3</p>
          <p>Pris: 500kr</p>
        </div>
      </div> `;
    tableElement.innerHTML= newTable;
    tableBody.append(tableElement);
}

function addTable() {
    createTable(tableNr);
    tableNr = tableNr + 1;
}

function clickTable() {
    window.location.href = tableInfo;
}
