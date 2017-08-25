'use strict';

import React from 'react';
import { Table, Image, Button, Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import { browserHistory } from 'react-router';
require('styles/customer/CustomerList.css');
import CustomerLineItemComponent from './CustomerLineItemComponent';


class CustomerListComponent extends React.Component {
	constructor() {
    super();
    this.customerURL = 'http://localhost:3000/api/customers';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = { customers: []};
  }
  componentDidMount() {
    fetch(this.customerURL + '?access_token=' + this.access_token) 
      .then((response) => response.json())
      .then((responseJson) => { this.setState({customers:responseJson});})
      .catch((error) => { console.error(error); });
  }

  handleAdd = () => {
    browserHistory.push('/customer-add/');
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
                <th>Code</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {this.state.customers.map(function (customer) {
                return  <CustomerLineItemComponent key={customer.id} customer={customer}/>;
                })
              }
            </tbody>
          </Table>
          </Grid>
      </div>
    );
  }
}

CustomerListComponent.displayName = 'CustomerCustomerListComponent';

// Uncomment properties you need
// CustomerListComponent.propTypes = {};
// CustomerListComponent.defaultProps = {};

export default CustomerListComponent;
