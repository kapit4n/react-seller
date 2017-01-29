'use strict';

import React from 'react';

require('styles/product/ProductShow.css');

import { Media, Grid} from 'react-bootstrap';

class ProductShowComponent extends React.Component {
  constructor() {
    super();
    this.products = [
      {
        id: 1,
        name: "Product Name 1",
        code: "Code1",
        src: "http://www.shinzoo.com/images002/toys-01/toys/04.jpg",
        description: "Description of the product"
      },
      {
        id: 2,
        name: "Product Name 2",
        code: "Code2",
        src: "http://www.shinzoo.com/images002/toys-01/toys/03.jpg",
        description: "Description of the product"
      },
      {
        id: 3,
        name: "Product Name 3",
        code: "Code3",
        src: "https://foodheart.org/assets/toys-main-5c1feeb193fe726a922fafb59d82d512.png",
        description: "Description of the product"
      },
      {
        id: 4,
        name: "Product Name 4",
        code: "Code4",
        src: "https://foodheart.org/assets/toys-main-5c1feeb193fe726a922fafb59d82d512.png",
        description: "Description of the product"
      }
    ];
    let idProduct = 1;
    // this.props.params.id
  }

  render() {
    return (
      <div className="productshow-component">
        <Grid>
          <Media>
            <Media.Left>
              <img width={200} height={200} src={this.products.find(product=> product.id == this.props.params.id).src} alt="Image"/>
            </Media.Left>
            <Media.Body>
              <Media.Heading>{this.products.find(product=> product.id == this.props.params.id).name}</Media.Heading>
              <h2>{this.products.find(product=> product.id == this.props.params.id).code}</h2>
              <p>{this.products.find(product=> product.id == this.props.params.id).description}</p>
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
