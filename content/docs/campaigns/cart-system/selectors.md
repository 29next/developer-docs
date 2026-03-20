---
title: Package Selector
sidebar_label: Package Selector
---

The Package Selector lets visitors pick exactly one package from a set of cards. When a card is clicked in **swap** mode the cart is updated immediately. In **select** mode the selector only tracks the choice — an external add-to-cart button handles the cart write.

## How It Works

1. Add `data-next-package-selector` to a container and `data-next-selector-id` to give it a name
2. Place child cards with `data-next-selector-card` and `data-next-package-id`
3. Mark one card `data-next-selected="true"` to pre-select it on load
4. In **swap** mode the pre-selected package is auto-added to the cart on init; switching cards swaps the item
5. In **select** mode wire up an `AddToCartEnhancer` button using the same `data-next-selector-id`

## Activation

```html
<div data-next-package-selector data-next-selector-id="main-product">
  <!-- cards go here -->
</div>
```

## Container Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-next-package-selector` | — | Marks the container; required to activate the enhancer |
| `data-next-selector-id` | string | ID used by `AddToCartEnhancer` to read the current selection |
| `data-next-selection-mode` | `swap` (default) \| `select` | `swap` immediately writes to cart; `select` only tracks selection |
| `data-next-include-shipping` | `true` \| `false` | Include shipping in price totals shown via `data-next-package-price` |
| `data-next-packages` | JSON array | Package definitions for auto-render mode (see below) |
| `data-next-package-template-id` | element ID | ID of a `<template>` element whose `innerHTML` is the card template |
| `data-next-package-template` | HTML string | Inline card template alternative to `data-next-package-template-id` |

## Card Attributes

| Attribute | Description |
|-----------|-------------|
| `data-next-selector-card` | Marks an element as a selectable card |
| `data-next-package-id` | Package `ref_id` (required per card) |
| `data-next-selected="true"` | Pre-selects this card on init |
| `data-next-quantity` | Initial quantity (default `1`) |
| `data-next-min-quantity` | Minimum quantity for inline controls (default `1`) |
| `data-next-max-quantity` | Maximum quantity for inline controls (default `999`) |
| `data-next-shipping-id` | Shipping method ID to apply when this card is selected |

## Displaying Backend Prices

Place `[data-next-package-price]` elements inside a card or its template. The enhancer calls the `/calculate` API and populates them with formatted price values that reflect active offers and vouchers.

```html
<span data-next-package-price></span>                    <!-- total (default) -->
<span data-next-package-price="subtotal"></span>
<span data-next-package-price="compare"></span>          <!-- compare-at / retail total -->
<span data-next-package-price="savings"></span>
<span data-next-package-price="savingsPercentage"></span>
```

Prices are re-fetched automatically when applied vouchers or the active currency changes. A `next-loading` class and `data-next-loading="true"` attribute are set on the card during fetches.

## CSS Classes

| Class | Applied to | When |
|-------|-----------|------|
| `next-selector-card` | Each registered card | Always (on registration) |
| `next-selected` | A card | It is the currently selected card |
| `next-in-cart` | A card | Its package is present in the cart |

## Container Attribute Set by Enhancer

`data-selected-package="<packageId>"` — reflects the currently selected package ID on the container.

## Events

| Event | Payload | When |
|-------|---------|------|
| `selector:item-selected` | `{ selectorId, packageId, previousPackageId, mode }` | A card is clicked |
| `selector:selection-changed` | `{ selectorId, packageId, quantity, item }` | Internal selection state is updated |
| `selector:quantity-changed` | `{ selectorId, packageId, quantity }` | An inline quantity control is changed |

---

## Static Card Mode

Write cards directly in HTML — the simplest approach for a fixed set of options.

```html
<div data-next-package-selector
     data-next-selector-id="quantity-picker"
     data-next-selection-mode="swap">

  <div data-next-selector-card
       data-next-package-id="10"
       data-next-selected="true">
    <h3>1 Bottle</h3>
    <span data-next-package-price></span>
  </div>

  <div data-next-selector-card data-next-package-id="11">
    <h3>3 Bottles</h3>
    <span data-next-package-price></span>
    <del data-next-package-price="compare"></del>
    <span>Save <span data-next-package-price="savings"></span></span>
  </div>

  <div data-next-selector-card data-next-package-id="12">
    <h3>6 Bottles</h3>
    <span data-next-package-price></span>
    <del data-next-package-price="compare"></del>
  </div>

</div>
```

