'use strict';

import React from 'react';

require('styles/product/ProductShow.css');
import { browserHistory } from 'react-router';
import { Media, Grid, ListGroup, ListGroupItem, Button, ButtonToolbar} from 'react-bootstrap';

class ProductShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.productURL = 'http://localhost:3000/api/products/';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.props = props;
    this.state = { product : {}};
  }

  handleClick = () => {
    browserHistory.push('/product-edit/' + this.state.product.id);
  };

  componentDidMount() {
  fetch(this.productURL + this.props.params.id + '?access_token=' + this.access_token) 
    .then((response) => response.json())
    .then((responseJson) => { this.setState({product: responseJson});})
    .catch((error) => { console.error(error); });
  }

  render() {
    return (
      <div className="productshow-component">
        <Grid>
          <Media>
            <Media.Left>
              <img style={{clip: 'rect(0px,350px,200px,0px)', position: 'relative'}} width={350} src={this.state.product.img} alt="Image"/>
            </Media.Left>
            <Media.Body>
              <ButtonToolbar>
                <Button onClick = { this.handleClick }> Edit </Button></ButtonToolbar>
              <Media.Heading>Name: {this.state.product.name}</Media.Heading>
              <ListGroup>
                <ListGroupItem><h4 style={{display: 'inline'}}>Code: </h4>{this.state.product.code}</ListGroupItem>
                <ListGroupItem><h4 style={{display: 'inline'}}>Stock: </h4>{this.state.product.stock}</ListGroupItem>
                <ListGroupItem><h4 style={{display: 'inline'}}>Price: </h4>{this.state.product.price}</ListGroupItem>
              </ListGroup>
              <p>{this.state.product.description}</p>
            </Media.Body>
          </Media>
        </Grid>
      </div>
    );
  }
}

ProductShowComponent.displayName = 'ProductProductShowComponent';

// Uncomment properties you need
// ProductShowComponent.propTypes = {};
// ProductShowComponent.defaultProps = {};

export default ProductShowComponent;
