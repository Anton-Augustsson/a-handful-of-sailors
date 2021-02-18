

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


// new table
// new order for table
// remove table
// empty table
// remove order
//
//
function newTable(){
    //TODO:
}

// creates a new order for a table
// use articleid to point to the item in the order
// qty>0 or faliure
//
function newOrder(tableid, articleid, qty){
    //TODO:
}

// change the stock of an item
// qty>0 will increse the stock
// qty<0 will decrese the stock
// stock<0 is not allowed
//
function replenishOrder(tableid, articleid, qty){
    //TODO:
}

// remove order regardless of quantaty
//
function removeOrder(tableid, articleid){
    //TODO:
}

// remove all orders of tableid
// update quantaty in database
//
function checkoutTable(tableid){
    //TODO:
}

// remove table from database
//
function removeTable(tableid){

}
