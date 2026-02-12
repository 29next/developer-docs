# Cart and Item Data Attributes – Full Reference

Complete list of cart- and item-related data attributes for campaign cart display (e.g. checkout summary).

---

## 1. Cart display attributes (`data-next-display`)

Use on elements that should show a live cart value. Value updates when the cart changes.

### Cart status

| Attribute value | Description | Example output |
|-----------------|-------------|----------------|
| `cart.isEmpty` | Cart has no items | `"true"` / `"false"` |
| `cart.hasItems` | Cart has at least one item | `"true"` / `"false"` |
| `cart.itemCount` | Number of distinct line items | `"3"` |
| `cart.quantity` | Total quantity across all items | `"5"` |
| `cart.count` | Alias for `cart.quantity` | `"5"` |
| `cart.discountCode` | First/single discount code | `"SAVE10"` |
| `cart.discountCodes` | All discount codes | `"SAVE10, EXTRA"` |
| `cart.couponCount` | Number of coupons applied | `"1"` |

### Cart financial totals

| Attribute value | Description | Example output |
|-----------------|-------------|----------------|
| `cart.subtotal` | Subtotal (before shipping/tax) | `"$89.99"` |
| `cart.subtotal` + `data-include-discounts` | Subtotal after discount codes | `"$80.99"` |
| `cart.total` | Cart total | `"$99.99"` |
| `cart.totalExclShipping` | Total excluding shipping | `"$94.99"` |
| `cart.shipping` | Shipping cost | `"$5.00"` |
| `cart.discounts` | Discount amount from coupons | `"-$9.00"` |
| `cart.savingsAmount` | Savings (retail only, no coupons) | `"$20.00"` |
| `cart.savingsPercentage` | Savings % (retail only) | `"25%"` |
| `cart.totalSavingsAmount` | Total savings (retail + coupons) | `"$29.00"` |
| `cart.totalSavingsPercentage` | Total savings % | `"30%"` |
| `cart.compareTotal` | Compare-at total | `"$119.99"` |

### Cart raw values (for calculations)

Append `.raw` for unformatted numbers. Use in expressions or with `data-format`.

| Attribute value | Description |
|-----------------|-------------|
| `cart.subtotal.raw` | Numeric subtotal |
| `cart.subtotal.raw` + `data-include-discounts` | Numeric subtotal with discounts |
| `cart.total.raw` | Numeric total |
| `cart.totalExclShipping.raw` | Numeric total excluding shipping |
| `cart.shipping.raw` | Numeric shipping |
| `cart.discounts.raw` | Numeric discount amount |
| `cart.savingsAmount.raw` | Numeric savings |
| `cart.compareTotal.raw` | Numeric compare total |

### Per-item quantity (cart context)

| Attribute value | Description | Example |
|-----------------|-------------|---------|
| `cart.items[2].quantity` | Quantity of package ID 2 in cart | `"2"` |

---

## 2. Cart container / behavior attributes

Used on the cart items list container or on elements that affect how cart data is shown.

| Attribute | Description | Example |
|-----------|-------------|---------|
| `data-next-cart-items` | Container where cart line items are rendered | On wrapper `<div>` |
| `data-item-template-id` | ID of `<template>` used for each item | `"cart-item-template"` |
| `data-item-template-selector` | CSS selector for template node | `"#custom-template"` |
| `data-item-template` | Inline HTML template string | `'<div>{item.name}</div>'` |
| `data-empty-template` | HTML when cart is empty | `'<p>Your cart is empty</p>'` |
| `data-title-map` | JSON: package ID → custom title | `'{"2": "Premium", "3": "Starter"}'` |
| `data-group-items` | Group identical items (same packageId) into one line | Present = on |
| `data-include-discounts` | With `cart.subtotal`: include discount codes in subtotal | On same element as `data-next-display="cart.subtotal"` |

---

## 3. Cart conditional attributes

Show/hide blocks based on cart state. Use with `data-next-show` or `data-next-hide`.

