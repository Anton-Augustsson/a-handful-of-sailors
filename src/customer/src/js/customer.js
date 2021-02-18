$('document').ready(function() {
    var removeCartItemButtons = document.getElementsByClassName('remove-item-from-cart')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var btn = removeCartItemButtons[i]
        btn.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    printAllDrinks();
});

function getAllBeverages() {

    // Using a local variable to collect the items.
    var collector = [];

    // The DB is stored in the variable DB2, with "spirits" as key element. If you need to select only certain
    // items, you may introduce filter functions in the loop... see the template within comments.
    //
    for (i = 0; i < DB2.spirits.length && i < 10; i++) {
        collector.push([DB2.spirits[i].namn, DB2.spirits[i].prisinklmoms]);
    };
    //
    return collector;
}

function printAllDrinks() {
    var allDrinks = getAllBeverages();
    var shopItems = document.getElementsByClassName('shop-items')[0]

    for (var i = 0; i < allDrinks.length; i++) {
        var drink = allDrinks[i];
        var name = drink[0]
        var price = drink[1]
        var shopItem = document.createElement('div')
        shopItem.classList.add('shop-item')
        var shopItemContents = `
        <span class="shop-item-title">${name}</span>
        <div class="shop-item-details">
            <span class="shop-item-price">${price}</span>
            <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
        </div>`
        shopItem.innerHTML = shopItemContents
        shopItems.append(shopItem)
        shopItem.getElementsByClassName('shop-item-button')[0].addEventListener('click', addToCartClicked)
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
            alert('This item is already added to the cart')
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