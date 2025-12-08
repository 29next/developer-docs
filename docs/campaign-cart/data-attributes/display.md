---
title: Display Attributes
description: Show dynamic data that updates automatically
sidebar_position: 3
---

**Display attributes bind HTML elements to live data that updates automatically when state changes.**

## data-next-display

The primary attribute for showing dynamic values from cart, campaign, and order data.

### Basic Usage

```html
<!-- Cart totals -->
<span data-next-display="cart.total">$0.00</span>
<span data-next-display="cart.subtotal">$0.00</span>
<span data-next-display="cart.shipping">$0.00</span>
<span data-next-display="cart.tax">$0.00</span>
<span data-next-display="cart.discount">$0.00</span>

<!-- Cart quantities -->
<span data-next-display="cart.totalQuantity">0</span>
<span data-next-display="cart.itemCount">0</span>

<!-- Package data -->
<span data-next-display="package.123.price">$0.00</span>
<span data-next-display="package.123.name">Loading...</span>
<span data-next-display="package.123.description">Loading...</span>
```

### Display Paths

| Path | Description | Example Output |
|------|-------------|----------------|
| `cart.total` | Total cart value | "$99.99" |
| `cart.subtotal` | Subtotal before shipping/tax | "$89.99" |
| `cart.shipping` | Shipping cost | "$10.00" |
| `cart.tax` | Tax amount | "$8.00" |
| `cart.discount` | Discount amount | "-$10.00" |
| `cart.totalQuantity` | Total items in cart | "5" |
| `cart.itemCount` | Unique items in cart | "3" |
| `cart.isEmpty` | Cart empty state | "true" or "false" |
| `package.[id].price` | Package price | "$29.99" |
| `package.[id].name` | Package display name | "Premium Bundle" |
| `package.[id].description` | Package description | "Includes everything..." |
| `package.[id].savings` | Discount amount | "$10.00" |
| `package.[id].quantity` | Quantity in cart | "2" |
| `campaign.name` | Campaign name | "Summer Sale" |
| `campaign.currency` | Active currency | "USD" |
| `order.total` | Order total | "$99.99" |
| `order.refId` | Order reference | "ORD-12345" |
| `profile.active` | Active profile | "premium" |

### Formatting Options

Use `data-format` to control how values are displayed:

```html
<!-- Currency formatting (default) -->
<span data-next-display="cart.total" 
      data-format="currency">
  $0.00
</span>

<!-- Number only -->
<span data-next-display="cart.total" 
      data-format="number">
  0.00
</span>

<!-- Integer (no decimals) -->
<span data-next-display="cart.totalQuantity" 
      data-format="integer">
  0
</span>

<!-- Percentage -->
<span data-next-display="cart.discountPercent" 
      data-format="percentage">
  0%
</span>

<!-- Hide zero cents -->
<span data-next-display="package.123.price" 
      data-format="currency"
      data-hide-zero-cents="true">
  $100
</span>
```

### Mathematical Operations

```html
<!-- Divide by value -->
<span data-next-display="cart.total" 
      data-divide-by="100">
  0.99
</span>

<!-- Multiply by value -->
<span data-next-display="cart.itemCount" 
      data-multiply-by="10">
  30
</span>

<!-- Calculate savings -->
<span data-next-display="package.123.originalPrice" 
      data-subtract="package.123.price">
  $20.00
</span>
```

## Conditional Display

### data-next-show

Show element when condition is true:

```html
<!-- Show when cart has items -->
<div data-next-show="cart.isEmpty === false">
  Your cart has items!
</div>

<!-- Show when specific item is in cart -->
<div data-next-show="cart.hasItem(123)">
  Premium package selected
</div>

<!-- Show when total exceeds threshold -->
<div data-next-show="cart.total > 100">
  Free shipping unlocked!
</div>

<!-- Complex conditions -->
<div data-next-show="cart.totalQuantity >= 3 && cart.total > 50">
  Bulk discount applied!
</div>
```

