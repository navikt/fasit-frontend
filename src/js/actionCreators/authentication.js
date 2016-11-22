
import {
    DISPLAY_LOGIN,
    GET_USER,
    LOGIN,
    LOGOUT
} from '../actionTypes/'

export const displayLogin = (value) => (dispatch) => dispatch({type: DISPLAY_LOGIN, value})
export const getUser = () => (dispatch) => dispatch({type: GET_USER})
export const logOut = () => (dispatch) => dispatch({type: LOGOUT})
export const logIn = (auth) => (dispatch) => {
    let form = ""
    for (let key in auth) {
        form += key + "=" + auth[key] + "&"
    }
    dispatch({type: LOGIN, form})
}