### Expressions

| Expression | When true (for show) / when to hide |
|------------|--------------------------------------|
| `cart.isEmpty` | Cart has no items |
| `cart.hasItems` | Cart has at least one item |
| `cart.hasItem(2)` | Package ID 2 is in cart (use your package ID) |
| `cart.hasSavings` | Cart has retail savings |
| `cart.hasCoupon` | A discount code is applied |
| `cart.total > 50` | Cart total greater than 50 (use `.raw` for numeric compare) |
| `cart.total >= 100` | Cart total ≥ 100 |
| `cart.total < 100` | Cart total &lt; 100 |
| `cart.shipping > 0` | Shipping cost &gt; 0 |
| `cart.quantity >= 3` | Total quantity ≥ 3 |
| `cart.total.raw > 0` | Numeric total &gt; 0 |

### Attribute

- **`data-next-show="…"`** – element is shown when the expression is true.
- **`data-next-hide="…"`** – element is hidden when the expression is true.

---

## 4. Cart formatting / display options

Use on the same element as `data-next-display` (or parent) where noted.

| Attribute | Description | Example |
|-----------|-------------|---------|
| `data-format` | Output format | `currency`, `number`, `integer`, `percentage` |
| `data-hide-zero-cents` | Hide `.00` for whole numbers | `"true"` → `$99` instead of `$99.00` |
| `data-hide-if-zero` | Hide element when displayed value is 0 | `"true"` |
| `data-hide-if-false` | Hide element when value is false | `"true"` |
| `data-divide-by` | Divide displayed value | `"2"` |
| `data-multiply-by` | Multiply displayed value | `"0.1"` |

---

## 5. Item template variables (`{item.*}`)

Used inside the template referenced by `data-next-cart-items` (e.g. in a `<template>` or `data-item-template` string). Replace `{item.xyz}` with the value for each cart line.

### Basic item

| Variable | Description | Example |
|----------|-------------|---------|
| `{item.id}` | Unique cart item ID | Auto-generated |
| `{item.packageId}` | Package/product ID | `"123"` |
| `{item.name}` | Product/package name | `"Grounded Sheets"` |
| `{item.title}` | Alias for name | Same as name |
| `{item.quantity}` | Quantity in cart | `"2"` |
| `{item.image}` | Product image URL | `"https://..."` |
| `{item.sku}` | Product SKU/external ID | `"GRS-001"` |
| `{item.frequency}` | Purchase frequency | `"One time"` / `"Every month"` |

### Product & variant

| Variable | Description | Example |
|----------|-------------|---------|
| `{item.productId}` | Base product ID | Auto-generated |
| `{item.productName}` | Base product name | `"Grounded Sheets"` |
| `{item.variantId}` | Variant ID | Auto-generated |
| `{item.variantName}` | Full variant name | `"Grounded Sheets - Obsidian Grey / Twin"` |
| `{item.variantSku}` | Variant SKU | `"BE-GRS-TWN-GR"` |
| `{item.variantAttributes}` | Raw array (e.g. for JSON) | — |
| `{item.variantAttributesFormatted}` | Comma-separated string | `"Color: Obsidian Grey, Size: Twin"` |
| `{item.variantAttributesList}` | HTML spans | `<span class="variant-attr">...</span>` |
| `{item.variantColor}` | Color (dynamic by attribute code) | `"Obsidian Grey"` |
| `{item.variantSize}` | Size (dynamic by attribute code) | `"Twin"` |
| `{item.variant.color}` | Color (dot notation) | Same |
| `{item.variant.size}` | Size (dot notation) | Same |
| `{item.variant_color}` | Color (underscore) | Same |
| `{item.variant_size}` | Size (underscore) | Same |

### Pricing

