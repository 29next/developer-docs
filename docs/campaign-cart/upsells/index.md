---
sidebar_label: Upsells
sidebar_position: 2
---

# Upsells

Maximize order value with post-purchase upsell flows using flexible patterns for presenting additional offers after checkout.

## Upsell Configuration

Configure upsell flows and behavior with meta tags and attributes.

### Basic Configuration

Set URLs for upsell flow navigation:

```html
<!-- Where to go after accepting any upsell -->
<meta name="next-upsell-accept-url" content="/demo/receipt">

<!-- Where to go after declining all upsells -->
<meta name="next-upsell-decline-url" content="/demo/receipt">
```

### Page Configuration

Mark pages as upsell pages:

```html
<!-- Identify page as upsell -->
<meta name="next-page-type" content="upsell">

<!-- Prevent back navigation on first upsell -->
<meta name="next-prevent-back-navigation" content="true">
```

### Order Context

Upsells need order context (from URL parameter):

```html
<!-- Order ID passed as URL parameter -->
<!-- Example: /upsell?ref_id=ORDER123 -->
```

### Multiple Upsell Pages

Chain multiple upsell pages:

```html
<!-- Page 1: /upsell-1 -->
<meta name="next-upsell-accept-url" content="/upsell-2">
<meta name="next-upsell-decline-url" content="/upsell-2">

<!-- Page 2: /upsell-2 -->
<meta name="next-upsell-accept-url" content="/receipt">
<meta name="next-upsell-decline-url" content="/receipt">
```

### Upsell Analytics

Track upsell performance:

```javascript
// Listen to upsell events
next.on('upsell:shown', (data) => {
  // Track impression
});

next.on('upsell:accepted', (data) => {
  // Track conversion
});

next.on('upsell:declined', (data) => {
  // Track decline
});
```

### Best Practices

1. **Limit Steps**: Keep upsell flow to 2-3 steps max
2. **Fast Loading**: Optimize page load for upsells
3. **Mobile Friendly**: Ensure upsells work on mobile
4. **Clear Progress**: Show where user is in flow
5. **Easy Exit**: Always provide clear decline option

## Direct Upsells

Simple yes/no decision for a single item. Package ID is on the container.

### Basic Pattern

```html
<!-- Direct mode: package ID on container -->
<div data-next-upsell="offer" data-next-package-id="7">
  <h3>Add Extra Battery?</h3>
  <p>Extend your flight time with an extra battery pack</p>
  <button data-next-upsell-action="add">Yes, Add for $29</button>
  <button data-next-upsell-action="skip">No Thanks</button>
</div>
```

### With Product Display

Show product details using display attributes:

```html
<div data-next-upsell="offer" data-next-package-id="8">
  <img src="battery-image.jpg" alt="Extra Battery">
  <h3><span data-next-display="package.name">Extra Battery Pack</span></h3>
  <p>Price: <span data-next-display="package.price">$29.99</span></p>
  <p data-next-show="package.hasSavings">
    Save <span data-next-display="package.savingsPercentage">50%</span>
  </p>
  
  <button data-next-upsell-action="add">Yes, Add It!</button>
  <button data-next-upsell-action="skip">No, Continue</button>
</div>
```

### Styling Examples

**Card Style:**

```html
<div class="upsell-card" data-next-upsell="offer" data-next-package-id="7">
  <div class="upsell-header">
    <h3>Special Offer!</h3>
  </div>
  <div class="upsell-body">
    <p>Add protection for your purchase</p>
    <div class="price">
      Only <span data-next-display="package.price">$14.99</span>
    </div>
  </div>
  <div class="upsell-actions">
    <button class="btn-accept" data-next-upsell-action="add">
      Protect My Order
    </button>
    <button class="btn-decline" data-next-upsell-action="skip">
      Skip Protection
    </button>
  </div>
</div>
```

**Minimal Style:**

```html
<div data-next-upsell="offer" data-next-package-id="9">
  <p>Add expedited shipping for just $9.99?</p>
  <button data-next-upsell-action="add">Yes</button>
  <button data-next-upsell-action="skip">No</button>
</div>
```

### Action Attributes

| Attribute | Description |
|-----------|-------------|
| `data-next-upsell-action="add"` | Accept upsell and add to order |
| `data-next-upsell-action="skip"` | Decline upsell and continue |

### Container Attributes

| Attribute | Description |
|-----------|-------------|
| `data-next-upsell="offer"` | Marks container as upsell offer |
| `data-next-package-id` | Package to add if accepted |

