

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
    var length = DBTable.tables.length;
    for(i=0; i < length; ++i){
        if(DBTable.tables[i].tableid == tableid){
            return i;
        }
    }
    throw "Tableid dosen't exist";    // throw a text
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
function newOrder(tableid, articleid, qty){
    var length = DBTable.tables[getTableidIndex(tableid)].orders.length;
    var newOrderObj = {
        "articleno": articleid,
        "qty": qty
    };

    DBTable.tables[getTableidIndex(tableid)].orders[length] = newOrderObj;
}

// change the stock of an item
// qty>0 will increse the stock
// qty<0 will decrese the stock
// stock<0 is not allowed
//
function replenishOrder(tableid, articleid, qty){
    var length = DBTable.tables[getTableidIndex(tableid)].orders.length;
    for(i=0; i < length; ++i){
        if(DBTable.tables[getTableidIndex(tableid)].orders[i].articleno == articleid){
            if(DBTable.tables[getTableidIndex(tableid)].orders[i].qty > -qty){
                DBTable.tables[getTableidIndex(tableid)].orders[i].qty += qty;
                break;
            }
            else{
                throw "replenish exided order (replenishOrder)";
            }
        }
    }
    throw "articleno dosent exist (replenishOrder)";
}

// remove order regardless of quantaty
//
function removeOrder(tableid, articleid){
    var length = DBTable.tables[getTableidIndex(tableid)].orders.length;
    for(i=0; i < length; ++i){
        if(DBTable.tables[getTableidIndex(tableid)].orders[i].articleno == articleid){
            DBTable.tables[getTableidIndex(tableid)].orders.splice(i,1);
            break;
        }
    }
    throw "articleno dosent exist (removeOrder)";
}

// remove all orders of tableid
// update quantaty in database
//
function checkoutTable(tableid){
    var length = DBTable.tables[getTableidIndex(tableid)].orders.length;
    for(i=0; i < length; ++i){
        articleno = DBTable.tables[getTableidIndex(tableid)].orders[0].articleno;
        qty = DBTable.tables[getTableidIndex(tableid)].orders[0].qty;
        updateDB(articleno, qty);
        DBTable.tables[getTableidIndex(tableid)].orders.splice(0,1);
    }
}

// remove table from database
//
function removeTable(tableid){
    checkoutTable(tableid);
    DBTable.tables.splice(getTableidIndex(tableid),1);
}
