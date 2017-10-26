'use strict';

import React from 'react';

require('styles/vendor/VendorLineItem.css');

class VendorLineItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { vendor: this.props.vendor};
  }

  render() {
    return (
      <tr className={'vendorlineitem-component'}>
        <td><a href={'vendor-show/' + this.state.vendor.id}>{this.state.vendor.name}</a></td>
        <td>{this.state.vendor.address}</td>
      </tr>
    );
  }
}

VendorLineItemComponent.displayName = 'VendorVendorLineItemComponent';

// Uncomment properties you need
// VendorLineItemComponent.propTypes = {};
// VendorLineItemComponent.defaultProps = {};

export default VendorLineItemComponent;
