---
sidebar_label: Cart System
sidebar_position: 1
---

# Cart System

Learn how to manage shopping carts with Campaign Cart JS SDK using HTML attributes.

## Force Package ID

The `forcePackageId` parameter allows you to pre-populate the cart with specific packages. This is useful for direct marketing campaigns, quick-buy links, and pre-filling carts programmatically.

**Important**: `forcePackageId` is processed during SDK initialization. To use it programmatically, you need to either:
1. Set it and reload the page to trigger initialization
2. Set it before navigating to a new page (it will be processed on the next page load)

### Format

The `forcePackageId` parameter supports several formats:

- **Single Package**: `"1"` - Adds package ID 1 with quantity 1
- **Single Package with Quantity**: `"1:3"` - Adds package ID 1 with quantity 3
- **Multiple Packages**: `"1:2,3:1,5:3"` - Adds multiple packages with their quantities

### Usage Examples

#### URL Parameter

Add packages directly via URL query string:

```html
<!-- Single package -->
https://yoursite.com/?forcePackageId=1

<!-- Single package with quantity -->
https://yoursite.com/?forcePackageId=1:3

<!-- Multiple packages -->
https://yoursite.com/?forcePackageId=1:2,3:1,5:3
```

#### Programmatic Usage

Set the parameter before SDK initialization:

```javascript
// Set parameter before SDK loads
window.nextConfig = window.nextConfig || {};
window.nextConfig.forcePackageId = "1:2,3:1";

// Or set via URL parameter API
next.setParam('forcePackageId', '1:2,3:1');
window.location.reload(); // Reload to trigger initialization
```

#### Use Cases

**Direct Marketing Links:**
```html
<!-- Email campaign link -->
<a href="/checkout?forcePackageId=5:1">Buy Now - Special Offer</a>
```

**Quick-Buy Buttons:**
```html
<!-- Pre-fill cart and redirect to checkout -->
<a href="/checkout?forcePackageId=2:3">Buy 3x Package</a>
```

**A/B Testing:**
```html
<!-- Variant A: Package 1 -->
<a href="/?forcePackageId=1&variant=a">Variant A</a>

<!-- Variant B: Package 2 -->
<a href="/?forcePackageId=2&variant=b">Variant B</a>
```

## Cart Selectors

Cart selectors allow users to choose products before adding them to cart. The SDK supports multiple selection patterns.

### Swap Mode Selector

In swap mode, clicking a card immediately replaces the current item in the cart. No button needed.

```html
<div data-next-cart-selector data-next-selection-mode="swap">
  <div data-next-selector-card data-next-package-id="2">
    <h3>Basic Package</h3>
    <span data-next-display="package.price">$99</span>
  </div>
  <div data-next-selector-card data-next-package-id="3" data-next-selected="true">
    <h3>Premium Package</h3>
    <span data-next-display="package.price">$199</span>
  </div>
</div>
```

**Key Attributes:**
- `data-next-cart-selector`: Defines the selector container
- `data-next-selection-mode="swap"`: Auto-adds to cart on selection
- `data-next-selector-card`: Individual selectable cards
- `data-next-package-id`: Package ID to add
- `data-next-selected="true"`: Default selection

### Select Mode with Button

Select first, then click button to add. Button is disabled until selection is made.

```html
<div data-next-cart-selector 
     data-next-selector-id="button-selector"
     data-next-selection-mode="select">
  <div data-next-selector-card data-next-package-id="3">
    <h3>Package Option 1</h3>
  </div>
  <div data-next-selector-card data-next-package-id="4">
    <h3>Package Option 2</h3>
  </div>
</div>

<button data-next-action="add-to-cart" 
        data-next-selector-id="button-selector">
  Add to Cart
</button>
```

**Key Attributes:**
- `data-next-selection-mode="select"`: Requires button to add
- `data-next-selector-id`: Links selector to button
- `data-next-action="add-to-cart"`: Add to cart action

### Displaying Selection Data

Show data about the currently selected package:

```html
<div data-next-cart-selector data-next-selector-id="my-selector">
  <!-- Selector cards here -->
</div>

<!-- Display selected package info -->
<div>
  Selected: <span data-next-display="selection.my-selector.name">None</span>
  Price: <span data-next-display="selection.my-selector.price">$0</span>
</div>
```

### CSS Classes

Selectors automatically get CSS classes:
- `.next-selected` - Applied to selected card
- `.next-selector-active` - Applied when selector has selection

### Multiple Selectors

You can have multiple selectors on the same page with different IDs:

```html
<!-- Main product selector -->
<div data-next-cart-selector data-next-selector-id="main-product">
  <!-- Cards -->
</div>

<!-- Warranty selector -->
<div data-next-cart-selector data-next-selector-id="warranty">
  <!-- Cards -->
</div>
```

### Conditional Display

Show/hide elements based on selection:

```html
<div data-next-show="selection.my-selector.hasSelection">
  You've selected a package!
</div>
```

## Cart Buttons

Various button types for managing cart items.

### Direct Add to Cart Buttons

Buttons that add specific packages directly without selection.

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

### Cart Toggle Buttons

Toggle items in/out of cart with dynamic states.

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

### State Container Pattern

Container element gets state classes when item is in cart:

```html
<div class="product-container"
     data-next-package-id="9"
     data-next-quantity="2">
  <!-- Container gets state classes: .next-in-cart, .next-active -->
  <button data-next-toggle>Toggle Bundle</button>
</div>
```

### Quantity Sync Feature

Perfect for warranties and accessories that should match main product quantity.

