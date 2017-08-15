'use strict';

import React from 'react';

require('styles/card/CardShow.css');

class CardShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.orderDetails = "http://localhost:3000/api/orderDetails?filter[where][orderId][eq]=" + this.props.params.id + "&filter[include]=product";
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = { orderDetails: [] };
    this.loadItems();
  }
  render() {
    return (
      <div className="cardshow-component">
        Please edit src/components/card//CardShowComponent.js to update this component!
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
