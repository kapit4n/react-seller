'use strict';

import React from 'react';

require('styles/product/ProductLineItem.css');

class ProductLineItemComponent extends React.Component {
	constructor() {
		this.state = { product: {code: 0, img: "", id: 0, name: ""}};
	}
  render() {
    return (
      <tr className={'productlineitem-component'}>
                          <td><a href={'product-show/' + product.id}>{product.name}</a></td>
                          <td>{product.code}</td>
                          <td><Image src={product.img} thumbnail width={60} height={60} /></td>
                        </tr>
    );
  }
}

ProductLineItemComponent.displayName = 'ProductProductLineItemComponent';

// Uncomment properties you need
// ProductLineItemComponent.propTypes = {};
// ProductLineItemComponent.defaultProps = {};

export default ProductLineItemComponent;
