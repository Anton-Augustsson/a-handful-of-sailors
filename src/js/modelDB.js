// =====================================================================================================
// Model, for managing database.
// =====================================================================================================
// Author: Anton Augustsson, 2021
//
// DB: users account
// DB2: beverages
// DB3: table
//
// =====================================================================================================
// Model, for for DB2
// =====================================================================================================

function getItemIndexDBBeverages(artikelid){
    for (i = 0; i < DB2.spirits.length; i++) {
        if (DB2.spirits[i].artikelid == artikelid) {
            return i;
        }
    }
    throw "Artikelid dosen't exist";    // throw a text
}

// get the item content for DB2 with artikle number or id
// details consist of name info and stats withs uses json notation. details.name etc will get the spesific info
function itemDetails(artikelid){
    var index = getItemIndexDBBeverages(artikelid);

    var details = {
        name: DB2.spirits[index].namn, // name on item
        details: DB2.spirits[index].namn2, //Details about item
        info: DB2.spirits[index].leverantor, // company, year, what type
        stats: DB2.spirits[index].alkoholhalt, // alkohlhalt, flask typ, liter, pris
        itemKind: DB2.spirits[index].varugrupp, // kind of alcohol
        artikelNo: artikelid,
        price: DB2.spirits[index].prisinklmoms,
        };
    return details;
}


// get the prise of an item inorder to calculate the cost
function getItemPrice(artikelid){
    var index = getItemIndexDBBeverages(artikelid);
    return parseInt(DB2.spirits[index].prisinklmoms);
}

// =====================================================================================================
// Model, for DB3 aka DBTable

// =====================================================================================================
// varible

// global varible for doing the operations for the database
var DBTable;

// =====================================================================================================
// Helper functions

//  Get the index of a table
//  Loops throw and finds the tableid in the json notation varible
//  then retorn where it found it
//
function getTableidIndex(tableid){
    var length = DBTable.tables.length;
    for(i=0; i < length; ++i){
        if(DBTable.tables[i].tableid == tableid){
            return i;
        }
    }
    throw "Tableid dosen't exist";    // throw a text
}

function getOrderdIndex(tableid, articleno){
    var table = getTableByID(tableid);
    var length = table.orders.length;
    for(i=0; i < length; ++i){
        if(table.orders[i].articleno == articleno){
            return i;
        }
    }
    throw "Orderid dosen't exist";    // throw a text
}

function initDBTable(){
    // get the local DB
    DBTable = JSON.parse(localStorage.getItem("DBTable"));

    // if there is no local DB then use the default one
    if(DBTable == null){
        DBTable = DB3;
        update_model();
    }
}

// =====================================================================================================
// Interface get values

// get table by table id
function getTableByID(tableid){
    return DBTable.tables[getTableidIndex(tableid)];
}

// get table by index
function getTableByIndex(tableindex){
    return DBTable.tables[tableindex];
}

// returns the article number for the item with the order index of ...
function getOrderByIndex(tableid, orderIndex){
    return getTableByID(tableid).orders[orderIndex].articleno;
}

// return the global variable DBTable
function getDBTable(){
    return DBTable;
}

// get the number of tables
function getNumTables(){
    return DBTable.tables.length;
}

// Get the id of a table by the a index of where the table is located in the json notation varible
function getTableId(tableindex){
    return getTableByIndex(tableindex).tableid;
}

// return the number of orders in frrom a table
function getNumOfOrders(tableid){
    var orders = getTableByID(tableid).orders;
    if(orders == null){
        return 0;
    }
    else{
        return orders.length;
    }
}

function getOrderOnHouseStatus(tableid, articleno){
    var it = getTableidIndex(tableid);
    var io = getOrderdIndex(tableid, articleno);
    return DBTable.tables[it].orders[io].onHouse;
}

function getOrderQty(tableid, articleno){
    var it = getTableidIndex(tableid);
    var io = getOrderdIndex(tableid, articleno);
    return DBTable.tables[it].orders[io].qty;
}

// =====================================================================================================
// Interface update database

// Initialise the DBTable
initDBTable();

// update the quantity in the stock database
function updateDB(articleid, qty){
    //TODO:
}

// update the table with a spesified DBTable
// perticilerly usfoule with undo redo
function setDBTable(UpdatedDBTable){
    DBTable = UpdatedDBTable;
    localStorage.setItem("DBTable", JSON.stringify(UpdatedDBTable));
}

