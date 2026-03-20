---
title: Cart Buttons
sidebar_label: Buttons
---

Various button types for managing cart items.

## Add to Cart

Buttons that add specific packages directly without a selector.

**Basic Add to Cart:**

```html
<button data-next-action="add-to-cart"
        data-next-package-id="2"
        data-next-quantity="1">
  Add to Cart
</button>
```

**Add and Redirect:**

```html
<button data-next-action="add-to-cart"
        data-next-package-id="3"
        data-next-quantity="3"
        data-next-url="/checkout">
  Add & Checkout
</button>
```

**Clear Cart, Add, and Redirect:**

```html
<button data-next-action="add-to-cart"
        data-next-package-id="2"
        data-next-quantity="1"
        data-next-url="/checkout"
        data-next-clear-cart="true">
  Clear Cart, Add & Go to Checkout
</button>
```

**Attributes:**

| Attribute | Description |
|-----------|-------------|
| `data-next-action="add-to-cart"` | Action type |
| `data-next-package-id` | Package to add |
| `data-next-quantity` | Quantity to add |
| `data-next-url` | Redirect after add |
| `data-next-clear-cart` | Clear cart before adding |

## Toggle Buttons

Toggle items in and out of the cart with dynamic states.

**Basic Toggle:**

```html
<button data-next-toggle
        data-next-package-id="9"
        data-next-is-upsell="true">
  Toggle Item
</button>
```

**Toggle with Quantity:**

```html
<button data-next-toggle
        data-next-package-id="8"
        data-next-quantity="3">
  Add Extra Propeller Set
</button>
```

**Dynamic Text Toggle:**

```html
<button data-next-toggle
        data-next-package-id="11"
        data-add-text="Add Extra Drone"
        data-remove-text="✓ Extra Drone Added">
  Add Extra Drone
</button>
```

**Attributes:**

| Attribute | Description |
|-----------|-------------|
| `data-next-toggle` | Enable toggle functionality |
| `data-next-package-id` | Package to toggle |
| `data-next-quantity` | Quantity when toggled on |
| `data-add-text` | Text when item not in cart |
| `data-remove-text` | Text when item is in cart |
| `data-next-is-upsell` | Mark as upsell item |
| `data-next-package-sync` | Sync quantity with other packages |

## State Container Pattern

Apply the package ID to a container element. The container receives state classes when the item is in the cart, letting all child elements react to cart state via CSS.

```html
<div class="product-container"
     data-next-package-id="9"
     data-next-quantity="2">
  <!-- Container gets .next-in-cart, .next-active -->
  <button data-next-toggle>Toggle Bundle</button>
</div>
```

## Quantity Sync

Sync a toggle item's quantity to match other packages in the cart — useful for warranties and accessories that should track the main product.

```html
<!-- Warranty syncs with drone quantity -->
<button data-next-toggle
        data-next-package-id="10"
        data-next-package-sync="2,3,4">
  Add Protection Plan
</button>
```

When all synced packages are removed, the toggle item is also removed automatically.

## CSS Classes

| Class | When applied |
|-------|-------------|
| `.next-in-cart` | Item is in cart |
| `.next-active` | Toggle is active |
| `.next-disabled` | Button is disabled |
