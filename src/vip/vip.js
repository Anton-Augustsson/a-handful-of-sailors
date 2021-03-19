// =====================================================================================================
// Control, for VIP.
// =====================================================================================================
// Author: Anton Augustsson, 2021
//
// =====================================================================================================
// View

// the intire view for a vip customer
function createVip(){
   return `
    <div id="options-vip">
        <button id="vip-see-balance"></button>
        <button id="vip-payment" onclick=vipPayment()></button>
        <button id="vip-see-special-drink" onclick=vipSpecialDrink()></button>
    </div>
    <div class="modal-vip" id="modal-vip-balance">
        <div class="modal-content-vip" id="modal-content-vip-balance">
            <span class="modal-vip-close" id="close-vip-balance">&times;</span>
            <div id="flex-vip-balance">
                <div id="vip-balance-details">
                    <div id="vip-balance-name"></div>
                    <span id="vip-balance-text"></span>
                    <span id="vip-balance"></span>
                    <form>
                        <label id="vip-balance-amount" for="lamoutn"></label><br>
                        <input type="number" id="lamount" name="lamount" min="0" max="10000" value="0"><br><br>
                    </form>
                </div>
                <div id="options-vip-balance">
                    <button id="vip-add-balance" onclick=addBalance()></button>
                    <button id="cancel-vip-balance"></button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-vip" id="modal-vip-special-drink">
        <div class="modal-content-vip" id="modal-content-vip-special-drink">
            <span class="modal-vip-close" id="close-vip-special-drink">&times;</span>
            <div id="flex-vip-special-drink">
                <div id="vip-special-drink-list"></div>
                <button id="cancel-vip-special-drink"></button>
            </div>
        </div>
    </div>
    `;
}

// view of a special drink
function createSpecialDrink(name, articleno, price){
   return `
    <div class="special-drink">
        <span>${name}</span>
        <span>${price}</span>
        <button class="buy-special-drink" onclick=buySpecialDrink(${articleno})></button>
    </div>
    `;
}

// =====================================================================================================
// Control: Event functions

// update the balance of a vip costumer
// alerts the user that a purches has been made
// gives a code to the lock to access the special drinks
function buySpecialDrink(articleno){
    var username = getItemUser();
    var specialDrinkCode = "2231";
    pay(username, articleno, 1);
    alert("Thank you for making a purches! The code is: " + specialDrinkCode);
    update_view_vip();
}

// show the view of the popup window of special drinks
function vipSpecialDrink(articleno){
    var modal  = document.getElementById("modal-vip-special-drink");
    modal.style.display = "block";
    console.log("special-drink.onclick");
}

// show the view of the popup window of vip account
function vipSeeBalance(){
    var modal  = document.getElementById("modal-vip-balance");
    modal.style.display = "block";
    console.log("payment.onclick");
}

// removes all listed items in the cart
// update the balance of a vip costmer
// alerts the user that the pershus has been made
// undo of payments is not allow from the vip costumer to prevent cheeting
function vipPayment(){
    var username = getItemUser();
    var orders = getOrders();
    var order;

    for (let i = 0; i < orders.length; i++) {
        order = orders[i];
        pay(username, order[0], order[1]);
    }

    finnishCustomerSession();
    alert("Thank you for making a purches!");
    update_view_vip();
}

// add amount to balance of a vip customer
// a limit is set to 10000 to prevent abnormal large amounts
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

// set what the will happen when clicking on spesific divs for vip balance
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

// set what the will happen when clicking on spesific divs for special drinks
function setViewSpecialDrink(){
    var modal  = document.getElementById("modal-vip-special-drink");
    var view   = document.getElementById("vip-see-special-drink");
    var span   = document.getElementById("close-vip-special-drink");
    var cancel = document.getElementById("cancel-vip-special-drink");

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
// Control: View update

// List all special drinks in a popup window
function setSpecialDrinkList(){
    var id = "#vip-special-drink-list";
    var articleno;
    var details;
    var name;
    var price;
    var i;

    $(id).html("");

    for (i=0; i<getSpecialDrinkLength(); i++){
        articleno = getSpecialDrink(i);
        details = itemDetails(articleno);
        name = details.name;
        price = details.price;

        $(id).append(createSpecialDrink(name, articleno, price));
    }
    console.log(i);
}

// Update the view with vip users balance
function setVipBalance(){
    var details = getUserDetails(getItemUser());
    $("#vip-balance").text(details.capital);
    $("#vip-balance-name").text(details.firstName + " " + details.lastName);
}

// inserts the view in a div in the customer view
function setVip(){
    $("#customer-vip").html(createVip());
}

// Rerender the view if any changes has been made
function update_view_vip(){
    update_view_customer();

    setVip();
    setViewBalance();
    setViewSpecialDrink();
    setVipBalance();
    setSpecialDrinkList();
}

function init_vip(){
}

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
