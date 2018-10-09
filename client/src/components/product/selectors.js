// import { createSelector } from 'reselect'
import _ from 'lodash'
import {product} from '../../api'
const productSelectors = product.selectors()

export const isProductsLoading = productSelectors.isLoading
export const getProductsCount = productSelectors.getCount

export const getFilter = state => state.products.visibilityFilter

export const getVisibleProducts = state => {
    const products = productSelectors.getFound(state)
    const filter = getFilter(state)
    switch (filter) {
      case 'SHOW_ALL':
        return products
      case 'SHOW_COMPLETED':
        return products.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return products.filter(t => !t.completed)
    }
  }

// export const getVisibleProducts = createSelector(
//   getProducts, getFilter, (products, filter) => {
//     switch (filter) {
//       case 'SHOW_ALL':
//         return products
//       case 'SHOW_COMPLETED':
//         return products.filter(t => t.completed)
//       case 'SHOW_ACTIVE':
//         return products.filter(t => !t.completed)
//     }
//   }
// )

