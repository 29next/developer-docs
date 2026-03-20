---
title: Quantity Controls
sidebar_label: Quantity
---

Manage product quantities in the cart with various control patterns.

## Setting Quantity on Buttons

Specify quantity directly on add-to-cart or toggle buttons:

```html
<!-- Add specific quantity -->
<button data-next-action="add-to-cart"
        data-next-package-id="2"
        data-next-quantity="3">
  Add 3 to Cart
</button>

<!-- Toggle with quantity -->
<button data-next-toggle
        data-next-package-id="8"
        data-next-quantity="3">
  Add 3 Extra Batteries
</button>
```

## Container-Based Quantity

Set quantity at the container level — all child buttons inherit it:

```html
<div class="product-container"
     data-next-package-id="9"
     data-next-quantity="2">
  <button data-next-toggle>Add 2 Pack Bundle</button>
</div>
```

## Quantity Sync

Sync a toggle item's quantity to the combined quantity of other packages in the cart. Useful for accessories and warranties that should match the main product.

```html
<!-- Main product buttons -->
<button data-next-toggle data-next-package-id="2">Add 1 Drone</button>
<button data-next-toggle data-next-package-id="3" data-next-quantity="2">Add 2 Drones</button>
<button data-next-toggle data-next-package-id="4" data-next-quantity="3">Add 3 Drones</button>

<!-- Warranty syncs with drone quantity -->
<button data-next-toggle
        data-next-package-id="10"
        data-next-package-sync="2,3,4">
  Add Protection Plan (matches drone quantity)
</button>
```

Use `data-next-package-sync` with a comma-separated list of package IDs. When all synced packages are removed from the cart, the toggle item is also removed automatically.

## Displaying Quantity

Show the current cart quantity in your page:

```html
<!-- Total quantity of all items -->
<span data-next-display="cart.quantity">0</span>

<!-- Quantity of a specific package -->
<span data-next-display="cart.items[2].quantity">0</span>
```

## Quantity-Based Conditionals

Show or hide elements based on quantity:

```html
<!-- Show when cart has 3 or more items -->
<div data-next-show="cart.quantity >= 3">
  You qualify for bulk discount!
</div>

<!-- Show different messages based on quantity -->
<div data-next-show="cart.quantity == 1">Single item in cart</div>
<div data-next-show="cart.quantity > 1">Multiple items in cart</div>
```
