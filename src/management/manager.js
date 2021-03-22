// =====================================================================================================
// View functions for manager.
// =====================================================================================================
// Author: Isak Almgren, 2021
// =====================================================================================================
// View

// create whole html manager page
function createManager () {
    return `
    <section class="container">
<div class="beverages" id="spirits">
    <select id="myselect" onchange="changingKind(this.value)">
        <option value="all">Choose an option:</option>
        <option value="Cognac">Cognac</option>
        <option value="Kryddad sprit">"Kryddad sprit"</option>
        <option value="Whisky, Malt">Whisky</option>
    </select>
</div>
    <div class="beveragesInformation">
        <h3>Information</h3>
    </div>
<div class="stockOrder">
    <h3 class="section-header">Stock Order</h3>
    <div class="stockOrder-row">
        <span class="stockOrder-item stockOrder-header stockOrder-column">ITEM</span>
        <span class="stockOrder-artId stockOrder-header stockOrder-column">Art Id</span>
        <span class="stockOrder-price stockOrder-header stockOrder-column">PRICE</span>
        <span class="stockOrder-quantity stockOrder-header stockOrder-column">QUANTITY</span>
    </div>
    <div id="stockOrder-items">

    </div>
    <div class="stockOrder-total">
        <strong class="stockOrder-total-title">Total</strong>
        <span class="stockOrder-total-price">$0.00</span>
    </div>
    <button class="btn btn-primary btn-stockOrder" id="purchaseInventoryOrder" onclick=makeInvOrder() type="button">ORDER</button>
</div>
</section>
    `;
}

// ======================================================================================================
// Controler: View update

// Insert html in view
function setManager (id) {
    $("#"+id).html(createManager());

}

// Updates de html page
function update_view_manager() {

    setManager(modeHtmlId + manager);
    beverageList();
}

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
