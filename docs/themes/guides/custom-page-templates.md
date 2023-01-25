---
sidebar_label: Custom Page Templates
---
# Custom Page Templates

Pages created in the storefront dashboard (**Storefront>Pages**) can have very diverse design requirements that often require custom layouts. In this guide, we'll go over some of the best practices for creating and managing custom product templates.

### Page Templates Location

In the `templates/pages` directory of a theme, theme developers can edit/manage the custom page templates.

```title="Page Templates Location"
pages
  └── page.html (default)
  └── page.<custom1>.html
  └── page.<custom2>.html
```

### Extend & Override

**Create a Custom Page Template**

Create a new page template in the **templates>pages** directory with the following naming convention:

```title="Custom Page Template Naming"
templates/pages/page.<custom>.html
```

Templates that follow this naming convention will be selectable from the page detail area in the storefront dashboard.


**Extend & Override Default Page Template**

As a best practice, you should [extend](/themes/templates/tags.md#extends-block) the default page template to override the necessary [template blocks](/themes/templates/tags.md#extends-block) to achieve your customization with a limited amount of duplicate code.


```django title="Example Custom Page Template"
{% extends "templates/pages/page.html" %}

{% block content %}
    // Custom Page Content Template Code
{% endblock %}
```
This strategy will simplify the creation and management of custom page templates so you can focus on the customized areas for the new custom product template.

**Select Template for Page**

On your page of choice, select your newly created template as the **Theme Template** to activate the template for your page in the storefront.


:::tip
You are not limited to overriding the existing template blocks in the default page template. You can create and add your own to the default template to overide in your custom template. For example, adding `{% block my_custom_block %}{% endblock %}` to page.html, around any area you wish to customize, will allow you to overide it in the custom template
:::
