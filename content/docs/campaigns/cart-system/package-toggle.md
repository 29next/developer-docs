---
title: Package Toggle
sidebar_label: Package Toggle
---

The Package Toggle lets visitors independently add or remove individual packages — add-ons, insurance, warranties, upgrades, or any optional item. Unlike the Package Selector (pick one), any number of toggles can be active at the same time.

## How It Works

1. Add `data-next-package-toggle` to a container and place `[data-next-toggle-card]` children with `data-next-package-id`
2. Clicking a card that is **not** in the cart adds it; clicking one that **is** in the cart removes it
3. Mark a card `data-next-selected="true"` to auto-add it on page load (deduped across page refreshes)
4. Backend prices are fetched in full cart context so offer conditions (e.g. "spend $100 get 20% off") are reflected

## Activation

```html
<div data-next-package-toggle>
  <!-- toggle cards go here -->
</div>
```

## Container Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-next-package-toggle` | — | Marks the container (or the toggle element itself in single-element mode) |
| `data-next-include-shipping` | `true` \| `false` | Include shipping in price totals shown via `data-next-toggle-price` |
| `data-next-packages` | JSON array | Package definitions for auto-render mode (see below) |
| `data-next-toggle-template-id` | element ID | ID of a `<template>` element whose `innerHTML` is the card template |
| `data-next-toggle-template` | HTML string | Inline card template alternative to `data-next-toggle-template-id` |

## Card Attributes

| Attribute | Description |
|-----------|-------------|
| `data-next-toggle-card` | Marks an element as a toggleable card |
| `data-next-package-id` | Package `ref_id` (required per card) |
| `data-next-selected="true"` | Auto-adds this package on page load |
| `data-next-quantity` | Quantity to add (default `1`) |
| `data-next-package-sync` | Comma-separated list of package IDs — quantity mirrors the sum of those packages in the cart |
| `data-next-is-upsell="true"` | Marks the item as an upsell/bump for order tracking |
| `data-add-text` | Button text shown when package is **not** in the cart |
| `data-remove-text` | Button text shown when package **is** in the cart |

## Displaying Package Images

Add `data-next-toggle-image` to any `<img>` inside a card. The enhancer sets its `src` (and `alt`, if blank) from the campaign package data automatically.

```html
<div data-next-toggle-card data-next-package-id="201">
  <img data-next-toggle-image alt="Warranty" />
  <span>2-Year Warranty</span>
</div>
```

## Displaying Backend Prices

Place `[data-next-toggle-price]` inside a card or its template. Prices are calculated with the full current cart as context so offer discounts that depend on cart total are correctly reflected.

```html
<span data-next-toggle-price></span>                    <!-- total (default) -->
<span data-next-toggle-price="subtotal"></span>
<span data-next-toggle-price="compare"></span>          <!-- compare-at / retail price -->
<span data-next-toggle-price="savings"></span>
<span data-next-toggle-price="savingsPercentage"></span>
```

Prices for in-cart items are read directly from the cart summary (no extra API call). Prices for not-in-cart items are fetched via `/calculate` with the item simulated in the cart. A `next-loading` class and `data-next-loading="true"` are set on the card during fetches.

## CSS Classes

| Class | Applied to | When |
|-------|-----------|------|
| `next-toggle-card` | Each registered card | Always (on registration) |
| `next-in-cart` | A card | The package is in the cart |
| `next-not-in-cart` | A card | The package is not in the cart |
| `next-selected` | A card | Alias for `next-in-cart` |
| `next-active` | A card | Alias for `next-in-cart` |
| `next-loading` | A card | During an async cart operation |

The same classes are also set on the card's nearest **state container** (see [State Containers](#state-containers)).

## Events

| Event | Payload | When |
|-------|---------|------|
| `toggle:toggled` | `{ packageId, added }` | A card is clicked |
| `toggle:selection-changed` | `{ selected: number[] }` | Cart sync updates the active set |

---

## Basic Example

```html
<div data-next-package-toggle>

  <div data-next-toggle-card
       data-next-package-id="201"
       data-add-text="Add Warranty"
       data-remove-text="✓ Warranty Added">
    2-Year Warranty
    <span data-next-toggle-price></span>
  </div>

  <div data-next-toggle-card
       data-next-package-id="202"
       data-next-selected="true"
       data-add-text="Add Insurance"
       data-remove-text="✓ Insurance Added">
    Shipping Insurance
    <span data-next-toggle-price></span>
    <del data-next-toggle-price="compare"></del>
  </div>

</div>
```

---

