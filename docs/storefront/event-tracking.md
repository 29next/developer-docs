---
title: Event Tracking
sidebar_label: Event Tracking
sidebar_position: 3
---


## Overview
Event Tracking allows merchants and third-party integrations to subscribe to customer engagement events on your storefront for robust customer behavior tracking.


## Getting Started
To add new custom Event Trackers, in your store go to Settings > Tracking Events > Add Event Tracker.

```javascript title="Example Product Added to Cart Event"

analytics.subscribe("product_added_to_cart", event => {
    console.log(event);
});
```

Go to your storefront and add a product to your cart, you'll now see data from your event tracker logged in the console. :tada:

## Including External Scripts

Event trackers are pure javascript, meaning third-party event tracking scripts sometimes need some adjustment before they can be added.

```html title="Original Google Analytics HTML Script Tag"
<script async src="https://www.googletagmanager.com/gtag/js?id=G-EXAMPLE"></script>
```

Below is the equivalent expressed as a javascript function to create and append the script tag to the document head.

```javascript title="Converetd Javascript Script Tag"
(function() {
  var script = document.createElement('script');
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-EXAMPLE";
  document.head.appendChild(script);
})();
```
We can now use this to include the Google Analytics javascript in our event tracker.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Init

Init is utility method to produce context of the current request/session with details of a `cart`, `store`, or `user` as a JSON object. Use the init method to add context to event tracking integrations.

<Tabs>
<TabItem value="initCart" label="Init Cart (init.cart)">

Use `init.cart` to load context of the current cart data as a JSON object.

```javascript
console.log(init.cart);
```

<details>
  <summary>Init Cart Data</summary>
  <div>

```javascript
{
    "id": 1000,
    "status": "open",
    "lines": [
        {
            "id": 1000,
            "product_id": 111,
            "sku": "TIMELESS-WATCH",
            "product_title": "Timeless Watch",
            "product_image": "https://d36qjeq4w.cloudfront.net/media/..../product.jpg",
            "product_url": "https://amazingwidgets.com/catalogue/timeless-watch_2/",
            "variant_id": 2,
            "variant_title": "Black Band",
            "quantity": 2,
            "currency": "USD",
            "price_excl_tax": "45.76",
            "price_incl_tax": "45.76",
            "total_discount": "0.00",
            "is_upsell": false,
            "interval": null,
            "interval_count": null,
            "metadata": {}
        }
    ],
    "abandoned": true,
    "total_incl_tax": "45.76",
    "total_excl_tax": "45.76",
    "total_discount": "0.00",
    "currency": "USD",
    "user": {
        "id": 1000,
        "email": "johndoe@gmail.com",
        "first_name": "John",
        "last_name": "Doe",
        "ip": "123.123.123.123",
        "phone_number": "+12706814477",
        "date_joined": "2023-03-15T06:27:46.253558-04:00",
        "language": "en",
        "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36...."
    },
    "voucher_discounts": [],
    "attribution": {
        "agent": null,
        "funnel": null,
        "utm_source": null,
        "utm_medium": null,
        "utm_campaign": null,
        "utm_term": null,
        "utm_content": null,
        "gclid": null,
        "metadata": {},
        "affiliate": null,
        "subaffiliate1": null,
        "subaffiliate2": null,
        "subaffiliate3": null,
        "subaffiliate4": null,
        "subaffiliate5": null
    },
    "checkout_url": "https://amazingwidgets.com/accounts/complete-order/549167as8232c/",
    "created_at": "2025-03-18T05:27:46.765627-04:00",
    "metadata": {}
}

```

</div>
</details>

</TabItem>
<TabItem value="initStore" label="Init Store (init.store)">

Use `init.store` to load context of the store public data as a JSON object.

```javascript
console.log(init.store);
```

<details>
  <summary>Init Store Data</summary>
  <div>

