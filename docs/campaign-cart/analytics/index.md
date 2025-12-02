---
sidebar_label: Analytics
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Analytics Overview

Track e-commerce events across Google Analytics 4, Facebook Pixel, RudderStack, and custom platforms.

The SDK tracks e-commerce events and sends them to analytics providers.

## Supported Providers

- Google Tag Manager
- Facebook Pixel
- RudderStack
- Custom webhooks

Events follow GA4 specification and can be tracked automatically or manually using two APIs: `next.*` methods or `window.NextAnalytics`.

## How It Works

### 1. Events Are Tracked

The SDK captures e-commerce events using two APIs:

<Tabs>
  <TabItem value="simple" label="Simple API">

```javascript
// Simple tracking methods
next.trackAddToCart(packageId, quantity);
next.trackViewItem(packageId);
next.trackBeginCheckout();
next.trackPurchase(orderData);
```

Works immediately, handles async loading automatically.

  </TabItem>
  <TabItem value="advanced" label="Advanced API">

```javascript
// Advanced tracking with full control
window.NextAnalytics.trackAddToCart(item, listId, listName);
window.NextAnalytics.trackViewItem(item);
window.NextAnalytics.track({ event: 'custom_event', data: '...' });
```

Direct access to analytics engine with advanced features.

  </TabItem>
</Tabs>

### 2. Events Are Stored

All events are stored in three data layers:

- **`window.NextDataLayer`** - SDK's primary analytics store
- **`window.dataLayer`** - Standard Google Tag Manager layer
- **`window.ElevarDataLayer`** - Elevar-compatible format

### 3. Events Are Sent

Events are automatically sent to all enabled providers:

```javascript
providers: {
  gtm: { enabled: true },                    // → Google Tag Manager
  facebook: { enabled: true, settings: {} }, // → Facebook Pixel
  rudderstack: { enabled: true },            // → RudderStack
  custom: { enabled: true, settings: {} }    // → Your backend
}
```

Each provider operates independently - if one fails, others continue working.

## Event Data Structure

All events follow GA4-compliant format:

```javascript
{
  event: 'dl_add_to_cart',
  event_id: 'sess_123_2_1234567890',
  event_time: '2025-01-12T10:30:00Z',

  user_properties: {
    visitor_type: 'guest',
    customer_email: 'user@example.com',
    customer_id: 'user_123'
  },

  ecommerce: {
    currency: 'USD',
    value: 99.99,
    items: [{
      item_id: 'SKU-123',
      item_name: 'Product Name',
      price: 99.99,
      quantity: 1
    }]
  },

  attribution: {
    utm_source: 'google',
    utm_medium: 'cpc',
    funnel: 'main'
  },

  _metadata: {
    session_id: 'sess_abc123',
    sequence_number: 2,
    source: 'next-campaign-cart',
    version: '0.2.0'
  }
}
```

## Testing & Verification

### Enable Debug Mode

<Tabs>
  <TabItem value="config" label="Configuration">

```javascript
analytics: {
  debug: true
}
```

  </TabItem>
  <TabItem value="runtime" label="Runtime">

```javascript
// Enable at runtime
window.NextAnalytics.setDebugMode(true);

// Check status
const status = window.NextAnalytics.getStatus();
console.log(status);
```

  </TabItem>
</Tabs>

### Disable Tracking Temporarily

```
https://yoursite.com?ignore=true
```

This disables ALL tracking for the entire session.

To clear:
```javascript
window.NextAnalyticsClearIgnore();
```

### Verify Events

```javascript
// Check all data layers
console.log(window.NextDataLayer);
console.log(window.dataLayer);  // GTM
console.log(window.ElevarDataLayer);  // Elevar

// Get analytics status
const status = window.NextAnalytics.getStatus();
console.log('Events tracked:', status.eventsTracked);
console.log('Providers:', status.providers);
```

## Next Steps

1. **Configure providers** - Set up GTM, Facebook Pixel, or other platforms

   See [Examples Overview](/docs/campaign-cart/analytics/examples/)

2. **Learn tracking methods** - Understand the tracking API

   See [Tracking API Reference](/docs/campaign-cart/analytics/tracking-api/)

3. **Review events** - See all standard e-commerce events

   See [Event Reference](/docs/campaign-cart/analytics/events/)

4. **Advanced tracking** - Create custom events and use transform functions

   See [Custom Events](/docs/campaign-cart/analytics/custom-events/)

## Documentation Structure

- **[Meta Tags](/docs/campaign-cart/analytics/meta-tags/)** - Declarative analytics configuration via HTML meta tags
- **[Configuration & Modes](/docs/campaign-cart/analytics/configuration/)** - Detailed configuration options
- **[Tracking API Reference](/docs/campaign-cart/analytics/tracking-api/)** - Complete API documentation
- **[Examples](/docs/campaign-cart/analytics/examples/)** - Provider-specific setup guides
- **[Event Reference](/docs/campaign-cart/analytics/events/)** - Complete event schemas and examples
- **[Custom Events](/docs/campaign-cart/analytics/custom-events/)** - Advanced tracking patterns
- **[Debugging](/docs/campaign-cart/analytics/debugging/)** - Troubleshooting and testing
- **[Best Practices](/docs/campaign-cart/analytics/best-practices/)** - Implementation patterns and tips

## FAQ

### Do I need to call next.init()?

No! Analytics initializes automatically when the SDK loads. Just configure `window.nextConfig`.

### What's the difference between the three data layers?

- `window.dataLayer` - Standard GTM data layer
- `window.NextDataLayer` - SDK's primary analytics store (all events)
- `window.ElevarDataLayer` - Elevar-compatible format for GTM integrations

### Can I track events before SDK loads?

Yes, use the nextReady queue:

```javascript
window.nextReady = window.nextReady || [];
window.nextReady.push(function() {
  next.trackAddToCart('123', 1);
});
```

### What happens if a provider fails?

The SDK handles failures gracefully:
- Events still track to NextDataLayer
- Other providers continue working
- Warnings logged in debug mode
- SDK functionality unaffected

### How do I check if analytics is working?

```javascript
// Check status
window.NextAnalytics.getStatus();

// Check events
window.NextDataLayer;

// Enable debug
window.NextAnalytics.setDebugMode(true);
```

