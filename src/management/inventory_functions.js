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
            addItemTostockOrder(DB2.spirits[i].namn,DB2.spirits[i].prisinklmoms)
            updatestockOrderTotal()
        }
    }
}

function addItemTostockOrder(title, price) {
    var stockOrderRow = document.createElement('div')
    stockOrderRow.classList.add('stockOrder-row')
    var stockOrderItems = document.getElementsByClassName('stockOrder-items')[0]
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
    btnClicked.parentElement.parentElement.remove()
    updatestockOrderTotal()
}

function updatestockOrderTotal() {
    var stockOrderItemContainer = document.getElementsByClassName('stockOrder-items')[0]
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