function resetDBTable(){
    setDBTable(DB3);
}

// Need to update model whenever making a change to the database
function update_model(){
    setDBTable(DBTable);
    //localStorage.setItem("DBTable", JSON.stringify(DBTable));
}

// creates a new table and inserts it to the database
// return the table id
function newTable(){
    var length = DBTable.tables.length;
    var newTableObj = {
        tableid: length+1,
        orders: null
    };

    var newTableJSON = JSON.stringify(newTableObj);
    console.log(newTableJSON);
    DBTable.tables[length] = newTableObj;

    update_model();
    return newTableObj.tableid;
}

// creates a new order for a table
// use articleid to point to the item in the order
// qty>0 or faliure
// tableid starts from 1
//
function newOrder(tableid, articleid, qty){
    //var index = get
    try{
        var aricleidIndex = getDBWarehouseItemIndex(articleid);
        var index = getTableidIndex(tableid);

        var length = DBTable.tables[index].orders.length;

        var newOrderObj = {
            "articleno": articleid,
            "onHouse": false,
            "qty": qty
        };

        DBTable.tables[index].orders[length] = newOrderObj;

        update_model();
    } catch(error){
        console.log("Could not add order");
    }
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

                update_model();
                return;
            }
            else{
                throw "replenish exided order (replenishOrder)";
            }
        }
    }
    throw "articleno dosent exist (replenishOrder)";
}

function setOrderQty(tableid, articleid, qty){
    var ti =  getTableidIndex(tableid);
    var io = getOrderdIndex(tableid, articleid);
    DBTable.tables[ti].orders[io].qty = qty;
    update_model();
}

// remove order regardless of quantaty
//
function removeOrder(tableid, articleid){
    var ti = getTableidIndex(tableid);
    var length = DBTable.tables[ti].orders.length;
    for(i=0; i < length; ++i){
        if(DBTable.tables[ti].orders[i].articleno == articleid){
            DBTable.tables[ti].orders.splice(i,1);
            update_model();
            return;
        }
    }
    throw "articleno dosent exist (removeOrder)";
}

// remove all orders of tableid
// update quantaty in database
//
function checkoutTable(tableid){
    var ti = getTableidIndex(tableid);
    var length = DBTable.tables[ti].orders.length;
    var articleno;
    var order;
    var result = [];

    for(i=0; i < length; ++i){
        order = DBTable.tables[ti].orders[0];
        articleno = order.articleno;
        qty = order.qty;
        result[result.length] = [articleno,replenishStock(articleno, -qty)];
        DBTable.tables[ti].orders.splice(0,1);
    }

    // set warehouse to null
    update_model();
    console.log(result);
    return result; // what is leaft
}

// remove table from database
//
function removeTable(tableid){
    //checkoutTable(tableid);
    var i = getTableidIndex(tableid);
    DBTable.tables.splice(i,1);

    update_model();
}

function setOnHouse(tableid, articleno, status){
    var it = getTableidIndex(tableid);
    var io = getOrderdIndex(tableid, articleno);
    DBTable.tables[it].orders[io].onHouse = status;

    update_model();
}

// =====================================================================================================
// Model, for DB4 aka DBTable

// =====================================================================================================
// varible

// global varible for doing the operations for the database
var DBWarehouse;
var DefaultStock = 100;

// =====================================================================================================
// Get information functions

// set local storage DBWarehouse to the defoult
function setDBWarehouse(NewDBWarehouse){
    DBWarehouse = NewDBWarehouse;
    localStorage.setItem("DBWarehouse", JSON.stringify(NewDBWarehouse));
}

function resetDBWarehouse(){
    setDBWarehouse(DB4);
}

// get database
function getDBWarehouse(){
    return DBWarehouse;//localStorage.getItem("DBWarehouse");
}

// get number of items in DB4
function getNumberOfItemsInWarehouse(){
    return DBWarehouse.item.length;
}

function getDBWarehouseItemIndex(articleno){
    for(i = 0; i < getNumberOfItemsInWarehouse(); i++){
        if(DBWarehouse.item[i].articleno == articleno){
            return i;
        }
    }
    throw "Articleno dosen't exist";
}

function getDBWarehouseItem(articleno){
    return DBWarehouse.item[getDBWarehouseItemIndex(articleno)];
}

// get stock
function getStock(articleno){
    return getDBWarehouseItem(articleno).stock;
}

