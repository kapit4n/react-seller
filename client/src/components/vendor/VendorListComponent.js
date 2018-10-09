'use strict';

import React from 'react';
import { Table, Image, Button, Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import { browserHistory } from 'react-router';
require('styles/vendor/VendorList.css');
import VendorLineItemComponent from './VendorLineItemComponent';

require('styles/vendor/VendorList.css');

class VendorListComponent extends React.Component {
	constructor() {
    super();
    this.vendorURL = 'http://localhost:3000/api/vendors';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = { vendors: []};
  }
  componentDidMount() {
    fetch(this.vendorURL + '?access_token=' + this.access_token) 
      .then((response) => response.json())
      .then((responseJson) => { this.setState({vendors:responseJson});})
      .catch((error) => { console.error(error); });
  }

  handleAdd = () => {
    browserHistory.push('/vendor-add/');
  };

  render() {
    return (
      <div>
        <Grid>
          <Button onClick = { this.handleAdd }><Glyphicon glyph="plus"/></Button>
          <img id="preview" style={{width: 300, position: 'absolute', left: '30%', top: '15%'}}/>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {this.state.vendors.map(function (vendor) {
                return  <VendorLineItemComponent key={vendor.id} vendor={vendor}/>;
                })
              }
            </tbody>
          </Table>
          </Grid>
      </div>
    );
  }
}

VendorListComponent.displayName = 'VendorVendorListComponent';

// Uncomment properties you need
// VendorListComponent.propTypes = {};
// VendorListComponent.defaultProps = {};

export default VendorListComponent;
