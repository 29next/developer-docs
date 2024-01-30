<p align="center">
    <a href="https://29next.com">
    <img src="https://github.com/29next/developer-docs/blob/main/static/img/29next-logo.png" alt="Logo" width="240">
  </a>
  <h2 align="center">29 Next Developer Docs</h3>

  <p align="center">
    29 Next's developer documentation portal, built with Docusaurus and Stoplight.
    <br />
    <a href="https://developers.29next.com/docs/"><strong>Explore the Docs »</strong></a>
  </p>
</p>

### Built With

- [Docusaurus](https://docusaurus.io/)
- [Stoplight Elements](https://stoplight.io/open-source/elements)
- [Algolia](https://www.algolia.com/)
- [Tailwind](https://tailwindcss.com/)


## Getting Started

This section describes how you can get our documentation portal up and running on your machine.

### Prerequisites

- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repo

```sh
git clone git@github.com:29next/developer-docs.git
```

2. Install NPM packages

```sh
npm install
```

3. Run the app

```sh
npm start
```

## Update API Docs

API Reference docs for [Admin API](https://developers.29next.com/docs/api/admin/reference/) and [Campaigns API](https://developers.29next.com/docs/api/campaigns/reference/#/) use Open API Spec files downloaded from their respective apps.

### Update Script

Included in the docs is a python script to automatically fetch the latest versions of the Open API Spec files and update them for the developer docs portal usage.

**Install Dependenceis**

```sh
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Run Update**
```sh
cd tools/
python update_api_docs.py
```
