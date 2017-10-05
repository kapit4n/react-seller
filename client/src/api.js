import RestRedux from 'rest-redux';

const restRedux = new RestRedux({
  basePath: 'http://localhost:3000/api',
  globalOptions: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  models: [{
    modelName: 'products'}, {
    modelName: 'users'
  }, ]
})

export default restRedux

export const restReduxReducer = restRedux.reducer
export const restReduxMiddleware = restRedux.middleware

export const productsData = restRedux.get('products')
export const user = restRedux.get('users')
