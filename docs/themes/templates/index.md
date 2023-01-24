---
title: Templates
---

### Introduction

The storefront theme templates language is designed to be both powerful and easy to use. If you have any exposure to working with other text-based template languages such as Jinja2 or Liquid, you should feel right at home.

!!! tip "Important"

    The storefront theme template system provides **tags, filters** and **variables** for control flow logic inside of a template.


### Variables

Variables look like this: `{{ variable }}`  and contain the content the template uses to render to the page. Variables contain a dictionary structure of content and use . notation to access attributes.


=== "Template Code"

    ```html
    <h1>Hello {{ customer.name }}!</h1>
    ```

=== "Template Rendered"

    ``` html
    <h1>Hello John!</h1>
    ```

### Filters

Filters allow you to modify the output of a variables and look like this `{{ customer.name|title }}`. This would display the value of `{{ customer.name }}` after being filtered there the title filter to make format the string to title case.  See built-in filter reference.

=== "Template Code"

    ```html
    <h1>Hello {{ customer.name|title }}!</h1>
    ```

=== "Template Rendered"

    ``` html
    <h1>Hello John!</h1>
    ```


### Tags

Tags can do many things such as control flow, iterations, template inheritance, and theme translations. Tags look like this `{% tag %}` . [See built-in tag reference](tags.md).

=== "Template Code"

    ```html
    <ul>
    {% if products %}
        {% for product in products %}
            <li>{{ product.title }}</li>
        {% endfor %}
    {% else %}
        <li>No products found.</li>
    {% endif %}
    </ul>
    ```
=== "Template Rendered"

    ``` html
    <ul>
        <li>Product A</li>
        <li>Product B</li>
        <li>Product C</li>
    </ul>
    ```

Using these core building blocks you can create fully customized shopping experiences for customers.

