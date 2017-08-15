'use strict';

import React from 'react';

require('styles/card/CardShow.css');

class CardShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.orderDetails = "http://localhost:3000/api/orderDetails?filter[where][orderId][eq]={0}&filter[include]=product";
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = { orderDetails: [], totalPrice: 0, detailEdit: {product: {}, quantity: 0}};
  }
  render() {
    return (
      <div className="cardshow-component">
        Please edit src/components/card//CardShowComponent.js to update this component!
      </div>
    );
  }

  loadItems() {
    fetch(this.orderDetails.format(props.params.id) + '&access_token=' + this.access_token) 
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setState({orderDetails: responseJson});
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
