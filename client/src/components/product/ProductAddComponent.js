'use strict';

import React from 'react';

require('styles/product/ProductAdd.css');
import { Button, ButtonToolbar, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

class ProductAddComponent extends React.Component {
  render() {
    return (
      <div className="productadd-component">
        <ButtonToolbar>
          <Button>Save</Button>
          <Button bsStyle="danger">Cancel</Button>
        </ButtonToolbar>
        <FormGroup controlId="formName">
          <ControlLabel>Name</ControlLabel>
          <FormControl type="text"placeholder="Enter text"/>
        </FormGroup>
        <FormGroup controlId="formCode">
          <ControlLabel>Code</ControlLabel>
          <FormControl type="text"placeholder="Enter text"/>
        </FormGroup>
        <FormGroup controlId="form">
          <ControlLabel>Code</ControlLabel>
          <FormControl type="text"placeholder="Enter text"/>
        </FormGroup>
        <FormGroup controlId="formCode">
          <ControlLabel>Price</ControlLabel>
          <FormControl type="text"placeholder="Enter text"/>
        </FormGroup>
        <FormGroup controlId="formCode">
          <ControlLabel>Stock</ControlLabel>
          <FormControl type="text"placeholder="Enter text"/>
        </FormGroup>
        <FormGroup controlId="formCode">
          <ControlLabel>Description</ControlLabel>
          <FormControl type="text"placeholder="Enter text"/>
        </FormGroup>
        <ButtonToolbar>
          <Button>Save</Button>
          <Button bsStyle="danger">Cancel</Button>
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
