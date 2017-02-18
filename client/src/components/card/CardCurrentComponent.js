'use strict';

import React from 'react';

require('styles/card/CardCurrent.css');
import { Table, Image, Button, Grid, Row, Col} from 'react-bootstrap';

class CardCurrentComponent extends React.Component {
  constructor() {
    super();
    this.orderDetailURL = 'http://localhost:3000/api/orderDetails';
    this.orderFilter = '?filter[include]=product'
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = { orderDetails: []};
  }

  componentDidMount() {
    fetch(this.orderDetailURL + this.orderFilter + '&access_token=' + this.access_token) 
      .then((response) => response.json())
      .then((responseJson) => {console.log(responseJson);  this.setState({orderDetails:responseJson});})
      .catch((error) => { console.error(error); });
  }

  render() {
    return (
      <div className="cardcurrent-component">
        <Grid>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Code</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orderDetails.map(function (detail) {
                return  <tr className={'detailRow'}>
                          <td><a href={'product-show/' + detail.product.id}>{detail.product.id}</a></td>
                          <td>{detail.quantity}</td>
                          <td>${detail.price}</td>
                          <td>${detail.totalPrice}</td>
                          <td><Image src={detail.product.img} thumbnail width={60} height={60} /></td>
                        </tr>;
                })}
            </tbody>
          </Table>
          </Grid>
      </div>
    );
  }
}

CardCurrentComponent.displayName = 'CardCardCurrentComponent';

// Uncomment properties you need
// CardCurrentComponent.propTypes = {};
// CardCurrentComponent.defaultProps = {};

export default CardCurrentComponent;
