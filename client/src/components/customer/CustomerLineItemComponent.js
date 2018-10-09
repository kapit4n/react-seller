'use strict';

import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
  Grid,
  Glyphicon
} from "react-bootstrap";
require('styles/customer/CustomerLineItem.css');

class CustomerLineItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { customer: this.props.customer};
    this.handleClick = this.removeCustomer.bind(this);
  }

  render() {
    return <tr className={"customerlineitem-component"}>
        <td>
          <a href={"customer-show/" + this.state.customer.id}>
            {this.state.customer.name}
          </a>
        </td>
        <td>{this.state.customer.budget}</td>
        <td>{this.state.customer.address}</td>
        <td>
          {" "}
        <Button onClick={() => props.handleClick(order.id)} bsStyle="danger">
            <Glyphicon glyph="remove" />{" "}
          </Button>
        </td>
      </tr>;
  }
}

CustomerLineItemComponent.displayName = 'CustomerCustomerLineItemComponent';

// Uncomment properties you need
// CustomerLineItemComponent.propTypes = {};
// CustomerLineItemComponent.defaultProps = {};

export default CustomerLineItemComponent;