---

## Select Mode with Add-to-Cart Button

Use `data-next-selection-mode="select"` when a separate button should trigger the cart write. Link the button to the selector via `data-next-selector-id`.

```html
<div data-next-package-selector
     data-next-selector-id="product-picker"
     data-next-selection-mode="select">

  <div data-next-selector-card data-next-package-id="10" data-next-selected="true">
    Standard
  </div>
  <div data-next-selector-card data-next-package-id="11">
    Premium
  </div>

</div>

<button data-next-action="add-to-cart"
        data-next-selector-id="product-picker">
  Add to Cart
</button>
```

:::caution
Do not use swap mode on a selector that also feeds an `AddToCartEnhancer`. Clicking a card fires a cart write and the button fires another, resulting in a double cart write.
:::

---

## Auto-Render Mode

Provide a JSON array via `data-next-packages` and a card template via `data-next-package-template-id`. The enhancer renders one card per definition, enriching template variables with campaign package data.

### Package Definition Format

```json
[
  { "packageId": 10, "label": "1 Bottle", "selected": true },
  { "packageId": 11, "label": "3 Bottles", "badge": "Most Popular" },
  { "packageId": 12, "label": "6 Bottles", "badge": "Best Value" }
]
```

Any field is available as `{package.<fieldName>}` in the template. Set `"selected": true` to pre-select a card.

### Template Variables

| Variable | Source | Description |
|----------|--------|-------------|
| `{package.packageId}` | JSON / campaign | Package `ref_id` |
| `{package.name}` | Campaign store | Package name |
| `{package.image}` | Campaign store | Package image URL |
| `{package.price}` | Campaign store | Per-unit price |
| `{package.priceRetail}` | Campaign store | Retail/compare-at price |
| `{package.priceTotal}` | Campaign store | Total price (price × qty) |
| `{package.<anyField>}` | JSON | Any other field from the definition |

### Example

```html
<div data-next-package-selector
     data-next-selector-id="qty-picker"
     data-next-packages='[
       {"packageId":10,"label":"1 Bottle","selected":true},
       {"packageId":11,"label":"3 Bottles","badge":"Popular"},
       {"packageId":12,"label":"6 Bottles","badge":"Best Value"}
     ]'
     data-next-package-template-id="pkg-tpl">
</div>

<template id="pkg-tpl">
  <div data-next-selector-card>
    <span class="badge">{package.badge}</span>
    <h3>{package.label}</h3>
    <span data-next-package-price></span>
    <del data-next-package-price="compare"></del>
  </div>
</template>
```

---

## Inline Quantity Controls

Add `+`/`-` buttons inside a card to let visitors adjust quantity before adding. In swap mode the cart quantity updates immediately when the selected card's quantity changes.

```html
<div data-next-selector-card
     data-next-package-id="10"
     data-next-quantity="1"
     data-next-min-quantity="1"
     data-next-max-quantity="10">
  <h3>Product</h3>
  <button data-next-quantity-decrease>−</button>
  <span data-next-quantity-display>1</span>
  <button data-next-quantity-increase>+</button>
</div>
```

| Attribute | Description |
|-----------|-------------|
| `data-next-quantity-decrease` | Decrement button (disabled at min-quantity) |
| `data-next-quantity-increase` | Increment button (disabled at max-quantity) |
| `data-next-quantity-display` | Element that receives the current quantity as text |

Buttons receive a `next-disabled` class and the `disabled` attribute at their respective limits.

---

## Displaying Selection Data

Show information about the currently selected package in any element on the page:

```html
<span data-next-display="selection.product-picker.name">—</span>
<span data-next-display="selection.product-picker.price">$0</span>
```

---

## Listening to Selector Events

```javascript
window.nextReady.push(() => {
  window.next.on('selector:selection-changed', ({ selectorId, packageId, quantity }) => {
    console.log('Selected:', selectorId, packageId, quantity);
  });
});
```
