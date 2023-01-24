---
---
# Funnel Customization Guide

Theme developers can customize create and manage customizable and engaging Funnels for marketing campaigns.

### Funnels Location

In the `funnels` directory of a theme, theme developers can edit/manage the funnel templates.

```title="Funnel Templates Location"
funnels
  └── page.funnel-template-example-1.html
  └── page.funnel-template-example-2.html
  └── page.funnel-template-example-etc.html
```

### Example Funnel Base Template


```html title="Example Funnel Template"
<!DOCTYPE html>
<html lang='{{ LANGUAGE_CODE|default:"en" }}'>

<head>
    <title>{% block title %}{{ store.name }} - {{ store.tagline }}{% endblock %}</title>
    <link rel="alternate" hreflang="{{ LANGUAGE_CODE }}" href="https://{{ request.get_host }}{{ request.path }}" />
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta name="created" content="{% now " jS M Y h:i" %}" />
    <meta name="description" content="{% block description %}Funnel meta description{% endblock %}" />
    <meta name="viewport" content="{% block viewport %}width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no{% endblock %}" />
    <meta name="robots" content="NOARCHIVE,NOCACHE" />

    {% block favicon %}
        {% if store.branding.icon %}
            {% with image=store.branding.icon %}
                {% image_thumbnail image "100x" upscale=False as thumb_store_icon %}
                <link rel="shortcut icon" href="{{ thumb_store_icon.url }}" />
            {% endwith %}
        {% endif %}
    {% endblock %}

    {% block styles %}
     <link rel="stylesheet" href="{{ 'css/funnel_example.css'|asset_url }}" />
    {% endblock %}

    {% app_hook 'global_header' %}

</head>

<body>
    {% csrf_token %}

    {% block content %}
        // Page HTML here
    {% endblock %}

    {% block scripts %}
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    {% endblock %}

    {% core_js %}
    {% app_hook 'global_footer' %}

</body>

</html>
```


### Example Funnel Template with Offers


