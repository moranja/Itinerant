import { createStore, compose, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
// import history from './history'

// const initialState = {
// }

const reducer = (state = {}, action) => {
  switch(action.type){
    default:
      return state
  }
}

const middleware = compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


export const store = createStore(reducer, middleware)
