import { createStore, compose, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
// import history from './history'

// const initialState = {
// }

const reducer = (state = {
  itineraries: [],
  selected_itinerary: {}
}, action) => {
  switch(action.type){
    case "LOAD_SELECTED_ITINERARY":
      return {...state, selected_itinerary: action.payload}
    default:
      return state
  }
}

const middleware = compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


export const store = createStore(reducer, middleware)
