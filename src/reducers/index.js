import { combineReducers } from 'redux'
import user from './user'
import universities from './university'

let reducers = {
  user,
  universities
}

const combined = combineReducers(reducers)

const appReducer = (state, action) => {
  // Empty the logout user data from redux
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return combined(state, action)
}

export default appReducer