'use strict';

import React from 'react';

require('styles/product/ProductRelated.css');

class ProductRelatedComponent extends React.Component {
  render() {
    return (
      <div className="productrelated-component">
        Show the product list here
      </div>
    );
  }
}

ProductRelatedComponent.displayName = 'ProductProductRelatedComponent';

// Uncomment properties you need
// ProductRelatedComponent.propTypes = {};
// ProductRelatedComponent.defaultProps = {};

export default ProductRelatedComponent;
