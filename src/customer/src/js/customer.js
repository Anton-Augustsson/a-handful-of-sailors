var customersActiveTable = {};

$('document').ready(function() {
    var removeCartItemButtons = document.getElementsByClassName('remove-item-from-cart');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var btn = removeCartItemButtons[i];
        btn.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    customersActiveTable = customersTable(0);

    //document.getElementsByClassName('btn-purchase')[0].addEventListener('click', order);
    //getTablesForCustomer();
    //getBeers();
});

function customersTable(index) {
    var table = getTableByIndex(index);
    customersActiveTable = table;
}

function getTablesForCustomer() {
    var nrOfTables = getNumTables();

    for (let i = 0; i < nrOfTables; i++) {
        //var table = getTableByIndex(i);
        var listElem = document.createElement('div');
        var listElemContent = `
        <li>
            <a href="#" id="table-${i}" onclick="customersTable(${i})">Table ${i + 1}</a>
        </li>`
        listElem.innerHTML = listElemContent;
        var list = document.getElementsByClassName('pick-table-menu-list')[0];
        list.append(listElem);
    }
}

function fetchFromDb(str){

    let items = [];
    var artikelid;
    var item;


    for (let i = 0; i < getNumberOfItemsInWarehouse(); i++) {

        artikelid = getArticleNumber(i);
        item = itemDetails(artikelid);

        if(checkFilters(item)) {

            items.push([item.name, item.price, item.artikelNo, item.producer, item.country, item.itemKind,
                item.stats, item.volume]);
        }
    }

    return items;
}

function checkFilters(itemDetails){
    var elements = document.getElementsByClassName("checkbox");

    for(let i = 0; i < elements.length; i++){

        if(elements[i].checked === true){

            if(i === 0){
                if(itemDetails.gluten !== "nej"){
                    return false;
                }
            }
            else if(i === 1){
                if(itemDetails.laktos !== "nej"){
                    return false;
                }
            }
            else if(i === 2){
                if(itemDetails.nötter !== "nej"){
                    return false;
                }
            }
        }
    }

    return true;

}

function getBeers(event){
    if(document.getElementById("menu_beer").getAttribute("data-status") === "active" && event !== "filter"){
        return;
    }

    document.getElementById("menu_beer").setAttribute("data-status", "active");
    document.getElementById("menu_wine").setAttribute("data-status", "inactive");
    document.getElementById("menu_drinks").setAttribute("data-status", "inactive");

    var str = FiltersAsString();
    str = "d.itemKind.includes('\u00c3\u2013l') " + str;
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
    str = "d.itemKind.includes('vin') " + str;
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
    str = "d.itemKind.includes('Lik\u00c3\u00b6r') " + str;
    var items = fetchFromDb(str);
    clearItems();
    printAllDrinks(items);
}

function FiltersAsString(){

    var filterString = "";

    var elements = document.getElementsByClassName("checkbox");

    for(let i = 0; i < elements.length; i++){

        if(elements[i].checked === true){
            filterString += "&& d." + elements[i].getAttribute("id").toString() + " === 'nej'";
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

    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemArticleNrs = cartItems.getElementsByClassName('cart-row');
    var cartItemQuantities = cartItems.getElementsByClassName('cart-quantity-input');
    var artikelid;
    var quantity;
    var tableId = customersActiveTable.tableid;

    console.log(cartItemArticleNrs.length);

    for (i = 0; i < cartItemArticleNrs.length; ++i) {
        artikelid= cartItemArticleNrs[i].id;
        quantity = cartItemQuantities[i].value;

        console.log(artikelid);
        console.log(quantity);
        console.log(tableId);
        newOrder(tableId, artikelid, quantity);
    }

    clearCart();
    updateCartTotal();

    currentCart = {};

    undostack = [];
    redostack = [];

    goToPrimaryMode(); // if there is primary mode that isen't customer some one has called it
    alert("Thank you for ordering!");
}

function printAllDrinks(allDrinks) {

    for (var i = 0; i < allDrinks.length; i++) {
        var drink = allDrinks[i];
        var name = drink[0];
        var price = drink[1];
        var articleId = drink[2];
        var producer = drink[3];
        var country = drink[4];
        var type = drink[5];
        var strength = drink[6];
        var size = drink[7];
        var shopItem = document.createElement('div');
        shopItem.classList.add('shop-item');
        shopItem.setAttribute('draggable', 'true');
        shopItem.setAttribute('ondragover', 'onDragOver(event)');
        shopItem.setAttribute('ondragstart', 'onDragStart(event)');
        shopItem.classList.add(articleId);


        var shopItemContents = `
            <div class="shop-item-default">
                <span class="shop-item-title">${name}</span>
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
            document.getElementsByClassName('shop-items-column-1')[0].append(shopItem);
        }
        else {
            document.getElementsByClassName('shop-items-column-2')[0].append(shopItem);
        }

        shopItem.getElementsByClassName('shop-item-button')[0].addEventListener('click', addToCartClicked);
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
    var content = this.parentElement.parentElement.children[1];
    console.log(content);
    if (content.style.maxHeight){
        content.style.display = 'none';
        content.style.maxHeight = null;
    } else {
        content.style.display = 'block';
        content.style.maxHeight = content.scrollHeight + "px";
    }
}


function onDragStart(event) {
    event.dataTransfer.setData('text', event.target.className.replace('shop-item ', ''));
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    console.log(event);
    console.log(event.dataTransfer);
    const id = event.dataTransfer.getData('text');
    console.log(id);
    const draggableElement = document.getElementsByClassName(id)[0];

    var title = draggableElement.getElementsByClassName('shop-item-title')[0].innerText;
    var price = draggableElement.getElementsByClassName('shop-item-price')[0].innerText;

    doit (addToCartObj(title, price, id) );
}

/*
function addToCartClicked(event) {
    console.log(event);
    var button = event.target
    console.log(button);
    var shopItem = button.parentElement.parentElement
    console.log(shopItem);
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var artikelid = shopItem.parentElement.id;
    addItemToCart(title,price, artikelid);
    updateCartTotal();
}*/

function addItemToCart(title, price, artikelid, Quantity) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.setAttribute("id", artikelid);
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            //quantityChanged('_change')
            cartItemNames[i].parentElement.parentElement.getElementsByClassName('cart-quantity-input')[0].stepUp();
            return;
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value=${Quantity}>
            
            <button class="remove-item-from-cart" type="button"><i class="fa fa-trash"></i></button>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('remove-item-from-cart')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}
function quantityChanged(event) {
    var input = event.target;

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
        return;
    }

    var artikelid = input.parentElement.parentElement.id;
    doit (quantityChangedObj(artikelid, input.value));
}

function removeCartItem(event) {
    var artikelid = event.target.parentElement.parentElement.id;
    doit (removeCartItemObj(artikelid));
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        console.log(priceElement);
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        console.log(price);
        var quantity = quantityElement.value;
        console.log(quantity);
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}