### data-next-hide

Hide element when condition is true (inverse of show):

```html
<!-- Hide when cart is empty -->
<button data-next-hide="cart.isEmpty">
  Proceed to Checkout
</button>

<!-- Hide when item already in cart -->
<button data-next-hide="cart.hasItem(123)">
  Add to Cart
</button>

<!-- Hide below minimum order -->
<div data-next-hide="cart.total < 25">
  Checkout available
</div>
```

### data-hide-if-zero

Hide element when displayed value is zero:

```html
<!-- Hide if no discount -->
<div data-next-display="cart.discount"
     data-hide-if-zero="true">
  Discount: <span>$0.00</span>
</div>

<!-- Hide if no shipping -->
<div data-next-display="cart.shipping"
     data-hide-if-zero="true">
  Shipping: <span>$0.00</span>
</div>
```

### data-hide-if-false

Hide element when value is false:

```html
<div data-next-display="cart.hasDiscount"
     data-hide-if-false="true">
  Discount applied!
</div>
```

## Profile-Based Display

Show/hide content based on active profile:

```html
<!-- Show for specific profile -->
<div data-next-show-if-profile="premium">
  Premium member pricing
</div>

<!-- Hide for specific profile -->
<div data-next-hide-if-profile="premium">
  Upgrade to premium for better prices
</div>

<!-- Multiple profiles -->
<div data-next-show-if-profile="vip,premium,gold">
  Member exclusive content
</div>
```

## Timer Display

### data-next-timer

Display countdown timers:

```html
<!-- Basic timer (5 minutes) -->
<div data-next-timer="true"
     data-duration="300">
  05:00
</div>

<!-- Timer with persistence -->
<div data-next-timer="true"
     data-duration="3600"
     data-persistence-id="sale-timer"
     data-format="hh:mm:ss">
  01:00:00
</div>

<!-- Timer with custom display -->
<div data-next-timer="true"
     data-duration="86400"
     data-format="dd:hh:mm:ss">
  1d 00:00:00
</div>
```

Timer format options:
- `mm:ss` - Minutes and seconds
- `hh:mm:ss` - Hours, minutes, seconds
- `dd:hh:mm:ss` - Days, hours, minutes, seconds
- `auto` - Automatic formatting based on duration

## Complex Display Patterns

### Cart Summary

```html
<div class="cart-summary">
  <!-- Cart count badge -->
  <span data-next-display="cart.totalQuantity" 
        data-hide-if-zero="true"
        class="badge">0</span>
  
  <!-- Empty cart message -->
  <div data-next-show="cart.isEmpty">
    Your cart is empty
  </div>
  
  <!-- Cart items -->
  <div data-next-hide="cart.isEmpty">
    <div>Items: <span data-next-display="cart.itemCount">0</span></div>
    <div>Subtotal: <span data-next-display="cart.subtotal">$0.00</span></div>
    
    <!-- Conditional shipping -->
    <div data-next-display="cart.shipping"
         data-hide-if-zero="true">
      Shipping: <span>$0.00</span>
    </div>
    
    <!-- Conditional discount -->
    <div data-next-display="cart.discount"
         data-hide-if-zero="true">
      Discount: <span>$0.00</span>
    </div>
    
    <div>Total: <span data-next-display="cart.total">$0.00</span></div>
  </div>
</div>
```

### Product Card with Dynamic Pricing

```html
<div class="product-card" data-package-id="123">
  <!-- Dynamic price -->
  <div class="price">
    <span data-next-display="package.123.price"
          data-format="currency"
          data-hide-zero-cents="true">$0</span>
  </div>
  
  <!-- Original price with strikethrough -->
  <div data-next-show="package.123.hasDiscount">
    <s data-next-display="package.123.originalPrice">$0.00</s>
    <span data-next-display="package.123.savings">Save $0</span>
  </div>
  
  <!-- Stock status -->
  <div data-next-show="package.123.inStock === false"
       class="out-of-stock">
    Out of Stock
  </div>
  
  <!-- In cart indicator -->
  <div data-next-show="cart.hasItem(123)">
    <span data-next-display="package.123.quantity">0</span> in cart
  </div>
</div>
```

