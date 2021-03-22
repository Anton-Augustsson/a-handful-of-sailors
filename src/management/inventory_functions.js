// =====================================================================================================
// Control, for manager page.
// =====================================================================================================
// Author: Isak Almgren, 2021
//
// Controll functions for manager page
// =====================================================================================================
//Control


// Remove all the beverages shown at moment.
function removeBeverageList (){
    var oldbeverages = document.getElementsByClassName("spirits");
    while(oldbeverages.length > 0){
        oldbeverages[0].parentNode.removeChild(oldbeverages[0]);
    }
}

// For reseting Variables when changing kind of beverage. Arg decides which kind of beverage to show.
function changingKind (arg){
    removeBeverageList();
    beverageList(arg);
}

// Creating the list of beverages consisting of DIVs for each item. This one goes forward in the for loop. Arg decides which kind of beverage to show.
function beverageList(arg){
    var beveragelist = document.getElementById("spirits");
    for (let i = 0;  i < getNumberOfItemsInDB2(); i++) {
        var currentItem = getArticleId(i);
        var itemInformation = itemDetails(currentItem);
        if(arg === "all" || arg == itemInformation.itemKind || arg == undefined) {
            var stockAmount = getStock(itemInformation.artikelNo);
            if(stockAmount < 1 || stockAmount == null){
                removeWarehouseItem(choosenItem);
            }
            var bevaregeContent = `

            <div class="spirits" id="${itemInformation.artikelNo}"   onclick=beverageInfo(${itemInformation.artikelNo}) >
                <button class="btn order-iteam" type="button">ADD TO ORDER</button>
                <button class="btn change-stock" type="button">Change stock</button>
                <span> Namn: ${itemInformation.name} <br> Detaljer: ${itemInformation.details} <br> Article Nr: ${itemInformation.artikelNo} <br> In store: ${stockAmount} <span>
                <input id="stockOrder-quantity-${itemInformation.artikelNo}" type="number" value="1">
            </div>`;
            var beverageElement = document.createElement('div');
            beverageElement.innerHTML = bevaregeContent;
            beveragelist.appendChild(beverageElement);
        }

    }
    var listOfBeverages = document.getElementsByClassName("spirits");
    for (j = 0; j < listOfBeverages.length; j++) {
        listOfBeverages[j].getElementsByClassName("order-iteam")[0].addEventListener('click', addToOrderClicked);
       listOfBeverages[j].getElementsByClassName("change-stock")[0].addEventListener('click', reviseInventory);
    }
}

// Creating a html div with all information about a specific item. Argument artId is artice id of specific item.
function beverageInfo(artId){
    choosenItem = itemDetails(artId);
    var c = document.querySelector(".beveragesInformation");
    c.lastChild.remove();
    var bevaregeInfo = `
        <div class=${artId}></div>
            <span> Namn: ${choosenItem.name} <br> Detaljer: ${choosenItem.details} <br> Leverantör: ${choosenItem.info}<br> Alkoholhalt: ${choosenItem.stats}<br> Varugrupp: ${choosenItem.itemKind}<br> Artikel nr: ${choosenItem.artikelNo}<br> Pris:${choosenItem.price} <br> Ursprungs land: ${choosenItem.ursprung} <br> Producent: ${choosenItem.producer} <br> Årgång: ${choosenItem.yearMade} </span>
        </div>`;
    var beverageInfoEl = document.createElement("div");
    beverageInfoEl.innerHTML = bevaregeInfo;
    c.appendChild(beverageInfoEl);

}

// Change the amount of stock depending on button click. Event is the button click.
function reviseInventory(event) {
    var button = event.target;
    var choosenItem = button.parentElement.id;
    var reviseAmount = $("#stockOrder-quantity-"+choosenItem).val();
    replenishStock(choosenItem, parseInt(reviseAmount));
    var stockAmount = getStock(choosenItem);
    if(stockAmount < 1){
        removeWarehouseItem(choosenItem);
    }
    changingKind();
}

