// =====================================================================================================
// Control, for Customer.
// =====================================================================================================
// Author: Pontus Ljungren, Henrik Alderborn 2021
//

// =====================================================================================================
// Variables

var currentCart = {};

// =====================================================================================================

//adds clicked item to the cart
function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var artikelid = shopItem.parentElement.className.replace('shop-item ', '')


    doit (addToCartObj(title, price, artikelid) );
}

// returns a functionobject for either executing, unexecuting or reexecuting a quantity change of a cart item
function quantityChangedObj(artikelid, newQuantity){

    var oldCartObj = JSON.parse(JSON.stringify(currentCart));

    var newCartObj = JSON.parse(JSON.stringify(currentCart));

    newCartObj[artikelid] = newQuantity;

    var temp = {

        oldCartObj,
        newCartObj,

        execute: function(){

            currentCart = JSON.parse(JSON.stringify(newCartObj));
            cartToHTML(currentCart);
            updateCartTotal();
        },

        unexecute: function(){

            clearCart();
            currentCart = JSON.parse(JSON.stringify(oldCartObj));
            cartToHTML(currentCart);
            updateCartTotal();
        },

        reexecute: function(){

            this.execute();
        }
    }
    return temp;
}

// returns a functionobject for either executing, unexecuting or reexecuting a remove of a cart item
function removeCartItemObj(artikelid){

    var oldCartObj = JSON.parse(JSON.stringify(currentCart));

    var newCartObj = JSON.parse(JSON.stringify(oldCartObj));
    delete newCartObj[artikelid];

    var temp = {

        oldCartObj,
        newCartObj,

        execute: function(){

            currentCart = JSON.parse(JSON.stringify(newCartObj));
            cartToHTML(currentCart);
            updateCartTotal();
        },

        unexecute: function(){

            clearCart();
            currentCart = JSON.parse(JSON.stringify(oldCartObj));
            cartToHTML(currentCart);
            updateCartTotal();
        },

        reexecute: function(){

            this.execute();
        }
    }
    return temp;
}

// returns a functionobject for either executing, unexecuting or reexecuting an add shop item to cart action
function addToCartObj(title, price, artikelid){

    var oldCartObj = JSON.parse(JSON.stringify(currentCart));
    var newCartObj = calcNewCartObj(title, price, artikelid);

    var temp = {

        oldCartObj,
        newCartObj,

        execute: function(){

            currentCart = JSON.parse(JSON.stringify(newCartObj));

            cartToHTML(currentCart);
            updateCartTotal();
        },

        unexecute: function(){

            clearCart();
            currentCart = JSON.parse(JSON.stringify(oldCartObj));
            cartToHTML(currentCart);
            updateCartTotal();
        },

        reexecute: function(){

            this.execute();
        }
    }
    return temp;
}

// returns a new cart object with a new item added
// if the item was already in the cart, the quantity is incremented
function calcNewCartObj(title, price, artikelid){

    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    var newCart = {};

    if(currentCart !== jQuery.isEmptyObject({})){

        newCart = JSON.parse(JSON.stringify(currentCart));
    }

    var id = isItemAlreadyInCart(cartItemNames, title);
    if(id === 0){
        newCart[artikelid] = "1";
        return newCart;
    }
    else{
        var value = newCart[id];
        value = parseInt(value) + 1
        newCart[id] = value;
        return newCart;
    }

}

// checks if a specific item is in the cart
// returns 0 if the searched item (title) wasn't in there,
// if the searched item was already in the cart, the article number is returned
function isItemAlreadyInCart(cartItemNames, title){

    for (var i = 0; i < cartItemNames.length; i++) {

        if (cartItemNames[i].innerText === title) {

            var Artikelid = cartItemNames[i].parentElement.parentElement.id
            return Artikelid;
        }
    }
    return 0;
}

// Removes all the items from the cart interface
function clearCart(){

    var cartItems = document.getElementsByClassName('cart-items')[0]

    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
}

// Converts a cart object to a cart HTML-element
// adds the item to the cart interface
function cartToHTML(cartObj){

    clearCart();

    for(var artikelid in cartObj){

        var quantity = cartObj[artikelid];

        var details = itemDetails(artikelid);

        var title = details.name;
        var price = details.price;
        addItemToCart(title,price,artikelid,Number(quantity));
    }
}