```json
{
    "name": "Amazing Widgets",
    "tagline": "Amazing Widget and Deals",
    "timezone": "US/Eastern",
    "contact_address": {
        "company_name": "Amazing Widgets LLC",
        "line1": "2200 Western Pl W",
        "line2": "",
        "postcode": "42304",
        "city": "Hop Top",
        "state": "KY",
        "country": "United States",
        "phone_number": "(270) 686-4455"
    },
    "primary_domain": "amazingwidgets.com",
    "tax_id": "",
    "available_languages": [
        {
            "code": "en",
            "label": "English"
        },
        {
            "code": "fr",
            "label": "Français"
        }
    ],
    "available_currencies": [
        {
            "code": "USD",
            "label": "$ USD"
        },
        {
            "code": "CAD",
            "label": "CA$ CAD"
        }
    ],
    "payments": {
        "environment_key": "X1lbCiGPapQbN11W3tig4OOTRVD"
    }
}
```

</div>
</details>

</TabItem>
<TabItem value="initUser" label="Init User (init.user)">

Use `init.user` to load context of the current authenticated user as a JSON object.

```javascript
console.log(init.user);
```

<details>
  <summary>Init User Data</summary>
  <div>

```json
{
    "id": 1000,
    "email": "johndoe@gmail.com",
    "first_name": "John",
    "last_name": "Doe",
    "ip": "123.123.123.123",
    "phone_number": "+12706814477",
    "date_joined": "2023-03-15T06:27:46.253558-04:00",
    "language": "en",
    "is_blocked": false,
    "addresses": [
        {
            "id": 1001,
            "first_name": "John",
            "last_name": "Doe",
            "line1": "2200 Western Pl W",
            "line2": "",
            "line3": "",
            "line4": "Hoptown",
            "state": "KY",
            "postcode": "42234",
            "country": "US",
            "phone_number": "",
            "notes": "",
            "is_default_for_shipping": true,
            "is_default_for_billing": true
        }
    ],
    "orders_count": 1,
    "subscriptions_count": 1,
    "total_spent": "100.00",
    "user_type": "customer",
    "tags": [],
    "accepts_marketing": true,
    "metadata": {},
    "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36..."
}
```

</div>
</details>

</TabItem>
</Tabs>

## Context

All events have `context` of the parent frame to easily access contextual data about where and how the event occurred.

| Property | Description | Reference |
|-------------|------------------------|---------------|
| `document`  | Data from the top-frame `document` object (e.g., title, referrer). | [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) |
| `navigator` | Data from the top-frame `navigator` object (e.g., userAgent, language). | [Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator) |
| `window`    | Data from the top-frame `window` object (e.g., innerWidth, location). | [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window) |

```json title="Example conext object"
{
    "context": {
        "document": {...}, // frame parent document 
        "navigator": {...}, // frame parent navigator 
        "window": {...} // frame parent window 
    }
}
```

## Available Tracking Events


### page_viewed
```javascript
analytics.subscribe("page_viewed", event => {
    console.log("Event data ", event.data);
});
```
<details>
  <summary>Event Data</summary>
  <div>

```json
{
    "object": "page",
    "context": {
        "document": {...}, // frame parent document 
        "navigator": {...}, // frame parent navigator 
        "window": {...} // frame parent window 
    },
    "data": {},
    "event_type": "page_viewed",
    "timestamp": "2024-12-09T06:42:47.750998+00:00",
    "event_version": "2024-04-01"
}
```

</div>
</details>

### product_category_viewed
```javascript
analytics.subscribe("product_category_viewed", event => {
    console.log("Event data ", event.data);
});
```

<details>
  <summary>Event Data</summary>
  <div>

