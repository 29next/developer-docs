---
title: Multi-Step Checkout
---

Split the checkout across multiple pages — typically Contact + Address → Payment — so each page is focused and less overwhelming. The SDK preserves all form data between steps using the checkout store (sessionStorage), so the customer never needs to re-enter anything.

## How It Works

1. Each step is a separate HTML page with its own `<form data-next-checkout>`
2. Add `data-next-checkout-step="<url>"` to point to the next page
3. When the visitor submits, the enhancer validates the current step's fields, saves them to the store, and navigates to the next URL
4. The final step omits `data-next-checkout-step` — submitting it places the order

## Step Structure

```
step-1.html  →  step-2.html  →  step-3.html  (places order)
(contact +       (payment)
 shipping)
```

Or a simpler two-page layout:

```
information.html  →  payment.html  (places order)
```

## Step 1: Contact & Shipping Address

```html
<!-- information.html -->
<form data-next-checkout
      data-next-checkout-step="/payment.html">

  <!-- Contact -->
  <input type="email" data-next-checkout-field="email"    placeholder="Email" required>
  <input type="tel"   data-next-checkout-field="phone"    placeholder="Phone">

  <!-- Name -->
  <input type="text"  data-next-checkout-field="fname"    placeholder="First name" required>
  <input type="text"  data-next-checkout-field="lname"    placeholder="Last name" required>

  <!-- Address -->
  <input type="text"  data-next-checkout-field="address1" placeholder="Address" required>
  <input type="text"  data-next-checkout-field="address2" placeholder="Apt / suite (optional)">

  <div data-next-component="location">
    <select data-next-checkout-field="country"></select>
    <input type="text" data-next-checkout-field="city"     placeholder="City" required>
    <input type="text" data-next-checkout-field="province" placeholder="State" required>
    <input type="text" data-next-checkout-field="postal"   placeholder="ZIP" required>
  </div>

  <button type="submit">Continue to Payment</button>

</form>
```

`data-next-checkout-step="/payment.html"` — when all fields are valid the SDK navigates to this URL. All field values are persisted to sessionStorage automatically.

## Step 2: Payment (Final Step)

The final step has **no** `data-next-checkout-step` attribute — submitting it places the order.

```html
<!-- payment.html -->

<!-- Review: show what the customer entered on step 1 -->
<div data-next-enhancer="checkout-review">
  <div>
    <span>Contact:</span>
    <span data-next-checkout-review="email"></span>
  </div>
  <div>
    <span>Ship to:</span>
    <address data-next-checkout-review="address1" data-next-format="address"></address>
  </div>
  <a href="/information.html">Change</a>
</div>

<!-- Payment form (no data-next-checkout-step = final step) -->
<form data-next-checkout>

  <input type="text" data-next-checkout-field="cc-name"   placeholder="Name on card">
  <input type="text" data-next-checkout-field="cc-number" id="credit_card_number" placeholder="Card number">
  <select           data-next-checkout-field="cc-month"></select>
  <select           data-next-checkout-field="cc-year"></select>
  <input type="text" data-next-checkout-field="cvv"       id="credit_card_cvv" placeholder="CVV">

  <button type="submit">Place Order</button>

</form>
```

The review block (`data-next-enhancer="checkout-review"`) reads the saved checkout store data — no extra configuration needed. See the [Checkout Review](/docs/campaigns/data-attributes/checkout-review) reference for all available fields and format options.

## Three-Step Checkout

For a more granular flow — Contact → Shipping method → Payment:

```html
<!-- step-1.html: Contact -->
<form data-next-checkout
      data-next-checkout-step="/step-2.html">

  <input type="email" data-next-checkout-field="email"    placeholder="Email" required>
  <input type="text"  data-next-checkout-field="fname"    placeholder="First name" required>
  <input type="text"  data-next-checkout-field="lname"    placeholder="Last name" required>
  <input type="tel"   data-next-checkout-field="phone"    placeholder="Phone">

  <button type="submit">Continue to Shipping</button>
</form>
```

