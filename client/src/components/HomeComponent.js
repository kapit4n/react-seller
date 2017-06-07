'use strict';

import React from 'react';
require('styles//Home.css');
import {Grid, Row, Col, Image, Button, ButtonToolbar, Glyphicon, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class HomeComponent extends React.Component {
  handleClick = () => {
    let item = {
                  quantity: this.state.quantity,
                  price: this.state.product.price,
                  totalPrice: this.state.product.price * this.state.quantity,
                  discount: 0,
                  product: {id: this.state.product.id}
                };
    fetch(this.orderURL + '?access_token=' + this.access_token, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
      body: JSON.stringify(item)
    }).then((response) => response.json())
    .then((responseJson) => { console.log("Hello I saved "); })
    .catch((error) => { console.error(error); });
    this.setState({ quantity: 1});
    this.setState({ product: product});
  };

  handleClickBefore = (product: any) => {
    this.setState({ show: true});
    this.setState({ product: product});
  };

  constructor() {
    super();
    this.productURL = 'http://localhost:3000/api/products';
    this.orderURL = 'http://localhost:3000/api/orderDetails';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = {products: [], quantity: 0, show: false, product: {}};
  }

  componentDidMount() {
    fetch(this.productURL + '?access_token=' + this.access_token) 
      .then((response) => response.json())
      .then((responseJson) => { this.setState({products:responseJson});})
      .catch((error) => { console.error(error); });
  }

  handleChangeQuantity = (event) => {
    this.setState({ quantity: event.target.value });
  }

  render() {
    let close = () => {
      this.setState({ show: false});
      this.handleClick();
    };
    return (
      <div className="home-component">
        <Grid>
          <Row className="show-grid">
            {this.state.products.map(function (product) {
              return <Col xs={6} md={4} height={400}>
                <Image width={310} height={300} src={product.img} thumbnail />
                <Button xs={12} md={12}  bsStyle="link" href={'product-show/' + product.id}>{product.name}</Button><br/>
                <ControlLabel>${product.price}</ControlLabel>
                <ButtonToolbar>
                  <Button onClick={()=>this.handleClickBefore(product)} style={{width: 250, marginLeft: 25}}><Glyphicon glyph="shopping-cart"/> Add to Card </Button>
                </ButtonToolbar>
              </Col>;
            }, this)}
          </Row>
        </Grid>

        <Modal show={this.state.show} onHide={close} container={this} aria-labelledby="contained-modal-title">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Adding to Shopping Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid>
              <Row className="show-grid">
                <Col xs={6} md={4} height={60}>
                  <Image width={60} height={60} src={this.state.product.img} thumbnail />
                  {this.state.product.name} <br />

                </Col>
              </Row>
            </Grid>
            <FormGroup controlId = "formCode">
                <ControlLabel>Quantity</ControlLabel>
                <FormControl type = "text" placeholder = "Enter quantity"
                value = { this.state.quantity } onChange = { this.handleChangeQuantity } />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close}><Glyphicon glyph="ok"/></Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

HomeComponent.displayName = 'HomeComponent';

// Uncomment properties you need
// HomeComponent.propTypes = {};
// HomeComponent.defaultProps = {};

export default HomeComponent;
