

// DB: users account ...
// DB2: beverages


function itemDetails(artikelid){


    var name; // name on item
    var info; // company, year, what type
    var stats; // alkohlhalt, flask typ, liter, pris

    for (i = 0; i < DB2.spirits.length; i++) {
        if (DB2.spirits[i].artikelid == artikelid) {

            name = DB2.spirits[i].namn;
            info = DB2.spirits[i].leverantor;
            stats = DB2.spirits[i].alkoholhalt;
            break;
        };
    };

    var details = {
        name: name,
        info: info,
        stats: stats
    };

    return details;
}

function getTableidIndex(tableid){
    return tableid-1;
}

function updateDB(articleid, qty){
    //TODO:
}

// creates a new table and inserts it to the database
function newTable(){
    var length = DBTable.tables.length;
    var newTableObj = {
        tableid: length+1,
        orders: [{}]
    };

    var newTableJSON = JSON.stringify(newTableObj);
    console.log(newTableJSON);
    DBTable.tables[length] = newTableObj;
}

// creates a new order for a table
// use articleid to point to the item in the order
// qty>0 or faliure
// tableid starts from 1
//
function newOrder(tableid, artdicleid, qty){
    var newOrderObj = {
        "articleno": articleid,
        "qty": qty
    };

    DBTable.tables[getTableidIndex(tableid)].orders = newOrderObj;
}

// change the stock of an item
// qty>0 will increse the stock
// qty<0 will decrese the stock
// stock<0 is not allowed
//
function replenishOrder(tableid, articleid, qty){
    //TODO:
    var length = DBTable.tables[getTableidIndex(tableid)].orders.length;
    for(int i=0; i < length; ++i){
        if(DBTable.tables[getTableidIndex(tableid)].orders[i].articleno == articleid &&
           DBTable.tables[getTableidIndex(tableid)].orders[i].qty > -qty){
            DBTable.tables[getTableidIndex(tableid)].orders[i].qty += qty;
        }
    }
}

// remove order regardless of quantaty
//
function removeOrder(tableid, articleid){
    //TODO:
    var length = DBTable.tables[getTableidIndex(tableid)].orders.length;
    for(int i=0; i < length; ++i){
        if(DBTable.tables[getTableidIndex(tableid)].orders[i].articleno == articleid){
            delete DBTable.tables[getTableidIndex(tableid)].orders[i];
        }
    }
}

// remove all orders of tableid
// update quantaty in database
//
function checkoutTable(tableid){
    //TODO:
    var length = DBTable.tables[getTableidIndex(tableid)].orders.length;
    for(int i=0; i < length; ++i){
        articleno = DBTable.tables[getTableidIndex(tableid)].orders[i].articleno;
        qty = DBTable.tables[getTableidIndex(tableid)].order[i].qty;
        updateDB(articleno, qty);
        delete DBTable.tables[getTableidIndex(tableid)].orders[i];
    }
}

// remove table from database
//
function removeTable(tableid){
    checkoutTable(tableid);
    delete DBTable.tables[getTableidIndex(tableid)];
}
