---
title: Cart Summary
---

The Cart Summary displays the cart totals — subtotal, discounts, shipping, tax, and grand total — and updates automatically whenever the cart changes. Drop it anywhere on the page: a sidebar, a sticky footer, or an order review step.

## What You're Building

- A live price breakdown that re-renders when items are added, removed, or discounts change
- Optional custom layout with your own markup
- Conditional rows that appear only when relevant (e.g. a discount row only when a coupon is active)
- An itemised line list with per-item pricing

## Step 1: Minimal Setup

One attribute is all you need. The enhancer renders a built-in Subtotal / Discounts / Shipping / Total layout:

```html
<div data-next-cart-summary></div>
```

The built-in template only shows the discount row when discounts are greater than zero, and omits the tax row when tax is zero. No extra configuration needed.

## Step 2: Custom Template

Place a `<template>` inside the container to replace the default layout with your own markup. Use `{variable}` placeholders for dynamic values.

```html
<div data-next-cart-summary>
  <template>
    <div class="summary-row">
      <span>Subtotal</span>
      <span>{subtotal}</span>
    </div>
    <div class="summary-row discount-row">
      <span>Discounts</span>
      <span>−{discounts}</span>
    </div>
    <div class="summary-row">
      <span>Shipping</span>
      <span>{shipping}</span>
    </div>
    <div class="summary-row total-row">
      <span>Total</span>
      <span>{total}</span>
    </div>
  </template>
</div>
```

### Available Template Variables

| Variable | Description |
|----------|-------------|
| `{subtotal}` | Subtotal before shipping and discounts |
| `{total}` | Grand total |
| `{shipping}` | Shipping cost (formatted, or "Free" when zero) |
| `{shippingOriginal}` | Original shipping before any shipping discount (empty if none) |
| `{tax}` | Tax amount |
| `{discounts}` | Total discount amount (offers + vouchers combined) |
| `{savings}` | Total savings: retail (compare-at minus price) + applied discounts |
| `{compareTotal}` | Compare-at total (before savings) |
| `{itemCount}` | Number of items in cart |

## Step 3: Conditional Rows with CSS Classes

The enhancer applies state classes to the container element. Use them to show or hide rows with CSS instead of writing JavaScript.

```html
<div data-next-cart-summary>
  <template>
    <div class="row"><span>Subtotal</span><span>{subtotal}</span></div>
    <div class="row row-discounts"><span>Discounts</span><span>−{discounts}</span></div>
    <div class="row row-shipping-discount">
      <span>Shipping</span>
      <del>{shippingOriginal}</del>
      <span>{shipping}</span>
    </div>
    <div class="row row-shipping-free"><span>Shipping</span><span>Free</span></div>
    <div class="row row-tax"><span>Tax</span><span>{tax}</span></div>
    <div class="row row-total"><span>Total</span><span>{total}</span></div>
  </template>
</div>

<style>
  /* Hide these rows by default */
  .row-discounts,
  .row-shipping-discount,
  .row-tax { display: none }

  /* Show when state classes are present */
  .next-has-discounts .row-discounts    { display: flex }
  .next-has-shipping-discount .row-shipping-discount { display: flex }
  .next-has-shipping .row-shipping-free { display: none }
  .next-free-shipping .row-shipping-free { display: flex }
  .next-has-tax .row-tax               { display: flex }
</style>
```

### State Classes Reference

| Class | When applied |
|-------|-------------|
| `next-cart-empty` | Cart has no items |
| `next-cart-has-items` | Cart has one or more items |
| `next-has-discounts` | Discount amount > 0 |
| `next-no-discounts` | Discount amount = 0 |
| `next-has-shipping` | Shipping cost > 0 |
| `next-free-shipping` | Shipping cost = 0 |
| `next-has-shipping-discount` | A shipping discount is applied |
| `next-no-shipping-discount` | No shipping discount |
| `next-has-tax` | Tax > 0 |
| `next-no-tax` | Tax = 0 |
| `next-has-savings` | Retail or discount savings available |
| `next-no-savings` | No savings |

## Step 4: Itemised Line List

Show a breakdown of each cart line — useful for an order review section. Add a `[data-summary-lines]` container inside your template with a `<template>` child for the row markup.

```html
<div data-next-cart-summary>
  <template>
    <ul class="line-items" data-summary-lines>
      <template>
        <li class="line-item">
          <img src="{line.image}" alt="{line.name}" />
          <div class="line-info">
            <strong>{line.name}</strong>
            <span>{line.variantName}</span>
          </div>
          <div class="line-pricing">
            <span>{line.qty} × {line.unitPrice}</span>
            <strong>{line.total}</strong>
          </div>
        </li>
      </template>
    </ul>

    <div class="summary-row"><span>Subtotal</span><span>{subtotal}</span></div>
    <div class="summary-row"><span>Shipping</span><span>{shipping}</span></div>
    <div class="summary-row total-row"><span>Total</span><span>{total}</span></div>
  </template>
</div>
```

