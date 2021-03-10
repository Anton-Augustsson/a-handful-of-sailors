// =====================================================================================================
// Control, for VIP.
// =====================================================================================================
// Author: Anton Augustsson, 2021
//
// =====================================================================================================
// View

function createVip(){
   return `
    <div id="options-vip">
        <button id="vip-payment" onclick=vipPayment()>pay</button>
        <button id="vip-see-balance">see balance</button>
    </div>
    <div id="modal-vip-balance">
        <div id="modal-content-vip-balance">
            <span id="close-vip-balance">&times;</span>
            <div id="flex-vip-balance">
                <div id="vip-balance-details">
                    <div id="vip-balance-name"></div>
                    <span id="vip-balance-text">Balance: </span>
                    <span id="vip-balance"></span>
                    <form>
                        <label for="lamoutn">Amount to add: </label><br>
                        <input type="number" id="lamount" name="lamount" min="0" max="10000" value="0"><br><br>
                    </form>
                </div>
                <div id="options-vip-balance">
                    <button onclick=addBalance()>Add amount</button>
                    <button id="cancel-vip-balance">close</button>
                </div>
            </div>
        </div>
    </div>
    `;
}

// =====================================================================================================
// Event functions

function vipSeeBalance(){
    var modal  = document.getElementById("#modal-vip-balance");
    modal.style.display = "block";
    console.log("payment.onclick");
}

function vipPayment(){
}

function addBalance(){
    var amount = $("#lamount").val();
    if(amount < 10000){
        changeCapital(getItemUser(), amount);
        setVipBalance();
    }
    else{
        console.log("added to much");
        alert("You have added to much");
    }

    $("#lamount").val('0');
}

function setViewBalance(){
    var modal  = document.getElementById("modal-vip-balance");
    var view   = document.getElementById("vip-see-balance");
    var span   = document.getElementById("close-vip-balance");
    var cancel = document.getElementById("cancel-vip-balance");

    view.onclick = function() {
        modal.style.display = "block";
        console.log("payment.onclick");
    };

    cancel.onclick = function() {
        modal.style.display = "none";
        console.log("cancel.onclick");
    };

    span.onclick = function() {
        modal.style.display = "none";
        console.log("span.onclick");
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}
// =====================================================================================================
// View update

function setVipBalance(){
    var details = getUserDetails(getItemUser());
    $("#vip-balance").text(details.capital);
    $("#vip-balance-name").text(details.firstName + " " + details.lastName);
}

function setVip(){
    $("#customer-vip").html(createVip());
}

function newOrderVip(){
    // TODO: make an order use model
}

function showVip(){
    // TODO: fadeIn fadeOut
}

function hideVip(){
    // TODO: fadeIn fadeOut
}

function update_view_vip(){
    update_view_customer();

    setVip();
    setViewBalance();
    setVipBalance();
}

function init_vip(){
}

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
