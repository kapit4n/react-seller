'use strict';

import React from 'react';
import { Image } from 'react-bootstrap';

require('styles/product/ProductLineItem.css');

class ProductLineItemComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { product: this.props.product};
  }

  render() {
    return (
      <tr className={'productlineitem-component'}>
        <td><a href={'product-show/' + this.state.product.id}>{this.state.product.name}</a></td>
        <td>{this.state.product.code}</td>
        <td><Image src={this.state.product.img} thumbnail width={60} height={60} /></td>
      </tr>
    );
  }
}

ProductLineItemComponent.displayName = 'ProductProductLineItemComponent';

// Uncomment properties you need
// ProductLineItemComponent.propTypes = {};
// ProductLineItemComponent.defaultProps = {};

export default ProductLineItemComponent;
