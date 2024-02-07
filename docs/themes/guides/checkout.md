---
sidebar_label: Checkout Customization
sidebar_position: 1
tags:
 - Guide
---
# Checkout Customization

Theme developers can customize the store checkout flow using the `checkout.html` template which provides several methods to override and customize the user experience.

### Template Location

The `checkout.html` template is located in the `checkout` directory of a theme.

```title="Checkout Template Location"
checkout
  └── checkout.html
```

### Base Template


```django title="Checkout Base Template"
<html lang="{{ LANGUAGE_CODE|default:'en' }}" class="{% block html_class %}{% endblock %}">
    <head>
        <title>{% block title %}{% endblock %}</title>
        <link rel="alternate" hreflang="{{ LANGUAGE_CODE }}" href="https://{{ request.get_host }}{{ request.path }}" />

        {% image_thumbnail shop_icon "32x32" as thumb %}
        <link rel="shortcut icon" href="{{ thumb.url }}" />

        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="created" content="{% now "jS M Y h:i" %}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="NOARCHIVE,NOCACHE" />
        {% block stylesheet %}{% endblock %}
        {% app_hook 'global_header' %}
    </head>
    <body class="{% block body_class %}{% endblock %}">
        <div class="checkout">
            <header class="checkout_header--banner">
                {% block banner_header %}{% endblock %}
            </header>

            {% block order_summary_toggle %}{% endblock %}

            <div class="checkout_main">
                <div class="checkout_container">
                    <div class="checkout_container--main">
                        <div class="checkout_steps">
                            <div class="checkout_steps--inner">
                                <div class="checkout_steps--content">
                                    <header class="checkout_header" role="banner">
                                        {% block checkout_header %}{% endblock %}
                                    </header>
                                    {% block checkout_nav %}{% endblock %}
                                    <main class="checkout_steps--main-content" role="main">
                                        {% block checkout_content %}{% endblock %}
                                    </main>
                                    <footer class="checkout_footer">
                                        {% block checkout_footer %}{% endblock %}
                                    </footer>
                                </div>
                            </div>
                        </div>
                        <aside id="order_summary" class="checkout_summary" role="complementary">
                            <div class="checkout_summary--inner">
                                {% block order_summary_sidebar %}{% endblock %}
                            </div>
                        <aside>
                    </div>
                </div>
            </div>
        </div>
        {% block tracking_code %}{% endblock %}
        {% block checkout_js %}{% endblock %}

        {% app_hook 'global_footer' %}
        {% if checkout.step == 'information' %}
            {% app_hook 'start_checkout' %}
        {% endif %}

        {% if checkout.step == 'payment' %}
        {% endif %}

        {% if checkout.step == 'confirmation' %}
            {% app_hook 'complete_checkout' %}
        {% endif %}

    </body>
</html>
```

### Steps

| Step           | Description                          |
| -----------    | ------------------------------------ |
| Information    | The first step in the checkout flow where the user is presented with their existing addresses and/or a form to add their address for their order.  |
| Shipping       | User is presented with available shipping methods for their order that align with their shipping country the fulfillment partner for their order. **Note**, If there is only one shipping option available, this page is omitted entirely and not shown.  |
| Payment        | The payment page presents the available payment methods for the order. |
| Preview        | In the case the order does not require payment, the Preview page is shown instead allowing the user to submit their free order. |
| Confirmation        | The confirmation page presents a full order summary and shipping details for any shippable goods in the order. |


### Blocks

| Block Name            | Required | Description                          |
| -----------           | --- | ------------------------------------ |
| checkout_content      | Yes | The main content of the checkout page which includes the forms, shipping and payment methods. |
| checkout_js           | Yes | The core javascript used in the checkout flow steps and UI interactions. |
| order_summary_sidebar | Yes | Order summary in sidebar. |
| html_class            | No | A class rendered by the backend to conditionally show if the store has a logo or banner.  |
| title                 | No | The title of the page generated from the backend. |
| stylesheet            | No | Core built in stylesheets to show, highly recommended to keep this in place. |
| banner_header         | No | Banner area that is above the main checkout flow body, works in combination with `has-banner` html class.  |
| order_summary_toggle  | No | HTML markup used to show the order summary on mobile.  |
| checkout_nav          | No | Breadcrumb navigation display the current checkout step. |
| checkout_footer       | No | Store policies and copyright notice. |
| tracking_code         | No | Javascript tracking integrations codes that render to the templates. |



### Customization

The checkout template is customizable with many different ways to customize the design and content to suite your brands needs.

#### Step Specific Content
To render content or tracking scripts on a specific step, use conditionals in combination with the `checkout.step` context to render content on a specific step.

```html title="Conditionally Render Content per Step"
{% if checkout.step == 'information' %}
 <!-- Any kind of HTML here -->
{% endif %}

```

#### Add Custom Checkbox

To add a custom checkbox before order submission, you can use a step conditional and javascript to inject your checkbox before the order completion button.

```html title="Adding a Custom Checkbox Before Payment"
<script>
{% if checkout.step == "payment" %}
    (function(){
        var checkbox = `
            <div class="card-body">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" name="age_agree" class="custom-control-input" id="age_agree" required="">
                    <label class="custom-control-label" for="age_agree">Example Custom Checkbox</label>
                </div>
            </div>
        `
        var checkboxNode = document.createElement("div")
        checkboxNode.className = "checkout_steps--section"
        checkboxNode.innerHTML = checkbox
        var parentNode = document.getElementsByClassName('checkout_steps--payment')[0]
        var checkoutFooterNode = document.getElementsByClassName('checkout_steps--footer')[0]
        parentNode.insertBefore(checkboxNode, checkoutFooterNode)
    })();
{% endif %}
</script>
```

#### Add Conversion Tracking Script

It is common to include scripts that track sales conversions on the order status page because it is the final page of checkout. However, customers who return to check their order status might count as a second sale in your analytics.

To prevent your analytics from counting customers more than once, you can add the send_analytics_event property around some or all of your additional scripts. To do this, use a Django if statement, and place any scripts that you only want to run once between `{% if send_analytics_event %}` and `{% endif %}` tags.

``` django

    {% if send_analytics_event %}
    // Conversion scripts you want to run only once
    {% endif %}

    // Scripts you want to run on every visit

```

For example if you wanted to add a conversion action in Google Ads for tracking purchases (To set up Google Ads conversion tracking, follow the [Google Ads instructions](https://support.google.com/google-ads/answer/6095821){:target="_blank"} for creating a conversion action).

``` django
{% if send_analytics_event %}

<!-- Event snippet for Example conversion page -->
<script>
    gtag('event', 'conversion', {'send_to': 'AW-CONVERSION_ID/AW-CONVERSION_LABEL',
    'value': '{{ order.total_incl_tax }}',
    'currency': '{{ order.currency }}'
    });
</script>

{% endif %}

// Scripts you want to run on every visit

```
