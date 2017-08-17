'use strict';

import React from 'react';
import {FieldGroup, ControlLabel, FormControl} from 'react-bootstrap'

require('styles/customer/CustomerAdd.css');

class CustomerAddComponent extends React.Component {
  render() {
    return (
      <div className="customeradd-component">

        Registration
        <FieldGroup
          id="customerName"
          type="text"
          label="Name"
          placeholder="Enter your name"
        />
        <FieldGroup
          id="customerEmail"
          type="email"
          label="Email"
          placeholder="Enter your email"
        />
        <FieldGroup
          id="customerAddress"
          type="text"
          label="Address"
          placeholder="Enter your address"
        />

      </div>
    );
  }
}

CustomerAddComponent.displayName = 'CustomerCustomerAddComponent';

// Uncomment properties you need
// CustomerAddComponent.propTypes = {};
// CustomerAddComponent.defaultProps = {};

export default CustomerAddComponent;
