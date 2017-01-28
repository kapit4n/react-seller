'use strict';

import React from 'react';
import {browserHistory} from 'react-router';

require('styles/product/ProductAdd.css');
import { Button, ButtonToolbar, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class ProductAddComponent extends React.Component {
  handleClick = () => {
    browserHistory.push('/product-list');
  };

  render() {
    return (
      <div className="productadd-component">
        <ButtonToolbar>
          <Button onClick={this.handleClick} >Save</Button>
          <Button bsStyle="danger" onClick={this.handleClick} >Cancel</Button>
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
          <Button onClick={this.handleClick} >Save</Button>
          <Button bsStyle="danger" onClick={this.handleClick} >Cancel</Button>
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
