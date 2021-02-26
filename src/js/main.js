// when we have login we will go to the spesific mode
// therefore login function should setMode for that spesific one and update_view
// when a mode is selected all are hidden and then the selected is shoun
// when we have modifyes the contet we will call update_view we will then repet the process
// and the spesific mode will have a function that inserts the nessesary content

// modeid
var customer = 1;
var vip      = 2;
var staff    = 3;
var manager  = 4;

var defaultMode = customer;

// Updates local stored variable mode to an id of one of the avalible mode
/* mode
 * 1: customer
 * 2: vip
 * 3: staff
 * 4: manager
*/
function setMode(modeid){
    localStorage.setItem("mode", modeid);
    update_view();
}

// returns the current mode
function getMode(){
    return parseInt(localStorage.getItem("mode"));
}

function resetMode(){
    setMode(defaultMode);
    update_view();
}

function hideModes(){
    $("#mode1").fadeOut();
    $("#mode2").fadeOut();
    $("#mode3").fadeOut();
    $("#mode4").fadeOut();
}

// uses jqure to show a spesific div
function showMode(modeid){
    $("#mode"+modeid).fadeIn();
}

function customerMode(){
    showMode(customer);
    // TODO: update view for customer mode
}

function vipMode(){
    showMode(vip);
    // TODO: update view for vip mode
}

function staffMode(){
    showMode(staff);
    // TODO: update view for staff mode
}

function managerMode(){
    showMode(manager);
    // TODO: update view for manager mode
}

function init(){
    if(getMode()==null){
        setMode(defaultMode);
    }
    update_view();
}

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
}

// Inisalize a defaoult view
$(document).ready(function () {
    init();
});
