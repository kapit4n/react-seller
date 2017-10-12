import RestRedux from 'rest-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux'

const restRedux = new RestRedux({
  basePath: 'http://localhost:3000/api',
  globalOptions: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  models: [{ modelName: 'products' }]
})

let reducer = combineReducers({
  rest: restRedux.reducer
})

let store = createStore(
  reducer,
  applyMiddleware(
    restRedux.middleware
  )
)

