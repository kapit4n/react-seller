require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { Nav, NavItem,Navbar,MenuItem,NavDropdown,    Table, Image, Button, Grid, Row, Col} from 'react-bootstrap';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {

  render() {
    return (
      <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <MenuItem eventKey={1} href="/home">Home</MenuItem>
            <NavDropdown eventKey={3} title="Products"  id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} href="/product-list">List</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
            <MenuItem eventKey={2} href="/about">About</MenuItem>
          </Nav>
          <Nav pullRight>
            <MenuItem eventKey={1} href="#">Facebook</MenuItem>
            <MenuItem eventKey={2} href="#">Login</MenuItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
       {this.props.children}
      </div>
      )
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