### Order Confirmation

```html
<div data-next-show="order.exists">
  <h2>Order Confirmed!</h2>
  <p>Order ID: <span data-next-display="order.refId">-</span></p>
  <p>Total: <span data-next-display="order.total">$0.00</span></p>
  
  <!-- Order items -->
  <div data-next-order-items="true">
    <!-- SDK will populate this -->
  </div>
</div>
```

## Cart Items Template Variables

The `data-next-cart-items` renderer uses template variables to display cart item data. All variables use the `{item.*}` syntax.

### Basic Item Properties

```html
<div data-next-cart-items>
  <div class="cart-item">
    <h4>{item.name}</h4>
    <p>SKU: {item.sku}</p>
    <p>Quantity: {item.quantity}</p>
    <img src="{item.image}" alt="{item.name}">
  </div>
</div>
```

| Variable | Description | Example |
|----------|-------------|---------|
| `{item.id}` | Unique cart item ID | Auto-generated |
| `{item.packageId}` | Package ID | "123" |
| `{item.name}` | Product name | "Grounded Sheets" |
| `{item.title}` | Product title (alias) | "Grounded Sheets" |
| `{item.quantity}` | Quantity in cart | "2" |
| `{item.image}` | Product image URL | "https://..." |
| `{item.sku}` | Product SKU | "GRS-001" |
| `{item.frequency}` | Purchase frequency | "One time" or "Every month" |

### Variant Properties

Display product variant information:

```html
<div data-next-cart-items>
  <div class="cart-item">
    <h4>{item.productName}</h4>
    <p class="variant">{item.variantName}</p>
    <p class="attributes">{item.variantAttributesFormatted}</p>

    <!-- Individual variant attributes -->
    <span class="color">Color: {item.variantColor}</span>
    <span class="size">Size: {item.variantSize}</span>
  </div>
</div>
```

| Variable | Description | Example |
|----------|-------------|---------|
| `{item.productId}` | Base product ID | Auto-generated |
| `{item.productName}` | Base product name | "Grounded Sheets" |
| `{item.variantId}` | Variant ID | Auto-generated |
| `{item.variantName}` | Full variant name | "Grounded Sheets - Obsidian Grey / Twin" |
| `{item.variantSku}` | Variant SKU | "BE-GRS-TWN-GR" |
| `{item.variantAttributes}` | Raw array of variant attributes | For JSON output |
| `{item.variantAttributesFormatted}` | Formatted attributes | "Color: Obsidian Grey, Size: Twin" |
| `{item.variantAttributesList}` | HTML formatted attributes | `<span>Color: Grey</span>` |
| `{item.variantColor}` | Color value (dynamic) | "Obsidian Grey" |
| `{item.variantSize}` | Size value (dynamic) | "Twin" |
| `{item.variant.color}` | Color (dot notation) | "Obsidian Grey" |
| `{item.variant.size}` | Size (dot notation) | "Twin" |
| `{item.variant_color}` | Color (underscore) | "Obsidian Grey" |
| `{item.variant_size}` | Size (underscore) | "Twin" |

Individual variant attributes are dynamically generated for all variant attribute codes.

### Pricing Variables

```html
<div data-next-cart-items>
  <div class="cart-item">
    <p class="price">{item.price}</p>
    <p class="unit-price">{item.unitPrice} each</p>
    <p class="line-total">Total: {item.lineTotal}</p>

    <!-- Show original price if on sale -->
    <s class="{item.showCompare}">{item.comparePrice}</s>
  </div>
</div>
```