```html title="Example Funnel Template with Offers"
<!DOCTYPE html>
<html lang='{{ LANGUAGE_CODE|default:"en" }}'>

<head>
    <title>{% block title %}{{ store.name }} - {{ store.tagline }}{% endblock %}</title>
    <link rel="alternate" hreflang="{{ LANGUAGE_CODE }}" href="https://{{ request.get_host }}{{ request.path }}" />
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta name="created" content="{% now " jS M Y h:i" %}" />
    <meta name="description" content="{% block description %}Funnel meta description{% endblock %}" />
    <meta name="viewport" content="{% block viewport %}width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no{% endblock %}" />
    <meta name="robots" content="NOARCHIVE,NOCACHE" />

    {% block favicon %}
        {% if store.branding.icon %}
            {% with image=store.branding.icon %}
                {% image_thumbnail image "100x" upscale=False as thumb_store_icon %}
                <link rel="shortcut icon" href="{{ thumb_store_icon.url }}" />
            {% endwith %}
        {% endif %}
    {% endblock %}

    {% block styles %}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
        <style type="text/css">
            .site-overlay {
                display: none;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: rgba(255, 255, 255, 0.8);
                z-index: 10000;
                position: fixed;
                width: 100%;
                top: 0;
                left: 0;
            }
            .site-overlay.is-active {
                display: flex;
            }
        </style>
    {% endblock %}

    {% app_hook 'global_header' %}

</head>

<body>
    {% csrf_token %}

    {% block content %}
        <div class="site-overlay">
            <div class="spinner-border text-primary me-3" role="status" aria-hidden="true"></div>
        </div>
        <div>
            <div class="container py-5 px-4 px-md-0">
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <!-- 1x -->
                    <div id="singleProduct" class="col">
                        <div class="card h-100">
                            <div class="card-body d-flex flex-column text-center">
                                <h4>Get 1 <span class="text-success">Subscribe & Save </span></h4>
                                <p class="h2 py-3">
                                    <span class="single-offer-price">$10.00</span>
                                </p>
                                 <p class="card-text">We’re giving our subscribers 50% off</p>
                                <div class="pb-5">
                                    <p class="text-muted mb-2">Select an option</p>
                                    <div class="btn-group" role="group" aria-label="Buy Options">
                                        <input type="radio" class="btn-check btn-buyoption" name="buyOption" id="subscribe" autocomplete="off" checked data-price="$10.00" data-buyoption="<enter checkout link>">
                                        <label class="btn btn-outline-primary" for="subscribe">Subscribe</label>
                                        <input type="radio" class="btn-check btn-buyoption" name="buyOption" id="onetime" autocomplete="off" data-price="$20.00" data-buyoption="<enter checkout link>">
                                        <label class="btn btn-outline-primary" for="onetime">Buy one time</label>
                                    </div>
                                </div>
                                <div class="d-grid mt-auto">
                                    <button id="multiOptionBtn" class="btn btn-lg btn-primary btn-addtocart" data-url="<enter checkout link>">
                                        BUY NOW
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- end 1x -->
                    <!-- 3x for 2 -->
                    <div class="col">
                        <div class="card h-100 border border-success border-3">
                            <div class="card-body d-flex flex-column text-center">
                                <h4>
                                    Buy 2, Get <span class="text-success">1 Free </span>
                                </h4>
                                <p class="h2 py-3">
                                    <span>$40.00</span>
                                </p>
                                <p class="card-text">Get 3 products for the price of 2. No commitment. No extra cost. Our most popular offer</p>
                                <div class="d-grid mt-auto">
                                    <button class="btn btn-lg btn-success btn-addtocart" data-url="<enter checkout link>">BUY NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end 3x -->
                    <!-- 5x for 3 -->
                    <div class="col">
                        <div class="card h-100" >
                            <div class="card-body d-flex flex-column text-center">
                                <h4>
                                    Buy 3, Get <span class="text-success">2 FREE</span>
                                </h4>
                                <p class="h2 py-3">
                                    <span>$60.00</span>
                                </p>
                                <p class="card-text">Get 5 products for the price of 3. No commitment. No extra cost. Our Biggest Savings</p>
                                <div class="d-grid mt-auto">
                                    <button class="btn btn-lg btn-success btn-addtocart" data-url="<enter checkout link>">BUY NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end 5x -->
                </div>
            </div>
        </div>
    {% endblock %}

    {% block scripts %}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js" integrity="sha384-ODmDIVzN+pFdexxHEHFBQH3/9/vQ9uori45z4JjnFsRydbmQbmL5t1tQ0culUzyK" crossorigin="anonymous"></script>
        <script>
            var buyOptionBtn = document.querySelectorAll(".btn-buyoption");
            var offerBtn = document.querySelectorAll(".btn-addtocart");
            var loadOverlay = document.querySelector(".site-overlay");
            var singlePrice = document.querySelector(".single-offer-price");
            var multiOptionBtn = document.querySelector("#multiOptionBtn");

            buyOptionBtn.forEach(buyOption => {
             buyOption.addEventListener('click', event => {
                var buy_option = event.target.getAttribute('data-buyoption');
                var buy_price = event.target.getAttribute('data-price');
                multiOptionBtn.setAttribute('data-url', buy_option);
                singlePrice.innerHTML = buy_price;
              });
            });

            offerBtn.forEach(link => {
             link.addEventListener('click', event => {
                event.preventDefault();
                var checkout_url = event.target.getAttribute('data-url');
                loadOverlay.classList.add('is-active');
                setTimeout(function() {
                     window.location.href = checkout_url;

                }, 2000);
              });
            });
        </script>
    {% endblock %}

    {% core_js %}
    {% app_hook 'global_footer' %}

</body>

</html>
```

!!! note

    Replace `<enter checkout link>` with your desired  [checkout link](/api/checkout-links/)