| Variable | Description | Type |
|----------|-------------|------|
| `{item.price}` | Package price | Currency |
| `{item.unitPrice}` | Price per unit | Currency |
| `{item.comparePrice}` | Original package price | Currency |
| `{item.unitComparePrice}` | Original unit price | Currency |
| `{item.lineTotal}` | price × quantity | Currency |
| `{item.lineCompare}` | Original line total | Currency |
| `{item.recurringPrice}` | Recurring price (subscription) | Currency |

### Savings

| Variable | Description | Type |
|----------|-------------|------|
| `{item.savingsAmount}` | Total savings (retail) | Currency |
| `{item.unitSavings}` | Per-unit savings | Currency |
| `{item.savingsPct}` | Savings percentage | e.g. `"50%"` |
| `{item.packageSavings}` | Package-level savings | Currency |
| `{item.packageSavingsPct}` | Package savings % | Percentage |

### Coupon discount

| Variable | Description | Type |
|----------|-------------|------|
| `{item.discountAmount}` | Coupon discount for this item | Currency |
| `{item.discountedPrice}` | Price after coupon | Currency |
| `{item.discountedLineTotal}` | Line total after coupon | Currency |
| `{item.hasDiscount}` | Has coupon discount | `"true"` / `"false"` |
| `{item.finalPrice}` | Final price to show | Currency |
| `{item.finalLineTotal}` | Final line total | Currency |

### Package details

| Variable | Description | Type |
|----------|-------------|------|
| `{item.packagePrice}` | Base package price | Currency |
| `{item.packagePriceTotal}` | Package total price | Currency |
| `{item.packageRetailPrice}` | Package retail price | Currency |
| `{item.packageRetailTotal}` | Package retail total | Currency |
| `{item.packageQty}` | Quantity in package | Number |

### Conditional classes (use as class names)

| Variable | Value | Use when |
|----------|--------|----------|
| `{item.showCompare}` | `"show"` or `"hide"` | Compare price exists |
| `{item.showSavings}` | `"show"` or `"hide"` | Has savings |
| `{item.showRecurring}` | `"show"` or `"hide"` | Recurring product |
| `{item.showUnitPrice}` | `"show"` or `"hide"` | Multi-unit package |
| `{item.showDiscount}` | `"show"` or `"hide"` | Coupon applied |
| `{item.showOriginalPrice}` | `"show"` or `"hide"` | Price is discounted |
| `{item.hasSavings}` | `"true"` or `"false"` | Boolean |
| `{item.isRecurring}` | `"true"` or `"false"` | Boolean |

### Item raw values (calculations)

| Variable | Description |
|----------|-------------|
| `{item.price.raw}` | Numeric price |
| `{item.unitPrice.raw}` | Numeric unit price |
| `{item.lineTotal.raw}` | Numeric line total |
| `{item.savingsAmount.raw}` | Numeric savings |
| `{item.savingsPct.raw}` | Numeric percentage |
| `{item.discountAmount.raw}` | Numeric discount |
| `{item.discountedPrice.raw}` | Numeric discounted price |
| `{item.discountedLineTotal.raw}` | Numeric discounted line total |
| `{item.finalPrice.raw}` | Numeric final price |
| `{item.finalLineTotal.raw}` | Numeric final line total |

---

## 6. Item action attributes (inside item template or on item-specific controls)

Use on buttons/links that change quantity or remove a line. Pair with `data-package-id` (or `data-package-id="{item.packageId}"` in templates).

| Attribute | Description | Example |
|-----------|-------------|---------|
| `data-next-quantity` | Change quantity | `"increase"` or `"decrease"` |
| `data-next-remove-item` | Remove this package from cart | No value |
| `data-package-id` | Package ID for the action | `"123"` or `"{item.packageId}"` |
| `data-cart-item-id` | Optional: cart line ID (in template) | `"{item.id}"` |

---

## 7. Full cart summary example (checkout UI)

Use this example as a starting point for a full checkout/cart summary UI that wires up **all cart and item attributes** listed above.

