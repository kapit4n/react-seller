require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
         <div>
            <ul>
               <li><a href="/home">Home</a> </li>
               <li><a href="/about">About</a> </li>
               <li><a href="/contact">Contact</a> </li>
               <li><a href="/product-list">ProductList</a> </li>
            </ul>
           {this.props.children}
         </div>
      )
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
