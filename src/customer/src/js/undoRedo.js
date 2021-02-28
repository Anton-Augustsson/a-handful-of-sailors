

var currentCart = {};


function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var artikelid = shopItem.parentElement.className.replace('shop-item ', '')


    doit (addToCartObj(title, price, artikelid, event) );
}

function orderInit(event){


    doit (orderObj(event));
}

function addToCartObj(title, price, artikelid, event){

    var oldCartObj = JSON.parse(JSON.stringify(currentCart));
    var newCartObj = calcNewCartObj(title, price, artikelid, event);

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


function orderObj(event){

    var oldCartObj = JSON.parse(JSON.stringify(currentCart));

    var temp = {

        oldCartObj,

        execute: function(){

            clearCart();
            updateCartTotal();

            currentCart = {};

            alert("Thank you for ordering!")
        },

        unexecute: function(){

            clearCart();
            currentCart = JSON.parse(JSON.stringify(oldCartObj));
            cartToHTML(currentCart);
            updateCartTotal();
        },

        reexecute: function(){
            clearCart();
            updateCartTotal();

            currentCart = {};
        }
    }
    return temp;
}





function calcNewCartObj(title, price, artikelid, event){

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

function isItemAlreadyInCart(cartItemNames, title){

    for (var i = 0; i < cartItemNames.length; i++) {

        if (cartItemNames[i].innerText === title) {

            var Artikelid = cartItemNames[i].parentElement.parentElement.id
            return Artikelid;
        }
    }
    return 0;
}

function clearCart(){

    var cartItems = document.getElementsByClassName('cart-items')[0]

    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
}

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
