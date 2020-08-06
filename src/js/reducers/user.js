import {
  DISPLAY_LOGIN,
  LOGIN_FAILED,
  LOGIN_SUBMITTED,
  LOGIN_SUCCESS,
} from "../actionTypes"

export default (
  state = {
    initializing: true,
    authenticated: false,
    failedLogin: false,
    showLogin: false,
  },
  action
) => {
  switch (action.type) {
    case DISPLAY_LOGIN:
      return Object.assign({}, state, {
        showLogin: action.value,
      })
    case LOGIN_SUBMITTED:
      return Object.assign({}, state, {
        failedLogin: false,
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, action.currentuser, {
        failedLogin: false,
        initializing: false,
      })
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        authenticated: false,
        failedLogin: action.error,
        initializing: false,
      })
    default:
      return state
  }
}
