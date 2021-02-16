var remove_cart_item_buttons = document.getElementsByClassName('remove-item-from-cart')
console.log(remove_cart_item_buttons)
for (var i = 0; i < remove_cart_item_buttons.length; i++) {
    var button = remove_cart_item_buttons[i]
    button.addEventListener('click', function(event) {
        var btn_clicked = event.target
        btn_clicked.parentElement.parentElement.remove()
    })
}