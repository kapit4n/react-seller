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
    this.state = { products: []};
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
    $('.productRow').hover(function () {
      preview.attr('src', $(this).find('.img-thumbnail').attr('src'));
      preview.show();
    }, function () {
      preview.hide();
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <h2><a href="/product-add">+</a></h2>
          <img id="preview" style={{width: 300, position: 'absolute', left: '30%', top: '15%'}}/>
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
                return  <tr className={'productRow'}>
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
