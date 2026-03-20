---
title: State & Initialization
sidebar_label: State
---

## Automatic State Sync

All elements displaying cart data automatically update when the cart changes — no extra configuration needed:

```html
<!-- All these update automatically -->
<span data-next-display="cart.total">$0.00</span>
<span data-next-display="cart.quantity">0</span>
<div data-next-show="cart.hasItems">Cart has items!</div>
```

## CSS State Classes

Elements automatically receive CSS classes based on state.

**Toggle Button States:**

```html
<button data-next-toggle data-next-package-id="5">
  <!-- Gets .next-in-cart when item is in cart -->
  <!-- Gets .next-active when toggled on -->
  Add Item
</button>
```

**Container States:**

```html
<div data-next-package-id="5">
  <!-- Gets .next-in-cart when package is in cart -->
  <button data-next-toggle>Toggle</button>
  <span>Product Info</span>
</div>
```

**Selector States:**

```html
<div data-next-selector-card data-next-package-id="1">
  <!-- Gets .next-selected when selected -->
  Package Option
</div>
```

## State-Based Styling

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

## Conditional Display

Show or hide elements based on cart state:

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

## Events

Listen to cart state changes:

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

---

## Force Package ID

The `forcePackageId` parameter pre-populates the cart with specific packages. Useful for direct marketing links, quick-buy buttons, and A/B testing.

**Important:** `forcePackageId` is processed during SDK initialization. To use it programmatically, either set it before the page loads or reload after setting it.

### Format

| Format | Example | Result |
|--------|---------|--------|
| Single package | `"1"` | Package 1, qty 1 |
| Package + quantity | `"1:3"` | Package 1, qty 3 |
| Multiple packages | `"1:2,3:1,5:3"` | Three packages with quantities |

### URL Parameter

```html
<!-- Single package -->
https://yoursite.com/?forcePackageId=1

<!-- Single package with quantity -->
https://yoursite.com/?forcePackageId=1:3

<!-- Multiple packages -->
https://yoursite.com/?forcePackageId=1:2,3:1,5:3
```

### Programmatic Usage

```javascript
// Set before SDK loads
window.nextConfig = window.nextConfig || {};
window.nextConfig.forcePackageId = "1:2,3:1";

// Or set via URL parameter API then reload
next.setParam('forcePackageId', '1:2,3:1');
window.location.reload();
```

### Use Cases

**Direct marketing links:**
```html
<a href="/checkout?forcePackageId=5:1">Buy Now – Special Offer</a>
```

**Quick-buy buttons:**
```html
<a href="/checkout?forcePackageId=2:3">Buy 3× Package</a>
```

**A/B testing:**
```html
<a href="/?forcePackageId=1&variant=a">Variant A</a>
<a href="/?forcePackageId=2&variant=b">Variant B</a>
```
