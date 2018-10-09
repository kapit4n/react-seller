'use strict';

import React from 'react';
import { Media, Grid, ListGroup, ListGroupItem, Button, ButtonToolbar, Glyphicon} from 'react-bootstrap';
import { browserHistory } from 'react-router';

require('styles/vendor/VendorShow.css');

class VendorShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.vendorURL = 'http://localhost:3000/api/vendors/';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.props = props;
    this.state = { vendor : {}};
  }

  handleClick = () => {
    browserHistory.push('/vendor-edit/' + this.state.vendor.id);
  };

  handleRemove = () => {
    fetch(this.vendorURL + "/" + this.state.vendor.id + '?access_token=' + this.access_token, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
    }).then((response) => response.json())
    .then((responseJson) => { browserHistory.push('/vendor-list');})
    .catch((error) => { console.error(error);});
  };

  componentDidMount() {
    fetch(this.vendorURL + this.props.params.id + '?access_token=' + this.access_token) 
      .then((response) => response.json())
      .then((responseJson) => { this.setState({vendor: responseJson});})
      .catch((error) => { console.error(error); });
  }

  render() {
    return (
      <div className="vendorshow-component">
        <Grid>
          <Media>
            <Media.Left>
              <img style={{clip: 'rect(0px,350px,200px,0px)', position: 'relative'}} width={350} src="https://i1.wp.com/onsunnyslopefarm.com/wp-content/uploads/2016/12/vendor-booth-10x20_4f317de637994db6183bdc59a72cee30.jpeg" alt="Image"/>
            </Media.Left>
            <Media.Body>
              <ButtonToolbar>
                <Button onClick = { this.handleClick }><Glyphicon glyph="edit"/></Button>
                <Button onClick = { this.handleRemove }><Glyphicon glyph="remove"/></Button>
              </ButtonToolbar>
              <Media.Heading>Name: {this.state.vendor.name}</Media.Heading>
              <ListGroup>
                <ListGroupItem><h4 style={{display: 'inline'}}>Address: </h4>{this.state.vendor.address}</ListGroupItem>
              </ListGroup>
              <p>{this.state.vendor.description}</p>
            </Media.Body>
          </Media>
        </Grid>
      </div>
    );
  }
}

VendorShowComponent.displayName = 'VendorVendorShowComponent';

// Uncomment properties you need
// VendorShowComponent.propTypes = {};
// VendorShowComponent.defaultProps = {};

export default VendorShowComponent;