```json
{
    "object": "products",
    "context": {
        "document": {...}, // frame parent document 
        "navigator": {...}, // frame parent navigator 
        "window": {...} // frame parent window 
    },
    "data": [
        {
            "id": 111,
            "url": "https://examplestore.com/catalogue/timeless-watch_111/",
            "title": "Timeless Watch",
            "slug": "timeless-watch",
            "sku": null,
            "track_stock": true,
            "allow_backorders": false,
            "structure": "parent",
            "is_discountable": true,
            "is_public": true,
            "ranking": 10,
            "categories": [
                {
                    "id": 1,
                    "name": "Example Category",
                    "slug": "example-category"
                }
            ],
            "enable_subscription": true,
            "interval": "day",
            "interval_counts": [
                90,
                60,
                30
            ],
            "images": [
                {
                    "id": 2,
                    "original": "https://assets.29nex.store/media/demostore/images/products/2021/03/watch.jpg",
                    "caption": "",
                    "display_order": 0,
                    "product": 111
                }
            ],
            "unit_cost": "0.00",
            "prices": [],
            "requires_shipping": true,
            "recommended_products": [
                3,
                47
            ],
            "upc": "",
            "external_tax_code": null,
            "variant_attributes": [],
            "variants": [
                {
                    "id": 2,
                    "product_id": 111,
                    "title": "Timeless Watch",
                    "sku": "TIMELESS-WATCH-B-BL",
                    "track_stock": true,
                    "allow_backorders": false,
                    "images": [
                        {
                            "id": 2,
                            "original": "https://assets.29nex.store/media/demostore/images/products/2021/03/watch.jpg",
                            "caption": "",
                            "display_order": 0,
                            "product": 111
                        }
                    ],
                    "variant_attribute_values": [],
                    "prices": [
                        {
                            "currency": "CAD",
                            "price": "99.99",
                            "retail": null,
                            "subscription": "65.99",
                            "subscription_suggested_downsell": "55.99"
                        },
                        {
                            "currency": "GBP",
                            "price": "99.99",
                            "retail": "99.99",
                            "subscription": null,
                            "subscription_suggested_downsell": null
                        },
                        {
                            "currency": "USD",
                            "price": "79.99",
                            "retail": "120.00",
                            "subscription": "69.99",
                            "subscription_suggested_downsell": "49.99"
                        }
                    ],
                    "stockrecords": [
                        {
                            "id": 16,
                            "location_id": 1,
                            "num_in_stock": 9995,
                            "num_allocated": 169,
                            "low_stock_threshold": 500
                        },
                        {
                            "id": 77,
                            "location_id": 299,
                            "num_in_stock": 997,
                            "num_allocated": 39,
                            "low_stock_threshold": 10
                        }
                    ],
                    "unit_cost": "1.00",
                    "date_created": "2017-09-28T08:23:08.368000-04:00",
                    "date_updated": "2024-11-26T03:11:56.747405-05:00",
                    "metadata": {
                        "external_id": "12345"
                    }
                }
            ],
            "rating": 5,
            "date_created": "2024-01-24T02:02:52.811742-05:00",
            "date_updated": "2024-10-03T04:32:52.860659-04:00",
            "metadata": {
                "external_id": "12345"
            }
        }
    ],
    "event_type": "product_category_viewed",
    "timestamp": "2024-12-09T06:44:29.959402+00:00",
    "event_version": "2024-04-01"
}
```

</div>
</details>


### product_viewed
```javascript
analytics.subscribe("product_viewed", event => {
    console.log("Event data ", event.data);
});
```

<details>
  <summary>Event Data</summary>
  <div>

