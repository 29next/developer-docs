---
sidebar_label: Examples
sidebar_position: 14
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Analytics Providers Overview

Configure multiple analytics providers to send events simultaneously to GTM, Facebook Pixel, RudderStack, and custom platforms.

Configure analytics providers to send events to multiple platforms. The SDK supports Google Tag Manager, Direct GA4 integration, Facebook Pixel, RudderStack, and custom webhooks.

## Provider Configuration

Enable multiple providers in your configuration:

```javascript
window.nextConfig = {
  apiKey: 'your-api-key',
  storeName: 'my-store',  // Important for Facebook deduplication
  analytics: {
    enabled: true,
    mode: 'auto',
    providers: {
      gtm: { enabled: true },
      facebook: { enabled: true, settings: { pixelId: 'xxx' } },
      rudderstack: { enabled: true },
      custom: { enabled: true, settings: { endpoint: 'https://...' } }
    }
  }
};
```

## Providers Comparison

| Provider | Best For | Setup Complexity | Auto-Deduplication |
|----------|----------|------------------|--------------------|
| **Google Tag Manager** | Event tracking & conversion measurement | Low | Yes (via GTM) |
| **Direct GA4 (No GTM)** | Simple GA4 tracking without GTM | Very Low | Yes (automatic) |
| **Facebook Pixel** | Conversion tracking & audience building | Medium | Yes (with storeName) |
| **RudderStack** | Data warehouse integration & CDP | High | Yes (via RudderStack) |
| **Custom Webhook** | Third-party integrations & APIs | Medium | Manual |

## Provider Independence

Each provider operates independently. If one provider fails or is temporarily unavailable:

- Other providers continue to receive and process events normally
- Failed requests do not block the event pipeline
- Your analytics data is safely distributed across multiple platforms
- No single point of failure exists

## Using Multiple Providers

You can enable any combination of providers simultaneously:

### All Providers
Enable all providers for data collection across multiple platforms:

```javascript
analytics: {
  providers: {
    gtm: { enabled: true },
    facebook: { enabled: true, settings: { pixelId: 'YOUR_PIXEL_ID' } },
    rudderstack: { enabled: true },
    custom: { enabled: true, settings: { endpoint: 'https://your-api.com/events' } }
  }
}
```

### Selective Providers
Choose only the providers you need:

```javascript
analytics: {
  providers: {
    gtm: { enabled: true },
    facebook: { enabled: true, settings: { pixelId: 'YOUR_PIXEL_ID' } },
    rudderstack: { enabled: false },
    custom: { enabled: false }
  }
}
```

:::tip
Enable multiple providers to send analytics data to all required platforms. If one service fails, others continue operating.
:::

## Provider Setup Guides

### Built-in Providers

- **[Google Tag Manager](/docs/campaign-cart/analytics/examples/google-tag-manager/)** - Container setup and variable configuration
- **[Facebook Pixel](/docs/campaign-cart/analytics/examples/facebook-pixel/)** - Conversion tracking and audience building
- **[RudderStack](/docs/campaign-cart/analytics/examples/rudderstack/)** - Data warehouse and CDP integration
- **[Custom Webhook](/docs/campaign-cart/analytics/examples/custom-webhook/)** - Third-party API integration

### Alternative Integrations

- **[Direct GA4 (No GTM)](/docs/campaign-cart/analytics/examples/direct-ga4/)** - Send events directly to Google Analytics 4 without GTM
- **[Event Transformers](/docs/campaign-cart/analytics/examples/event-transformers/)** - Build custom transformers for any platform (TikTok, Snapchat, Pinterest, etc.)
- **[Custom Analytics Triggers](/docs/campaign-cart/analytics/examples/custom-analytics-triggers/)** - Modify when `add_to_cart` and `begin_checkout` events fire

## Next Steps

1. Choose which providers you need
2. Follow the provider-specific setup guide
3. Test event delivery in your development environment
4. Deploy to production

