---
sidebar_label: Campaign Cart
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Campaign Cart JS SDK

Welcome to the Next Commerce JS SDK documentation. This SDK enables developers to create e-commerce storefront experiences using HTML attributes, JavaScript, and CSS.

## Quick Start

### Option 1: Use Starter Template (Recommended)

Get started quickly with our pre-configured starter template:

**[🚀 Download Starter Template](https://github.com/29next/campaign-cart-example)** - Clone or download a ready-to-use campaign flow (landing --> checkout --> upsell --> receipt) with Campaign Cart integrated.

### Option 2: Manual Setup

1. **Get Your API Key**
   
   Go to Next Commerce Dashboard, open the Campaigns app, select your campaign, click on Integration, and copy your API key.

2. **Add SDK Script**
   
   Add these two lines to your HTML `<head>` section:

   ```html
   <!-- Path to Your Campaign Cart Configuration -->
   <script src="js/config.js"></script>
   
   <!-- Campaign Cart SDK -->
   <script src="https://cdn.jsdelivr.net/gh/NextCommerceCo/campaign-cart@v0.3.7/dist/loader.js" type="module"></script>
   ```

3. **Start Building**
   
   You can now use Campaign Cart attributes in your HTML!


## Installation Methods

<Tabs>
  <TabItem value="cdn" label="CDN (Recommended)">
```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/gh/NextCommerceCo/campaign-cart@v0.3.9/dist/loader.js" type="module"></script>
```
  </TabItem>

  <TabItem value="npm" label="NPM Package">
```bash
npm install @campaigncart/js-sdk
```

Then import in your JavaScript:

```javascript
import CampaignCart from '@campaigncart/js-sdk';

CampaignCart.init({
  apiKey: 'your-api-key-here'
});
```
  </TabItem>

  <TabItem value="self-hosted" label="Self-Hosted">
```bash
curl -o campaign-cart.js https://cdn.jsdelivr.net/gh/NextCommerceCo/campaign-cart@v0.3.9/dist/loader.js
```

Host on your server:

```html
<script src="/js/campaign-cart.js"></script>
```
  </TabItem>
</Tabs>

## Configuration

:::tip
Replace `your-api-key-here` with your actual Campaign API key from the dashboard.
:::

### JavaScript Configuration

For more advanced configuration:

#### Minimal Setup (Getting Started)

```javascript
// Configure before SDK loads
window.dataLayer = window.dataLayer || [];
window.nextReady = window.nextReady || [];

window.nextConfig = {
  apiKey: "your-api-key-here"
};
```

#### Complete Example with Common Options

```javascript
// Configure before SDK loads
window.dataLayer = window.dataLayer || [];
window.nextReady = window.nextReady || [];

window.nextConfig = {
  // Required: Your Campaign Cart API key
  apiKey: "your-api-key-here",
  
  // Currency behavior when country changes
  currencyBehavior: 'auto', // 'auto' | 'manual'
  
  // Payment and checkout configuration
  paymentConfig: {
    expressCheckout: {
      enabled: true, // Enable/disable express checkout methods
      requireValidation: false, // Require form validation before express checkout if radio option - not express buttons
      requiredFields: ['email', 'fname', 'lname'], // Fields required for express checkout radio option
      methodOrder: ['paypal', 'apple_pay', 'google_pay'] // Display order of express payment method buttons
    }
  },

  // Address and country configuration
  addressConfig: {
    defaultCountry: "US",
    showCountries: ["US", "CA", "GB", "AU", "DE", "FR"],
    dontShowStates: ["AS", "GU", "PR", "VI"]
  },
  
  // Discount codes configuration
  discounts: {
    // Example discount code
    // SAVE10: {
    //     code: "SAVE10",
    //     type: "percentage", // 'percentage' | 'fixed'
    //     value: 10,
    //     scope: "order", // 'package' | 'order'
    //     description: "10% off entire order",
    //     combinable: true, // Can be combined with other discounts
    //     // Optional: packageIds: [1, 2], // For package-specific discounts
    //     // Optional: minOrderValue: 50, // Minimum order value
    //     // Optional: maxDiscount: 20 // Maximum discount amount
    // }
  },

  profiles: {
    // "regular": {
    //     name: "Regular Pricing",
    //     // No mappings needed - uses original package IDs
    // },
    
    // Example: Exit intent save profile
    // "SAVE_5": {
    //     name: "Exit Save 5",
    //     packageMappings: {
    //         // Original ID -> EXIT PACKAGE ID
    //         1: 9,
    //         2: 10,
    //         3: 11,
    //         4: 12,
    //         5: 13,
    //     }
    // },
  },

  // Default profile to use (if not specified, uses "regular")
  defaultProfile: "regular",
  
  // Google Maps integration (for address autocomplete)
  googleMaps: {
    apiKey: "your-google-maps-api-key",
    region: "US",
    enableAutocomplete: true
  },
  
  // Analytics providers configuration
  analytics: {
    enabled: true,
    mode: 'auto', // 'auto' | 'manual' | 'disabled'
    providers: {
      // Next Campaign analytics (always enabled if analytics.enabled is true)
      nextCampaign: {
          enabled: true
      },
      // Google Tag Manager
      gtm: {
        enabled: false,
        settings: {
          containerId: "GTM-XXXXXX",
          dataLayerName: "dataLayer"
        },
        // Optional: blockedEvents: ["PageView"]
      },
      // Facebook Pixel
      facebook: {
        enabled: false,
        settings: {
          pixelId: "YOUR_PIXEL_ID"
        },
        // Optional: blockedEvents: ["PageView"]
      },
      // RudderStack
      rudderstack: {
        enabled: false,
        settings: {
            // RudderStack configuration is handled by the RudderStack SDK itself
            // This just enables the adapter
        },
        // Optional: blockedEvents: ["PageView"]
      },
      // Custom analytics endpoint
      custom: {
        enabled: false,
        settings: {
            endpoint: "https://your-analytics.com/track",
            apiKey: "your-api-key"
        }
      }
    }
  },
  
  // UTM parameter transfer (preserve tracking params)
  utmTransfer: {
    enabled: true,
    applyToExternalLinks: false, // Add UTM params to external links
    debug: false, // Enable debug logging for UTM transfer
    // Optional: excludedDomains: ['example.com', 'test.org'], // Domains to exclude
    // Optional: paramsToCopy: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid']
  }
};
```

### Meta Tag Configuration

Configure the SDK using meta tags in your HTML head:

```html
  <!-- Campaign API Key: Optional if you wish to override the config -->
  <meta name="next-api-key" content="your-api-key-here">

  <!-- Funnel Name -->
  <meta name="next-funnel" content="Example Funnel">
  
  <!-- Page Type: product, checkout, upsell, or receipt -->
  <meta name="next-page-type" content="product">
  
  <!-- Next URL: Redirect after order completion (for checkout pages) -->
  <meta name="next-next-url" content="/upsell">
  
  <!-- Prevent Back Navigation: Usually on first upsell page -->
  <meta name="next-prevent-back-navigation" content="true">
  
  <!-- Upsell URLs: For upsell pages -->
  <meta name="next-upsell-accept-url" content="/receipt">
  <meta name="next-upsell-decline-url" content="/receipt">
```

## HTML Setup Example
```html
<!DOCTYPE html>
<html>
<head>
  <!-- 1. First: Set configuration -->
  <script>
    window.dataLayer = window.dataLayer || [];
    window.nextReady = window.nextReady || [];  

    window.nextConfig = {
      apiKey: "your-api-key-here",
    };
  </script>

  <!-- 2. Second: Metatag Configuration -->
  
  <!-- Page Type: product, checkout, upsell, or receipt -->
  <meta name="next-page-type" content="product">
  
  <!-- Next URL: Redirect after order completion (for checkout pages) -->
  <meta name="next-next-url" content="/upsell">
  
  <!-- 2. Then: Load the SDK -->
 <script src="https://cdn.jsdelivr.net/gh/NextCommerceCo/campaign-cart@v0.3.9/dist/loader.js" type="module"></script>
</head>
<body>
  <!-- Your content here -->
</body>
</html>
```

## Features

- **Attribute-driven architecture** - Build cart functionality with HTML attributes
- **Cart management** - Add to cart, selectors, quantity controls
- **Profile-based pricing** - Dynamic package mapping for different pricing tiers
- **Post-purchase upsells** - Maximize order value with upsell flows
- **Dynamic content** - Display prices, totals, and product data
- **Conversion tools** - FOMO notifications and exit intent popups

## Quick Examples

### Add to Cart Button
```html
<button data-next-action="add-to-cart" 
        data-next-package-id="1"
        data-next-quantity="1">
  Add to Cart
</button>
```

### Product Selector
```html
<div data-next-cart-selector data-next-selection-mode="swap">
  <div data-next-selector-card data-next-package-id="1">Option 1</div>
  <div data-next-selector-card data-next-package-id="2">Option 2</div>
</div>
```

### Display Cart Total
```html
<span data-next-display="cart.total">$0.00</span>
```

### Conditional Display
```html
<div data-next-show="cart.hasItems">
  <button onclick="checkout()">Proceed to Checkout</button>
</div>
```

## Documentation Sections

### Core Features

- **[Cart System](/docs/campaign-cart/cart-system/)** - Cart management and controls
- **[Upsells](/docs/campaign-cart/upsells/)** - Post-purchase upsell flows
- **[JavaScript API](/docs/campaign-cart/javascript-api/)** - Complete JavaScript methods reference
- **[Data Attributes](/docs/campaign-cart/data-attributes/)** - Complete attribute reference
- **[Utilities](/docs/campaign-cart/utilities/)** - FOMO, exit intent, and debugging tools

### Reference

- **[Events](/docs/campaign-cart/javascript-api/events)** - SDK event system
- **[Analytics Configuration](/docs/campaign-cart/analytics/configuration/)** - Analytics configuration options

## Verification

Verify the SDK loaded correctly by opening your browser console:

```javascript
// Check if SDK is loaded
console.log(window.next ? 'SDK Loaded' : 'SDK Not Found');

// Check SDK version
if (window.next) {
  console.log('SDK Version:', next.version);
  console.log('Config:', next.getConfig());
}
```

## Browser Support

The SDK supports all modern browsers including Chrome, Firefox, Safari, and Edge.
