---
title: Bundle Selector
sidebar_label: Bundle Selector
---

The Bundle Selector lets you define named bundles — each bundle being a fixed set of packages and quantities — and lets visitors pick one. When a bundle is selected the enhancer atomically swaps the previous bundle's cart items for the new bundle's items while leaving any unrelated cart items untouched.

## How It Works

1. You define one or more **bundle cards**, each with a unique ID and a list of `{ packageId, quantity }` pairs
2. When the visitor clicks a card (in **swap** mode), the enhancer calls `cartStore.swapCart()` to atomically replace the previous bundle's packages with the new selection
3. Variant selectors within each card let the visitor configure color/size per slot, and the cart is updated accordingly
4. Backend prices are fetched via the `/calculate` API on init and re-fetched on variant or currency changes

## Activation

Add `data-next-bundle-selector` to a container element. The enhancer scans for child `[data-next-bundle-card]` elements and registers each one.

```html
<div data-next-bundle-selector>
  <!-- bundle cards go here -->
</div>
```

## Container Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-next-bundle-selector` | — | Marks the container; required to activate the enhancer |
| `data-next-selection-mode` | `swap` (default) \| `select` | `swap` immediately writes to cart; `select` only tracks selection (use with an external add-to-cart button) |
| `data-next-include-shipping` | `true` \| `false` | Include shipping in price totals shown via `data-next-bundle-price` |
| `data-next-bundles` | JSON array | Bundle definitions for auto-render mode (see below) |
| `data-next-bundle-template-id` | element ID | ID of an element whose `innerHTML` is the card template (auto-render mode) |
| `data-next-bundle-template` | HTML string | Inline card template alternative to `data-next-bundle-template-id` |
| `data-next-bundle-slot-template-id` | element ID | ID of an element whose `innerHTML` is rendered once per bundle item slot |
| `data-next-bundle-slot-template` | HTML string | Inline slot template alternative to `data-next-bundle-slot-template-id` |
| `data-next-variant-option-template-id` | element ID | ID of an element whose `innerHTML` is a single variant option (replaces default `<select>`) |

## Bundle Card Attributes

| Attribute | Description |
|-----------|-------------|
| `data-next-bundle-card` | Marks an element as a selectable bundle card |
| `data-next-bundle-id` | Unique string identifier for this bundle (required) |
| `data-next-bundle-items` | JSON array of `{ packageId, quantity, configurable?, noSlot? }` |
| `data-next-bundle-vouchers` | Comma-separated or JSON array of coupon codes applied when this bundle is selected |
| `data-next-selected="true"` | Pre-selects this card on init |

### Bundle Item Fields

| Field | Type | Description |
|-------|------|-------------|
| `packageId` | number | Campaign package `ref_id` |
| `quantity` | number | Quantity to add to cart |
| `configurable` | boolean | When `true` and `quantity > 1`, expands the item into individual per-unit slots each with their own variant selectors |
| `noSlot` | boolean | When `true`, no slot row is rendered for this item (useful for silent add-ons like free gifts) |

## Displaying Backend Prices

Place `[data-next-bundle-price]` inside a bundle card or its template. The enhancer calls the `/calculate` API and populates these elements with formatted price values.

```html
<span data-next-bundle-price></span>              <!-- total (default) -->
<span data-next-bundle-price="subtotal"></span>
<span data-next-bundle-price="compare"></span>    <!-- compare-at total -->
<span data-next-bundle-price="savings"></span>
<span data-next-bundle-price="savingsPercentage"></span>
```

Prices are re-fetched automatically when:
- A variant is changed on a slot
- Applied vouchers change
- The active currency changes

A `next-loading` class and `data-next-loading="true"` are set on the card element during price fetches.

## CSS Classes

| Class | Applied to | When |
|-------|-----------|------|
| `next-bundle-card` | Each registered card | Always (on registration) |
| `next-selected` | The currently selected card | After selection |
| `next-in-cart` | A card | All its items are present in the cart at the required quantity |

## Container Attribute Set by Enhancer

`data-selected-bundle="<id>"` — reflects the currently selected bundle ID on the container element.

## Events

| Event | Payload | When |
|-------|---------|------|
| `bundle:selected` | `{ bundleId, items }` | A bundle card is clicked |
| `bundle:selection-changed` | `{ bundleId, items }` | Internal selection state is updated |

---

## Static Card Mode

Write bundle cards directly in HTML. This is the simplest approach when you have a fixed set of options.

```html
<div data-next-bundle-selector data-next-selection-mode="swap">

  <div data-next-bundle-card
       data-next-bundle-id="starter"
       data-next-bundle-items='[{"packageId":10,"quantity":1}]'
       data-next-selected="true">
    <h3>Starter</h3>
    <span data-next-bundle-price></span>
  </div>

  <div data-next-bundle-card
       data-next-bundle-id="duo"
       data-next-bundle-items='[{"packageId":10,"quantity":1},{"packageId":20,"quantity":1}]'>
    <h3>Duo Bundle</h3>
    <span data-next-bundle-price></span>
    <span data-next-bundle-price="savings">Save</span>
  </div>

</div>
```

