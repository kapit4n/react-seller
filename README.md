# Selling app
React seller is a platform where you can register products and sell them in a web application.
It can be implemented in a store/shopping or another business that registers their products to show them to their customers.

<img src="https://github.com/kapit4n/react-seller/raw/master/mockups/react_seller_card_item_add.png" alt="Drawing" width="100%"/>

## Pre-requisites

[![Join the chat at https://gitter.im/react-seller/Lobby](https://badges.gitter.im/react-seller/Lobby.svg)](https://gitter.im/react-seller/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
* [node 6](https://nodejs.org/en/)
* [npm](https://docs.npmjs.com/)
* [loopback](https://loopback.io/)
* [react-webpack-generator](https://github.com/react-webpack-generators/generator-react-webpack)

> Note: This project uses LoopBack's built-in memory connector instead of MongoDB for a zero-setup, fast install (no native compilation required). Data is persisted to `server/react-seller-data.json`.

## Install API
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

## Run Client Unit tests
* go to client folder
* ./node_modules/karma/bin/karma start

# Development tasks
https://github.com/kapit4n/react-seller/projects/1

# Util Commands
## Create new component
* yo react-webpack:component product/productList