```json

{
    "object": "product",
    "context": {
        "document": {...}, // frame parent document 
        "navigator": {...}, // frame parent navigator 
        "window": {...} // frame parent window 
    },
    "data": {
        "id": 111,
        "url": "https://examplestore.com/catalogue/timeless-watch_111/",
        "title": "Timeless Watch",
        "slug": "timeless-watch",
        "is_discountable": true,
        "is_public": true,
        "ranking": 10,
        "categories": [
            {
                "id": 1,
                "name": "Example Category",
                "slug": "example-category"
            }
        ],
        "enable_subscription": true,
        "interval": "day",
        "interval_counts": [
            30,
            60,
            90
        ],
        "images": [
            {
                "id": 2,
                "original": "https://assets.29nex.store/media/demostore/images/products/2021/03/watch.jpg",
                "caption": "",
                "display_order": 0,
                "product": 111
            }
        ],
        "requires_shipping": true,
        "recommended_products": [
            3,
            47
        ],
        "upc": "",
        "external_tax_code": null,
        "variant_attributes": [],
        "variants": [
            {
                "id": 2,
                "product_id": 111,
                "title": "Timeless Watch",
                "sku": "TIMELESS-WATCH-B-BL",
                "track_stock": true,
                "allow_backorders": false,
                "images": [
                    {
                        "id": 2,
                        "original": "https://assets.29nex.store/media/demostore/images/products/2021/03/watch.jpg",
                        "caption": "",
                        "display_order": 0,
                        "product": 111
                    }
                ],
                "variant_attribute_values": [],
                "prices": [
                    {
                        "currency": "USD",
                        "price": "79.99",
                        "retail": "120.00",
                        "subscription": "69.99",
                        "subscription_suggested_downsell": "49.99"
                    }
                ],
                "stockrecords": [
                    {
                        "id": 16,
                        "location_id": 1,
                        "num_in_stock": 9995,
                        "num_allocated": 169,
                        "low_stock_threshold": 500
                    }
                ],
                "unit_cost": "1.00",
                "date_created": "2017-09-28T08:23:08.368000-04:00",
                "date_updated": "2024-11-26T03:11:56.747405-05:00",
                "metadata": {
                    "external_id": "12345"
                }
            }
        ],
        "rating": 5,
        "date_created": "2024-01-24T02:02:52.811742-05:00",
        "date_updated": "2024-10-03T04:32:52.860659-04:00",
        "metadata": {
            "excerpt": "<div>Product conent.</div>",
            "special": "Special Promo",
            "external_id": "12345"
        }
    },
    "event_type": "product_viewed",
    "timestamp": "2024-12-09T06:46:18.993008+00:00",
    "event_version": "2024-04-01"
}
```

</div>
</details>


### product_added_to_cart
```javascript
analytics.subscribe("product_added_to_cart", event => {
    console.log("Event data ", event.data);
});
```

<details>
  <summary>Event Data</summary>
  <div>

```json
{
    "object": "cart_line",
    "context": {
        "document": {...}, // frame parent document 
        "navigator": {...}, // frame parent navigator 
        "window": {...} // frame parent window 
    },
    "data": {
        "currency": "USD",
        "interval": null,
        "interval_count": null,
        "is_upsell": false,
        "price_excl_tax": "79.99",
        "price_incl_tax": "79.99",
        "product_id": 111,
        "product_image": "https://assets.29nex.store/media/demostore/images/products/2021/03/watch.jpg",
        "product_title": "Timeless Watch",
        "product_url": "https://examplestore.com/catalogue/timeless-watch_2/",
        "quantity": 1,
        "sku": "TIMELESS-WATCH-B-BL",
        "total_discount": "0.00",
        "variant_id": 2,
        "variant_title": ""
    },
    "event_type": "product_added_to_cart",
    "timestamp": "2024-12-09T06:46:36.510579+00:00",
    "event_version": "2024-04-01"
}
```

</div>
</details>

### product_removed_from_cart
```javascript
analytics.subscribe("product_removed_from_cart", event => {
    console.log("Event data ", event.data);
});
```

<details>
  <summary>Event Data</summary>
  <div>

```json
{
    "object": "cart_line",
    "context": {
        "document": {...}, // frame parent document 
        "navigator": {...}, // frame parent navigator 
        "window": {...} // frame parent window 
    },
    "data": {
        "currency": "USD",
        "interval": null,
        "interval_count": null,
        "is_upsell": false,
        "price_excl_tax": "79.99",
        "price_incl_tax": "79.99",
        "product_id": 111,
        "product_image": "https://assets.29nex.store/media/demostore/images/products/2021/03/watch.jpg",
        "product_title": "Timeless Watch",
        "product_url": "https://examplestore.com/catalogue/timeless-watch_2/",
        "quantity": 1,
        "sku": "TIMELESS-WATCH-B-BL",
        "total_discount": "0.00",
        "variant_id": 2,
        "variant_title": ""
    },
    "event_type": "product_removed_from_cart",
    "timestamp": "2024-12-09T06:47:05.202043+00:00",
    "event_version": "2024-04-01"
}
```

