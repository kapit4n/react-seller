require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import About from './components/AboutComponent';
import Contact from './components/ContactComponent';
import Home from './components/HomeComponent';


let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
         <div>
            <ul>
               <li>Home</li>
               <li>About</li>
               <li>Contact</li>
            </ul>
           {this.props.children}
         </div>
      )
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
