'use strict';

import React from 'react';

require('styles/product/ProductShow.css');

import { Media, Grid, ListGroup, ListGroupItem} from 'react-bootstrap';

class ProductShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.productURL = 'http://localhost:3000/api/products/';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.props = props;
    this.state = { product : {}};
  }

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
              <img width={350} height={350} src={this.state.product.img} alt="Image"/>
            </Media.Left>
            <Media.Body>
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