---

## Auto-Render Mode

Provide a JSON array of bundle definitions via `data-next-bundles` and a card template via `data-next-bundle-template-id`. The enhancer renders one card per definition.

### Bundle Definition Format

```json
[
  {
    "id": "starter",
    "name": "Starter Kit",
    "badge": "Most Popular",
    "items": [
      { "packageId": 10, "quantity": 1 }
    ]
  },
  {
    "id": "value",
    "name": "Value Pack",
    "items": [
      { "packageId": 10, "quantity": 1 },
      { "packageId": 20, "quantity": 2 }
    ],
    "vouchers": ["SAVE10"]
  }
]
```

Any field other than `items` is available as `{bundle.<fieldName>}` in the card template.

### Card Template Variables

| Variable | Value |
|----------|-------|
| `{bundle.id}` | Bundle ID |
| `{bundle.name}` | Bundle name |
| `{bundle.<anyField>}` | Any other field from the bundle definition |

### Example

```html
<div data-next-bundle-selector
     data-next-bundles='[{"id":"s","name":"Starter","items":[{"packageId":10,"quantity":1}]},{"id":"v","name":"Value Pack","items":[{"packageId":10,"quantity":1},{"packageId":20,"quantity":2}]}]'
     data-next-bundle-template-id="bundle-tpl">
</div>

<template id="bundle-tpl">
  <div data-next-bundle-card data-next-bundle-id="{bundle.id}">
    <h3>{bundle.name}</h3>
    <p data-next-bundle-price></p>
    <p>Save: <span data-next-bundle-price="savings"></span></p>
  </div>
</template>
```

---

## Per-Item Slot Templates

Add `data-next-bundle-slot-template-id` to the container and place a `[data-next-bundle-slots]` placeholder inside each card to render one row per bundle item with variant selectors.

### Slot Template Variables

**Slot position:**

| Variable | Description |
|----------|-------------|
| `{slot.index}` | 1-based slot number |
| `{slot.unitNumber}` | 1-based unit index within a configurable item |
| `{slot.unitIndex}` | 0-based unit index within a configurable item |

**Package identity:**

| Variable | Description |
|----------|-------------|
| `{item.packageId}` | Current package `ref_id` |
| `{item.name}` | Package name |
| `{item.image}` | Package image URL |
| `{item.quantity}` | Quantity for this slot |
| `{item.variantName}` | Variant display name (e.g. "Black / Small") |
| `{item.productName}` | Product name |
| `{item.sku}` | Product SKU |
| `{item.isRecurring}` | `"true"` / `"false"` |

**Campaign prices** (before any offer discounts):

| Variable | Description |
|----------|-------------|
| `{item.price}` | Per-unit price |
| `{item.priceTotal}` | Total package price |
| `{item.priceRetail}` | Retail per-unit price |
| `{item.priceRetailTotal}` | Retail total price |
| `{item.priceRecurring}` | Recurring per-unit price |

**API prices** (reflect applied offer/coupon discounts):

| Variable | Description |
|----------|-------------|
| `{item.unitPrice}` | Per-unit price after discounts |
| `{item.originalUnitPrice}` | Per-unit price before discounts |
| `{item.packagePrice}` | Package total after discounts |
| `{item.originalPackagePrice}` | Package total before discounts |
| `{item.subtotal}` | Line subtotal |
| `{item.totalDiscount}` | Total discount on this line |
| `{item.total}` | Line total after all discounts |

**Conditional helpers:**

| Variable | Values | Description |
|----------|--------|-------------|
| `{item.hasDiscount}` | `show` / `hide` | Whether a discount is applied |
| `{item.hasSavings}` | `show` / `hide` | Whether there are savings vs retail price |

### Example

```html
<div data-next-bundle-selector
     data-next-bundle-slot-template-id="slot-tpl">

  <div data-next-bundle-card
       data-next-bundle-id="duo"
       data-next-bundle-items='[{"packageId":10,"quantity":1},{"packageId":20,"quantity":1}]'>
    <h3>Duo Bundle</h3>
    <div data-next-bundle-slots></div>
    <p>Total: <span data-next-bundle-price></span></p>
  </div>

</div>

<template id="slot-tpl">
  <div class="slot-row">
    <img src="{item.image}" alt="{item.name}" />
    <strong>{item.name}</strong>
    <span>{item.price}</span>
  </div>
</template>
```

---

## Variant Selectors

Place `[data-next-variant-selectors]` inside a slot template to inject variant controls. The enhancer renders one block per variant attribute dimension (e.g. Color, Size).

### Default: `<select>` Dropdowns