</div>
</details>

### checkout_started
```javascript
analytics.subscribe("checkout_started", event => {
    console.log("Event data ", event.data);
});
```

<details>
  <summary>Event Data</summary>
  <div>

```json
{
    "object": "checkout",
    "context": {
        "document": {...}, // frame parent document 
        "navigator": {...}, // frame parent navigator 
        "window": {...} // frame parent window 
    },
    "data": {
        "number": null,
        "status": null,
        "fulfillment_status": null,
        "payment_status": null,
        "is_test": null,
        "lines": [
            {
                "product_id": 111,
                "sku": "TIMELESS-WATCH-B-BL",
                "product_title": "Timeless Watch",
                "product_image": "https://assets.29nex.store/media/demostore/images/products/2021/03/watch.jpg",
                "product_url": "https://examplestore.com/catalogue/timeless-watch_2/",
                "variant_id": 2,
                "variant_title": "",
                "quantity": 1,
                "currency": "USD",
                "price_excl_tax": "79.99",
                "price_incl_tax": "79.99",
                "total_discount": "0.00",
                "is_upsell": false,
                "interval": null,
                "interval_count": null
            }
        ],
        "shipping_method": null,
        "shipping_code": null,
        "total_incl_tax": "79.99",
        "total_excl_tax": "79.99",
        "total_discount": "0.00",
        "shipping_incl_tax": null,
        "shipping_excl_tax": null,
        "total_cost": null,
        "total_tax": null,
        "shipping_tax": null,
        "display_taxes": null,
        "currency": "USD",
        "user": null,
        "shipping_address": null,
        "billing_address": null,
        "date_placed": null,
        "offer_discounts": [],
        "voucher_discounts": [],
        "attribution": {
            "agent": null,
            "funnel": null,
            "utm_source": null,
            "utm_medium": null,
            "utm_campaign": null,
            "utm_term": null,
            "utm_content": null,
            "gclid": null,
            "metadata": {},
            "affiliate": null,
            "subaffiliate1": null,
            "subaffiliate2": null,
            "subaffiliate3": null,
            "subaffiliate4": null,
            "subaffiliate5": null
        },
        "metadata": {},
        "transactions": null,
        "order_status_url": null
    },
    "event_type": "checkout_started",
    "timestamp": "2024-12-09T06:58:34.676675+00:00",
    "event_version": "2024-04-01"
}

```

</div>
</details>


### checkout_contact_info_submitted
```javascript
analytics.subscribe("checkout_contact_info_submitted", event => {
    console.log("Event data ", event.data);
});
```
<details>
  <summary>Event Data</summary>
  <div>

