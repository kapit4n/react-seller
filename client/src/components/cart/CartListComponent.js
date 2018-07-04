"use strict";

import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
  Grid,
  Glyphicon
} from "react-bootstrap";

require("styles/cart/CartList.css");

class CartListComponent extends React.Component {
  constructor() {
    super();
    this.orderURL = "http://localhost:3000/api/orders";
    this.access_token =
      "T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7";
    this.state = { orders: [] };
    this.loadItems();
  }

  loadItems = () => {
    fetch(
      this.orderURL +
        "?filter[include]=customer&access_token=" +
        this.access_token
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ orders: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  };

  removeOrder = id => {
    fetch(this.orderURL + "/" + id + "?access_token=" + this.access_token, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.loadItems();
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="cartlist-component">
        <Grid>
          <ListGroup>
            {this.state.orders.map(order => {
              return <ListGroupItem key={order.id}>
                  <Button bsStyle="info" href={"../cart-show/" + order.id}>
                    <Glyphicon glyph="folder-open" />{" "}
                  </Button>
                  <Button onClick={() => this.removeOrder(order.id)} bsStyle="danger">
                    <Glyphicon glyph="remove" />{" "}
                  </Button>
                  {order.description}, customer: {order.customer ? order.customer.name : ""}
                  <Badge>{order.createdDate}</Badge>
                  <Badge>Total: {order.total}</Badge>
                </ListGroupItem>;
            })}
          </ListGroup>
        </Grid>
      </div>
    );
  }
}

CartListComponent.displayName = "CartCartListComponent";

// Uncomment properties you need
// CartListComponent.propTypes = {};
// CartListComponent.defaultProps = {};

export default CartListComponent;
