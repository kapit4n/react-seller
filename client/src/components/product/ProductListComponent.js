'use strict';

import React from 'react';

require('styles/product/ProductList.css');

class ProductListComponent extends React.Component {
    render() {
        return (
        	<div>
        		<h2><a href="/product-add">+</a></h2>
	        	<table>
		            <tr>
		            	<th> Product Code </th> <th> Product Nam </th> <th> In Stock </th> <th> ------- </th>
		            </tr>
		            <tr>
			            <td> 1010 </td> <td> Product Name 1 </td> <td> 50 </td> <td> <a href="/product-show">Show</a> <a href="/product-edit">Edit</a> <a href="/product-delete">Delete</a></td>
			        </tr>
			        <tr>
			            <td> 1011 </td> <td> Product Name 2 </td> <td> 94 </td> <td>  <a href="/product-show">Show</a> <a href="/product-edit">Edit</a> <a href="/product-delete">Delete</a> </td>
			        </tr>
	            </table>
        	</div>
        );
    }
}

ProductListComponent.displayName = 'ProductProductListComponent';

// Uncomment properties you need
// ProductListComponent.propTypes = {};
// ProductListComponent.defaultProps = {};

export default ProductListComponent;
