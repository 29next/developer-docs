---
sidebar_label: Translations
sidebar_position: 2
title: Translations
---

Theme templates can be fully localized with translations so that your store visitors are shown content in their local language. Use the t (translation) tag in your templates to access string translations in the locale files. Learn more about the [t tag](templates/tags.md#t) and theme Locale files.

### Using Translations in Practice

The `t` tag accepts an initial argument that is the key reference to the translation string in a locale file.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs>
<TabItem value="template" label="Template">

```django
<h2>{% t 'customer.orders.order_history' %}</h2>
```

</TabItem>
<TabItem value="locale" label="en.default.json">

```json
{
    "orders": {
        "order_history": "Order History"
    }
}
```

</TabItem>
<TabItem value="result" label="Result">

```html
<h2>Order History</h2>
```

</TabItem>
</Tabs>


### Passing Variable Arguments to Translations

You can pass multiple named arguments to translations through the `t` tag used in the translation.

<Tabs>
<TabItem value="template" label="Template">

```django
<h2>{% t 'customer.profile.welcome_msg' with name=request.user.first_name %}</h2>
```

</TabItem>
<TabItem value="locale" label="en.default.json">

```json
{
    "customer": {
        "welcome_message": "Hi {{ name }}, welcome to your account!"
    }
}
```

</TabItem>
<TabItem value="result" label="Result">

```html
<h2>Hi John, welcome to your account!</h2>
```

</TabItem>
</Tabs>


### Pluralization Support

The t tag accepts two arguments for pluralization:
- Pass the count argument with a value for cardinal pluralization, ie 1, 2, 3, 4.
- Pass the index argument with a value for ordinal pluralization, ie First, Second, Third, Forth.

Pluralization rules follow [Unicode CLDR](https://github.com/unicode-org/cldr) specification, available keys include:

- `one`
- `other`
- `two`
- `zero`
- `few`
- `many`

#### Cardinal Pluralization

Cardinal pluralization can be used to display different translations based on the value passed to `count`.

<Tabs>
<TabItem value="template" label="Template">

```django
<h2>{% t 'customer.notifcations.total' with count=notification.count %}</h2>
```

</TabItem>
<TabItem value="locale" label="en.default.json">

```json
{
    "customer": {
        "notifcations": {
            "one": "You have {{ count }} notification.",
            "other": "You have {{ count }} notifications.",
            "zero": "You don't have any notifications."
        }
    }
}
```

</TabItem>
<TabItem value="result" label="Result">

```html
<!-- Count is 1 -->
<h2>You have 1 notification.</h2>

<!-- Count is 3 -->
<h2>You have 3 notifications.</h2>

<!-- Count is 0 -->
<h2>You don't have any notifications.</h2>
```

</TabItem>
</Tabs>


#### Ordinal Pluralization

Ordinal pluralization can be used to display different translations based on the index value to display the ordering of an object.

<Tabs>
<TabItem value="template" label="Template">

```django
<h2>{% t 'customer.orders.orders_msg' with index=customer.orders.count %}</h2>
```

</TabItem>
<TabItem value="locale" label="en.default.json">

```json
{
    "customer": {
        "orders_msg": {
            "one": "Congrats on your {{ index }}st order!",
            "two": "Congrats on your {{ index }}nd order!",
            "few": "Congrats on your {{ index }}rd order!",
            "other": "Congrats on your {{ index }}th order!"
        }
    }
}
```

</TabItem>
<TabItem value="result" label="Result">

```html
<!-- Count is 1 -->
<h2>Congrats on your 1st order!</h2>

<!-- Count is 2 -->
<h2>Congrats on your 2nd order!</h2>

<!-- Count is 3 -->
<h2>Congrats on your 3rd order!</h2>

<!-- Count is 4 -->
<h2>Congrats on your 4th order!</h2>
```

</TabItem>
</Tabs>
