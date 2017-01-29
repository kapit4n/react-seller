'use strict';

import React from 'react';

require('styles//Home.css');
import { Grid, Row, Col, Image, Button} from 'react-bootstrap';

class HomeComponent extends React.Component {
   constructor(){
      super();
      this.products = [
          {
            id: 1,
            name: "Product Name 1",
            src: "http://www.shinzoo.com/images002/toys-01/toys/04.jpg"
          },
          {
            id: 2,
            name: "Product Name 2",
            src: "http://www.shinzoo.com/images002/toys-01/toys/03.jpg",
          },
          {
            id: 3,
            name: "Product name 3",
            src: "https://foodheart.org/assets/toys-main-5c1feeb193fe726a922fafb59d82d512.png",
          },
          ];
    }
  render() {
    return (
      <div className="home-component">
          <Grid>
            <Row className="show-grid">
               {this.products.map(function (product) {
                  return <Col xs={6} md={4} height={400}>
                    <Image width={300} height={300} src={product.src} thumbnail />
                    <Button xs={12} md={12}  bsStyle="link" href={'product-show/' + product.id}>{product.name}</Button>
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
