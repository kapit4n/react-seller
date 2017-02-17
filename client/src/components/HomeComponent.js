'use strict';

import React from 'react';

require('styles//Home.css');
import { Grid, Row, Col, Image, Button, ButtonToolbar, Glyphicon} from 'react-bootstrap';

class HomeComponent extends React.Component {
   constructor(){
    super();
    this.productURL = 'http://localhost:3000/api/products';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = { products: [] };
  }

  componentDidMount() {
    fetch(this.productURL + '?access_token=' + this.access_token) 
        .then((response) => response.json())
        .then((responseJson) => { this.setState({products:responseJson});})
        .catch((error) => { console.error(error); });
  }

  render() {
    return (
      <div className="home-component">
          <Grid>
            <Row className="show-grid">
               {this.state.products.map(function (product) {
                  return <Col xs={6} md={4} height={400}>
                      <Image width={300} height={300} src={product.img} thumbnail />
                      <Button xs={12} md={12}  bsStyle="link" href={'product-show/' + product.id}>{product.name}</Button>
                      <ButtonToolbar>
                        <Button style={{width: 250, marginLeft: 25}}><Glyphicon glyph="shopping-cart"/> Add to Card </Button>
                      </ButtonToolbar>
                  </Col>;
                })}
            </Row>
          </Grid>
      </div>
    );
  }
}

HomeComponent.displayName = 'HomeComponent';

// Uncomment properties you need
// HomeComponent.propTypes = {};
// HomeComponent.defaultProps = {};

export default HomeComponent;
