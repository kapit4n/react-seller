import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import About from './components/AboutComponent';
import Contact from './components/ContactComponent';
import Home from './components/HomeComponent';
import ProductList from './components/product/ProductListComponent';
import ProductShow from './components/product/ProductShowComponent';
import ProductAdd from './components/product/ProductAddComponent';
import ProductEdit from './components/product/ProductEditComponent';
import VendorList from './components/vendor/VendorListComponent';
import VendorShow from './components/vendor/VendorShowComponent';
import VendorAdd from './components/vendor/VendorAddComponent';
import VendorEdit from './components/vendor/VendorEditComponent';
import CartCurrent from './components/cart/CartCurrentComponent';
import CartList from './components/cart/CartListComponent';
import CartShow from './components/cart/CartShowComponent';
import CartAdd from './components/cart/CartAddComponent';
import CartEdit from './components/cart/CartEditComponent';
import Login from './components/user/LoginComponent';
import CustomerAdd from './components/customer/CustomerAddComponent';
import CustomerList from './components/customer/CustomerListComponent';
import CustomerEdit from './components/customer/CustomerEditComponent';
import CustomerShow from './components/customer/CustomerShowComponent';

import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'


// Render the main component into the dom
//ReactDOM.render(<App />, document.getElementById('app'));

ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <Route path = "home" component = {Home} />
         <Route path = "about" component = {About} />
         <Route path = "contact" component = {Contact} />
         <Route path = "customer-list" component = {CustomerList} />
         <Route path = "customer-show/:id" component = {CustomerShow} />
         <Route path = "customer-add" component = {CustomerAdd} />
         <Route path = "customer-edit/:id" component = {CustomerEdit} />
         <Route path = "product-list" component = {ProductList} />
         <Route path = "product-show/:id" component = {ProductShow} />
         <Route path = "product-add" component = {ProductAdd} />
         <Route path = "product-edit/:id" component = {ProductEdit} />
         <Route path = "vendor-list" component = {VendorList} />
         <Route path = "vendor-show/:id" component = {VendorShow} />
         <Route path = "vendor-add" component = {VendorAdd} />
         <Route path = "vendor-edit/:id" component = {VendorEdit} />
         <Route path = "cart-current" component = {CartCurrent} />
         <Route path = "cart-list" component = {CartList} />
         <Route path = "cart-show/:id" component = {CartShow} />
         <Route path = "cart-add" component = {CartAdd} />
         <Route path = "cart-edit/:id" component = {CartEdit} />
         <Route path = "login" component = {Login} />
      </Route>
   </Router>
), document.getElementById('app'))
