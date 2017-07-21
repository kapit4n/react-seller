# react-seller

## Planning
[Planning Board](https://github.com/kapit4n/react-seller/projects/1)

# Mockups

## Home Page
<img src="https://github.com/kapit4n/react-seller/raw/master/mockups/react_seller_home.png" alt="Drawing" width="100%"/>

## Product View Page
<img src="https://github.com/kapit4n/react-seller/raw/master/mockups/react_seller_product_view.png" alt="Drawing" width="100%"/>

## Card View Page
<img src="https://github.com/kapit4n/react-seller/raw/master/mockups/react_seller_card_view.png" alt="Drawing" width="100%"/>

## Adding Shopping Card Item
<img src="https://github.com/kapit4n/react-seller/raw/master/mockups/react_seller_card_item_add.png" alt="Drawing" width="100%"/>

## API
![Item View Page](https://github.com/kapit4n/react-seller/raw/master/mockups/react_seller_api.png)

## Pre-requisites

[![Join the chat at https://gitter.im/react-seller/Lobby](https://badges.gitter.im/react-seller/Lobby.svg)](https://gitter.im/react-seller/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
* [node 6](https://nodejs.org/en/)
* [npm](https://docs.npmjs.com/)
* [loopback](https://loopback.io/)
* [MongoDB](https://www.mongodb.com/)
* [react-webpack-generator](https://github.com/react-webpack-generators/generator-react-webpack)

## Install API
### DB installation
* connect to mongodb
* use reactseller
* create mongo user 'db.createUser({ user: "reactseller", pwd: "password", roles: [ "readWrite", "dbAdmin" ] })'

### Run API
* git clone https://github.com/kapit4n/react-seller.git
* cd react-seller/server
* npm install
* node .

## Install client
* git clone https://github.com/kapit4n/react-seller.git
* cd react-seller/client
* npm install
* npm start

# Development tasks
https://github.com/kapit4n/react-seller/projects/1

# Util Commands
## Create new component
* yo react-webpack:component product/productList
