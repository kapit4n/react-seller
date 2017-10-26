'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import {FieldGroup, ControlLabel, FormControl, FormGroup, HelpBlock, Grid, Glyphicon, ButtonToolbar, Button} from 'react-bootstrap'

require('styles/vendor/VendorAdd.css');

class VendorAddComponent extends React.Component {
  constructor() {
      super();
      this.vendorURL = 'http://localhost:3000/api/vendors';
      this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
      this.state = { name: '', budget: '', address: ''};
  };


  handleChangeName = (event) => {
      this.setState({ name: event.target.value });
  }

  handleChangeBudget = (event) => {
      this.setState({ budget: event.target.value });
  }

  handleChangeAddress = (event) => {
      this.setState({ address: event.target.value });
  }

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
          .then((responseJson) => { browserHistory.push('/vendor-list'); })
          .catch((error) => { console.error(error); });

  };

  handleGoList = () => {
      browserHistory.push('/vendor-list');
  };

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

// Uncomment properties you need
// VendorAddComponent.propTypes = {};
// VendorAddComponent.defaultProps = {};

export default VendorAddComponent;
