// =====================================================================================================
// Control, for VIP.
// =====================================================================================================
// Author: Anton Augustsson, 2021
//
// =====================================================================================================
// View

function createVip(){
   return `
    <button id="vip-payment" onclick=vipPayment()>pay</button>
    <button id="vip-see-balance">see balance</button>
    <div id="modal-vip-balance">
    <div id="modal-content-vip-balance">
        <span id="close-vip-balance">&times;</span>
        <div id="vip-balance">100</div>
        <form>
            <label for="lamoutn">Amount:</label><br>
            <input type="number" id="lamount" name="lamount" min="1" max="10000" value="1"><br><br>
            <input type="submit" value="Submit" onclick=addBalance()>
        </form>
        <button id="cancel-vip-balance">close</button>
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
}

function init_vip(){
}

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