```html
<!--
  Summary cart example using all possible cart data attributes.
  Use as reference for checkout / cart display. SDK binds and updates these automatically.
-->
<div class="cart-summary" data-next-show="cart.hasItems">
  <h3>Cart Summary</h3>

  <!-- ========== CART STATUS (display) ========== -->
  <div class="cart-stats">
    <p>Empty: <span data-next-display="cart.isEmpty">false</span></p>
    <p>Has items: <span data-next-display="cart.hasItems">true</span></p>
    <p>Item count: <span data-next-display="cart.itemCount" data-format="integer">0</span></p>
    <p>Total quantity: <span data-next-display="cart.quantity" data-format="integer">0</span></p>
    <p>Count (alias): <span data-next-display="cart.count" data-format="integer">0</span></p>
    <p>Discount code: <span data-next-display="cart.discountCode">-</span></p>
    <p>Discount codes: <span data-next-display="cart.discountCodes">-</span></p>
    <p>Coupons applied: <span data-next-display="cart.couponCount" data-format="integer">0</span></p>
  </div>

  <!-- ========== CART ITEMS (renderer with all template options) ========== -->
  <template id="cart-item-full-template">
    <div class="cart-item" data-cart-item-id="{item.id}" data-package-id="{item.packageId}">
      <img src="{item.image}" alt="{item.name}">
      <h4>{item.name}</h4>
      <p>{item.productName} – {item.variantName}</p>
      <p>SKU: {item.sku} / {item.variantSku}</p>
      <p>{item.variantAttributesFormatted}</p>
      <p>Color: {item.variantColor} | Size: {item.variantSize}</p>
      <p>Frequency: {item.frequency}</p>
      <p class="price">{item.price} × {item.quantity} = {item.lineTotal}</p>
      <p class="unit">{item.unitPrice} each</p>
      <s class="{item.showCompare}">{item.comparePrice}</s>
      <span class="{item.showSavings}">Save {item.savingsAmount} ({item.savingsPct})</span>
      <span class="{item.showDiscount}">Coupon: -{item.discountAmount}</span>
      <span class="{item.showOriginalPrice}"><s>{item.price}</s> → {item.finalPrice}</span>
      <span class="{item.showRecurring}">{item.recurringPrice}</span>
      <p>Final line: {item.finalLineTotal}</p>
      <p>Package: {item.packagePrice} / {item.packageRetailPrice} (qty {item.packageQty})</p>
      <button data-next-quantity="decrease" data-package-id="{item.packageId}">−</button>
      <span>{item.quantity}</span>
      <button data-next-quantity="increase" data-package-id="{item.packageId}">+</button>
      <button data-next-remove-item data-package-id="{item.packageId}">Remove</button>
    </div>
  </template>

  <div data-next-cart-items
       data-item-template-id="cart-item-full-template"
       data-empty-template='<p class="empty-msg">Your cart is empty</p>'
       data-title-map='{"2": "Premium Package", "3": "Starter Kit"}'
       data-group-items
       class="cart-items-list">
  </div>

  <!-- ========== CART TOTALS (all financial paths) ========== -->
  <div class="cart-totals">
    <div class="line-item">
      <span>Subtotal:</span>
      <span data-next-display="cart.subtotal">$0.00</span>
    </div>
    <div class="line-item">
      <span>Subtotal (with discounts):</span>
      <span data-next-display="cart.subtotal" data-include-discounts>$0.00</span>
    </div>
    <div class="line-item" data-next-show="cart.shipping > 0">
      <span>Shipping:</span>
      <span data-next-display="cart.shipping" data-hide-if-zero="true">$0.00</span>
    </div>
    <div class="line-item" data-next-show="cart.hasCoupon">
      <span>Discount (<span data-next-display="cart.discountCode">-</span>):</span>
      <span data-next-display="cart.discounts">-$0.00</span>
    </div>
    <div class="line-item total">
      <span>Total:</span>
      <span data-next-display="cart.total" data-format="currency">$0.00</span>
    </div>
    <div class="line-item">
      <span>Total (excl. shipping):</span>
      <span data-next-display="cart.totalExclShipping">$0.00</span>
    </div>
    <div class="line-item" data-next-show="cart.hasSavings">
      <span>Savings (retail):</span>
      <span data-next-display="cart.savingsAmount">$0.00</span>
      <span data-next-display="cart.savingsPercentage" data-format="percentage">0%</span>
    </div>
    <div class="line-item" data-next-show="cart.hasSavings || cart.hasCoupon">
      <span>Total savings:</span>
      <span data-next-display="cart.totalSavingsAmount">$0.00</span>
      <span data-next-display="cart.totalSavingsPercentage" data-format="percentage">0%</span>
    </div>
    <div class="line-item">
      <span>Compare-at total:</span>
      <span data-next-display="cart.compareTotal">$0.00</span>
    </div>
  </div>

  <!-- ========== RAW VALUES (for calculations) ========== -->
  <div class="cart-raw" style="font-size: 0.85em; color: #666;">
    <span data-next-display="cart.subtotal.raw">0</span> |
    <span data-next-display="cart.subtotal.raw" data-include-discounts>0</span> |
    <span data-next-display="cart.total.raw">0</span> |
    <span data-next-display="cart.totalExclShipping.raw">0</span> |
    <span data-next-display="cart.shipping.raw">0</span> |
    <span data-next-display="cart.discounts.raw">0</span> |
    <span data-next-display="cart.savingsAmount.raw">0</span> |
    <span data-next-display="cart.compareTotal.raw">0</span>
  </div>

  <!-- ========== MATH EXAMPLE (e.g. 10% tip) ========== -->
  <div class="cart-math" data-next-show="cart.total.raw > 0">
    10% tip: $<span data-next-display="cart.total.raw * 0.1" data-format="currency">0.00</span>
    (divide-by-2: <span data-divide-by="2" data-next-display="cart.total">$0.00</span>)
  </div>

  <!-- ========== CONDITIONALS (show/hide) ========== -->
  <div data-next-show="cart.isEmpty" class="empty-cart">
    <p>Your cart is empty</p>
    <a href="/shop">Continue Shopping</a>
  </div>
  <div data-next-show="cart.hasItem(2)">
    <p>Package 2 is in the cart.</p>
  </div>
  <div data-next-show="cart.total > 50">
    <p>Order over $50 – free shipping unlocked.</p>
  </div>
  <div data-next-show="cart.total >= 100">
    <p class="free-shipping">✓ You qualify for free shipping!</p>
  </div>
  <div data-next-hide="cart.isEmpty">
    <button type="button">Proceed to Checkout</button>
  </div>

  <!-- ========== FREE SHIPPING THRESHOLD ========== -->
  <div class="shipping-threshold">
    <div data-next-show="cart.total < 100">
      <p>Add $<span data-next-display="100 - cart.total.raw">0</span> more for free shipping!</p>
    </div>
    <div data-next-show="cart.total >= 100">
      <p>✓ Free shipping!</p>
    </div>
  </div>

  <!-- ========== FORMATTING OPTIONS ========== -->
  <div class="formatting-demos">
    <span data-next-display="cart.total" data-format="currency">$0.00</span>
    <span data-next-display="cart.total.raw" data-format="number">0.00</span>
    <span data-next-display="cart.itemCount" data-format="integer">0</span>
    <span data-next-display="cart.total" data-format="currency" data-hide-zero-cents="true">$0</span>
    <div data-next-display="cart.shipping" data-hide-if-zero="true">Shipping: $0.00</div>
    <div data-next-display="cart.hasItems" data-hide-if-false="true">Cart has items</div>
  </div>
</div>

<!-- Show when cart is empty (inverse of above) -->
<div class="cart-empty-state" data-next-show="cart.isEmpty">
  <p>Your cart is empty</p>
  <a href="/shop">Continue Shopping</a>
</div>
```
