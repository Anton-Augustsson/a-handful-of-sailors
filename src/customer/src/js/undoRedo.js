

/*

function testAddItemToCart(event){

    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title
    var price
    var artikelid

    var object = {

        title : shopItem.getElementsByClassName('shop-item-title')[0].innerText,
        price : shopItem.getElementsByClassName('shop-item-price')[0].innerText,
        //   var artikelid = shopItem.getElementsByClassName('shop-item-artikelid')[0].innerText

        artikelid : 12345
    }

    doit(addItemToCart(object));
    getAllObjectsInCart();
}


function printObject(){}

*/







function getAllObjectsInCart(){

    var list = []

    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')

    for (var i = 0; i < cartRows.length; i++) {

        var cartRow = cartRows[i]

        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]

        var title = cartRow.firstElementChild.getElementsByClassName('cart-item-title')[0].innerText



        var quantity = quantityElement.value

        var drink = [title, quantity];


        list.push(drink);
    }

    return list;
}

function getOldDrinkList(){

    //TODO

}

//addToCartClicked(event){
//
//
// }
//quantityChanged(event){
//
//
// }
//removeCartItem(event){
//
//
// }
//order(){
//
//
// }

function printAllDrinksTest(newDrinkList){

    //TODO

    for(elem in newDrinkList){

        addItemToCart(newDrinkList[elem][0], newDrinkList[elem][1]);

    }
}


function addToCartClicked(event){

    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var artikelid = shopItem.parentElement.className.replace('shop-item ', '')


    doit (addItemToCartTest(title, price, artikelid, event) );

}

function addItemToCartTest(title, price, artikelid, event){


    //var newDrinkList = getAllObjectsInCart();

    //var oldDrinkList = getOldDrinkList();

    var temp = {

        title : this.title,
        price : this.price,
        artikelid : this.artikelid,
        event : this.event,
        //newDrinkList,
        // var oldDrinkList =
        //var cartObjects = getAllObjectsInCart();

        execute : function (){

            addItemToCart(title, price, artikelid);
            updateCartTotal();
        },


        unexecute: function (){

            var cartRow = document.getElementById(artikelid)
            var input = cartRow.getElementsByClassName('cart-quantity-input')[0]
            console.log(input)
            input.value -= 1

            if (isNaN(input.value) || input.value <= 0) {
                cartRow.remove();
            }
            updateCartTotal();
        },


        reexecute: function (){
            addItemToCart(title, price, artikelid);
            updateCartTotal();
        },


    };


    return temp;
}