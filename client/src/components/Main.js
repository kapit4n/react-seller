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

  search = () => {
    this.props.router.push('/home?search=' + this.state.searchText);
    window.location.reload();
  };

  constructor() {
    super();
    this.productURL = 'http://localhost:3000/api/products';
    this.orderDetailURL = 'http://localhost:3000/api/orderDetails';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = {products: [], searchText: "", currentTotal: 10};
  }

  componentDidMount() {
    if (this.props.location.query.search) {
      this.setState({products: [], searchText: this.props.location.query.search});
    }
    this.loadCurrentCartTotal();
  }

  loadCurrentCartTotal() {
    fetch(this.orderDetailURL + '/currentTotal?' + 'access_token=' + this.access_token)
      .then((response) => response.json())
      .then((responseJson) => { this.setState({currentTotal:responseJson.total});})
      .catch((error) => { console.error(error); });
  }

  render() {
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
            <MenuItem eventKey={1} href={"/home"}>Home</MenuItem>
            <NavDropdown eventKey={2} title="Products"  id="basic-nav-dropdown">
              <MenuItem eventKey={2.1} href="/product-list">List</MenuItem>
              <MenuItem eventKey={2.1} href="/product-add">New</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title="Customers"  id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} href="/customer-list">List</MenuItem>
              <MenuItem eventKey={3.1} href="/customer-add">New</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={4} title="Orders"  id="basic-nav-dropdown">
              <MenuItem eventKey={4.1} href="/cart-list">List</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={5} title="Vendor"  id="basic-nav-dropdown">
              <MenuItem eventKey={5.1} href="/vendor-list">List</MenuItem>
            </NavDropdown>

          </Nav>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" value = { this.state.searchText } onChange = { this.handleChangeSearchText }/>
            </FormGroup>
            {''}
          <Button type="submit" onClick={()=>this.search()} >Search</Button>
          </Navbar.Form>
          <Nav pullRight>
            <MenuItem eventKey={1} href="/cart-current"><Glyphicon glyph="shopping-cart"/>Cart(${this.state.currentTotal})</MenuItem>
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
