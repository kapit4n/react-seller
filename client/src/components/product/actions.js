import { product } from '../../api'

const productActions = product.actions()
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const TOGGLE_PRODUCT = 'TOGGLE_PRODUCT'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

export const ActionLinks = {
  //DELETE_ALL: () => (dispatch) => dispatch(productActions.delete({})),
  DELETE_ALL: () => (dispatch) => dispatch(productActions.custom('DELETE_ALL', 'deleteProducts', 'POST')).then(response => {
    dispatch(productActions.find({}))
    dispatch(productActions.count({}))
  }),
  COMPLETE_ALL: () => (dispatch) => {
    dispatch(productActions.updateAll({ completed: false }, { completed: true })).then(response => {
      dispatch(productActions.find({}))
    })
  },
  UNCOMPLETE_ALL: () => (dispatch) => {
    dispatch(productActions.updateAll({ completed: true }, { completed: false })).then(response => {
      dispatch(productActions.find({}))
    })
  }
}