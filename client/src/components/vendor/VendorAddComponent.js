'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import {FieldGroup, ControlLabel, FormControl, FormGroup, HelpBlock, Grid, Glyphicon, ButtonToolbar, Button} from 'react-bootstrap'

require('styles/vendor/VendorAdd.css');

/**
 * Component to register a new vendor for the application
 */
class VendorAddComponent extends React.Component {
  
  /**
   * Constructor
   */
  constructor() {
      super();
      this.vendorURL = 'http://localhost:3000/api/vendors';
      this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
      this.state = { name: '', budget: '', address: ''};
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeAddress = this.handleChangeAddress.bind(this);
  }

  /**
   * Sets new value to name property of state with the one entered on the input
   */
  handleChangeName = (event) => {
      this.setState({ name: event.target.value });
  }

  /**
   * Sets new value to address property of state with the one entered on the input
   */
  handleChangeAddress = (event) => {
      this.setState({ address: event.target.value });
  }

  /**
   * Sends the vendor information to API to create a new vendor
   */
  handleOk = () => {
      var product = {
          name: this.state.name,
          address: this.state.address
      };
    
      fetch(this.vendorURL + '?access_token=' + this.access_token, {
              method: 'POST',
              headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
              body: JSON.stringify(product)
          }).then((response) => response.json())
          .then((responseJson) => { 
            browserHistory.push('/vendor-list'); 
          }).catch((error) => { console.error(error); });
  };

  /**
   * Redirects to vendor list page
   */
  handleGoList = () => {
      browserHistory.push('/vendor-list');
  };

  /** Renders the vendor add component */
  render() {
    return (
      <div className="vendoradd-component">
        <Grid>
          <ButtonToolbar>
          <Button onClick = { this.handleClick }><Glyphicon glyph="ok"/></Button>
          <Button onClick = { this.handleGoList }><Glyphicon glyph="list"/></Button> 
          </ButtonToolbar>
          <FormGroup controlId = "formName">
              <ControlLabel> Name </ControlLabel> <FormControl type = "text"
              placeholder = "Enter Vendor Name"
              value = { this.state.name }
              onChange = { this.handleChangeName }
              />
          </FormGroup>                
          <FormGroup controlId = "formAddress">
              <ControlLabel> Address </ControlLabel><FormControl type = "text"
              placeholder = "Enter Address"
              value = { this.state.address }
              onChange = { this.handleChangeAddress }
              />
          </FormGroup>
          <ButtonToolbar>
          <Button onClick = { this.handleOk }><Glyphicon glyph="ok"/> </Button> <Button
          onClick = { this.handleGoList }><Glyphicon glyph="list"/></Button> </ButtonToolbar>
        </Grid>
      </div>
    );
  }
}

VendorAddComponent.displayName = 'VendorVendorAddComponent';

// VendorAddComponent.propTypes = {};
// VendorAddComponent.defaultProps = {};

export default VendorAddComponent;
