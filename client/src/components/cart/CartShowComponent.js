'use strict';

import React from 'react';
import { ListGroup, ListGroupItem, Badge, Image, Button, Glyphicon, Grid, Media, ButtonToolbar} from 'react-bootstrap';

require('styles/cart/CartShow.css');

class CartShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.orderURL = "http://localhost:3000/api/orders?filter[include]=customer&filter[where][id]=" + this.props.params.id;
    this.orderDetails = "http://localhost:3000/api/orderDetails?filter[where][orderId]=" + this.props.params.id + "&filter[include]=product";
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = { orderDetails: [], order:{} };
    this.loadItems();
  }

  deliverOrder(id) {
    console.log("TODO deliver order");
  }

  cancelOrder(id) {
    console.log("TODO cancel order");
  }

  render() {
    return (
      <div className="cartshow-component">

        <Grid>
          <Media>
            <Media.Left>

            </Media.Left>
            <Media.Body>
              <ButtonToolbar>
                 <Button onClick = {()=>this.deliverOrder(order.id)}> <Glyphicon glyph="send"/> Deliver</Button>
                  <Button onClick = {()=>this.cancelOrder(order.id)}> <Glyphicon glyph="remove-sign"/> Remove</Button>
              </ButtonToolbar>
              <Media.Heading>Order Details</Media.Heading>
              <ListGroup>
                <ListGroupItem><h4 style={{ display: 'inline' }}>Customer: </h4>{this.state.order.customer ? this.state.order.customer.name: ""}</ListGroupItem>
                <ListGroupItem><h4 style={{display: 'inline'}}>Date: </h4>{this.state.order.createdDate}</ListGroupItem>
                <ListGroupItem><h4 style={{display: 'inline'}}>Total: </h4>${this.state.order.total}</ListGroupItem>
              </ListGroup>
              <p>{this.state.order.description}</p>
              <ListGroup>
                {
                  this.state.orderDetails.map(function(orderDetail){
                    let res = <ListGroupItem><Image src={orderDetail.product.img} thumbnail width={100} />Name: {orderDetail.product.name}<Badge>Quantity: {orderDetail.quantity}</Badge><Badge>Price: ${orderDetail.totalPrice}</Badge></ListGroupItem>;
                    return res;
                  })
                }
              </ListGroup>
            </Media.Body>
          </Media>
        </Grid>
      </div>
    );
  }

  loadItems() {

    fetch(this.orderURL + '&access_token=' + this.access_token)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson[0]);
        this.setState({order: responseJson[0]});
      })
      .catch((error) => {
        console.error(error);
      });

    fetch(this.orderDetails + '&access_token=' + this.access_token)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({orderDetails: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

CartShowComponent.displayName = 'CartCartShowComponent';

// Uncomment properties you need
// CartShowComponent.propTypes = {};
// CartShowComponent.defaultProps = {};

export default CartShowComponent;