### Line Item Variables

| Variable | Description |
|----------|-------------|
| `{line.name}` | Package display name |
| `{line.image}` | Product image URL |
| `{line.productName}` | Product name |
| `{line.variantName}` | Variant name (e.g. "Black / Large") |
| `{line.qty}` | Quantity |
| `{line.unitPrice}` | Unit price after discounts |
| `{line.originalUnitPrice}` | Unit price before discounts |
| `{line.packagePrice}` | Package total after discounts |
| `{line.originalPackagePrice}` | Package total before discounts |
| `{line.total}` | Line total after all discounts |
| `{line.totalDiscount}` | Total discount on this line |
| `{line.hasDiscount}` | `"show"` or `"hide"` |
| `{line.hasSavings}` | `"show"` or `"hide"` |
| `{line.priceRetail}` | Retail (compare-at) unit price |
| `{line.isRecurring}` | `"true"` or `"false"` |
| `{line.sku}` | Product SKU |

## Step 5: Discount Breakdowns

Show applied offer discounts and coupon codes as separate line items. Add list containers inside your template:

```html
<div data-next-cart-summary>
  <template>
    <div class="row"><span>Subtotal</span><span>{subtotal}</span></div>

    <!-- Offer discounts (e.g. "Buy 2 get 10% off") -->
    <ul data-summary-offer-discounts>
      <template>
        <li class="discount-item">
          <span>{discount.name}</span>
          <span>−{discount.amount}</span>
        </li>
      </template>
    </ul>

    <!-- Applied coupon codes -->
    <ul data-summary-voucher-discounts>
      <template>
        <li class="discount-item coupon">
          <span>{discount.name}</span>
          <span>−{discount.amount}</span>
        </li>
      </template>
    </ul>

    <div class="row"><span>Shipping</span><span>{shipping}</span></div>
    <div class="row total-row"><span>Total</span><span>{total}</span></div>
  </template>
</div>
```

Discount item variables: `{discount.name}`, `{discount.amount}`, `{discount.description}`.

## Full Example

A complete order review summary with line items, discount list, and conditional shipping row:

```html
<div class="order-summary" data-next-cart-summary>
  <template>
    <h3>Order Summary</h3>
    <p class="item-count">{itemCount} item(s)</p>

    <ul class="line-items" data-summary-lines>
      <template>
        <li class="line-item">
          <img src="{line.image}" alt="{line.name}" />
          <div class="line-info">
            <strong>{line.name}</strong>
            <span class="variant">{line.variantName}</span>
          </div>
          <div class="line-price">
            <span>{line.qty} × {line.unitPrice}</span>
            <strong>{line.total}</strong>
          </div>
        </li>
      </template>
    </ul>

    <div class="divider"></div>

    <div class="summary-row"><span>Subtotal</span><span>{subtotal}</span></div>

    <ul class="discounts" data-summary-offer-discounts>
      <template>
        <li><span class="discount-name">{discount.name}</span><span>−{discount.amount}</span></li>
      </template>
    </ul>

    <ul class="discounts" data-summary-voucher-discounts>
      <template>
        <li><span class="coupon-name">{discount.name}</span><span>−{discount.amount}</span></li>
      </template>
    </ul>

    <div class="summary-row shipping-row">
      <span>Shipping</span>
      <span>{shipping}</span>
    </div>

    <div class="divider"></div>

    <div class="summary-row total-row">
      <span>Total</span>
      <strong>{total}</strong>
    </div>

    <div class="summary-row savings-row">
      <span>You save</span>
      <span class="savings-amount">{savings}</span>
    </div>
  </template>
</div>

<style>
  .order-summary {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 1.5rem;
  }
  .line-items { list-style: none; padding: 0; margin: 0 0 1rem }
  .line-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
  }
  .line-item img { width: 48px; height: 48px; object-fit: cover; border-radius: 4px }
  .line-info { flex: 1 }
  .variant { color: #6b7280; font-size: 0.85rem }
  .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 0.35rem 0;
  }
  .total-row { font-size: 1.1rem; font-weight: 700 }
  .divider { border-top: 1px solid #e5e7eb; margin: 0.75rem 0 }
  .discounts { list-style: none; padding: 0; color: #16a34a }
  .discounts li { display: flex; justify-content: space-between }

  /* Hide savings row when there are none */
  .next-no-savings .savings-row { display: none }
  .savings-amount { color: #16a34a }
</style>
```
