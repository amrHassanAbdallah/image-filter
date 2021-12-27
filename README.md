[![CircleCI](https://circleci.com/gh/amrHassanAbdallah/aws-ci.svg?style=shield)](https://app.circleci.com/pipelines/github/amrHassanAbdallah/image-filter?branch=master)


# Image filter

Image filter is a simple service built on top of express js using typescript and sharp to resize and apply filters over images.

## Installation

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install the project.

```bash
npm install
```

## Up & Running

### To start the server 
```bash
npm run dev
```

## Usage

1. Upload image
    
    `GET /filteredimage?image_url={image_url}`
    
    ```bash
    curl --location --request GET 'localhost:8082/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg'
    ```
