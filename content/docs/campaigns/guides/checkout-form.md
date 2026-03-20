---
title: Building a Checkout Form
---

The checkout form is a standard `<form>` element powered by `data-next-checkout`. It handles field collection, credit card tokenisation, payment method switching, address autocomplete, and order submission — without any JavaScript.

## How It Works

1. Add `data-next-checkout` to your `<form>` element
2. Mark every input/select with `data-next-checkout-field="<name>"`
3. Add payment method tabs with `data-next-checkout-payment="<method>"`
4. Add a `type="submit"` button — the enhancer intercepts submission and calls the order API

## Minimal Form

```html
<form data-next-checkout>

  <input type="email"  data-next-checkout-field="email"    placeholder="Email" required>
  <input type="text"   data-next-checkout-field="fname"    placeholder="First name" required>
  <input type="text"   data-next-checkout-field="lname"    placeholder="Last name" required>
  <input type="tel"    data-next-checkout-field="phone"    placeholder="Phone" required>

  <input type="text"   data-next-checkout-field="address1" placeholder="Address" required>
  <input type="text"   data-next-checkout-field="address2" placeholder="Apt, suite (optional)">

  <!-- Country, state, postal are shown/hidden based on selected country -->
  <div data-next-component="location">
    <select data-next-checkout-field="country"></select>
    <input type="text" data-next-checkout-field="city"     placeholder="City" required>
    <input type="text" data-next-checkout-field="province" placeholder="State" required>
    <input type="text" data-next-checkout-field="postal"   placeholder="ZIP" required>
  </div>

  <!-- Credit card -->
  <input type="text"   data-next-checkout-field="cc-name"   placeholder="Name on card">
  <input type="text"   data-next-checkout-field="cc-number" placeholder="Card number" id="credit_card_number">
  <select              data-next-checkout-field="cc-month"></select>
  <select              data-next-checkout-field="cc-year"></select>
  <input type="text"   data-next-checkout-field="cvv"       placeholder="CVV" id="credit_card_cvv">

  <button type="submit">Complete Order</button>

</form>
```

The country `<select>` and expiration `<select>` elements are **auto-populated** by the enhancer — leave them empty.

## Field Reference

### Customer Fields

| Field name | Input type | Description |
|------------|-----------|-------------|
| `email` | `email` | Customer email |
| `fname` | `text` | First name |
| `lname` | `text` | Last name |
| `phone` | `tel` | Phone (intl flag dropdown added automatically) |

### Address Fields

| Field name | Input type | Description |
|------------|-----------|-------------|
| `address1` | `text` | Street address |
| `address2` | `text` | Apartment, suite (optional) |
| `city` | `text` | City |
| `province` | `text` or `select` | State / Province |
| `postal` | `text` | ZIP / Postal code |
| `country` | `select` | Country (auto-populated) |

Wrap `city`, `province`, `postal`, and `country` in `data-next-component="location"` — these fields are progressively revealed as the visitor fills in the address.

### Credit Card Fields

| Field name | Input type | Notes |
|------------|-----------|-------|
| `cc-name` | `text` | Cardholder name |
| `cc-number` | `text` | Card number — must have `id="credit_card_number"` for tokenisation |
| `cc-month` or `exp-month` | `select` | Auto-populated with months |
| `cc-year` or `exp-year` | `select` | Auto-populated with years |
| `cvv` | `text` | CVV — must have `id="credit_card_cvv"` for tokenisation |

### Billing Address Fields

Billing fields use the same names prefixed with `billing-`:

| Field name | Description |
|------------|-------------|
| `billing-fname` | Billing first name |
| `billing-lname` | Billing last name |
| `billing-address1` | Billing street address |
| `billing-address2` | Billing apartment / suite |
| `billing-city` | Billing city |
| `billing-province` | Billing state |
| `billing-postal` | Billing ZIP |
| `billing-country` | Billing country |

## Payment Methods

Add tab/button elements with `data-next-checkout-payment` to switch between payment methods. The form shows/hides the relevant section automatically.

```html
<!-- Payment method tabs -->
<div class="payment-tabs">
  <button type="button" data-next-checkout-payment="credit"    class="tab">Credit Card</button>
  <button type="button" data-next-checkout-payment="paypal"    class="tab">PayPal</button>
  <button type="button" data-next-checkout-payment="apple-pay" class="tab">Apple Pay</button>
  <button type="button" data-next-checkout-payment="google-pay" class="tab">Google Pay</button>
</div>
```

