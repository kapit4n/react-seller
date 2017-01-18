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

import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'


// Render the main component into the dom
//ReactDOM.render(<App />, document.getElementById('app'));

ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {App} />
         <Route path = "home" component = {Home} />
         <Route path = "about" component = {About} />
         <Route path = "contact" component = {Contact} />
         <Route path = "product-list" component = {ProductList} />
         <Route path = "product-show" component = {ProductShow} />
         <Route path = "product-add" component = {ProductAdd} />
         <Route path = "product-edit" component = {ProductEdit} />
      </Route>
   </Router>
), document.getElementById('app'))