```html
<!-- step-2.html: Shipping address -->
<form data-next-checkout
      data-next-checkout-step="/step-3.html">

  <!-- Review contact from step 1 -->
  <div data-next-enhancer="checkout-review">
    <span data-next-checkout-review="email"></span>
    <a href="/step-1.html">Edit</a>
  </div>

  <input type="text" data-next-checkout-field="address1" placeholder="Address" required>
  <div data-next-component="location">
    <select data-next-checkout-field="country"></select>
    <input type="text" data-next-checkout-field="city"     placeholder="City" required>
    <input type="text" data-next-checkout-field="province" placeholder="State" required>
    <input type="text" data-next-checkout-field="postal"   placeholder="ZIP" required>
  </div>

  <button type="submit">Continue to Payment</button>
</form>
```

```html
<!-- step-3.html: Payment (final step — no data-next-checkout-step) -->
<form data-next-checkout>

  <!-- Review previous steps -->
  <div data-next-enhancer="checkout-review">
    <span data-next-checkout-review="email"></span>
    <address data-next-checkout-review="address1" data-next-format="address"></address>
    <a href="/step-1.html">Edit contact</a>
    <a href="/step-2.html">Edit address</a>
  </div>

  <input type="text" data-next-checkout-field="cc-name"   placeholder="Name on card">
  <input type="text" data-next-checkout-field="cc-number" id="credit_card_number" placeholder="Card number">
  <select           data-next-checkout-field="cc-month"></select>
  <select           data-next-checkout-field="cc-year"></select>
  <input type="text" data-next-checkout-field="cvv"       id="credit_card_cvv" placeholder="CVV">

  <button type="submit">Place Order</button>
</form>
```

## Preserving URL Parameters Across Steps

Session parameters (currency, UTM tags, country) are **automatically carried forward** in the navigation URL when moving between steps. No extra work is needed.

## Step Progress Indicator

Show which step the customer is on using plain HTML and CSS — the step number is tracked in the checkout store but you can also just hard-code the active step per page:

```html
<!-- On information.html: step 1 is active -->
<nav class="checkout-steps">
  <span class="step active">1. Contact</span>
  <span class="step">2. Payment</span>
</nav>

<!-- On payment.html: step 2 is active -->
<nav class="checkout-steps">
  <span class="step complete"><a href="/information.html">1. Contact</a></span>
  <span class="step active">2. Payment</span>
</nav>
```

```css
.checkout-steps {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.step { color: #9ca3af }
.step.active { color: #111827; font-weight: 600 }
.step.complete a { color: #2563eb; text-decoration: none }
```

## Cart Summary Alongside the Form

Place a `data-next-cart-summary` block next to the form on every step so the customer can always see what they're paying for:

```html
<div class="checkout-layout">

  <main>
    <form data-next-checkout data-next-checkout-step="/payment.html">
      <!-- fields -->
      <button type="submit">Continue to Payment</button>
    </form>
  </main>

  <aside>
    <!-- Live cart totals — updates automatically -->
    <div data-next-cart-summary></div>
  </aside>

</div>

<style>
  .checkout-layout {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 2rem;
  }
  @media (max-width: 768px) {
    .checkout-layout { grid-template-columns: 1fr }
  }
</style>
```

## Express Checkout on the First Step

Offer Apple Pay / Google Pay / PayPal on the first page so customers can skip the form entirely:

```html
<!-- Express checkout — above the form on step 1 -->
<div data-next-express-checkout="container">
  <p class="express-label">Express checkout</p>
  <div data-next-express-checkout="buttons"></div>
</div>

<div class="divider"><span>or fill in your details</span></div>

<form data-next-checkout data-next-checkout-step="/payment.html">
  <!-- contact + address fields -->
  <button type="submit">Continue to Payment</button>
</form>
```

Express checkout bypasses both steps and places the order directly. No need to put the express container on the payment page.

## Handling Validation Errors

Each step validates only its own fields when submitted. Errors are shown inline using the same error container classes as a single-page checkout. Add them next to any field you want inline error feedback on:

```html
<input type="email" data-next-checkout-field="email" placeholder="Email" required>
<div class="invalid-email"></div>

<input type="text"  data-next-checkout-field="fname" placeholder="First name" required>
<div class="invalid-fname"></div>
```

See the [Building a Checkout Form](/docs/campaigns/guides/checkout-form) guide for the full list of error container class names.