| Value | Payment method |
|-------|---------------|
| `credit` | Credit/debit card (Spreedly tokenisation) |
| `paypal` | PayPal |
| `apple-pay` | Apple Pay |
| `google-pay` | Google Pay |
| `klarna` | Klarna |

Only methods enabled in your campaign configuration will function. The active tab receives the `next-active` CSS class.

## Express Checkout (Apple Pay / Google Pay / PayPal)

Place the express checkout container above or separate from the main form. The SDK injects the appropriate buttons based on device and campaign configuration.

```html
<!-- Express checkout section -->
<div data-next-express-checkout="container">
  <p class="express-label">Express checkout</p>
  <div data-next-express-checkout="buttons">
    <!-- Buttons injected here automatically -->
  </div>
  <!-- Error display -->
  <div data-next-component="express-error" style="display:none">
    <span data-next-component="express-error-text"></span>
  </div>
</div>

<div class="divider">— or pay by card —</div>

<form data-next-checkout>
  <!-- card fields -->
</form>
```

## Billing Address Toggle

Let customers enter a separate billing address. Wrap the toggle checkbox and billing form in `data-next-component="different-billing-address"`. The billing form fields are cloned from the shipping form automatically — you only need the container elements.

```html
<form data-next-checkout>

  <!-- Shipping fields -->
  <div data-next-component="shipping-form">
    <div data-next-component="shipping-field-row">
      <input data-next-checkout-field="fname" type="text" placeholder="First name">
      <input data-next-checkout-field="lname" type="text" placeholder="Last name">
    </div>
    <div data-next-component="shipping-field-row">
      <input data-next-checkout-field="address1" type="text" placeholder="Address">
    </div>
    <div data-next-component="location">
      <div data-next-component="shipping-field-row">
        <select data-next-checkout-field="country"></select>
      </div>
      <div data-next-component="shipping-field-row">
        <input data-next-checkout-field="city" type="text" placeholder="City">
        <input data-next-checkout-field="province" type="text" placeholder="State">
        <input data-next-checkout-field="postal" type="text" placeholder="ZIP">
      </div>
    </div>
  </div>

  <!-- Billing address toggle (clones shipping fields automatically) -->
  <div data-next-component="different-billing-address">
    <label>
      <input type="checkbox" name="different_billing"> Use different billing address
    </label>
    <div data-next-component="billing-form">
      <!-- Billing fields are injected here by the enhancer -->
    </div>
  </div>

  <!-- Card fields & submit -->
  <input type="text" data-next-checkout-field="cc-number" id="credit_card_number" placeholder="Card number">
  <input type="text" data-next-checkout-field="cvv" id="credit_card_cvv" placeholder="CVV">
  <select data-next-checkout-field="cc-month"></select>
  <select data-next-checkout-field="cc-year"></select>

  <button type="submit">Complete Order</button>

</form>
```

## Validation Error Display

The enhancer displays inline validation errors. Add error containers with these CSS class names next to the relevant fields:

```html
<!-- Email -->
<input data-next-checkout-field="email" type="email" placeholder="Email">
<div class="invalid-email"></div>

<!-- Phone -->
<input data-next-checkout-field="phone" type="tel" placeholder="Phone">
<div class="invalid-ph"></div>

<!-- Address -->
<input data-next-checkout-field="address1" type="text" placeholder="Address">
<div class="invalid-shipping_address_line1"></div>

<!-- Credit card -->
<input data-next-checkout-field="cc-number" id="credit_card_number" type="text">
<div class="invalid-cc-number"></div>
<input data-next-checkout-field="cvv" id="credit_card_cvv" type="text">
<div class="invalid-cvv"></div>
```

| Error container class | Field |
|-----------------------|-------|
| `.invalid-email` | Email |
| `.invalid-fname` | First name |
| `.invalid-lname` | Last name |
| `.invalid-ph` | Phone |
| `.invalid-shipping_address_line1` | Address |
| `.invalid-shipping_address_line4` | City |
| `.invalid-shipping_state` | State/Province |
| `.invalid-shipping_postcode` | Postal / ZIP |
| `.invalid-shipping_country` | Country |
| `.invalid-cc-name` | Cardholder name |
| `.invalid-cc-number` | Card number |
| `.invalid-cc-month` | Expiry month |
| `.invalid-cc-year` | Expiry year |
| `.invalid-cvv` | CVV |