## Single-Element Toggle

Place `data-next-package-toggle` directly on a button or any single element when no card container is needed.

```html
<button data-next-package-toggle
        data-next-package-id="201"
        data-add-text="Add Warranty — $9.99"
        data-remove-text="✓ Warranty Added">
  Add Warranty — $9.99
</button>
```

The element acts as both the container and the card. All state classes (`next-in-cart`, `next-not-in-cart`, etc.) are applied directly to it. In single-element mode, the element's `textContent` is replaced directly with the add/remove text. In card mode, add a `[data-next-button-text]` child element to scope the text update:

```html
<div data-next-toggle-card
     data-next-package-id="201"
     data-add-text="Add Warranty"
     data-remove-text="✓ Added">
  <img data-next-toggle-image />
  <span data-next-button-text>Add Warranty</span>
</div>
```

---

## Auto-Render Mode

Provide a JSON array via `data-next-packages` and a card template via `data-next-toggle-template-id`. The enhancer renders one card per definition, enriching template variables with campaign package data.

### Package Definition Format

```json
[
  { "packageId": 201, "label": "2-Year Warranty" },
  { "packageId": 202, "label": "Shipping Insurance", "selected": true }
]
```

Set `"selected": true` to auto-add that package on load. Any field is available as `{toggle.<fieldName>}` in the template.

### Template Variables

| Variable | Source | Description |
|----------|--------|-------------|
| `{toggle.packageId}` | JSON / campaign | Package `ref_id` |
| `{toggle.name}` | Campaign store | Package name |
| `{toggle.image}` | Campaign store | Package image URL |
| `{toggle.price}` | Campaign store | Per-unit price |
| `{toggle.priceRetail}` | Campaign store | Retail/compare-at price |
| `{toggle.priceRetailTotal}` | Campaign store | Retail total price |
| `{toggle.<anyField>}` | JSON | Any other field from the definition |

### Example

```html
<div data-next-package-toggle
     data-next-packages='[
       {"packageId":201,"label":"2-Year Warranty"},
       {"packageId":202,"label":"Shipping Insurance","selected":true}
     ]'
     data-next-toggle-template-id="toggle-tpl">
</div>

<template id="toggle-tpl">
  <div data-next-toggle-card
       data-add-text="Add {toggle.label}"
       data-remove-text="✓ {toggle.label} Added">
    <strong>{toggle.label}</strong>
    <span data-next-toggle-price></span>
    <del data-next-toggle-price="compare"></del>
  </div>
</template>
```

---

## Quantity Sync

Use `data-next-package-sync` when the add-on quantity should automatically mirror the main product quantity — for example one warranty unit per product unit.

```html
<!-- Main product selector (packages 10, 11, 12 represent 1-, 3-, and 6-bottle options) -->
<div data-next-package-selector data-next-selector-id="qty-picker">
  <div data-next-selector-card data-next-package-id="10" data-next-selected="true">1 Bottle</div>
  <div data-next-selector-card data-next-package-id="11">3 Bottles</div>
  <div data-next-selector-card data-next-package-id="12">6 Bottles</div>
</div>

<!-- Warranty auto-syncs its quantity to match packages 10, 11, or 12 in the cart -->
<div data-next-package-toggle>
  <div data-next-toggle-card
       data-next-package-id="201"
       data-next-package-sync="10,11,12">
    Add Warranty (quantity matches your order)
    <span data-next-toggle-price></span>
  </div>
</div>
```

`data-next-package-sync` accepts a comma-separated list of package IDs. The toggle card's quantity is set to the **sum of quantities** of those packages currently in the cart. When all synced packages are removed, the toggle item is automatically removed too.

---

## State Containers

The enhancer walks up the DOM from each card looking for a wrapper element that should receive state classes. This lets you style an outer container rather than the card itself.

State container detection checks these attributes/classes in order:

- `data-next-toggle-container`
- `data-next-bump`
- `data-next-upsell-item`
- `.upsell` or `.bump` CSS classes

If none is found, the card element itself is the state container. The following attributes and classes are applied to the state container:

```
data-in-cart="true|false"
data-next-active="true|false"
.next-in-cart  /  .next-not-in-cart
.next-active
```

---

## Listening to Toggle Events

```javascript
window.nextReady.push(() => {
  window.next.on('toggle:toggled', ({ packageId, added }) => {
    console.log(added ? 'Added:' : 'Removed:', packageId);
  });

  window.next.on('toggle:selection-changed', ({ selected }) => {
    console.log('Active packages:', selected);
  });
});
```
