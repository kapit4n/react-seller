'use strict';

import React from 'react';
import { ListGroup, ListGroupItem, Badge, Image, Button, Glyphicon} from 'react-bootstrap';

require('styles/card/CardShow.css');

class CardShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.orderDetails = "http://localhost:3000/api/orderDetails?filter[where][orderId]=" + this.props.params.id + "&filter[include]=product";
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = { orderDetails: [] };
    this.loadItems();
  }

  deliverOrder(id){
    console.log("TODO deliver order");
  }

  cancelOrder(id){
    console.log("TODO cancel order");
  }

  render() {
    return (
      <div className="cardshow-component">
        <ListGroup>
          {
            this.state.orderDetails.map(function(orderDetail){
              let res = <ListGroupItem><Image src={orderDetail.product.img} thumbnail width={100} />Name: {orderDetail.product.name}<Badge>Quantity: {orderDetail.quantity}</Badge><Badge>Price: ${orderDetail.totalPrice}</Badge></ListGroupItem>;
              return res;
            })
          }
        </ListGroup>
        <Button onClick = {()=>this.deliverOrder(order.id)}> <Glyphicon glyph="send"/> Deliver</Button>
        <Button onClick = {()=>this.cancelOrder(order.id)}> <Glyphicon glyph="remove-sign"/> Remove</Button>
      </div>
    );
  }

  loadItems() {
    fetch(this.orderDetails + '&access_token=' + this.access_token) 
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setState({orderDetails: responseJson});
        console.log(this.state.orderDetails);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

CardShowComponent.displayName = 'CardCardShowComponent';

// Uncomment properties you need
// CardShowComponent.propTypes = {};
// CardShowComponent.defaultProps = {};

export default CardShowComponent;
