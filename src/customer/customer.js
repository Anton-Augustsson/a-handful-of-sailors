function createCustomer() {
    return `
    <!-- html -->
    <div id="content-customer">
        <div class="customer">
                <div class="menu-wrapper">
                    <div class="categories">
                        <div class="pick-table">
                            <div class="pick-table-menu">
                                <div class="selected-table" id="selected-table">
                                    Table
                                </div>
                                <ul class="pick-table-menu-list">
                                </ul>
                            </div>
                        </div>
                        <p id="menu_categories"></p>
                        <div class="category" id="menu_beer" data-status="inactive" onclick="getBeers()"></div>
                        <div class="category" id="menu_wine" data-status="inactive" onclick="getWines()"></div>
                        <div class="category" id="menu_drinks" data-status="inactive" onclick="getDrinks()"></div>
        
                        <h1>Filters</h1>
        
        
                            <input type="checkbox" class="checkbox" id="gluten" onclick="updateFilters()">
                            <label id="without_gluten_text"> </label><br>
                            <input type="checkbox" class="checkbox" id="laktos" onclick="updateFilters()">
                            <label id="without_lactose_text"> </label><br>
                            <input type="checkbox" class="checkbox" id="nötter" onclick="updateFilters()">
                            <label id="without_nuts_text"> </label><br><br>
        
                    </div>
                    <div class="menu">
                        <section class="container content-section">
                            <h2 class="section-header">BEER</h2>
                            <div class="shop-items">
                                <div class="shop-items-column-1"></div>
                                <div class="shop-items-column-2"></div>
        
                            </div>
                        </section>
                    </div>
        
        
                </div>
        
                <div class="cart" id="cart" ondrop="onDrop(event)" ondragover="onDragOver(event)" >
                    <h3 class="section-header">CART</h3>
                    <div class="cart-row">
                        <span class="cart-item cart-header cart-column">ITEM</span>
                        <span class="cart-price cart-header cart-column">PRICE</span>
                        <span class="cart-quantity cart-header cart-column">QUANTITY</span>
                    </div>
                    <div class="cart-items">
        
                    </div>
                    <div class="cart-total">
                        <strong class="cart-total-title">Total</strong>
                        <span class="cart-total-price">$0.00</span>
                    </div>
                    <button class="btn btn-primary btn-purchase" type="button" onclick=order()>ORDER</button>
                    <div id="customer-vip"></div>
                </div>
        
            </div>
        </div>
    `;
}

function setCustomer(id) {
    $("#"+id).html(createCustomer());
}

function update_view_customer() {
    setCustomer(modeHtmlId + customer);
    getTablesForCustomer();
    getBeers();
}
