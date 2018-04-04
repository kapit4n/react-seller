'use strict';

require('styles//Home.css');
import React from 'react';
import {Grid, Row, Col, Image, Button, ButtonToolbar, Glyphicon, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

/**
 * Component that displays the shopping products
 */
class HomeComponent extends React.Component {
  sendProductToCart = () => {
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
    .then((responseJson) => { this.eventSubscriptors(); })
    .catch((error) => { console.error(error); });
  };

  /**
   * Shows modal to add/send product to shopping cart
   */
  setProductForModal = (product: any) => {
    console.log(product);
    this.setState({ show: true});
    this.setState({ product: product});
  };

  eventSubscriptors = () => {
    console.log("Throw event to subscriptors");
  }

  /**
   * Constructor that initialize the state and the API urls
   */
  constructor() {
    super();
    this.productURL = 'http://localhost:3000/api/products';
    this.orderURL = 'http://localhost:3000/api/orderDetails';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = {products: [], quantity: 0, show: false, product: {}};
  }

  /**
   * Loads the products from API and set the state
   */
  componentDidMount() {
    var filter = "";
    if (this.props.location.query.search) {
      filter = 'filter[where][or][0][name][regexp]=/' + this.props.location.query.search + '/i[name]=a&';
    }
    fetch(this.productURL + '?' + filter + 'access_token=' + this.access_token)
      .then((response) => response.json())
      .then((responseJson) => { this.setState({products:responseJson});})
      .catch((error) => { console.error(error); });
  }

  handleChangeQuantity = (event) => {
    this.setState({ quantity: event.target.value });
  }

  /** Render the component */
  render() {

    // close item on cart
    let closeItemOnCart = () => {
        this.setState({ show: false});
    };

    // Save item on cart
    let saveItemOnCart = () => {
       this.sendProductToCart();
    }
    // Image properties
    const cartImageContainer = {
      height: 180, width: 300, overflow: 'hidden'
    };

    // Prices style
    const priceStyle = {
      fontSize: 25
    };

    // shopping card grid padding
    const cartGridPadding = {
      paddingBottom: 10, paddingTop: 10
    };

    return (
      <div className="home-component">
        <Grid>
          <Row className="show-grid">
            {this.state.products.map(function (product) {
              return <Col key={product.id} xs={6} md={4} height={350} style={cartGridPadding}>
                <div style={cartImageContainer}>
                  <Image src={product.img} thumbnail />
                </div>
                <Button bsStyle="link" href={'product-show/' + product.id}>{product.name}</Button><br/>
                <ControlLabel style={priceStyle}>${product.price}</ControlLabel>
                <ButtonToolbar>
                  <Button onClick={()=>this.setProductForModal(product)} style={{width: 250, marginLeft: 25}}><Glyphicon glyph="shopping-cart"/> Add to Cart </Button>
                </ButtonToolbar>
              </Col>;
            }, this)}
          </Row>
        </Grid>

        <Modal show={this.state.show} onHide={closeItemOnCart} container={this} aria-labelledby="contained-modal-title">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Adding to Shopping Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid>
              <Row className="show-grid">
                <Col xs={9} sm={9} md={6} height={60}>
                  <h2>{this.state.product.name}</h2><br />
                  <Image width={300} src={this.state.product.img} thumbnail /><br />
                  <ControlLabel> Price: </ControlLabel>${this.state.product.price} <br />
                  <ControlLabel> Stock: </ControlLabel>{this.state.product.stock} <br />
                  ${this.state.product.description}
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
            <Button onClick={saveItemOnCart}><Glyphicon glyph="ok"/></Button>
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
