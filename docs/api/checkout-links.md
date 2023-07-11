# Checkout Links

Checkout Links allow you add links from any website, email or web marketing channel directly to your store's checkout flow with items pre-loaded in their cart.

### Example Checkout Links

#### As a one-time purchase

With the link below, 2 products would be added to the cart with an applied voucher.

```
https://<store domain>/checkout/add/?product=12:1&product=13:3&voucher=PROMO&currency=usd

```
#### As a subscription

With the following link, 1 product would be added to the cart as a subscription renewing every 3 months.

```
https://<store domain>/checkout/add/?product=12:1:3:month&currency=usd

```


### Supported Parameters

Checkout link parameters can be broadly split into two groups, [Cart Parameters](#cart-parameters) controlling the products and discounts applied to the cart and [Attribution Parameters](#attribution-parameters) to marketing attribution reporting.

#### Cart Parameters

| Parameter | Values | Description |
| -----------| -------- |--------------------|
| `product` | id:qty:interval_count:interval | Pass product ID, quantity, interval count (number of) and interval (day, week, month) to add to the cart |
| `voucher` | voucher code | Apply a voucher to add to the cart |
| `currency` | currency code | Set the currency for the cart and product prices |
| `replace` | true/false | replace existing cart, default is true |


#### Attribution Parameters
In addition to populating the cart, you can pass attribution parameters to attribute the order to your marketing channel.

| Parameter | Description |
| -----------| -------- |
| `utm_source` | The referrer: (e.g. google, newsletter) |
| `utm_medium` | Marketing medium: (e.g. cpc, banner, email) |
| `utm_campaign` | Product, promo code, or slogan (e.g. spring_sale) |
| `utm_term` | Identify the paid keywords |
| `utm_content` | Use to differentiate ads |
| `funnel` | Use to attribute funnels |
| `gclid` | Adwords click ID |
| `evclid` | Everflow Click ID |
| `aff` | Main affiliate / network |
| `sub1` | Sub affiliate 1 |
| `sub2` | Sub affiliate 2 |
| `sub3` | Sub affiliate 3 |
| `sub4` | Sub affiliate 4 |
| `sub5` | Sub affiliate 5 |
| `attribution_metadata.KEY=VALUE` | Attribution Metadata key/value pair |
| `clear_attribution=false` | Pass this to only update existing attribution for the cart. |

:::info Last Click Attribution
Attribution on carts and the subsequent order uses "Last Click" attribution model meaning that each time new attribution is passed it will replace all existing attribution data for the cart. Passing `clear_attribution=false` on the querystring will keep existing attribution and update any new attribution passed.
:::
