import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './user/actions'
import restRedux, { product } from './api'

export const authEventsMiddleware = store => next => action => {
  store.dispatch(product.actions().find({}))
  /*switch (action.type) {
    case LOGIN_SUCCESS:
      restRedux.updateGlobal({
        headers: {
          'Authorization': action.payload.token.id
        }
      })
      store.dispatch(todo.actions().find({}))
      store.dispatch(completedTodos.actions().refresh())
      store.dispatch(incompleteTodos.actions().refresh())
      break
    case LOGOUT_SUCCESS:
      restRedux.updateGlobal({headers: {
        'Authorization': null
      }})
      restRedux.clear(store.dispatch)
      break
    default:
      
  }*/
  next(action)
};