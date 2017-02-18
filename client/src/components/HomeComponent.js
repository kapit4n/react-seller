'use strict';

import React from 'react';
require('styles//Home.css');
import {Grid, Row, Col, Image, Button, ButtonToolbar, Glyphicon} from 'react-bootstrap';

class HomeComponent extends React.Component {

  handleClick = (productId: any) => {
    let item = {quantity: 20, price: 5, totalPrice: 100, discount: 0, product: {id: productId}};
    fetch(this.orderURL + '?access_token=' + this.access_token, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
      body: JSON.stringify(item)
    }).then((response) => response.json())
    .then((responseJson) => { console.log("Hello I saved "); })
    .catch((error) => { console.error(error); });
  };

  constructor(){
    super();
    this.productURL = 'http://localhost:3000/api/products';
    this.orderURL = 'http://localhost:3000/api/orderDetails';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = { products: [] };
  }

  componentDidMount() {
    fetch(this.productURL + '?access_token=' + this.access_token) 
      .then((response) => response.json())
      .then((responseJson) => { this.setState({products:responseJson});})
      .catch((error) => { console.error(error); });
  }

  render() {
    return (
      <div className="home-component">
        <Grid>
          <Row className="show-grid">
            {this.state.products.map(function (product) {
              return <Col xs={6} md={4} height={400}>
                <Image width={300} height={300} src={product.img} thumbnail />
                <Button xs={12} md={12}  bsStyle="link" href={'product-show/' + product.id}>{product.name}</Button>
                <ButtonToolbar>
                  <Button onClick={()=>this.handleClick(product.id)} style={{width: 250, marginLeft: 25}}><Glyphicon glyph="shopping-cart"/> Add to Card </Button>
                </ButtonToolbar>
              </Col>;
            }, this)}
          </Row>
        </Grid>
      </div>
    );
  }
}

HomeComponent.displayName = 'HomeComponent';

// Uncomment properties you need
// HomeComponent.propTypes = {};
// HomeComponent.defaultProps = {};

export default HomeComponent;