```json
{
    "object": "checkout",
    "context": {
        "document": {...}, // frame parent document 
        "navigator": {...}, // frame parent navigator 
        "window": {...} // frame parent window 
    },
    "data": {
        "number": null,
        "status": null,
        "fulfillment_status": null,
        "payment_status": null,
        "is_test": null,
        "lines": [
            {
                "product_id": 111,
                "sku": "TIMELESS-WATCH-B-BL",
                "product_title": "Timeless Watch",
                "product_image": "https://assets.29nex.store/media/demostore/images/products/2021/03/watch.jpg",
                "product_url": "https://examplestore.com/catalogue/timeless-watch_2/",
                "variant_id": 2,
                "variant_title": "",
                "quantity": 1,
                "currency": "USD",
                "price_excl_tax": "79.99",
                "price_incl_tax": "79.99",
                "total_discount": "0.00",
                "is_upsell": false,
                "interval": null,
                "interval_count": null
            }
        ],
        "shipping_method": null,
        "shipping_code": null,
        "total_incl_tax": "79.99",
        "total_excl_tax": "79.99",
        "total_discount": "0.00",
        "shipping_incl_tax": null,
        "shipping_excl_tax": null,
        "total_cost": null,
        "total_tax": null,
        "shipping_tax": null,
        "display_taxes": null,
        "currency": "USD",
        "user": {
            "id": 123456,
            "email": "customer@gmail.com",
            "ip": "182.82.112.1",
            "first_name": null,
            "last_name": null,
            "phone_number": null,
            "accepts_marketing": true,
            "language": "en",
            "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
        },
        "shipping_address": null,
        "billing_address": null,
        "date_placed": null,
        "offer_discounts": [],
        "voucher_discounts": [],
        "attribution": {
            "agent": null,
            "funnel": null,
            "utm_source": null,
            "utm_medium": null,
            "utm_campaign": null,
            "utm_term": null,
            "utm_content": null,
            "gclid": null,
            "metadata": {},
            "affiliate": null,
            "subaffiliate1": null,
            "subaffiliate2": null,
            "subaffiliate3": null,
            "subaffiliate4": null,
            "subaffiliate5": null
        },
        "metadata": {},
        "transactions": null,
        "order_status_url": null
    },
    "event_type": "checkout_contact_info_submitted",
    "timestamp": "2024-12-09T06:58:34.676675+00:00",
    "event_version": "2024-04-01"
}
```

</div>
</details>


### checkout_shipping_address_submitted
```javascript
analytics.subscribe("checkout_shipping_address_submitted", event => {
    console.log("Event data ", event.data);
});
```

<details>
  <summary>Event Data</summary>
  <div>

```json
{
    "object": "checkout",
    "context": {
        "document": {...}, // frame parent document 
        "navigator": {...}, // frame parent navigator 
        "window": {...} // frame parent window 
    },
    "data": {
        "number": null,
        "status": null,
        "fulfillment_status": null,
        "payment_status": null,
        "is_test": null,
        "lines": [
            {
                "product_id": 111,
                "sku": "TIMELESS-WATCH-B-BL",
                "product_title": "Timeless Watch",
                "product_image": "https://assets.29nex.store/media/demostore/images/products/2021/03/watch.jpg",
                "product_url": "https://examplestore.com/catalogue/timeless-watch_2/",
                "variant_id": 2,
                "variant_title": "",
                "quantity": 1,
                "currency": "USD",
                "price_excl_tax": "79.99",
                "price_incl_tax": "79.99",
                "total_discount": "0.00",
                "is_upsell": false,
                "interval": null,
                "interval_count": null
            }
        ],
        "shipping_method": null,
        "shipping_code": null,
        "total_incl_tax": "79.99",
        "total_excl_tax": "79.99",
        "total_discount": "0.00",
        "shipping_incl_tax": null,
        "shipping_excl_tax": null,
        "total_cost": null,
        "total_tax": null,
        "shipping_tax": null,
        "display_taxes": null,
        "currency": "USD",
        "user": {
            "id": 123456,
            "email": "customer@gmail.com",
            "ip": "182.82.112.1",
            "first_name": "John",
            "last_name": "Doe",
            "phone_number": null,
            "accepts_marketing": true,
            "language": "en",
            "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
        },
        "shipping_address": {
            "id": 7851,
             "first_name": "John",
            "last_name": "Doe",
            "line1": "2200 Western Pl",
            "line2": "",
            "line3": "",
            "line4": "Henderson",
            "postcode": "42304",
            "phone_number": "+18123158899",
            "notes": "",
            "state": "KY",
            "country": "US"
        },
        "billing_address": null,
        "date_placed": null,
        "offer_discounts": [],
        "voucher_discounts": [],
        "attribution": {
            "agent": null,
            "funnel": null,
            "utm_source": null,
            "utm_medium": null,
            "utm_campaign": null,
            "utm_term": null,
            "utm_content": null,
            "gclid": null,
            "metadata": {},
            "affiliate": null,
            "subaffiliate1": null,
            "subaffiliate2": null,
            "subaffiliate3": null,
            "subaffiliate4": null,
            "subaffiliate5": null
        },
        "metadata": {},
        "transactions": null,
        "order_status_url": null
    },
    "event_type": "checkout_shipping_address_submitted",
    "timestamp": "2024-12-26T06:46:36.936236+00:00",
    "event_version": "2024-04-01"
}
```

