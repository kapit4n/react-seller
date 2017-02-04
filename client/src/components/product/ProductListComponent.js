'use strict';

import React from 'react';

require('styles/product/ProductList.css');
import { Table, Image, Button, Grid, Row, Col} from 'react-bootstrap';

class ProductListComponent extends React.Component {
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
      },

    ];
  }

  render() {
    return (
      <div>
        <Grid>
          <h2><a href="/product-add">+</a></h2>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {this.products.map(function (product) {
                return  <tr>
                          <td><a href={'product-show/' + product.id}>{product.name}</a></td>
                          <td>{product.code}</td>
                          <td><Image src={product.src} thumbnail width={60} height={60} /></td>
                        </tr>;
                })}
            </tbody>
          </Table>
          </Grid>
      </div>
    );
  }
}

ProductListComponent.displayName = 'ProductProductListComponent';

// Uncomment properties you need
// ProductListComponent.propTypes = {};
// ProductListComponent.defaultProps = {};

export default ProductListComponent;
