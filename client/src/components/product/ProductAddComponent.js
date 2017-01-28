'use strict';

import React from 'react';

require('styles/product/ProductAdd.css');
import { Button, ButtonToolbar } from 'react-bootstrap';

class ProductAddComponent extends React.Component {
  render() {
    return (
      <div className="productadd-component">
        <ButtonToolbar>
          <Button>Default</Button>
             {/* Indicates a successful or positive action */}
          <Button bsStyle="success">Success</Button>

    {/* Contextual button for informational alert messages */}
    <Button bsStyle="info">Info</Button>

    {/* Indicates caution should be taken with this action */}
    <Button bsStyle="warning">Warning</Button>

    {/* Indicates a dangerous or potentially negative action */}
    <Button bsStyle="danger">Danger</Button>

        </ButtonToolbar>
      </div>
    );
  }
}

ProductAddComponent.displayName = 'ProductProductAddComponent';

// Uncomment properties you need
// ProductAddComponent.propTypes = {};
// ProductAddComponent.defaultProps = {};

export default ProductAddComponent;
