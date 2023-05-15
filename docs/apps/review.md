---
title: Submiting an App for Review
sidebar_label: Review & Publishing
sidebar_position: 8
---

Congradulations, you've built an app and now it's ready to publish to all 29 Next customers. Before we publish your app, we need to ensure your app is ready to go.

### App Review Checklist

- You've uploaded a logo to your app that is properly sized and displays nicely.
- You've named your app inline with your business and how customers would find your service/app.
- Your app description is 40-60 characters that concisely describes your app.
- Admin API App Requirements:
  - Your app requests appropriate Oauth2 permissions for it's use cases instead of a blanket `admin:read` and `admin:write`.
  - Your app uses webhooks for listening to events instead of polling the Admin APIs.


### Submit App for Review

Once you've completed all of your app functionality and the checklist items, you're now ready to submit your app for review. Use the link below to submit your app for reivew.

```mdx-code-block

import Link from '@docusaurus/Link';

<Link
    className="button button--primary button--lg" style={{marginBottom : '1em' }}
    to="https://forms.gle/RvBWo3r1Tc9JGcnF8">
    App Review Form
</Link>
```


Our team will review your app to make sure it works properly and is aligned with our expectations.

Once we complete the review we will reach out to you to let you know about the review result. If it is approved, it will appear in the App store for all of our customers. If it is not approved, we will let you know what needs to be fixed/changed for your app to be approved.