The enhancer also adds `has-error` / `no-error` CSS classes directly to each input, and a `next-error-field` class, so you can style invalid fields with CSS:

```css
input.has-error {
  border-color: #dc2626;
}
input.no-error {
  border-color: #16a34a;
}
```

## Complete Single-Page Checkout

```html
<!-- Express checkout (optional) -->
<div data-next-express-checkout="container">
  <p>Express checkout</p>
  <div data-next-express-checkout="buttons"></div>
</div>

<div class="divider">— or enter your details —</div>

<!-- Checkout form -->
<form class="checkout-form" data-next-checkout>

  <!-- Contact -->
  <fieldset>
    <legend>Contact</legend>
    <input type="email" data-next-checkout-field="email" placeholder="Email" required>
    <div class="invalid-email"></div>
    <input type="tel" data-next-checkout-field="phone" placeholder="Phone" required>
    <div class="invalid-ph"></div>
  </fieldset>

  <!-- Shipping address -->
  <fieldset data-next-component="shipping-form">
    <legend>Shipping address</legend>

    <div data-next-component="shipping-field-row" class="name-row">
      <div>
        <input type="text" data-next-checkout-field="fname" placeholder="First name" required>
        <div class="invalid-fname"></div>
      </div>
      <div>
        <input type="text" data-next-checkout-field="lname" placeholder="Last name" required>
        <div class="invalid-lname"></div>
      </div>
    </div>

    <div data-next-component="shipping-field-row">
      <input type="text" data-next-checkout-field="address1" placeholder="Address" required>
      <div class="invalid-shipping_address_line1"></div>
    </div>

    <div data-next-component="shipping-field-row">
      <input type="text" data-next-checkout-field="address2" placeholder="Apt, suite (optional)">
    </div>

    <div data-next-component="location">
      <div data-next-component="shipping-field-row">
        <select data-next-checkout-field="country"></select>
        <div class="invalid-shipping_country"></div>
      </div>
      <div data-next-component="shipping-field-row" class="city-row">
        <div>
          <input type="text" data-next-checkout-field="city" placeholder="City" required>
          <div class="invalid-shipping_address_line4"></div>
        </div>
        <div>
          <input type="text" data-next-checkout-field="province" placeholder="State" required>
          <div class="invalid-shipping_state"></div>
        </div>
        <div>
          <input type="text" data-next-checkout-field="postal" placeholder="ZIP" required>
          <div class="invalid-shipping_postcode"></div>
        </div>
      </div>
    </div>
  </fieldset>

  <!-- Billing address toggle -->
  <div data-next-component="different-billing-address">
    <label class="billing-toggle">
      <input type="checkbox" name="different_billing">
      Use a different billing address
    </label>
    <div data-next-component="billing-form"></div>
  </div>

  <!-- Payment -->
  <fieldset>
    <legend>Payment</legend>

    <div class="payment-tabs">
      <button type="button" data-next-checkout-payment="credit">Credit Card</button>
      <button type="button" data-next-checkout-payment="paypal">PayPal</button>
    </div>

    <div class="card-fields">
      <input type="text" data-next-checkout-field="cc-name" placeholder="Name on card">
      <div class="invalid-cc-name"></div>

      <input type="text" data-next-checkout-field="cc-number" id="credit_card_number"
             placeholder="Card number" autocomplete="cc-number">
      <div class="invalid-cc-number"></div>

      <div class="expiry-row">
        <select data-next-checkout-field="cc-month"></select>
        <div class="invalid-cc-month"></div>
        <select data-next-checkout-field="cc-year"></select>
        <div class="invalid-cc-year"></div>
        <input type="text" data-next-checkout-field="cvv" id="credit_card_cvv"
               placeholder="CVV" autocomplete="cc-csc">
        <div class="invalid-cvv"></div>
      </div>
    </div>
  </fieldset>

  <button type="submit" class="btn-submit">Complete Order</button>

</form>
```

## Listening to Checkout Events

```javascript
window.nextReady.push(() => {
  // Order placed successfully
  window.next.on('order:created', ({ order }) => {
    console.log('Order created:', order.id);
    // Redirect to thank-you page is handled automatically
  });

  // Payment error
  window.next.on('checkout:error', ({ message }) => {
    console.error('Checkout error:', message);
  });
});
```
