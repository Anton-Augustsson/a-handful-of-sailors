var iteamVar = 0;
var backVar = 0;
function changeBeverageList (arg) {
    var oldbeverages = document.getElementsByClassName("spirits");
    if (arg === "next" && (iteamVar + 10) < DB2.spirits.length){
        if(backVar < 0) {
            iteamVar -= backVar;
        }
        while(oldbeverages.length > 0){
            oldbeverages[0].parentNode.removeChild(oldbeverages[0]);
        }
        beverageList(document.getElementById("myselect").value);
    }
    if (arg === "back" && (iteamVar - 10) >= 0){
        if(backVar > 0) {
            iteamVar -= backVar;
        }
        while(oldbeverages.length > 0){
            oldbeverages[0].parentNode.removeChild(oldbeverages[0]);
        }
        beverageList2(document.getElementById("myselect").value);

    }
}

function changingKind (arg){
    iteamVar = 0;
    backVar = 0;
    changeBeverageList(arg);
}

function beverageList(arg){
    backVar = 0;
    var beveragelist = document.getElementById("spirits");
    for (iteamVar; document.querySelectorAll(".spirits.spirits").length < 10 && iteamVar < DB2.spirits.length; iteamVar++) {
        backVar += 1;
        if(arg === "all" || arg == DB2.spirits[iteamVar].varugrupp || arg == undefined) {
            var name = DB2.spirits[iteamVar].namn;
            var name2 = "None";
            if (DB2.spirits[iteamVar].namn2 !== "") {
                name2 = DB2.spirits[iteamVar].namn2
            }
            var artikelid = DB2.spirits[iteamVar].artikelid;
            var bevaregeContent = `
            <div class="spirits" id="${artikelid}"   onclick=beverageInfo(${artikelid}) >
                <button class="btn order-iteam" type="button">ADD TO ORDER</button>
                <span> Namn: ${name} <br> Detaljer: ${name2} <br> Article Nr: ${artikelid}  <span>
            </div>`;
            var beverageElement = document.createElement('div');
            beverageElement.innerHTML = bevaregeContent;
            beveragelist.appendChild(beverageElement);
        }

    }
    var listOfBeverages = document.getElementsByClassName("spirits");
    for (j = 0; j < listOfBeverages.length; j++) {
        listOfBeverages[j].getElementsByClassName("order-iteam")[0].addEventListener('click', addToOrderClicked)
    }
}

function beverageList2(arg){
    backVar = 0;
    var beveragelist = document.getElementById("spirits");
    for (iteamVar; document.querySelectorAll(".spirits.spirits").length < 10 && iteamVar < DB2.spirits.length && iteamVar > 0; iteamVar--) {
        backVar -= 1;
        if(arg == "all" || arg == DB2.spirits[iteamVar].varugrupp) {
            var name = DB2.spirits[iteamVar].namn;
            var name2 = "None";
            if (DB2.spirits[iteamVar].namn2 !== "") {
                name2 = DB2.spirits[iteamVar].namn2
            }
            var artikelid = DB2.spirits[iteamVar].artikelid;
            var bevaregeContent = `
            <div class="spirits" id="${artikelid}"  onclick=beverageInfo(${artikelid}) >
                <button class="btn order-iteam" type="button">ADD TO ORDER</button>
                <span> Namn: ${name} <br> Detaljer: ${name2} <br> Article Nr: ${artikelid}  <span>
            </div>`;
            var beverageElement = document.createElement('div');
            beverageElement.innerHTML = bevaregeContent;
            beveragelist.appendChild(beverageElement);

        }

    }
    var listOfBeverages = document.getElementsByClassName("spirits");
    for (j = 0; j < listOfBeverages.length; j++) {
        listOfBeverages[j].getElementsByClassName("order-iteam")[0].addEventListener('click', addToOrderClicked)
    }
}


function beverageInfo(artId){
    var allInformation = "";
    for (i = 0; i  < DB2.spirits.length; i++){
        if(artId == DB2.spirits[i].artikelid){
           var element, x;
           element = DB2.spirits[i];
           for (x in element) {
               allInformation += x + ":\xa0" + element[x] + "<br>";
           }
        }
    }
    var c = document.querySelector(".beveragesInformation");
    c.lastChild.remove();
    var bevaregeInfo = `
        <div class=${artId}></div>
            <span> ${allInformation} </span>
        </div>`;
    var beverageInfoEl = document.createElement("div");
    beverageInfoEl.innerHTML = bevaregeInfo;
    c.appendChild(beverageInfoEl);

}

function addToOrderClicked(event) {
    var button = event.target
    var iteamId = button.parentElement.id
    for(i = 0; i < DB2.spirits.length; i++){
        if(iteamId == DB2.spirits[i].artikelid){
            addItemToCart(DB2.spirits[i].namn,DB2.spirits[i].prisinklmoms)
            updateCartTotal()
        }
    }
    window.alert(iteamId);
}

function addItemToCart(title, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            //quantityChanged('_change')
            cartItemNames[i].parentElement.parentElement.getElementsByClassName('cart-quantity-input')[0].stepUp();
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="remove-item-from-cart" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove-item-from-cart')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var btnClicked = event.target
    btnClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}