```html
<!-- Warranty syncs with drone quantity -->
<button data-next-toggle 
        data-next-package-id="10" 
        data-next-package-sync="2,3,4">
  Add Protection Plan
</button>
```

### Button Attributes

**Add to Cart Attributes:**
- `data-next-action="add-to-cart"` - Action type
- `data-next-package-id` - Package to add
- `data-next-quantity` - Quantity to add
- `data-next-url` - Redirect after add
- `data-next-clear-cart` - Clear cart before adding

**Toggle Attributes:**
- `data-next-toggle` - Enable toggle functionality
- `data-next-package-id` - Package to toggle
- `data-next-quantity` - Quantity when toggled on
- `data-add-text` - Text when item not in cart
- `data-remove-text` - Text when item in cart
- `data-next-is-upsell` - Mark as upsell item
- `data-next-package-sync` - Sync quantity with other packages

**CSS Classes:**
- `.next-in-cart` - Item is in cart
- `.next-active` - Toggle is active
- `.next-disabled` - Button is disabled

## Quantity Controls

Manage product quantities in the cart with various control patterns.

### Direct Quantity in Buttons

Set quantity directly in add to cart buttons:

```html
<!-- Add specific quantity -->
<button data-next-action="add-to-cart"
        data-next-package-id="2"
        data-next-quantity="3">
  Add 3 to Cart
</button>
```

### Toggle with Quantity

Toggle buttons can specify quantity:

```html
<button data-next-toggle
        data-next-package-id="8"
        data-next-quantity="3">
  Add 3 Extra Batteries
</button>
```

### Container-Based Quantity

Specify quantity at the container level:

```html
<div class="product-container"
     data-next-package-id="9"
     data-next-quantity="2">
  <button data-next-toggle>Add 2 Pack Bundle</button>
</div>
```

### Quantity Sync Feature

Sync quantities between related products (e.g., warranties that match product quantity):

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

### Quantity Display

Show current quantity in cart:

```html
<!-- Total quantity of all items -->
<span data-next-display="cart.quantity">0</span>

<!-- Quantity of specific item -->
<span data-next-display="cart.items[package-id-2].quantity">0</span>
```

### Quantity-Based Conditionals

Show/hide elements based on quantity:

```html
<!-- Show when cart has 3 or more items -->
<div data-next-show="cart.quantity >= 3">
  You qualify for bulk discount!
</div>

<!-- Show different messages based on quantity -->
<div data-next-show="cart.quantity == 1">Single item in cart</div>
<div data-next-show="cart.quantity > 1">Multiple items in cart</div>
```

### Best Practices

1. **Clear Labels**: Always indicate quantity in button text
2. **Visual Feedback**: Update button text when quantity changes
3. **Sync Related Items**: Use quantity sync for accessories/warranties
4. **Display Current Quantity**: Show users current cart quantities

## State Management

The Next Commerce JS SDK automatically manages cart state and synchronizes it across all elements.

### Automatic State Sync

All elements displaying cart data automatically update when the cart changes:

```html
<!-- All these update automatically -->
<span data-next-display="cart.total">$0.00</span>
<span data-next-display="cart.quantity">0</span>
<div data-next-show="cart.hasItems">Cart has items!</div>
```

### CSS State Classes

Elements automatically receive CSS classes based on state:

**Toggle Button States:**

```html
<button data-next-toggle data-next-package-id="5">
  <!-- Gets .next-in-cart class when item is in cart -->
  <!-- Gets .next-active class when toggled on -->
  Add Item
</button>
```

**Container States:**

```html
<div data-next-package-id="5">
  <!-- Container gets .next-in-cart when package is in cart -->
  <!-- All child elements can use this for styling -->
  <button data-next-toggle>Toggle</button>
  <span>Product Info</span>
</div>
```

**Selector States:**

```html
<div data-next-selector-card data-next-package-id="1">
  <!-- Gets .next-selected class when selected -->
  Package Option
</div>
```

### State-Based Styling

Use CSS to style based on state:

```css
/* Style selected cards */
.next-selected {
  border: 2px solid blue;
  background: #f0f0ff;
}

/* Style items in cart */
.next-in-cart {
  opacity: 0.6;
}

/* Style active toggle buttons */
button.next-active {
  background: green;
  color: white;
}
```

### Conditional Display

Show/hide elements based on cart state:

```html
<!-- Cart status -->
<div data-next-show="cart.isEmpty">Your cart is empty</div>
<div data-next-show="cart.hasItems">
  You have <span data-next-display="cart.quantity">0</span> items
</div>

<!-- Specific item checks -->
<div data-next-show="cart.hasItem(2)">Package 2 is in your cart</div>

<!-- Value-based conditions -->
<div data-next-show="cart.total > 100">Free shipping unlocked!</div>
```

### Events

Listen to state changes:

```javascript
// Cart updated
next.on('cart:updated', (data) => {
  console.log('Cart updated:', data);
});

// Item added
next.on('cart:item-added', (data) => {
  console.log('Item added:', data);
});

// Item removed
next.on('cart:item-removed', (data) => {
  console.log('Item removed:', data);
});
```

### Best Practices

1. **Use CSS Classes**: Style based on state classes for better UX
2. **Conditional Content**: Show relevant messages based on cart state
3. **Listen to Events**: Trigger analytics or custom logic on state changes
4. **Loading States**: Use data-next-await for initial loading

## Related Documentation

- [Cart Attributes](/docs/campaign-cart/data-attributes/display/#cart-summary) - Display cart data
- [Upsells](/docs/campaign-cart/upsells/) - Post-purchase flows
