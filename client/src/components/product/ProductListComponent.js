'use strict';

import React from 'react';
import $ from 'jquery'
require('styles/product/ProductList.css');
import { Table, Image, Button, Grid, Row, Col} from 'react-bootstrap';

class ProductListComponent extends React.Component {
  constructor() {
     super();
    this.productURL = 'http://localhost:3000/api/products';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.productsMock = [
      {
        id: 1,
        name: "Product Name 1",
        code: "Code1",
        img: "http://www.shinzoo.com/images002/toys-01/toys/04.jpg",
        description: "Description of the product"
      },
      {
        id: 2,
        name: "Product Name 2",
        code: "Code2",
        img: "http://www.shinzoo.com/images002/toys-01/toys/03.jpg",
        description: "Description of the product"
      },
      {
        id: 3,
        name: "Product Name 3",
        code: "Code3",
        img: "https://foodheart.org/assets/toys-main-5c1feeb193fe726a922fafb59d82d512.png",
        description: "Description of the product"
      },
      {
        id: 4,
        name: "Product Name 4",
        code: "Code4",
        img: "https://foodheart.org/assets/toys-main-5c1feeb193fe726a922fafb59d82d512.png",
        description: "Description of the product"
      },
    ];

    this.state = { products: this.productsMock };
  }

  componentDidMount() {
    fetch(this.productURL + '?access_token=' + this.access_token) 
      .then((response) => response.json())
      .then((responseJson) => { this.setState({products:responseJson});})
      .catch((error) => { console.error(error); });
    this.addPreviewEvent();
  }

  addPreviewEvent() {
    var preview = $('#preview');
    $('.img-thumbnail').hover(function () {
        preview.attr('src', $(this).attr('src'));
    }, function () {
        preview.attr('src', 'https://upload.wikimedia.org/wikipedia/en/e/ea/Preview_(Mac_OS_X).png');
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <h2><a href="/product-add">+</a></h2>
          <img id="preview" style={{width: 200, height: 200}} src={"https://upload.wikimedia.org/wikipedia/en/e/ea/Preview_(Mac_OS_X).png"}/>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map(function (product) {
                return  <tr>
                          <td><a href={'product-show/' + product.id}>{product.name}</a></td>
                          <td>{product.code}</td>
                          <td><Image src={product.img} thumbnail width={60} height={60} /></td>
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
