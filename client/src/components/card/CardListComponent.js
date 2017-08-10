'use strict';

import React from 'react';

require('styles/card/CardList.css');

class CardListComponent extends React.Component {
  constructor(){
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
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="cardlist-component">
        <ol>
          {
            this.state.orders.map(function(order){
              return <li>order.createdDate</li>;
            })
          }
        </ol>
      </div>
    );
  }
}

CardListComponent.displayName = 'CardCardListComponent';

// Uncomment properties you need
// CardListComponent.propTypes = {};
// CardListComponent.defaultProps = {};

export default CardListComponent;