// get article number
function getArticleNumber(itemIndex){
    return DBWarehouse.item[itemIndex].articleno;
}


// =====================================================================================================
// Helper functions

function update_model_DBWarehouse(){
    setDBWarehouse(DBWarehouse);
}

function initDBWarehouse(){
    // get the local DB
    DBWarehouse = JSON.parse(localStorage.getItem("DBWarehouse"));

    // if there is no local DB then use the default one
    if(DBWarehouse == null){
        DBWarehouse = DB4;
        update_model_DBWarehouse();
    }
}

// =====================================================================================================
// Model update funtions

initDBWarehouse();

// replenish stock
function replenishStock(articleno, qty){
    var itemIndex = getDBWarehouseItemIndex(articleno);
    if(DBWarehouse.item[itemIndex].stock > -qty){
        DBWarehouse.item[itemIndex].stock += qty;
        update_model_DBWarehouse();
        update_model_DBWarehouse();
        return DBWarehouse.item[itemIndex].stock; // Qty leaft
    }
    else{
        throw "replenish exided item stock (replenishStock)";
    }
}

// remove
function removeWarehouseItem(articleno){
    var itemIndex = getDBWarehouseItemIndex(articleno);
    DBWarehouse.item.splice(itemIndex,1);
    update_model_DBWarehouse();
}

// add
function addWarehouseItem(articleno){
    var length = getNumberOfItemsInWarehouse();
    var newItemObj = {
        articleno: articleno,
        stock: DefaultStock,
    };

    DBWarehouse.item[length] = newItemObj;
    update_model_DBWarehouse();
}

// =====================================================================================================
// Model, for DB5 aka DBUser

// =====================================================================================================
// varible

// global varible for doing the operations for the database
var DBUser;


// =====================================================================================================
// Helper functions

function setDBUser(NewDBUser){
    DBUser = NewDBUser;
    localStorage.setItem("DBUser", JSON.stringify(NewDBUser));
}

function update_model_DBUser(){
    setDBUser(DBUser);
}

function initDBUser(){
    DBUser = JSON.parse(localStorage.getItem("DBUser"));

    // if there is no local DB then use the default one
    if(DBUser == null){
        DBUser = DB5;
        update_model_DBUser();
    }
}

function resetDBUser(){
    setDBUser(DB5);
}

function getUserIndexUserId(user_id){
    for(i = 0; i < DBUser.users.length; i++){
        if(DBUser.users[i].user_id == user_id){
            return i;
        }
    }
    throw "User can not be found by user_id";
}

function getUserIndexUsername(username){
    for(i = 0; i < DBUser.users.length; i++){
        if(DBUser.users[i].username == username){
            return i;
        }
    }
    throw "User can not be found by username";
}

function getCapitalIndex(index){
    return DBUser.users[index].capital;
}

function changeCapitalIndex(index, qty){
    var amount = parseInt(qty);
    var capital = DBUser.users[index].capital;
    if(capital > -amount){
        return DBUser.users[index].capital += amount;
    }
    else {
        throw "Can not change capital, unallowed operation";
    }
}

// =====================================================================================================
// Get information functions

function getUserDetails(username){
    var index = getUserIndexUsername(username);

    var details = {
        firstName: DBUser.users[index].first_name, // name on item
        lastName: DBUser.users[index].last_name, // name on item
        email: DBUser.users[index].email, // name on item
        phone: DBUser.users[index].phone, // name on item
        capital: DBUser.users[index].capital, // name on item
        };
    return details;

}

function getCapitalUserID(user_id){
    capital = getCapitalIndex(getUserIndexUserId(user_id));
    update_model_DBUser();
    return capital;
}

function getCapital(username){
    capital = getCapitalIndex(getUserIndexUsername(username));
    update_model_DBUser();
    return capital;
}

function verifyVipCredentials(username, password){
    try{
        index = getUserIndexUsername(username);
        if(DBUser.users[index].password == password){
            return true;
        }
        return false;
    } catch(error){
        return false;
    }
}

// =====================================================================================================
// Model update funtions

initDBUser();

function changeCapitalUserID(user_id, qty){
    capital = changeCapitalIndex(getUserIndexUserId(user_id), qty);
    update_model_DBUser();
    return capital;
}

function changeCapital(username, qty){
    capital = changeCapitalIndex(getUserIndexUsername(username), qty);
    update_model_DBUser();
    return capital;
}

function addUser(){
   //TODO
}

function removeUser(){
   //TODO
}

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
