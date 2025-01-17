// =====================================================================================================
// Model, for managing database.
// =====================================================================================================
// Author: Anton Augustsson, 2021
//
// when we have login we will go to the spesific mode
// therefore login function should setMode for that spesific one and update_view
// when a mode is selected all are hidden and then the selected is shoun
// when we have modifyes the contet we will call update_view we will then repet the process
// and the spesific mode will have a function that inserts the nessesary content
//
// There is also a primary mode whitch is usedd when for example staff wonts to make a new order
// it will then be a primary mode of staff and a curent mode of customer
// when customer has made the order we will go back to primary mode
//
// =====================================================================================================

// =====================================================================================================
// varible

// modeid
var customer = 1;
var vip      = 2;
var staff    = 3;
var manager  = 4;

var modeHtmlId = "mode";
var defaultMode = customer;

var modeVarible = "mode";
var primaryModeVariable = "primaryMode";

// The first needs to be the default mode
var userModeStr = ["Customer", "VIP", "Staff", "Manager"];

var numOfMode = 4;
// =====================================================================================================
// Mode operations

// Updates local stored variable mode to an id of one of the avalible mode
function setMode(modeid){
    localStorage.setItem(modeVarible, modeid);
    update_view();
}

// returns the current mode
function getMode(){
    return parseInt(localStorage.getItem(modeVarible));
}

// set default mode for normal and primary
function resetMode(){
    setPrimaryMode(defaultMode);
    setMode(defaultMode);
    setUser();
    update_view();
}

// set the mode with is what the user has signd in to
function setPrimaryMode(modeid){
    localStorage.setItem("primaryMode", modeid);
}

function getPrimaryMode(){
    return parseInt(localStorage.getItem("primaryMode"));
}

// when preseed to checkout from customer go back to primary mode since other primary modes can call customer
function goToPrimaryMode(){
    setMode(getPrimaryMode());
}

// set username and titel in the header
function setUser(){
    // Desplay username and mode in header
    var primaryMode = getPrimaryMode();
    if(primaryMode > customer){
        setUserHeader(userModeStr[primaryMode-1] + ": " + getItemUser());
        showLogout();
    } else {
        setUserHeader(userModeStr[0]);
        showLogin();
    }
}

// =====================================================================================================
// Helper function

// hides all modes
function hideModes(){
    for(i = 1; i<=numOfMode; i++){
        $("#"+modeHtmlId+i).fadeOut(0);
    }
}

// uses jqure to show a the spesified mode
function showMode(modeid){
    $("#"+modeHtmlId+modeid).fadeIn(0);
}

// run all things that only requres to run once from varius diffrent modes
function init(){
    // we need to update all views or we
    getLanguage();
    init_staff();
    update_view_customer();

    if(getMode()==null){
        setMode(defaultMode);
    }

    setUser();

    update_view();
    update_view_dictionary();
}

// reset all database and other localy stored files
function reset(){
    resetDBTable();
    resetDBWarehouse();
    resetDBUser();
}

// =====================================================================================================
// Mode functions

// show customer and updates its view
function customerMode(){
    showMode(customer);
    update_view_customer();
}

// show customer and updates vip view
function vipMode(){
    showMode(customer);
    update_view_vip();
}

// show staff and updates its view
function staffMode(){
    showMode(staff);
    update_view_staff();
}

// show manager and updates its view
function managerMode(){
    showMode(manager);
    update_view_manager();
}

// =====================================================================================================
// View update

// update view with the currently set mode
function update_view(){
    hideModes();

    switch(getMode()) {
    case customer:
        customerMode();
        break;
    case vip:
        vipMode();
        break;
    case staff:
        staffMode();
        break;
    case manager:
        managerMode();
        break;
    default:
        customerMode();
    }

    // Needs to be last to maksure the language is alwase updated
    update_view_dictionary();
}

// Inisalize a defaoult view
$(document).ready(function () {
    init();
});

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
