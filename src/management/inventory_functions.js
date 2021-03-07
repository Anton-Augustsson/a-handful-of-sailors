var highestIndexNr = 0;
var lowestIndexNr = 0;
function changeBeverageList (arg) {
    if ((arg === "next" && document.querySelectorAll(".spirits.spirits").length == 10) || (lowestIndexNr == 0 && arg == "next")){
        removeBeverageList();
        beverageList(document.getElementById("myselect").value);
    }
    if (arg === "back" && lowestIndexNr != 0) {
        removeBeverageList();
        beverageList2(document.getElementById("myselect").value);
    }
}

function removeBeverageList (){
    var oldbeverages = document.getElementsByClassName("spirits");
    while(oldbeverages.length > 0){
        oldbeverages[0].parentNode.removeChild(oldbeverages[0]);
    }
}

function changingKind (arg){
    highestIndexNr = 0;
    lowestIndexNr = 0;
    removeBeverageList();
    beverageList(arg);
}

function beverageList(arg){
    lowestIndexNr = highestIndexNr;
    wareHouseSize = getNumberOfItemsInWarehouse()
    var beveragelist = document.getElementById("spirits");
    for (i = highestIndexNr; document.querySelectorAll(".spirits.spirits").length < 10 && i < wareHouseSize; i++) {
        var currentItem = getArticleNumber(i);
        var itemInformation = itemDetails(currentItem);
        if(arg === "all" || arg == itemInformation.itemKind || arg == undefined) {
            var stockAmount = getStock(itemInformation.artikelNo);
            var bevaregeContent = `
            <div class="spirits" id="${itemInformation.artikelNo}"   onclick=beverageInfo(${itemInformation.artikelNo}) >
                <button class="btn order-iteam" type="button">ADD TO ORDER</button>
                <span> Namn: ${itemInformation.name} <br> Detaljer: ${itemInformation.details} <br> Article Nr: ${itemInformation.artikelNo} <br> In store: ${stockAmount} <span>
            </div>`;
            var beverageElement = document.createElement('div');
            beverageElement.innerHTML = bevaregeContent;
            beveragelist.appendChild(beverageElement);
        }

    }
    highestIndexNr = getDBWarehouseItemIndex(itemInformation.artikelNo);
    var listOfBeverages = document.getElementsByClassName("spirits");
    for (j = 0; j < listOfBeverages.length; j++) {
        listOfBeverages[j].getElementsByClassName("order-iteam")[0].addEventListener('click', addToOrderClicked)
    }
}

function beverageList2(arg){
    highestIndexNr = lowestIndexNr;
    var beveragelist = document.getElementById("spirits");
    for (i = lowestIndexNr; document.querySelectorAll(".spirits.spirits").length < 10 && i < wareHouseSize && highestIndexNr >= 0; i--) {
        var currentItem = getArticleNumber(i);
        var itemInformation = itemDetails(currentItem);
        if(arg === "all" || arg == itemInformation.itemKind || arg == undefined) {
            var stockAmount = getStock(itemInformation.artikelNo);
            var bevaregeContent = `
            <div class="spirits" id="${itemInformation.artikelNo}"   onclick=beverageInfo(${itemInformation.artikelNo}) >
                <button class="btn order-iteam" type="button">ADD TO ORDER</button>
                <span> Namn: ${itemInformation.name} <br> Detaljer: ${itemInformation.details} <br> Article Nr: ${itemInformation.artikelNo} <br> In store: ${stockAmount} <span>
            </div>`;
            var beverageElement = document.createElement('div');
            beverageElement.innerHTML = bevaregeContent;
            beveragelist.appendChild(beverageElement);
        }
        lowestIndexNr = getDBWarehouseItemIndex(itemInformation.artikelNo);
    }
    lowestIndexNr = getDBWarehouseItemIndex(itemInformation.artikelNo);
    var listOfBeverages = document.getElementsByClassName("spirits");
    for (j = 0; j < listOfBeverages.length; j++) {
        listOfBeverages[j].getElementsByClassName("order-iteam")[0].addEventListener('click', addToOrderClicked)
    }
}


function beverageInfo(artId){
    var allInformation = "";

           var element, x;
           element = getItemElement(artId);
           for (x in element) {
               allInformation += x + ":\xa0" + element[x] + "<br>";
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
    var currentItem = itemDetails(iteamId);
            addItemTostockOrder(currentItem.name, getItemPrice(iteamId), iteamId);
            updatestockOrderTotal()

}

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

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatestockOrderTotal()
}

function removestockOrderItem(event) {
    var btnClicked = event.target
    btnClicked.parentElement.parentElement.parentElement.remove()
    updatestockOrderTotal()
}

function updatestockOrderTotal() {
    var stockOrderItemContainer = document.getElementById('stockOrder-items')[0]
    var stockOrderRows = stockOrderItemContainer.getElementsByClassName('stockOrder-row')
    var total = 0
    for (var i = 0; i < stockOrderRows.length; i++) {
        var stockOrderRow = stockOrderRows[i]
        var priceElement = stockOrderRow.getElementsByClassName('stockOrder-price')[0]
        var quantityElement = stockOrderRow.getElementsByClassName('stockOrder-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('stockOrder-total-price')[0].innerText = '$' + total
}

function makeInvOrder (){
    var stockOrderItems = document.getElementById('stockOrder-items')
    var stockOrderItemsArtId = stockOrderItems.getElementsByClassName("stockOrder-item-artId")
    var stockOrderItemsQuantity = stockOrderItems.getElementsByClassName("stockOrder-quantity-input")
    for (var i = 0; i < stockOrderItemsArtId.length; i++) {
          replenishStock(stockOrderItemsArtId[i].innerText,parseInt(stockOrderItemsQuantity[i].value))
            }
    while(stockOrderItemsArtId.length > 0){
        stockOrderItemsArtId[0].parentElement.parentElement.remove()    }
        changingKind();
}
