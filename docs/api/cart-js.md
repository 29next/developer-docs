# Cart JS API
Leverage the integrated JS API to add turn-key functionality to buttons in your storefront and funnels.

The 29 Next Cart JS API allows you to create HTML buttons that carry a variety of functionalities, with no extra code required.  See below for examples and methods of implementation.

### Button Actions

To add products to a cart, there are data attributes that can be used on an HTML <button></button> to integrate it with the storefront cart.

| Data Attribute | Required | Function |
| ----------- | ----------- | ----------- |
| data-action="add-product"  | Yes | Action of the button |
| data-stockrecord-id=1 | Yes | Stockrecord ID corresponding to the Product SKU and Currency you want to add to the cart. |
| data-quantity="1,1" | Yes | Quantity of the product to add |
| data-interval="day, one-time" | No | Subscription interval, supports day, week, month, year, day is recommended. The second product is one-time. |
| data-interval-count="30, one-time" | No | Subscription interval count, numeric, 30 when combined with subscription interval would be "30 days". The second product will be added as a one time purchase. |
| data-redirect=false | No | Whether to redirect to next page in funnel flow after adding product to cart, default is true. |
| data-voucher="VOUCHERCODE" | No | Apply voucher code to basket after adding the products. |
| data-product-remove="1,22" | No | Product IDs to remove from the basket in the case of doing a product swap. |
| data-product-remove-quantity="1,1" | No | Quantity of products to remove from the basket in the case of doing a product swap.|
| data-product-remove-interval="week, one-time" | No | Subscription interval of product to remove from the basket, follows same logic as when adding.|
| data-product-remove-interval-count="6, one-time" | No | Subscription interval count of product to remove from the basket, follows same logic as when adding. |
| data-clear-cart=true | No | Clear the existing products in the cart before adding more products. Helps with situations where you want to clear existing products for an upsell. |

### Example Add to Cart Buttons

```html title="Add multiple one time products"

<button type="button" class="btn btn-success btn-block"
    data-action="add-product"
    data-stockrecord-id="4,6"
    data-quantity="1,1">
    Add Combo
</button>
```
```html title="Add a product on subscription every 30 days"
<button type="button" class="btn btn-success"
    data-action="add-product"
    data-stockrecord-id="9"
    data-quantity="1"
    data-interval="day"
    data-interval-count="30"
    data-voucher="VOUCHERCODE">
    Add Subscription
</button>

```

### Apply Voucher Form
This form gives the ability for a customer to apply a voucher (coupon) to their basket from within the page body, instead of via the UI in the sidecart.  This can also be combined with the `applyVoucherToBasket` callback event to customize the success display.
``` html title="Apply Voucher Form"
<div data-form="voucher-form" class="input-group mb-3">
   <input type="text" class="form-control" name="voucher_code" placeholder="Voucher Code">
   <button type="button" class="btn btn-info"
   data-action="apply-voucher">
   Add Voucher
   </button>
</div>
```
### Show the Cart

To show the contents of the cart to the user, 29 Next has a built in cart template that can show the current cart count, and trigger the cart modal with HTML attributes.  See example below.

| Attribute | Action |
|-------|-------|
|href="#basket-modal" data-toggle="modal"| Used to trigger the cart modal|
|id="basket-count"|Use to display the current cart count|
|id="basket-subtotal"|Use to display basket sub total|


``` html title="Show Cart Example"
<a class="btn btn-default py-2 d-md-inline-block"
    href="#basket-modal" data-toggle="side-cart">
    Cart <span class="badge badge-primary badge-pill" data-basket-count></span>
    | <span data-basket-subtotal></span>
</a>
```

#### Callbacks

Use callback methods to listen for events and extend and enhance the UX.

``` html title="Add Product Callback"
<script>
    $(function() {
        funnel.callback.on('addProductToBasket', function(data) {
            console.log("product added");
            console.log(JSON.stringify(data));
        });
    });
</script>
```

```html title="Add Voucher Success Callback"
<script>
    $(function() {
        funnel.callback.on('applyVoucherToBasket', function(data) {
            console.log("voucher applied");
            console.log(JSON.stringify(data));
        });
    });
</script>
```

``` html title="Show & Hide Side Cart"
<script>
    $(function() {
        funnel.callback.on('addProductToBasket', function(data) {
            $("#basket-modal").cart('show'); // Show the Side Cart
        });
    });
</script>
```
