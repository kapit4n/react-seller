"use strict";

import React from "react";

require("styles/cart/CartCurrent.css");
import {
  Table,
  Image,
  Button,
  Grid,
  Row,
  Col,
  Glyphicon,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
  Alert
} from "react-bootstrap";

class CartCurrentComponent extends React.Component {
  constructor() {
    super();
    this.updateStockUrl = "http://localhost:3000/api/products/updateStock";
    this.orderDetailUrl = "http://localhost:3000/api/orderDetails";
    this.customerUrl = "http://localhost:3000/api/customers";
    this.orderUrl = "http://localhost:3000/api/orders";
    this.currentItems =
      "http://localhost:3000/api/orderDetails?filter[where][orderId][eq]=null&filter[include]=product";
    this.orderFilter = "?filter[include]=product";
    this.access_token =
      "T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7";
    this.state = {
      orderDetails: [],
      customers: [],
      totalPrice: 0,
      customerId: 0,
      successMessage: '',
      detailEdit: { product: {}, quantity: 0 }
    };
  }

  removeItem = id => {
    fetch(
      this.orderDetailUrl + "/" + id + "?access_token=" + this.access_token,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.loadItems();
      })
      .catch(error => {
        console.error(error);
      });
  };

  updateItem = () => {
    let item = {
      quantity: this.state.quantity,
      totalPrice: this.state.detailEdit.product.price * this.state.quantity
    };
    fetch(
      this.orderDetailUrl +
        "/" +
        this.state.detailEdit.id +
        "?access_token=" +
        this.access_token,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.loadItems();
      })
      .catch(error => {
        console.error(error);
      });
    this.state = { detailEdit: { product: {}, quantity: 0 } };
  };

  submitCart = () => {
      var thisAux = this;
      var date = new Date();
      let order = {
          createdDate: date.toString(),
          deliveryDate: date.toString(),
          description: "Submitted Order",
          customerId: this.state.customerId,
          paid: false,
          delivered: false,
          total: this.state.totalPrice
      };
      fetch(this.orderUrl + "?access_token=" + this.access_token, {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(order)
          })
          .then(response => response.json())
          .then(orderSaved => {

              var orderDetailUrls = thisAux.state.orderDetails.map(function(orderDetail) {
                  orderDetail.orderId = orderSaved.id;
                  return {
                      url: thisAux.orderDetailUrl +
                          "/" +
                          orderDetail.id +
                          "?access_token=" +
                          thisAux.access_token,
                      orderDetail: orderDetail
                  };
              });

              var updateStockUrls = thisAux.state.orderDetails.map(function(orderDetail) {
                  return {
                      url: thisAux.updateStockUrl +
                          "?id=" +
                          orderDetail.product.id + "&amount=" + orderDetail.quantity +
                          "&access_token=" +
                          thisAux.access_token
                  };
              });

              Promise.all(orderDetailUrls.map(urlObj => fetch(urlObj.url, {
                      method: "PUT",
                      headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json"
                      },
                      body: JSON.stringify(urlObj.orderDetail)
                  })))
                  .then(resp => resp).then(details => {
                      thisAux.state.successMessage = 'Cart was submited';
                      thisAux.state = {
                          orderDetails: [],
                          customers: [],
                          totalPrice: 0,
                          customerId: 0,
                          detailEdit: { product: {}, quantity: 0 }
                      };
                    Promise.all(updateStockUrls.map(updateObj => fetch(updateObj.url)))
                    .then(resp => resp).then(results => {
                        console.log(results);
                        thisAux.props.router.push('/cart-show/' + orderSaved.id);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                  });
          })
          .catch(error => {
              console.error(error);
          });


  };
  clearCart = () => {
    for (var i = 0; i < this.state.orderDetails.length; i++) {
      fetch(
        this.orderDetailUrl +
          "/" +
          this.state.orderDetails[i].id +
          "?access_token=" +
          this.access_token,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          this.loadItems();
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  loadItems() {
    fetch(this.currentItems + "&access_token=" + this.access_token)
      .then(response => response.json())
      .then(responseJson => {
        var auxTotalPrice = 0;
        for (var i = 0; i < responseJson.length; i++) {
          auxTotalPrice += responseJson[i].totalPrice;
        }
        this.setState({
          orderDetails: responseJson,
          totalPrice: auxTotalPrice
        });
      })
      .catch(error => {
        console.error(error);
      });
    fetch(this.customerUrl + "?access_token=" + this.access_token)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          customers: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });

  }

  componentDidMount() {
    this.loadItems();
  }

  handleChangeQuantity = event => {
    this.setState({ quantity: event.target.value });
  };

  handleEditItem = item => {
    this.setState({ detailEdit: item });
    this.setState({ quantity: item.quantity });
    this.setState({ show: true });
  };

  handleChangeCustomerId = (event) => {
    this.setState({ customerId: event.target.value });
  }

  render() {
    let close = () => {
      this.setState({ show: false });
      this.updateItem();
    };

    return (
      <div className="cartcurrent-component container">
        <Alert bsStyle="warning">
          <strong>{this.state.successMessage}</strong>
        </Alert>
        <div className="container">
          {" "}
          <a href={"cart-list/"}>list</a>{" "}
        </div>
        <Grid>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select Customer</ControlLabel>
          <FormControl componentClass="select" placeholder="select" value = { this.state.customerId }
                    onChange = { this.handleChangeCustomerId }>
          {this.state.customers.map(function(customer) {
            return (
                <option value={customer.id} key={customer.id}>{customer.name}</option>
                );
          }, this)}
          </FormControl>
        </FormGroup>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Code</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan="3">Order Total</td>
                <td colSpan="3">${this.state.totalPrice}</td>
              </tr>
            </tfoot>
            <tbody>
              {this.state.orderDetails.map(function(detail) {
                return (
                  <tr className={"detailRow"} key={detail.id}>
                    <td>
                      <a href={"product-show/" + detail.product.id}>
                        {detail.product.id}
                      </a>
                    </td>
                    <td>{detail.quantity}</td>
                    <td>${detail.price}</td>
                    <td>${detail.totalPrice}</td>
                    <td>
                      <Image src={detail.product.img} thumbnail width={100} />
                    </td>
                    <td>
                      <Button onClick={() => this.removeItem(detail.id)}>
                        {" "}
                        <Glyphicon glyph="remove" />{" "}
                      </Button>
                      <Button onClick={() => this.handleEditItem(detail)}>
                        {" "}
                        <Glyphicon glyph="edit" />{" "}
                      </Button>
                    </td>
                  </tr>
                );
              }, this)}
            </tbody>
          </Table>
          <Button onClick={() => this.clearCart()}>
            {" "}
            <Glyphicon glyph="cleaning" /> Clear
          </Button>
          <Button onClick={() => this.submitCart()}>
            <Glyphicon glyph="send" /> Submit Cart{" "}
          </Button>
        </Grid>
        <Modal
          show={this.state.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Edit Shopping Cart Item
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid>
              <Row className="show-grid">
                <Col xs={9} sm={9} md={6} height={60}>
                  <h2>{this.state.detailEdit.product.name}</h2>
                  <br />
                  <Image
                    width={300}
                    src={this.state.detailEdit.product.img}
                    thumbnail
                  />
                  <br />
                  <ControlLabel> Price: </ControlLabel>${this.state.detailEdit.product.price}{" "}
                  <br />
                  <ControlLabel> Stock: </ControlLabel>
                  {this.state.detailEdit.product.stock} <br />
                  ${this.state.detailEdit.product.description}
                </Col>
              </Row>
            </Grid>
            <FormGroup controlId="formCode">
              <ControlLabel>Quantity</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter quantity"
                value={this.state.quantity}
                onChange={this.handleChangeQuantity}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close}>
              <Glyphicon glyph="ok" />
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CartCurrentComponent.displayName = "CartCartCurrentComponent";

// Uncomment properties you need
// CartCurrentComponent.propTypes = {};
// CartCurrentComponent.defaultProps = {};

export default CartCurrentComponent;
