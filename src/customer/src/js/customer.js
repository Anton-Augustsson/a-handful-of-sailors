$('document').ready(function() {
    var removeCartItemButtons = document.getElementsByClassName('remove-item-from-cart')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var btn = removeCartItemButtons[i]
        btn.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', order)

    getBeers();
});

function fetchFromDb(str){

    let items = [];

    for (let i = 0; i < DB2.spirits.length; i++) {

        if(eval(str)){
            items.push([DB2.spirits[i].namn, DB2.spirits[i].prisinklmoms,
                DB2.spirits[i].artikelid, DB2.spirits[i].producent,
                DB2.spirits[i].ursprunglandnamn, DB2.spirits[i].varugrupp,
                DB2.spirits[i].alkoholhalt, DB2.spirits[i].volymiml]);
        }
    }

    return items;
}

function getBeers(event){

    if(document.getElementById("menu_beer").getAttribute("data-status") === "active" && event !== "filter"){
        return;
    }

    document.getElementById("menu_beer").setAttribute("data-status", "active");
    document.getElementById("menu_wine").setAttribute("data-status", "inactive");
    document.getElementById("menu_drinks").setAttribute("data-status", "inactive");


    var str = FiltersAsString();

    str = "DB2.spirits[i].varugrupp.includes('\u00c3\u2013l') " + str;

    var items = fetchFromDb(str);

    clearItems();

    printAllDrinks(items);
}



function getWines(event){

    if(document.getElementById("menu_wine").getAttribute("data-status") === "active" && event !== "filter"){
        return;
    }


    document.getElementById("menu_beer").setAttribute("data-status", "inactive");
    document.getElementById("menu_wine").setAttribute("data-status", "active");
    document.getElementById("menu_drinks").setAttribute("data-status", "inactive");


    var str = FiltersAsString();

    str = "DB2.spirits[i].varugrupp.includes('vin') " + str;

    var items = fetchFromDb(str);

    clearItems();

    printAllDrinks(items);

}

function getDrinks(event){

    if(document.getElementById("menu_drinks").getAttribute("data-status") === "active" && event !== "filter"){
        return;
    }

    document.getElementById("menu_beer").setAttribute("data-status", "inactive");
    document.getElementById("menu_wine").setAttribute("data-status", "inactive");
    document.getElementById("menu_drinks").setAttribute("data-status", "active");


    var str = FiltersAsString();

    str = "DB2.spirits[i].varugrupp.includes('Lik\u00c3\u00b6r') " + str;

    var items = fetchFromDb(str);

    clearItems();

    printAllDrinks(items);

}

function FiltersAsString(){

    var filterString = "";

    var elements = document.getElementsByClassName("checkbox");

    for(let i = 0; i < elements.length; i++){

        if(elements[i].checked === true){
            filterString += "&& DB2.spirits[i]." + elements[i].getAttribute("id").toString() + " === 'nej'";
        }
    }
    return filterString;
}

function updateFilters(){

    if(document.getElementById("menu_wine").getAttribute("data-status") === "active"){
        getWines("filter");
    }
    else if(document.getElementById("menu_beer").getAttribute("data-status") === "active"){
        getBeers("filter");
    }
    else if(document.getElementById("menu_drinks").getAttribute("data-status") === "active"){
        getDrinks("filter");
    }
}

function clearItems(){

    var elements = document.getElementsByClassName("shop-item");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    return;
}


function order() {
    alert("Thank you for ordering!")
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function printAllDrinks(allDrinks) {

    for (var i = 0; i < allDrinks.length; i++) {
        var drink = allDrinks[i];
        var name = drink[0]
        var price = drink[1]
        var articleId = drink[2]
        var producer = drink[3]
        var country = drink[4]
        var type = drink[5]
        var strength = drink[6]
        var size = drink[7]
        var shopItem = document.createElement('div')
        shopItem.classList.add('shop-item')
        var shopItemContents = `
            <div class="shop-item-default">
                <span class="shop-item-title" id="${articleId}">${name}</span>
                <div class="shop-item-details">
                    <span class="shop-item-price">${price}</span>
                    <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                </div>
            </div>
            <div class="shop-item-more-info">
                <div class="extra-info">Producer: ${producer}</div>
                <div class="extra-info">Country: ${country}</div>
                <div class="extra-info">Type: ${type}</div>
                <div class="extra-info">Strength: ${strength}</div>
                <div class="extra-info">Size: ${size}</div>
            </div>`
        shopItem.innerHTML = shopItemContents
        if (i % 2 == 0) {
            document.getElementsByClassName('shop-items-column-1')[0].append(shopItem)
        }
        else {
            document.getElementsByClassName('shop-items-column-2')[0].append(shopItem)
        }

        shopItem.getElementsByClassName('shop-item-button')[0].addEventListener('click', addToCartClicked)
        shopItem.getElementsByClassName('shop-item-title')[0].addEventListener("click", clickItemForMoreInfo);
    }
}
/*
function clickItemForMoreInfo(event) {
    var shopItem = event.target.parentElement.parentElement
    console.log(shopItem)
    var moreInfo = shopItem.getElementsByClassName('shop-item-more-info')[0]
    console.log(moreInfo)
    if (moreInfo.classList.contains('shop-item-more-info-hide')) {
        moreInfo.classList.remove('shop-item-more-info-hide')
        moreInfo.classList.add('shop-item-more-info-show')
    }
    else {
        moreInfo.classList.remove('shop-item-more-info-show')
        moreInfo.classList.add('shop-item-more-info-hide')
    }
    console.log("test2")
}*/
function clickItemForMoreInfo(event) {
    this.classList.toggle("active");
    var content = this.parentElement.parentElement.children[1]
    console.log(content)
    if (content.style.maxHeight){
        content.style.display = 'none'
        content.style.maxHeight = null;
    } else {
        content.style.display = 'block'
        content.style.maxHeight = content.scrollHeight + "px";
    }
}
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    addItemToCart(title,price)
    updateCartTotal()
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