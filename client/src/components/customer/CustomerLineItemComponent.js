'use strict';

import React from 'react';

require('styles/customer/CustomerLineItem.css');

class CustomerLineItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { customer: this.props.customer};
  }

  render() {
    return (
      <tr className={'customerlineitem-component'}>
        <td><a href={'customer-show/' + this.state.customer.id}>{this.state.customer.name}</a></td>
        <td>{this.state.customer.budget}</td>
        <td>{this.state.customer.address}</td>
      </tr>
    );
  }
}

CustomerLineItemComponent.displayName = 'CustomerCustomerLineItemComponent';

// Uncomment properties you need
// CustomerLineItemComponent.propTypes = {};
// CustomerLineItemComponent.defaultProps = {};

export default CustomerLineItemComponent;
