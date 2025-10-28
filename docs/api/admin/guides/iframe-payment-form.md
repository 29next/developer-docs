---
title: Bankcard iFrame Payment Form
sidebar_label: Bankcard iFrame
sidebar_position: 2
tags:
 - Guide
---

Custom off-site checkouts can reduce their PCI compliance scope by leveraging our iFrame payment form to tokenize credit cards before submitting them on the Admin API.

:::info
View a fully functional [Demo](https://29next.github.io/demo-iframe-payment-form/) to see all of the concepts in action. The demo source code is also available on [Github](https://github.com/29next/demo-iframe-payment-form/blob/main/index.html).
:::

### Overview

The iframe payment form is pure js library that provides managed fields for the card number and security to safely collect sensitive credit card information. The fields can be styled to match the styles on your external checkout HTML pages to achieve a seamless end user experience.


### Setup

Before you get started, grab your Payments Environment Key available from your store dashboard, navigate to Settings > Payments, we'll use this to map the iFrame to your store's payment environment.

**Card Tokenization Steps**

1. Add Payment Form with card fields (name, card number, expiration, and cvv).
2. Add Spreedly JS and initialize the iFrame on managed fields.
3. Style the iFrame form fields to match your design.
4. Tokenize the card with form submit handler.
5. Retrieve the card token.


:::info
We have partnered with [Spreedly](https://docs.spreedly.com/reference/iframe/v1/#setfieldtype) for all bankcard payments, this guide leverages their iFrame payment documentation and how to use the iFrame JS with our platform.
:::

```html title="Example Payment Form HTML"

<form id="payment-form" action="https://yoursite.com/checkout"
  onsubmit='submitPaymentForm(); return false;'>

  <label for="full_name">Cardholder Name</label>
  <input type="text" id="full_name" name="full_name"><br/>

  <label>Card Number</label>
  <div id="bankcard-number" style="width:225px; height:35px; border: 2px solid"></div><br/>

  <label for="month">Expiration Date</label>
  <input type="text" id="month" name="month" maxlength="2">
  <input type="text" id="year" name="year" maxlength="4"><br/>

  <label>CVV</label>
  <div id="bankcard-cvv" style="width:60px; height:35px; border: 2px solid "></div><br/>

  <input id="submit-button" type="submit" value="Pay Now" disabled>

</form>

```

After you have the form on your page, initialize the iFrame fields on card number and cvv.

```html title="Add JS and Configure"

<script src="https://core.spreedly.com/iframe/iframe-v1.min.js"></script>
<script>
Spreedly.init("<STORE PAYMENT ENVIRONMENT KEY>", {
  "numberEl": "bankcard-number",
  "cvvEl": "bankcard-cvv"
});
</script>
```
:::info
Note how the `numberEl` and `cvvEl` map to div element ids in the form for render the managed fields.
:::

### Style iFrame Fields

For the best end-user experience, it's recommended to customize the iFrame form fields so they blend in with your native form fields.

```js title="Example form customization"
// example styles for iframe fields, accepts any style that can be applied with JS
var style = 'color: #212529; font-size: 1rem; line-height: 1.5; font-weight: 400; \
width: calc(100% - 20px); height: calc(100% - 2px); position: absolute;';

// set placeholders and styles for iframe fields to make UI style
Spreedly.on("ready", function () {
    Spreedly.setFieldType('text');
    Spreedly.setPlaceholder('cvv', "CVV");
    Spreedly.setPlaceholder('number', "Card Number");
    Spreedly.setNumberFormat('prettyFormat');
    Spreedly.setStyle('cvv', style);
    Spreedly.setStyle('number', style);

    submitBtn.removeAttribute('disabled');
});

```

### Tokenize Card

Tokenize the card with your form submission handler, `tokenizeCreditCard` method requires that the `requiredFields` are passed as an object for form validation.

```js title="Tokenize Card on Form Submit"

function submitPaymentForm() {
    var requiredFields = {};
    // Get required, non-sensitive, values from host page form
    requiredFields["full_name"] = document.getElementById("full_name").value;
    requiredFields["month"] = document.getElementById("month").value;
    requiredFields["year"] = document.getElementById("year").value;
    // tokenize the card
    Spreedly.tokenizeCreditCard(requiredFields);
}
```


### Retrieve Card Token

When a card has been tokenized, the `paymentMethod` event is fired that includes the generated payment method token as well as the details of the payment method record. **Use the token from your custom checkout backend to send to the Admin API when creating the order.**


```js title="Retrieve Card Token"

Spreedly.on('paymentMethod', function (token, pmData) {
    // create your own handler to capture the token and send to your backend
    console.log(token);
    console.log(pmData);
});
```

### Error Handling

When a card fails validation, the `errors` event is fired which includes an array of objects with `attribute`, `key`, and `message` fields describing the errors for each field.

```js title="Error Handling"

Spreedly.on('errors', function(errors) {
  // add your own error handler to show errors to users so they can fix them
  for (var i=0; i < errors.length; i++) {
    var error = errors[i];
    console.log(error);
  };
});
```

```json title="Example Errors"
[
  {
    "attribute":"first_name",
    "key":"errors.blank",
    "message":"First name can't be blank"
  }, {
    "attribute":"last_name",
    "key":"errors.blank",
    "message":"Last name can't be blank"
  }
]
```

### Customizing the iFrame Fields

The iFrame fields can be customized the style to match your site styles. See the [demo](https://github.com/29next/demo-iframe-payment-form/blob/main/index.html) for a full example of how to customize the iframe fields.

#### setField Type

Set the input type of the iFrame fields. This is useful to when you want different keyboards to display on mobile devices.

By default, the iFrame fields are set to type=number, which displays the numerical keyboard in most browsers on most mobile devices. However, behavior does vary by browser. If you’d like to manually control the input field type you can do so with setFieldType.

**Arguments**

| Name | Description |
| --- | --- |
| field | The iFrame field to set the placeholder. Can be one of number or cvv. |
| type | The input field type. Can be one of number, text or tel. |

```js title="setFieldType"
Spreedly.on('ready', function() {
  Spreedly.setFieldType("number", "tel");
});
```

#### setNumberFormat

Set the card number format. If set to prettyFormat, the card number value will include spaces in the credit card number as they appear on a physical card. **The number field must be set to type text or tel for pretty formatting to take effect.**

**Arguments**

| Format | User Input | Display |
| --- | --- | --- |
| prettyFormat | `4111111111111111` | `4111 1111 1111 1111` |
| plainFormat (default) | `4111111111111111` | `4111111111111111` |
| maskedFormat | `4111111111111111` | `****************` |

```js title="setNumberFormat"
// Pretty format
Spreedly.on('ready', function() {
  Spreedly.setFieldType("number", "text");
  Spreedly.setNumberFormat("prettyFormat");
});

// Masked format
Spreedly.on('ready', function() {
  Spreedly.setFieldType("cvv", "text");
  Spreedly.setFieldType("number", "text");
  Spreedly.setNumberFormat("maskedFormat");
});
```

#### setPlaceholder

Style iFrame fields’ placeholder text if page design requires so.

**Arguments**

| Name | Description |
| --- | --- |
| field | The iFrame field to set the placeholder. Can be one of number or cvv. |
| placeholder | The placeholder text value. |

```js title="setPlaceholder"
Spreedly.on('ready', function() {
  Spreedly.setPlaceholder("number", "Card");
  Spreedly.setPlaceholder("cvv", "CVV");
});
```

#### setStyle

Style iFrame fields using CSS. More than one invocation of setStyle can be used per field to organize and better structure styling directives.

**Arguments**

| Name | Description |
| --- | --- |
| field | The iFrame field to set the placeholder. Can be one of number or cvv. |
| css | The CSS to apply. Should be vanilla CSS, -moz-appearance, or -webkit-appearance. All CSS properties should be constructed as a single string. |

```js title="setStyle"
Spreedly.on("ready", function() {
  Spreedly.setStyle("number", "width:225px;  height:35px;");
  Spreedly.setStyle("number", "font-size: 20px; text-align: center");
  Spreedly.setStyle("cvv", "width:60px;  height:35px;");
});
```
:::caution
Importing external fonts or images is not supported due to CORS restrictions.
:::

#### transferFocus

Set the cursor focus to one of the iFrame fields. This is useful if you want to load your form with the card number field already in focus, or if you want to auto-focus one of the iFrame fields if they contain an input error.

```js title="transferFocus"
Spreedly.transferFocus("number");
```

**Arguments**

| Name | Description |
| --- | --- |
| field | The iFrame field to set the placeholder. Can be one of number or cvv. |


#### toggleAutoComplete

Toggle autocomplete functionality for card number and cvv fields. **By default, the autocomplete attribute is enabled**, so the first call of this function will disable autocomplete

```js title="toggleAutoComplete"
Spreedly.toggleAutoComplete();
```
