'use strict';

import React from 'react';

require('styles/product/ProductShow.css');

import { Media, Grid} from 'react-bootstrap';

class ProductShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.productURL = 'http://localhost:3000/api/products/';
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
      }
    ];
    let idProduct = 1;
    this.props = props;
    this.state = { product : this.productsMock.find(product=> product.id == props.params.id)};
  }

  componentDidMount() {
  fetch(this.productURL + this.props.params.id + '?access_token=' + this.access_token) 
    .then((response) => response.json())
    .then((responseJson) => { this.setState({product:responseJson});})
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
              <Media.Heading>{this.state.product.name}</Media.Heading>
              <h2>{this.state.product.code}</h2>
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