| Variable | Description | Type |
|----------|-------------|------|
| `{item.price}` | Package price | Currency |
| `{item.unitPrice}` | Price per unit | Currency |
| `{item.comparePrice}` | Original price before discount | Currency |
| `{item.unitComparePrice}` | Original unit price | Currency |
| `{item.lineTotal}` | Line total (price × quantity) | Currency |
| `{item.lineCompare}` | Original line total | Currency |
| `{item.recurringPrice}` | Subscription price | Currency |

### Savings Variables

```html
<div data-next-cart-items>
  <div class="cart-item {item.showSavings}">
    <p class="savings">
      Save {item.savingsAmount} ({item.savingsPct}%)
    </p>
  </div>
</div>
```

| Variable | Description | Type |
|----------|-------------|------|
| `{item.savingsAmount}` | Total savings | Currency |
| `{item.unitSavings}` | Per-unit savings | Currency |
| `{item.savingsPct}` | Savings percentage | Percentage |
| `{item.packageSavings}` | Package-level savings | Currency |
| `{item.packageSavingsPct}` | Package savings % | Percentage |

### Package Details

```html
<div data-next-cart-items>
  <div class="cart-item">
    <p>Package Price: {item.packagePrice}</p>
    <p>Package Total: {item.packagePriceTotal}</p>
    <p>Package Retail: {item.packageRetailPrice}</p>
    <p>Units in Package: {item.packageQty}</p>
  </div>
</div>
```

| Variable | Description | Type |
|----------|-------------|------|
| `{item.packagePrice}` | Base package price | Currency |
| `{item.packagePriceTotal}` | Package total price | Currency |
| `{item.packageRetailPrice}` | Package retail price | Currency |
| `{item.packageRetailTotal}` | Package retail total | Currency |
| `{item.packageQty}` | Quantity in package | Number |

### Coupon Discount Variables

```html
<div data-next-cart-items>
  <div class="cart-item {item.showDiscount}">
    <p>Price: <s>{item.price}</s> {item.discountedPrice}</p>
    <p class="discount">Coupon: -{item.discountAmount}</p>
    <p class="final">Final: {item.finalPrice}</p>
  </div>
</div>
```

| Variable | Description | Type |
|----------|-------------|------|
| `{item.discountAmount}` | Coupon discount amount | Currency |
| `{item.discountedPrice}` | Price after coupon | Currency |
| `{item.discountedLineTotal}` | Line total after coupon | Currency |
| `{item.hasDiscount}` | Has coupon discount | "true" or "false" |
| `{item.finalPrice}` | Final display price | Currency |
| `{item.finalLineTotal}` | Final line total | Currency |

### Conditional Display Classes

Use these to show/hide elements conditionally:

```html
<div data-next-cart-items>
  <div class="cart-item">
    <!-- Shows "show" or "hide" class -->
    <span class="{item.showCompare}">{item.comparePrice}</span>
    <span class="{item.showSavings}">Save {item.savingsAmount}</span>
    <span class="{item.showDiscount}">Coupon applied!</span>
    <span class="{item.showRecurring}">{item.frequency}</span>
  </div>
</div>
```

| Variable | Returns | Description |
|----------|---------|-------------|
| `{item.showCompare}` | "show" or "hide" | Show compare price if has savings |
| `{item.showSavings}` | "show" or "hide" | Show savings badge |
| `{item.showRecurring}` | "show" or "hide" | Show subscription info |
| `{item.showUnitPrice}` | "show" or "hide" | Show unit price for multi-packs |
| `{item.showDiscount}` | "show" or "hide" | Show coupon discount |
| `{item.showOriginalPrice}` | "show" or "hide" | Show strikethrough price |
| `{item.hasSavings}` | "true" or "false" | Boolean for conditionals |
| `{item.isRecurring}` | "true" or "false" | Is subscription product |

### Cart Template Configuration

Configure cart items renderer with these attributes:

