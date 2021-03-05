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

function resetMode(){
    setMode(defaultMode);
    update_view();
}

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

// =====================================================================================================
// Helper function

function hideModes(){
    for(i = 1; i<=numOfMode; i++){
        $("#"+modeHtmlId+i).fadeOut(0);
    }
}

// uses jqure to show a spesific div
function showMode(modeid){
    $("#"+modeHtmlId+modeid).fadeIn(0);
}

function init(){
    // we need to update all views or we
    getLanguage();
    init_staff();

    if(getMode()==null){
        setMode(defaultMode);
    }
    update_view();
}

// =====================================================================================================
// Mode functions

function customerMode(){
    setUser("Customer");
    setUser();
    showMode(customer);
    // TODO: update view for customer mode
    update_view_customer();
}

function vipMode(){
    setUser("VIP: " + getItemUser());
    showMode(vip);
    // TODO: update view for vip mode
}

function staffMode(){
    setUser("Staff: " + getItemUser());
    showMode(staff);
    update_view_staff();
}

function managerMode(){
    setUser("Manager: " + getItemUser());
    showMode(manager);
    // TODO: update view for manager mode
    //update_view_manager();
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