### Best Practices

1. **Clear Value Proposition**: Explain why they need the item
2. **Show Savings**: Highlight discounts or special pricing
3. **Easy to Decline**: Make "No" option clear and accessible
4. **Single Focus**: One product per direct upsell
5. **Urgency**: Mention if offer is time-limited

## Selection Upsells

Multiple options to choose from. Uses selector ID instead of package ID.

### Card Selection Pattern

Let customers choose from multiple options:

```html
<!-- Selector mode: uses selector ID -->
<div data-next-upsell-selector data-next-selector-id="protection">
  <h3>Choose Your Protection Plan</h3>
  
  <div data-next-upsell-option data-next-package-id="7">
    <h4>Basic Protection</h4>
    <p>1 Year Coverage</p>
    <span data-next-display="package.price">$14.99</span>
  </div>
  
  <div data-next-upsell-option data-next-package-id="9" data-next-selected="true">
    <h4>Premium Protection</h4>
    <p>2 Year Coverage + Accidental Damage</p>
    <span data-next-display="package.price">$24.99</span>
  </div>
  
  <div data-next-upsell-option data-next-package-id="10">
    <h4>Ultimate Protection</h4>
    <p>3 Year Coverage + Everything</p>
    <span data-next-display="package.price">$39.99</span>
  </div>
  
  <button data-next-upsell-action="add">
    Add Selected Protection
  </button>
  <button data-next-upsell-action="skip">
    Continue Without Protection
  </button>
</div>
```

### Dropdown Selection Pattern

Compact selection using native select element:

```html
<!-- Wrap in upsell container -->
<div data-next-upsell-selector data-next-selector-id="training">
  <h3>Add Training Course?</h3>
  
  <select data-next-upsell-select="training">
    <option value="">Choose a course...</option>
    <option value="2">Beginner Course - $29.99</option>
    <option value="3" selected>Advanced Course - $49.99</option>
    <option value="4">Master Course - $79.99</option>
  </select>
  
  <button data-next-upsell-action="add">
    Add Course to Order
  </button>
  <button data-next-upsell-action="skip">
    No Thanks
  </button>
</div>
```

### Display Selection Info

Show details about the selected option:

```html
<div data-next-upsell-selector data-next-selector-id="warranty">
  <!-- Option cards here -->
  
  <div class="selection-summary">
    <p>Selected: <span data-next-display="selection.warranty.name">None</span></p>
    <p>Price: <span data-next-display="selection.warranty.price">$0</span></p>
    <p data-next-show="selection.warranty.hasSavings">
      You save: <span data-next-display="selection.warranty.savingsAmount">$0</span>
    </p>
  </div>
  
  <button data-next-upsell-action="add">Add to Order</button>
</div>
```

### Grid Layout Example

```html
<div data-next-upsell-selector data-next-selector-id="accessories">
  <h3>Popular Accessories</h3>
  
  <div class="upsell-grid">
    <div class="upsell-card" data-next-upsell-option data-next-package-id="11">
      <img src="case.jpg" alt="Carrying Case">
      <h4>Carrying Case</h4>
      <span data-next-display="package.price">$19.99</span>
    </div>
    
    <div class="upsell-card" data-next-upsell-option data-next-package-id="12">
      <img src="filters.jpg" alt="Filter Set">
      <h4>Filter Set</h4>
      <span data-next-display="package.price">$39.99</span>
    </div>
    
    <div class="upsell-card" data-next-upsell-option data-next-package-id="13">
      <img src="props.jpg" alt="Extra Props">
      <h4>Extra Props</h4>
      <span data-next-display="package.price">$24.99</span>
    </div>
  </div>
  
  <button data-next-upsell-action="add">Add Selected Item</button>
  <button data-next-upsell-action="skip">Continue</button>
</div>
```

### Key Attributes

**Container:**
- `data-next-upsell-selector` - Marks as selection upsell
- `data-next-selector-id` - Unique ID for this selector

**Options:**
- `data-next-upsell-option` - Individual option card
- `data-next-package-id` - Package for this option
- `data-next-selected="true"` - Default selection

**Dropdown:**
- `data-next-upsell-select` - Native select element
- Option `value` - Package ID for that option

### CSS Classes

Options automatically get classes:
- `.next-selected` - Currently selected option
- `.next-upsell-option` - All option cards

### Best Practices

1. **Highlight Best Value**: Mark recommended option
2. **Show Comparisons**: Display savings or features
3. **Default Selection**: Pre-select most popular option
4. **Clear Pricing**: Show price for each option
5. **Visual Hierarchy**: Make selection clear

