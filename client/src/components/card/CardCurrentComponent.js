'use strict';

import React from 'react';

require('styles/card/CardCurrent.css');
import { Table, Image, Button, Grid, Row, Col} from 'react-bootstrap';

class CardCurrentComponent extends React.Component {
  constructor() {
    super();
    this.productURL = 'http://localhost:3000/api/orderDetails';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = { orderDetails: []};
  }

  componentDidMount() {
    fetch(this.productURL + '?access_token=' + this.access_token) 
      .then((response) => response.json())
      .then((responseJson) => { this.setState({orderDetails:responseJson});})
      .catch((error) => { console.error(error); });
    this.addPreviewEvent();
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
              </tr>
            </thead>
            <tbody>
              {this.state.orderDetails.map(function (detail) {
                return  <tr className={'detailRow'}>
                          <td><a href={'detail-show/' + detail.id}>{detail.id}</a></td>
                          <td>{detail.quantity}</td>
                          <td>${detail.price}</td>
                          <td>${detail.totalPrice}</td>
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
