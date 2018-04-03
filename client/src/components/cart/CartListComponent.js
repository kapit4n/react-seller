'use strict';

import React from 'react';
import { ListGroup, ListGroupItem, Badge, Button, Grid} from 'react-bootstrap';

require('styles/cart/CartList.css');

class CartListComponent extends React.Component {
  constructor() {
    super();
    this.orderURL = 'http://localhost:3000/api/orders';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = { orders: []};
    this.loadItems();
  }

  loadItems() {
    fetch(this.orderURL + '?access_token=' + this.access_token)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({orders: responseJson});
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="cartlist-component">
        <Grid>
          <ListGroup>
            {
              this.state.orders.map(function(order) {
                let res = <ListGroupItem><Button bsStyle="info" href={'../cart-show/' + order.id}>SHOW</Button> <Button bsStyle="danger" href={'../cart-show/' + order.id}>CANCEL</Button> {order.description}<Badge>{order.createdDate}</Badge><Badge>Total: {order.total}</Badge></ListGroupItem>;
                if (order.delivered) {
                  res = <ListGroupItem ><Button bsStyle="info" href={'../cart-show/' + order.id}>SHOW</Button> <Button bsStyle="danger" href={'../cart-show/' + order.id}>CANCEL</Button> {order.description} <Badge>Delivered</Badge> <Badge>{order.createdDate}</Badge><Badge>Total: {order.total}</Badge></ListGroupItem>;
                }
                return res;
              })
            }
          </ListGroup>
        </Grid>
      </div>
    );
  }
}

CartListComponent.displayName = 'CartCartListComponent';

// Uncomment properties you need
// CartListComponent.propTypes = {};
// CartListComponent.defaultProps = {};

export default CartListComponent;
