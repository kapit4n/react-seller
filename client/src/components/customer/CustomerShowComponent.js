'use strict';

import React from 'react';
import { Media, Grid, ListGroup, ListGroupItem, Button, ButtonToolbar, Glyphicon} from 'react-bootstrap';
import { browserHistory } from 'react-router';

require('styles/customer/CustomerShow.css');

class CustomerShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.customerURL = 'http://localhost:3000/api/customers/';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.props = props;
    this.state = { customer : {}};
  }

  handleClick = () => {
    browserHistory.push('/customer-edit/' + this.state.customer.id);
  };

  handleRemove = () => {
    fetch(this.customerURL + "/" + this.state.customer.id + '?access_token=' + this.access_token, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
    }).then((response) => response.json())
    .then((responseJson) => { browserHistory.push('/customer-list');})
    .catch((error) => { console.error(error);});
  };

  componentDidMount() {
    fetch(this.customerURL + this.props.params.id + '?access_token=' + this.access_token) 
      .then((response) => response.json())
      .then((responseJson) => { this.setState({customer: responseJson});})
      .catch((error) => { console.error(error); });
  }

  render() {
    return (
      <div className="customershow-component">
        <Grid>
          <Media>
            <Media.Left>
              <img style={{clip: 'rect(0px,350px,200px,0px)', position: 'relative'}} width={350} src="https://mindtouch.com/resources/wp-content/uploads/sites/2/2014/08/happy-customers.png" alt="Image"/>
            </Media.Left>
            <Media.Body>
              <ButtonToolbar>
                <Button onClick = { this.handleClick }><Glyphicon glyph="edit"/></Button>
                <Button onClick = { this.handleRemove }><Glyphicon glyph="remove"/></Button>
              </ButtonToolbar>
              <Media.Heading>Name: {this.state.customer.name}</Media.Heading>
              <ListGroup>
                <ListGroupItem><h4 style={{display: 'inline'}}>Budget: </h4>{this.state.customer.budget}</ListGroupItem>
                <ListGroupItem><h4 style={{display: 'inline'}}>Address: </h4>{this.state.customer.address}</ListGroupItem>
              </ListGroup>
              <p>{this.state.customer.description}</p>
            </Media.Body>
          </Media>
        </Grid>
      </div>
    );
  }
}

CustomerShowComponent.displayName = 'CustomerCustomerShowComponent';

// Uncomment properties you need
// CustomerShowComponent.propTypes = {};
// CustomerShowComponent.defaultProps = {};

export default CustomerShowComponent;
