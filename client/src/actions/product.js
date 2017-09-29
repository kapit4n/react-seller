import * as types from '../constants/ActionTypes'

export const addProduct = text => ({ type: types.ADD_PRODUCT, text })
export const deleteProduct = id => ({ type: types.DELETE_PRODUCT, id })
export const editProduct = (id, text) => ({ type: types.EDIT_PRODUCT, id, text })
export const completeProduct = id => ({ type: types.COMPLETE_PRODUCT, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