```html
<!-- Template by ID -->
<template id="cart-item-template">
  <div class="item">{item.name} - {item.price}</div>
</template>
<div data-next-cart-items
     data-item-template-id="cart-item-template">
</div>

<!-- Empty cart message -->
<div data-next-cart-items
     data-empty-template='<p>Your cart is empty</p>'>
</div>

<!-- Group identical items -->
<div data-next-cart-items
     data-group-items>
</div>

<!-- Custom titles for packages -->
<div data-next-cart-items
     data-title-map='{"2": "Premium Package", "3": "Starter Kit"}'>
</div>
```

| Attribute | Description | Example |
|-----------|-------------|---------|
| `data-item-template-id` | Reference template by ID | `"cart-item-template"` |
| `data-item-template-selector` | Reference by CSS selector | `"#custom-template"` |
| `data-item-template` | Inline template string | `'<div>{item.name}</div>'` |
| `data-empty-template` | Template when cart is empty | `'<p>No items</p>'` |
| `data-title-map` | Map package IDs to titles (JSON) | `'{"2": "Premium"}'` |
| `data-group-items` | Group identical items together | Flag attribute |

### Raw Values for Calculations

Use `.raw` suffix for numeric calculations:

```html
<div data-next-cart-items>
  <div class="cart-item">
    <!-- Calculate 10% of line total -->
    <p>Tax: ${item.lineTotal.raw * 0.1}</p>
  </div>
</div>
```

| Variable | Description |
|----------|-------------|
| `{item.price.raw}` | Numeric price value |
| `{item.unitPrice.raw}` | Numeric unit price |
| `{item.lineTotal.raw}` | Numeric line total |
| `{item.savingsAmount.raw}` | Numeric savings |
| `{item.savingsPct.raw}` | Numeric savings percentage |
| `{item.discountAmount.raw}` | Numeric discount |
| `{item.discountedPrice.raw}` | Numeric discounted price |
| `{item.discountedLineTotal.raw}` | Numeric discounted line total |
| `{item.finalPrice.raw}` | Numeric final price |
| `{item.finalLineTotal.raw}` | Numeric final line total |

## Package Display Attributes

Display data for specific packages using `package.[id].*` syntax. Replace `[id]` with your package ID (e.g., `package.123.price`).

### Shorthand Syntax

If the element is inside a container with `data-next-package-id="3"`, for example, then you can use `package.price` instead of `package.3.price`. The system resolves the package ID from the parent context.

```html
<!-- Using full syntax -->
<div>
  <span data-next-display="package.123.price">$29.99</span>
  <span data-next-display="package.123.name">Product Name</span>
</div>

<!-- Using shorthand syntax with parent context -->
<div data-next-package-id="123">
  <span data-next-display="package.price">$29.99</span>
  <span data-next-display="package.name">Product Name</span>
</div>
```

This shorthand is especially useful when building reusable product card components or when iterating over multiple packages.

### Basic Properties

Display core package information:

```html
<!-- Package name and image -->
<h3 data-next-display="package.123.name">Product Name</h3>
<img data-next-display="package.123.image" alt="Product image">

<!-- Package identifiers -->
<span data-next-display="package.123.ref_id">123</span>
<span data-next-display="package.123.external_id">456</span>
```

| Variable | Description | Type | Example |
|----------|-------------|------|---------|
| `package.[id].name` | Package display name | String | "Premium Bundle" |
| `package.[id].image` | Package image URL | String | "https://..." |
| `package.[id].ref_id` | Internal reference ID | Number | 123 |
| `package.[id].external_id` | External system ID | Number | 456 |

### Pricing Properties

#### Base Prices

```html
<!-- Per-unit price -->
<span data-next-display="package.123.price">$29.99</span>

<!-- Total package price -->
<span data-next-display="package.123.price_total">$89.97</span>

<!-- Alias for price_total -->
<span data-next-display="package.123.packageTotal">$89.97</span>

<!-- Alias for price -->
<span data-next-display="package.123.unitPrice">$29.99</span>
```