</div>
</details>


### checkout_shipping_method_submitted
```javascript
analytics.subscribe("checkout_shipping_method_submitted", event => {
    console.log("Event data ", event.data);
});
```
<details>
  <summary>Event Data</summary>
  <div>

```json
{
    "object": "checkout",
    "context": {
        "document": {...}, // frame parent document 
        "navigator": {...}, // frame parent navigator 
        "window": {...} // frame parent window 
    },
    "data": {
        "number": null,
        "status": null,
        "fulfillment_status": null,
        "payment_status": null,
        "is_test": null,
        "lines": [
            {
                "product_id": 111,
                "sku": "TIMELESS-WATCH-B-BL",
                "product_title": "Timeless Watch",
                "product_image": "https://assets.29nex.store/media/demostore/images/products/2021/03/watch.jpg",
                "product_url": "https://examplestore.com/catalogue/timeless-watch_2/",
                "variant_id": 2,
                "variant_title": "",
                "quantity": 1,
                "currency": "USD",
                "price_excl_tax": "79.99",
                "price_incl_tax": "79.99",
                "total_discount": "0.00",
                "is_upsell": false,
                "interval": null,
                "interval_count": null
            }
        ],
        "shipping_method": "Express 1-2 Days",
        "shipping_code": "express",
        "total_incl_tax": "79.99",
        "total_excl_tax": "79.99",
        "total_discount": "0.00",
        "shipping_incl_tax": null,
        "shipping_excl_tax": null,
        "total_cost": null,
        "total_tax": null,
        "shipping_tax": null,
        "display_taxes": null,
        "currency": "USD",
        "user": {
            "id": 123456,
            "email": "customer@gmail.com",
            "ip": "182.82.112.1",
            "first_name": "John",
            "last_name": "Doe",
            "phone_number": null,
            "accepts_marketing": true,
            "language": "en",
            "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
        },
        "shipping_address": {
            "id": 7851,
             "first_name": "John",
            "last_name": "Doe",
            "line1": "2200 Western Pl",
            "line2": "",
            "line3": "",
            "line4": "Henderson",
            "postcode": "42304",
            "phone_number": "+18123158899",
            "notes": "",
            "state": "KY",
            "country": "US"
        },
        "billing_address": null,
        "date_placed": null,
        "offer_discounts": [],
        "voucher_discounts": [],
        "attribution": {
            "agent": null,
            "funnel": null,
            "utm_source": null,
            "utm_medium": null,
            "utm_campaign": null,
            "utm_term": null,
            "utm_content": null,
            "gclid": null,
            "metadata": {},
            "affiliate": null,
            "subaffiliate1": null,
            "subaffiliate2": null,
            "subaffiliate3": null,
            "subaffiliate4": null,
            "subaffiliate5": null
        },
        "metadata": {},
        "transactions": null,
        "order_status_url": null
    },
    "event_type": "checkout_shipping_method_submitted",
    "timestamp": "2024-12-26T06:46:36.936236+00:00",
    "event_version": "2024-04-01"
}
```

</div>
</details>



### checkout_completed
```javascript
analytics.subscribe("checkout_completed", event => {
    console.log("Event data ", event.data);
});
```

<details>
  <summary>Event Data</summary>
  <div>

