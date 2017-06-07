require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { Nav, NavItem, Navbar, MenuItem, NavDropdown, Table, Image, Button, Grid, Row, Col, Glyphicon, FormGroup, FormControl} from 'react-bootstrap';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  handleChangeSearchText = (event) => {
    this.setState({ searchText: event.target.value });
  }

  constructor() {
    super();
    this.productURL = 'http://localhost:3000/api/products';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = {products: [], searchText: ""};
  }

  render() {
    let search = () => {
      console.log("Search: " + this.state.searchText);
    };
    return (
      <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/home">React-Seller</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <MenuItem eventKey={1} href="/home">Home</MenuItem>
            <NavDropdown eventKey={3} title="Products"  id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} href="/product-list">List</MenuItem>
              <MenuItem eventKey={3.1} href="/product-add">New</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
            <MenuItem eventKey={2} href="/about">About</MenuItem>
          </Nav>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" value = { this.state.searchText } onChange = { this.handleChangeSearchText }/>
            </FormGroup>
            {''}
          <Button type="submit"  onClick={search} >Search</Button>
          </Navbar.Form>
          <Nav pullRight>
            <MenuItem eventKey={1} href="/card-current"><Glyphicon glyph="shopping-cart"/> Card</MenuItem>
            <MenuItem eventKey={2} href="/login">Login</MenuItem>
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