| Variable | Description | Type |
|----------|-------------|------|
| `package.[id].price` | Per-unit price | Currency |
| `package.[id].price_total` | Total package price | Currency |
| `package.[id].packageTotal` | Alias for `price_total` | Currency |
| `package.[id].unitPrice` | Alias for `price` | Currency |

#### Retail/Compare Prices

```html
<!-- Per-unit retail price -->
<span data-next-display="package.123.price_retail">$39.99</span>

<!-- Total retail price -->
<span data-next-display="package.123.price_retail_total">$119.97</span>

<!-- Aliases for retail prices -->
<span data-next-display="package.123.unitRetailPrice">$39.99</span>
<span data-next-display="package.123.comparePrice">$119.97</span>
<span data-next-display="package.123.compareTotal">$119.97</span>
```

| Variable | Description | Type |
|----------|-------------|------|
| `package.[id].price_retail` | Per-unit retail price | Currency |
| `package.[id].price_retail_total` | Total retail price | Currency |
| `package.[id].unitRetailPrice` | Calculated unit retail price | Currency |
| `package.[id].comparePrice` | Alias for `price_retail_total` | Currency |
| `package.[id].compareTotal` | Alias for `price_retail_total` | Currency |

### Savings Properties

Display savings information:

```html
<!-- Savings amount -->
<span data-next-display="package.123.savingsAmount">$30.00</span>

<!-- Savings percentage -->
<span data-next-display="package.123.savingsPercentage">25</span>%

<!-- Unit savings -->
<span data-next-display="package.123.unitSavings">$10.00</span>
<span data-next-display="package.123.unitSavingsPercentage">25</span>%

<!-- Check if has savings -->
<div data-next-show="package.123.hasSavings">
  <span class="badge">On Sale!</span>
</div>
```

| Variable | Description | Type |
|----------|-------------|------|
| `package.[id].savingsAmount` | Total savings amount | Currency |
| `package.[id].savingsPercentage` | Savings percentage | Percentage |
| `package.[id].unitSavings` | Savings per unit | Currency |
| `package.[id].unitSavingsPercentage` | Savings percentage per unit | Percentage |
| `package.[id].hasSavings` | Whether package has savings | Boolean |

#### Raw Values (for calculations)

```html
<!-- Raw numeric values for calculations -->
<span data-next-display="package.123.savingsAmount.raw">30.00</span>
<span data-next-display="package.123.savingsPercentage.raw">25</span>
<span data-next-display="package.123.unitPrice.raw">29.99</span>
<span data-next-display="package.123.unitRetailPrice.raw">39.99</span>
```

### Discount Properties (Cart Context Required)

