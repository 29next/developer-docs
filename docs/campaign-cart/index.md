---
sidebar_label: Campaign Cart
sidebar_position: 1
---

# Campaign Cart JS SDK

Welcome to the Next Commerce JS SDK documentation. This SDK enables developers to create e-commerce storefront experiences using HTML attributes, JavaScript, and CSS.

## Quick Start

```html
<!-- Load SDK -->
<script src="https://campaign-cart-v2.pages.dev/loader.js"></script>

<!-- Campaign API Key -->
<meta name="next-api-key" content="your-api-key-here">
```

## Features

- **Attribute-driven architecture** - Build cart functionality with HTML attributes
- **Cart management** - Add to cart, selectors, quantity controls
- **Profile-based pricing** - Dynamic package mapping for different pricing tiers
- **Post-purchase upsells** - Maximize order value with upsell flows
- **Dynamic content** - Display prices, totals, and product data
- **Conversion tools** - FOMO notifications and exit intent popups

## Documentation Sections

### Getting Started
Start here if you're new to Campaign Cart. Learn how to install, configure, and get your first cart working.

- [Installation](/docs/campaign-cart/getting-started/installation) - Setup and configuration
- [Quick Start](/docs/campaign-cart/getting-started/quick-start) - Basic examples
- [Configuration](/docs/campaign-cart/getting-started/configuration) - Meta tags and options
- [Troubleshooting](/docs/campaign-cart/getting-started/troubleshooting) - Common issues

### Core Features

- **[Cart System](/docs/campaign-cart/cart-system/overview)** - Cart management and controls
- **[Upsells](/docs/campaign-cart/upsells/overview)** - Post-purchase upsell flows
- **[Attributes](/docs/campaign-cart/attributes/overview)** - Display and conditional attributes
- **[Utilities](/docs/campaign-cart/utilities/analytics)** - FOMO, exit intent, and analytics

### Reference

- **[API Reference](/docs/campaign-cart/api-reference/methods)** - JavaScript methods and events
- **[Examples](/docs/campaign-cart/examples/basic-product-page)** - Complete implementations
- **[Guides](/docs/campaign-cart/guides/best-practices)** - Best practices and optimization

## Quick Examples

### Add to Cart Button
```html
<button data-next-action="add-to-cart" 
        data-next-package-id="1"
        data-next-quantity="1">
  Add to Cart
</button>
```

### Product Selector
```html
<div data-next-cart-selector data-next-selection-mode="swap">
  <div data-next-selector-card data-next-package-id="1">Option 1</div>
  <div data-next-selector-card data-next-package-id="2">Option 2</div>
</div>
```

### Display Cart Total
```html
<span data-next-display="cart.total">$0.00</span>
```

### Conditional Display
```html
<div data-next-show="cart.hasItems">
  <button onclick="checkout()">Proceed to Checkout</button>
</div>
```

## Browser Support

The SDK supports all modern browsers including Chrome, Firefox, Safari, and Edge.
