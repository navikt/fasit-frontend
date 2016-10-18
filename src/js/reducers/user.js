import {
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT
} from '../actionTypes'

export default (state = {
    authenticated: false,
    failedLogin: false
}, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return Object.assign({}, state, action.currentuser, {
                failedLogin: false
            })
        case 'LOGIN_FAILED':
            return Object.assign({}, state, {
                authenticated: false,
                failedLogin: action.error
            })
        default:
            return state
    }
}