These properties require cart context to check for applied coupons/discounts. They work even if no coupons are applied (they'll return the regular price or zero).

```html
<!-- Discount-adjusted prices -->
<span data-next-display="package.123.discountedPrice">$24.99</span>
<span data-next-display="package.123.discountedPriceTotal">$74.97</span>

<!-- Discount amount -->
<span data-next-display="package.123.discountAmount">$5.00</span>

<!-- Final prices (after discounts) -->
<span data-next-display="package.123.finalPrice">$24.99</span>
<span data-next-display="package.123.finalPriceTotal">$74.97</span>

<!-- Check if has discount -->
<div data-next-show="package.123.hasDiscount">
  <span class="badge">Discount Applied!</span>
</div>
```

| Variable | Description | Type | Notes |
|----------|-------------|------|-------|
| `package.[id].discountedPrice` | Unit price after discounts | Currency | Requires cart context |
| `package.[id].discountedPriceTotal` | Total price after discounts | Currency | Requires cart context |
| `package.[id].discountAmount` | Discount amount applied | Currency | Requires cart context |
| `package.[id].hasDiscount` | Whether package has discount | Boolean | Requires cart context |
| `package.[id].finalPrice` | Final unit price (same as `discountedPrice`) | Currency | Requires cart context |
| `package.[id].finalPriceTotal` | Final total price (same as `discountedPriceTotal`) | Currency | Requires cart context |

### Total Savings (Retail + Discounts)

Combines retail savings with cart discounts:

```html
<!-- Total savings including discounts -->
<span data-next-display="package.123.totalSavingsAmount">$35.00</span>
<span data-next-display="package.123.totalSavingsPercentage">30</span>%

<!-- Aliases -->
<span data-next-display="package.123.totalSavingsWithDiscounts">$35.00</span>
<span data-next-display="package.123.totalSavingsPercentageWithDiscounts">30</span>%

<!-- Check if has any savings -->
<div data-next-show="package.123.hasTotalSavings">
  <span>You're saving money!</span>
</div>
```

| Variable | Description | Type | Notes |
|----------|-------------|------|-------|
| `package.[id].totalSavingsAmount` | Total savings (retail + discounts) | Currency | Requires cart context |
| `package.[id].totalSavingsPercentage` | Total savings percentage | Percentage | Requires cart context |
| `package.[id].totalSavingsWithDiscounts` | Alias for `totalSavingsAmount` | Currency | Requires cart context |
| `package.[id].totalSavingsPercentageWithDiscounts` | Alias for `totalSavingsPercentage` | Percentage | Requires cart context |
| `package.[id].hasTotalSavings` | Whether package has any savings | Boolean | Requires cart context |

### Quantity & Bundle Properties

```html
<!-- Units in package -->
<span data-next-display="package.123.qty">3</span> units
<span data-next-display="package.123.unitsInPackage">3</span> units

<!-- Check if bundle -->
<div data-next-show="package.123.isBundle">
  <span class="badge">Multi-Pack Deal</span>
</div>
```

| Variable | Description | Type |
|----------|-------------|------|
| `package.[id].qty` | Number of units in package | Number |
| `package.[id].unitsInPackage` | Alias for `qty` | Number |
| `package.[id].isBundle` | Whether package is a bundle (qty > 1) | Boolean |

### Subscription & Recurring Properties

Display subscription and recurring billing information:

```html
<!-- Check if subscription -->
<div data-next-show="package.123.isRecurring">
  <p>Subscription Product</p>
  <p>
    Billed every 
    <span data-next-display="package.123.interval_count">1</span>
    <span data-next-display="package.123.interval">month</span>
  </p>
  <p class="price" data-next-display="package.123.price_recurring">$29.99</p>
</div>

<!-- One-time purchase -->
<div data-next-show="package.123.isOneTime">
  <p>One-time purchase</p>
  <p class="price" data-next-display="package.123.price">$99.00</p>
</div>
```

| Variable | Description | Type | Values |
|----------|-------------|------|--------|
| `package.[id].is_recurring` | Is subscription product | Boolean | true/false |
| `package.[id].isRecurring` | Is subscription (alias) | Boolean | true/false |
| `package.[id].isOneTime` | Is one-time purchase | Boolean | true/false |
| `package.[id].interval` | Billing interval | String | "day", "month", null |
| `package.[id].interval_count` | Interval count | Number | 1, 2, 3, etc. |
| `package.[id].price_recurring` | Recurring price per billing cycle | Currency | "$29.99" |
| `package.[id].price_recurring_total` | Total recurring price for all units | Currency | "$89.97" |

### Complete Product Card Example

```html
<div class="product-card" data-next-package-id="123">
  <!-- Product info -->
  <h3 data-next-display="package.name">Product Name</h3>
  <img data-next-display="package.image" alt="Product image">

  <!-- Pricing -->
  <div class="pricing">
    <!-- Regular price (no savings) -->
    <div data-next-hide="package.hasSavings">
      <p class="price" data-next-display="package.price">$99.00</p>
    </div>

    <!-- Sale price with savings -->
    <div data-next-show="package.hasSavings">
      <s data-next-display="package.price_retail">$149.00</s>
      <p class="price" data-next-display="package.price">$99.00</p>
      <span class="savings">
        Save <span data-next-display="package.savingsAmount">$50.00</span>
        (<span data-next-display="package.savingsPercentage">33</span>%)
      </span>
    </div>

    <!-- One-time price -->
    <div data-next-show="package.isOneTime">
      <p>One-time purchase</p>
    </div>

    <!-- Subscription price -->
    <div data-next-show="package.isRecurring">
      <p class="price" data-next-display="package.price_recurring">$29.99</p>
      <p>
        Billed every
        <span data-next-display="package.interval_count">1</span>
        <span data-next-display="package.interval">month</span>
      </p>
    </div>

    <!-- Bundle indicator -->
    <div data-next-show="package.isBundle">
      <span class="badge">
        <span data-next-display="package.qty">3</span> Pack Deal
      </span>
    </div>
  </div>

  <!-- Discount info (if cart has coupons) -->
  <div data-next-show="package.hasDiscount" class="discount-badge">
    <span>Extra Discount: <span data-next-display="package.discountAmount">$5.00</span></span>
    <span>Final Price: <span data-next-display="package.finalPriceTotal">$94.00</span></span>
  </div>

  <!-- Package identifiers (for debugging) -->
  <div class="package-info" style="display: none;">
    <small>
      ID: <span data-next-display="package.ref_id">123</span> |
      External: <span data-next-display="package.external_id">456</span>
    </small>
  </div>
</div>
```

### Checking Cart Quantity

To check if a package is in the cart and get its quantity, use conditional attributes:

```html
<!-- Check if package is in cart -->
<div data-next-show="cart.hasItem(123)">
  <span>In Cart: <span data-next-display="cart.items[123].quantity">0</span></span>
</div>
```

Note: `cart.hasItem(123)` works in conditional attributes (`data-next-show`/`data-next-hide`), not in display attributes.

## Performance Tips

### Efficient Selectors

```html
<!-- ✅ Specific paths are faster -->
<span data-next-display="cart.total">$0</span>

<!-- ❌ Avoid deep nesting -->
<span data-next-display="cart.items[0].product.variations[0].price">$0</span>
```

### Reduce Recalculations

```html
<!-- ✅ Single display element -->
<div data-next-display="cart.summary"
     data-template="{itemCount} items - {total}">
  0 items - $0.00
</div>

<!-- ❌ Multiple elements that update together -->
<span data-next-display="cart.itemCount">0</span> items - 
<span data-next-display="cart.total">$0.00</span>
```

### Conditional Rendering

```html
<!-- ✅ Hide parent container -->
<div data-next-show="cart.hasDiscount">
  <h3>Discounts Applied</h3>
  <span data-next-display="cart.discount">$0.00</span>
</div>

<!-- ❌ Hide multiple children individually -->
<div>
  <h3 data-next-show="cart.hasDiscount">Discounts Applied</h3>
  <span data-next-show="cart.hasDiscount"
        data-next-display="cart.discount">$0.00</span>
</div>
```

## Fallback Content

Always provide fallback content for progressive enhancement:

```html
<!-- Fallback for prices -->
<span data-next-display="package.123.price">
  Starting at $29.99
</span>

<!-- Fallback for availability -->
<span data-next-display="package.123.inStock">
  Check availability
</span>

<!-- Fallback for loading states -->
<span data-next-display="campaign.name">
  Loading campaign...
</span>
```

## Debugging Display

Enable debug mode to see:
- Which elements are bound to data
- Update frequency and performance
- Data path resolution
- Formatting applied

```html
<!-- With ?debugger=true, shows -->
<span data-next-display="cart.total"
      class="next-display-bound"
      data-display-path="cart.total"
      data-display-value="99.99"
      data-display-formatted="$99.99">
  $99.99
</span>
```

## Related Documentation

- [Actions](/docs/campaign-cart/data-attributes/actions/) - Interactive elements
- [State Management](/docs/campaign-cart/data-attributes/state/) - Conditional logic
- [Events](/docs/campaign-cart/javascript-api/events/) - React to data changes