## Quantity Upsells

Let customers choose quantity before accepting the upsell.

### Quantity Controls Pattern

Simple quantity selector for bulk purchases:

```html
<!-- Quantity controls -->
<div data-next-upsell="offer" data-next-package-id="7">
  <h3>Add Extra Batteries?</h3>
  <p>Never run out of power during your flights</p>
  
  <div class="quantity-controls">
    <button data-next-upsell-quantity="decrease">-</button>
    <span data-next-upsell-quantity="display">1</span>
    <button data-next-upsell-quantity="increase">+</button>
  </div>
  
  <p>Price: <span data-next-display="package.price">$29.99</span> each</p>
  
  <button data-next-upsell-action="add">
    Add <span data-next-upsell-quantity="display">1</span> to Order
  </button>
  <button data-next-upsell-action="skip">
    No Thanks
  </button>
</div>
```

### Quantity Toggle Cards Pattern

Click to select quantity - perfect for bundles:

```html
<!-- Quantity toggle cards -->
<div data-next-upsell="offer" data-next-package-id="7">
  <h3>Stock Up & Save!</h3>
  <p>Choose your battery bundle:</p>
  
  <div class="quantity-cards">
    <div data-next-upsell-quantity-toggle="1" class="quantity-card">
      <h4>1 Pack</h4>
      <p>$29.99</p>
    </div>
    
    <div data-next-upsell-quantity-toggle="2" class="quantity-card">
      <h4>2 Pack</h4>
      <p>$49.99</p>
      <span class="badge">Save $10</span>
    </div>
    
    <div data-next-upsell-quantity-toggle="4" class="quantity-card">
      <h4>4 Pack</h4>
      <p>$89.99</p>
      <span class="badge">Best Value!</span>
    </div>
  </div>
  
  <button data-next-upsell-action="add">
    Add <span data-next-upsell-quantity="display">1</span> Pack to Order
  </button>
  <button data-next-upsell-action="skip">
    Continue Without
  </button>
</div>
```

### Advanced Quantity Display

Show dynamic pricing based on quantity:

```html
<div data-next-upsell="offer" data-next-package-id="8">
  <h3>Replacement Filters</h3>
  
  <div class="quantity-selector">
    <button data-next-upsell-quantity="decrease">-</button>
    <input type="text" data-next-upsell-quantity="display" readonly>
    <button data-next-upsell-quantity="increase">+</button>
  </div>
  
  <div class="pricing-display">
    <p>Unit Price: <span data-next-display="package.price">$9.99</span></p>
    <p>Total: $<span data-next-upsell-quantity="display">1</span> × 
       <span data-next-display="package.price.raw">9.99</span> = 
       $<span data-next-upsell-quantity="total">9.99</span>
    </p>
  </div>
  
  <button data-next-upsell-action="add">Add to Order</button>
</div>
```

### Quantity Attributes

**Controls:**
- `data-next-upsell-quantity="increase"` - Increment button
- `data-next-upsell-quantity="decrease"` - Decrement button
- `data-next-upsell-quantity="display"` - Shows current quantity

**Toggle Cards:**
- `data-next-upsell-quantity-toggle` - Set specific quantity on click
- Value is the quantity to set (e.g., "1", "2", "4")

### Styling Quantity Cards

```css
/* Style selected quantity card */
.quantity-card[data-selected="true"] {
  border: 2px solid #007bff;
  background: #f0f8ff;
}

/* Disable decrease at minimum */
button[data-next-upsell-quantity="decrease"]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Common Patterns

**Tiered Pricing:**

```html
<div data-next-upsell-quantity-toggle="1">
  1 for $10
</div>
<div data-next-upsell-quantity-toggle="3">
  3 for $25 (Save $5)
</div>
<div data-next-upsell-quantity-toggle="5">
  5 for $40 (Save $10)
</div>
```

**Subscription Quantities:**

```html
<div data-next-upsell-quantity-toggle="1">
  Monthly Supply - $29/mo
</div>
<div data-next-upsell-quantity-toggle="3">
  3 Month Supply - $79 (Save $8)
</div>
```

### Best Practices

1. **Show Savings**: Highlight bulk discounts
2. **Display Total**: Show total price for quantity
3. **Preset Options**: Offer common quantities
4. **Visual Feedback**: Mark selected quantity
5. **Limits**: Set min/max quantity if needed

## Related Documentation

- [Cart System](/docs/campaign-cart/cart-system/) - Cart management basics