```json
{
    "object": "checkout",
    "context": {
        "document": {...}, // frame parent document 
        "navigator": {...}, // frame parent navigator 
        "window": {...} // frame parent window 
    },
    "data": {
        "number": "109659",
        "status": "open",
        "fulfillment_status": "unfulfilled",
        "payment_status": "paid",
        "is_test": true,
        "lines": [
            {
                "product_id": 111,
                "sku": "TIMELESS-WATCH-B-BL",
                "product_title": "Timeless Watch",
                "product_image": "https://assets.29nex.store/media/demostore/images/products/2021/03/watch.jpg",
                "product_url": "https://examplestore.com/catalogue/timeless-watch_2/",
                "variant_id": 2,
                "variant_title": "",
                "quantity": 1,
                "current_quantity": 1,
                "fulfillable_quantity": 1,
                "currency": "USD",
                "price_excl_tax": "79.99",
                "price_incl_tax": "79.99",
                "total_discount": "0.00",
                "unit_cost": "1.00",
                "total_cost": "1.00",
                "requires_shipping": true,
                "is_gift_card": false,
                "is_upsell": false
            }
        ],
        "shipping_method": "Default",
        "shipping_code": "default",
        "total_incl_tax": "84.98",
        "total_excl_tax": "84.98",
        "total_discount": "0.00",
        "shipping_incl_tax": "4.99",
        "shipping_excl_tax": "4.99",
        "total_cost": "1.00",
        "total_tax": "0.00",
        "shipping_tax": "0.00",
        "display_taxes": "",
        "currency": "USD",
        "user": {
            "id": 123456,
            "email": "customer@gmail.com",
            "ip": "182.82.112.1",
            "first_name": "John",
            "last_name": "Doe",
            "phone_number": null,
            "accepts_marketing": true,
            "language": "en",
            "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
        },
        "shipping_address": {
            "id": 7851,
             "first_name": "John",
            "last_name": "Doe",
            "line1": "2200 Western Pl",
            "line2": "",
            "line3": "",
            "line4": "Henderson",
            "postcode": "42304",
            "phone_number": "+18123158899",
            "notes": "",
            "state": "KY",
            "country": "US"
        },
        "billing_address": {
            "id": 7814,
             "first_name": "John",
            "last_name": "Doe",
            "line1": "2200 Western Pl",
            "line2": "",
            "line3": "",
            "line4": "Henderson",
            "postcode": "423014",
            "phone_number": "+18123158899",
            "state": "KY",
            "country": "US"
        },
        "date_placed": "2024-12-09T02:00:20.931086-05:00",
        "offer_discounts": [],
        "voucher_discounts": [],
        "attribution": {
            "agent": null,
            "funnel": null,
            "utm_source": null,
            "utm_medium": null,
            "utm_campaign": null,
            "utm_term": null,
            "utm_content": null,
            "gclid": null,
            "metadata": {},
            "affiliate": null,
            "subaffiliate1": null,
            "subaffiliate2": null,
            "subaffiliate3": null,
            "subaffiliate4": null,
            "subaffiliate5": null
        },
        "metadata": {},
        "transactions": [
            {
                "id": 8127,
                "external_id": "109659",
                "type": "debit",
                "amount": "84.98",
                "currency": "USD",
                "parent_id": null,
                "status": "succeeded",
                "date_created": "2024-12-09T02:00:21.254596-05:00",
                "payment_method": "bankcard",
                "payment_details": {
                    "gateway": {
                        "id": 2,
                        "type": "test",
                        "name": "Test"
                    },
                    "bankcard_first_six": "411111",
                    "bankcard_last_four": "1111",
                    "is_3ds": false,
                    "optimized_3ds": false,
                    "downgrade_3ds_retry": false,
                    "sca_flow": null,
                    "card_token": "01JEN3G3VP12C9KC75B"
                },
                "response_code": 1000,
                "is_disputed": false,
                "is_external": false,
                "is_test": true,
                "is_initial_retry": false,
                "report_values": {
                    "currency": "USD",
                    "amount": "84.98"
                }
            }
        ],
        "order_status_url": "https://examplestore.com/accounts/order-status/109659/109659:VoL9PVdtkdDFq-Iog81_fQvBeiHjJdqgfhgDi6mvGg4/"
    },
    "event_type": "checkout_completed",
    "timestamp": "2024-12-09T07:00:22.284164+00:00",
    "event_version": "2024-04-01"
}
```

</div>
</details>
