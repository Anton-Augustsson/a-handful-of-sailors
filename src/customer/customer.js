// =====================================================================================================
// View, for Customer.
// =====================================================================================================
// Author: Pontus Ljungren, Henrik Alderborn 2021
//
// Is used to set the view for customer when the mode is switched
// =====================================================================================================

//Sets the html structure for customer
function createCustomer() {
    return `
    <!-- html -->
    <div id="content-customer">
        <div class="customer">
                <div class="menu-wrapper">
                    <div class="categories">
                        <div class="pick-table">
                            <div class="pick-table-menu">
                                <div class="selected-table" id="selected-table">    <!-- TODO: change to say what table is active-->
                                </div>
                                <ul class="pick-table-menu-list">
                                </ul>
                            </div>
                        </div>
                        <p id="menu_categories"></p>
                        <div class="category" id="menu_beer" data-status="inactive" onclick="getBeers()"></div>
                        <div class="category" id="menu_wine" data-status="inactive" onclick="getWines()"></div>
                        <div class="category" id="menu_drinks" data-status="inactive" onclick="getDrinks()"></div>
        
                        <h1 id="filters"></h1>
        
        
                            <input type="checkbox" class="checkbox" id="gluten" onclick="updateFilters()">
                            <label id="without_gluten_text"> </label><br>
                            <input type="checkbox" class="checkbox" id="laktos" onclick="updateFilters()">
                            <label id="without_lactose_text"> </label><br>
                            <input type="checkbox" class="checkbox" id="nötter" onclick="updateFilters()">
                            <label id="without_nuts_text"> </label><br><br>
        
                    </div>
                    <div class="menu">
                        <section class="container content-section">
                            <h2 id="drinks-content-header" class="section-header"></h2>
                            <div class="shop-items">
                                <div class="shop-items-column-1"></div>
                                <div class="shop-items-column-2"></div>
        
                            </div>
                        </section>
                    </div>
        
        
                </div>
        
                <div class="cart" id="cart" ondrop="onDrop(event)" ondragover="onDragOver(event)" >
                    <h3 id="cart-header-name" class="section-header"></h3>
                    <div class="cart-row">
                        <span id="cart-item-header" class="cart-item cart-header cart-column"></span>
                        <span id="cart-price-header" class="cart-price cart-header cart-column"></span>
                        <span id="cart-quantity-header" class="cart-quantity cart-header cart-column"></span>
                    </div>
                    <div class="cart-items">
        
                    </div>
                    <div class="cart-total">
                        <strong id="total-price-label" class="cart-total-title"></strong>
                        <span class="cart-total-price">$0.00</span>
                    </div>
                    <button id="order-button" class="btn btn-primary btn-purchase" type="button" onclick=order()></button>
                    <div id="customer-vip"></div>
                </div>
        
            </div>
        </div>
    `;
}

//Loads customer into given div
function setCustomer(id) {
    $("#"+id).html(createCustomer());
}

//Loads and updates all data in customer
function update_view_customer() {
    setCustomer(modeHtmlId + customer);
    update_view_dictionary();
    getTablesForCustomer();
    getBeers();
}
