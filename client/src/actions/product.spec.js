import * as types from '../constants/ActionTypes'
import * as actions from './product'

describe('product actions', () => {
  it('addProduct should create ADD_PRODUCT action', () => {
    expect(actions.addProduct('Use Redux')).toEqual({
      type: types.ADD_PRODUCT,
      text: 'Use Redux'
    })
  })

  it('deleteProduct should create DELETE_PRODUCT action', () => {
    expect(actions.deleteProduct(1)).toEqual({
      type: types.DELETE_PRODUCT,
      id: 1
    })
  })

  it('editProduct should create EDIT_PRODUCT action', () => {
    expect(actions.editProduct(1, 'Use Redux everywhere')).toEqual({
      type: types.EDIT_PRODUCT,
      id: 1,
      text: 'Use Redux everywhere'
    })
  })

  it('completeProduct should create COMPLETE_PRODUCT action', () => {
    expect(actions.completeProduct(1)).toEqual({
      type: types.COMPLETE_PRODUCT,
      id: 1
    })
  })

  it('completeAll should create COMPLETE_ALL action', () => {
    expect(actions.completeAll()).toEqual({
      type: types.COMPLETE_ALL
    })
  })

  it('clearCompleted should create CLEAR_COMPLETED action', () => {
    expect(actions.clearCompleted()).toEqual({
      type: types.CLEAR_COMPLETED
    })
  })
})
