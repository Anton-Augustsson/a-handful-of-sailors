// =====================================================================================================
// Control, for Customer.
// =====================================================================================================
// Author: Pontus Ljungren, Henrik Alderborn 2021
//

// =====================================================================================================
// Variables

var customersActiveTable;

// =====================================================================================================

// adds Event Listeners to interactive parts on the site after loading the customer
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

    //document.getElementsByClassName('btn-purchase')[0].addEventListener('click', order);
    //getTablesForCustomer();
    //getBeers();
});

// Sets active table for the customer
function customersTable(index) {
    var table = getTableByIndex(index);
    customersActiveTable = table.tableid;
    var selectedTable = document.getElementById('selected-table');
    selectedTable.innerHTML = `<h2 class="section-header">Table ${table.tableid}</h2>`;
}

// adds all tables to a list in the interface
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

    customersTable(0); //TODO:  change to activeTable-element? Shouldn't be here?
}

// gets all items from DBWarehouse of type beer/wine/cocktail(decided by str) passing active filters
function fetchFromDb(str){

    let items = [];
    var artikelid;
    var item;

    for (let i = 0; i < getNumberOfItemsInWarehouse(); i++) {

        artikelid = getArticleNumber(i);
        item = itemDetails(artikelid);

        if(checkFilters(item) && eval(str)) {

            items.push([item.name, item.price, item.artikelNo, item.producer, item.country, item.itemKind,
                        item.stats, item.volume]);
        }
    }

    return items;
}

// checks if an item fulfills the conditions of checked filters in customer
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

// Puts all beers in the menu interface
function getBeers(event){
    if(document.getElementById("menu_beer").getAttribute("data-status") === "active" && event !== "filter"){
        return;
    }

    document.getElementById("menu_beer").setAttribute("data-status", "active");
    document.getElementById("menu_wine").setAttribute("data-status", "inactive");
    document.getElementById("menu_drinks").setAttribute("data-status", "inactive");

    var str = "item.itemKind.includes('') ";    // TODO: sökning efter faktiskt namn.
    var items = fetchFromDb(str);
    clearItems();
    printAllDrinks(items);
}


// Puts all wines in the menu interface
function getWines(event){
    if(document.getElementById("menu_wine").getAttribute("data-status") === "active" && event !== "filter"){
        return;
    }

    document.getElementById("menu_beer").setAttribute("data-status", "inactive");
    document.getElementById("menu_wine").setAttribute("data-status", "active");
    document.getElementById("menu_drinks").setAttribute("data-status", "inactive");

    var str = "item.itemKind.includes('v') ";   // TODO: sökning efter faktiskt namn.
    var items = fetchFromDb(str);
    clearItems();
    printAllDrinks(items);

}

// Puts all cocktails in the menu interface
function getDrinks(event){
    if(document.getElementById("menu_drinks").getAttribute("data-status") === "active" && event !== "filter"){
        return;
    }

    document.getElementById("menu_beer").setAttribute("data-status", "inactive");
    document.getElementById("menu_wine").setAttribute("data-status", "inactive");
    document.getElementById("menu_drinks").setAttribute("data-status", "active");

    var str = "item.itemKind.includes('Lik\u00c3\u00b6r') ";    // TODO: sökning efter faktiskt namn.
    var items = fetchFromDb(str);
    clearItems();
    printAllDrinks(items);
}

// Updates which drinks are shown when filters are checked
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

// Clears all items from the menu interface
function clearItems(){

    var elements = document.getElementsByClassName("shop-item");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    return;
}

// Get all order items from cart in order to process them
// result[i][0] = articleno
// result[i][1] = qty
//
function getOrders(){
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemArticleNrs = cartItems.getElementsByClassName('cart-row');
    var cartItemQuantities = cartItems.getElementsByClassName('cart-quantity-input');
    var artikelid;
    var quantity;
    var result = []; // [(articleno,qty),..]

    console.log(cartItemArticleNrs.length);

    for (var i = 0; i < cartItemArticleNrs.length; ++i) {
        artikelid= cartItemArticleNrs[i].id;
        quantity = cartItemQuantities[i].value;

        console.log(artikelid);
        console.log(quantity);
        result[result.length] = [artikelid, quantity];
    }
    return result;
}

// When an order has been made then to clean up use this funtion
function finnishCustomerSession(){

    clearCart();
    updateCartTotal();

    currentCart = {};

    undostack = [];
    redostack = [];

}

// makes an order of all items in the carts
// clears the cart interface
// alerts that an order has been made
function order() {
    var tableId = customersActiveTable;
    var orders = getOrders();
    var order;
    console.log(orders);

    for (let i = 0; i < orders.length; i++) {
        order = orders[i];
        console.log(order);
        newOrder(tableId, order[0], order[1]);
    }


    finnishCustomerSession();
    goToPrimaryMode(); // if there is primary mode that isn't customer some one has called it
    alert("Thank you for ordering!");
}

//Puts all drinks given by the argument to the menu interface
function printAllDrinks(drinks) {

    for (var i = 0; i < drinks.length; i++) {
        var drink = drinks[i];
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
                    <button id="shop-item-button" class="btn btn-primary shop-item-button" type="button"></button>
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

// Slides down a div with extra info about the item clicked
// Slides up if the extra info is already shown
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

//The data of the item is transferred when dragging it
function onDragStart(event) {
    event.dataTransfer.setData('text', event.target.className.replace('shop-item ', ''));
}

//Allows you to drop a draggable element over an item
function onDragOver(event) {
    event.preventDefault();
}

// adds an item to the cart on dropping a draggable element over the cart
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

// Puts a shop-item in the cart interface
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

// Changes the value inside the input tag
// if the input is not a number the value will be set to 1
function quantityChanged(event) {
    var input = event.target;

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
        return;
    }

    var artikelid = input.parentElement.parentElement.id;
    doit (quantityChangedObj(artikelid, input.value));
}

// Removes associated item from the cart interface
function removeCartItem(event) {
    var artikelid = event.target.parentElement.parentElement.id;
    doit (removeCartItemObj(artikelid));
}

// Updates the total price of all the items in the cart interface
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