When no custom option template is configured, the enhancer renders a labeled `<select>` per attribute. Unavailable options receive the HTML `disabled` attribute.

### Custom Option Template

Provide `data-next-variant-option-template-id` on the container to replace `<select>` dropdowns with custom elements (buttons, swatches, etc.).

**Option template variables:**

| Variable | Description |
|----------|-------------|
| `{attr.code}` | Attribute code (e.g. `color`) |
| `{attr.name}` | Attribute label (e.g. `Color`) |
| `{option.value}` | Option value (e.g. `Red`) |
| `{option.selected}` | `"true"` / `"false"` |
| `{option.available}` | `"true"` / `"false"` — `false` when this combination doesn't exist |

**CSS classes on option elements:**

| Class | When |
|-------|------|
| `next-variant-selected` | Option is currently selected |
| `next-variant-unavailable` | Option is unavailable for the current combination |

Clicks on unavailable options are silently ignored.

### Example with Custom Swatches

```html
<div data-next-bundle-selector
     data-next-bundle-slot-template-id="slot-tpl"
     data-next-variant-option-template-id="variant-opt-tpl">

  <div data-next-bundle-card
       data-next-bundle-id="pick3"
       data-next-bundle-items='[{"packageId":101,"quantity":3,"configurable":true}]'
       data-next-selected="true">
    <h3>Pick Your 3</h3>
    <div data-next-bundle-slots></div>
  </div>

</div>

<template id="slot-tpl">
  <div class="slot-row">
    <img src="{item.image}" alt="{item.name}" />
    <span>Unit {slot.unitNumber}</span>
    <div data-next-variant-selectors></div>
  </div>
</template>

<template id="variant-opt-tpl">
  <button class="swatch"
          data-selected="{option.selected}"
          style="opacity: {option.available} == 'false' ? 0.4 : 1">
    {option.value}
  </button>
</template>
```

---

## Per-Unit Configuration (Configurable Items)

By default, a quantity-3 item renders as a single slot. Add `"configurable": true` to expand it into individual per-unit slots — one per unit — each with its own variant selectors.

```json
[
  {
    "id": "pick3",
    "name": "Pick Your 3",
    "items": [
      { "packageId": 101, "quantity": 3, "configurable": true }
    ]
  }
]
```

This renders three slot rows, each with independent variant dropdowns. The cart is updated with the aggregated package quantities after all selections.

---

## Silent Add-Ons (`noSlot`)

Set `"noSlot": true` on any bundle item to suppress its slot row. Useful for free gifts or invisible add-ons you want to include in the cart but not show in the slot list.

```json
{
  "id": "premium",
  "items": [
    { "packageId": 10, "quantity": 1 },
    { "packageId": 99, "quantity": 1, "noSlot": true }
  ]
}
```

---

## Bundle Vouchers

Assign voucher/coupon codes to individual bundle cards. When the visitor switches bundles, the previous card's codes are removed and the new card's codes are applied — automatically, without additional configuration.

```html
<!-- Via attribute (static card) -->
<div data-next-bundle-card
     data-next-bundle-id="premium"
     data-next-bundle-vouchers="SAVE10,FREESHIP"
     data-next-bundle-items='[{"packageId":10,"quantity":2}]'>
  Premium Bundle
</div>
```

```json
// Via auto-render JSON definition
{
  "id": "premium",
  "vouchers": ["SAVE10", "FREESHIP"],
  "items": [{ "packageId": 10, "quantity": 2 }]
}
```

Vouchers declared this way are managed entirely by the bundle selector. Do not manage bundle vouchers separately via `CouponEnhancer`.

---

## Select Mode (External Add-to-Cart)

Use `data-next-selection-mode="select"` when a separate button should trigger the cart write. The enhancer tracks which bundle is selected but does not update the cart on click.

```html
<div data-next-bundle-selector data-next-selection-mode="select">

  <div data-next-bundle-card
       data-next-bundle-id="starter"
       data-next-bundle-items='[{"packageId":10,"quantity":1}]'
       data-next-selected="true">
    Starter
  </div>

  <div data-next-bundle-card
       data-next-bundle-id="duo"
       data-next-bundle-items='[{"packageId":10,"quantity":1},{"packageId":20,"quantity":1}]'>
    Duo Bundle
  </div>

</div>

<!-- Button reads data-selected-bundle from the container -->
<button data-next-action="add-to-cart"
        data-next-selector-id="my-bundle-selector">
  Add to Cart
</button>
```

:::caution
Do not use swap mode on a bundle selector that also feeds an `AddToCartEnhancer`. Clicking a card fires a cart write and then the button fires another, resulting in a double cart write.
:::

---

## Listening to Bundle Events

```javascript
window.nextReady.push(() => {
  window.next.on('bundle:selection-changed', ({ bundleId, items }) => {
    console.log('Selected bundle:', bundleId, items);
  });
});
```