// Add a item from list to the order cart on button click. Event is the button click.
function addToOrderClicked(event) {
    var button = event.target
    var iteamId = button.parentElement.id
    var currentItem = itemDetails(iteamId);
            addItemTostockOrder(currentItem.name, getItemPrice(iteamId), iteamId);
            updatestockOrderTotal()

}

// Creating a new item and adding it to the order cart. Arg title = name of product, Arg price = price of product, Arg artId = article Id
function addItemTostockOrder(title, price, artId) {
    var stockOrderRow = document.createElement('div')
    stockOrderRow.classList.add('stockOrder-row')
    var stockOrderItems = document.getElementById('stockOrder-items')
    var stockOrderItemNames = stockOrderItems.getElementsByClassName('stockOrder-item-title')
    for (var i = 0; i < stockOrderItemNames.length; i++) {
        if (stockOrderItemNames[i].innerText == title) {
            //quantityChanged('_change')
            stockOrderItemNames[i].parentElement.parentElement.getElementsByClassName('stockOrder-quantity-input')[0].stepUp();
            return
        }
    }
    var stockOrderRowContents = `
        
        <div class="stockOrder-item stockOrder-column">
            <span class="stockOrder-item-title">${title}</span>
        </div>
        <div class="stockOrder-artId stockOrder-column">
             <span class="stockOrder-item-artId">${artId}</span>
        </div>
        <span class="stockOrder-price stockOrder-column">${price}</span>
        <div class="stockOrder-quantity stockOrder-column">
            <input class="stockOrder-quantity-input" type="number" value="1">
            <button class="remove-item-from-stockOrder" type="button">REMOVE</button>
        </div>`
    stockOrderRow.innerHTML = stockOrderRowContents
    stockOrderItems.append(stockOrderRow)
    stockOrderRow.getElementsByClassName('remove-item-from-stockOrder')[0].addEventListener('click', removestockOrderItem)
    stockOrderRow.getElementsByClassName('stockOrder-quantity-input')[0].addEventListener('change', quantityChanged)
}

// Changing total order price when changing quantity in cart.
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatestockOrderTotal()
}

// Removing an item from order cart.
function removestockOrderItem(event) {
    var btnClicked = event.target
    btnClicked.parentElement.parentElement.remove()
    updatestockOrderTotal()
}

// Calculating cost of all the iteams inside the order cart.
function updatestockOrderTotal() {
    var stockOrderItems = document.getElementById('stockOrder-items')
    var stockOrderItemsArtId = stockOrderItems.getElementsByClassName("stockOrder-item-artId")
    var stockOrderItemsQuantity = stockOrderItems.getElementsByClassName("stockOrder-quantity-input")
    var total = 0
    for (var i = 0; i < stockOrderItemsArtId.length; i++) {
        var price = getItemPrice(stockOrderItemsArtId[i].innerText);
        var quantity = parseFloat(stockOrderItemsQuantity[i].value);
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('stockOrder-total-price')[0].innerText = '$' + total
}

// Uppdating the stock of all items in order cart with their respective quantity.
function makeInvOrder (){
    var stockOrderItems = document.getElementById('stockOrder-items')
    var stockOrderItemsArtId = stockOrderItems.getElementsByClassName("stockOrder-item-artId")
    if(getStock(stockOrderItemsArtId))
    var stockOrderItemsQuantity = stockOrderItems.getElementsByClassName("stockOrder-quantity-input")
    for (var i = 0; i < stockOrderItemsArtId.length; i++) {
        if(getStock(stockOrderItemsArtId[i].innerText) == "No stock"){
            addWarehouseItem(stockOrderItemsArtId[i].innerText,parseInt(stockOrderItemsQuantity[i].value))
        }
        else {
            replenishStock(stockOrderItemsArtId[i].innerText, parseInt(stockOrderItemsQuantity[i].value))
        }}
    while(stockOrderItemsArtId.length > 0){
        stockOrderItemsArtId[0].parentElement.parentElement.remove()    }
        changingKind();
    updatestockOrderTotal();
}

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
