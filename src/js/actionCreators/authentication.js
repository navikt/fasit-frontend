
import {
    DISPLAY_LOGIN,
    GET_USER,
    LOGIN,
    LOGOUT
} from '../actionTypes/'

export const displayLogin = (value) => (dispatch) => dispatch({type: DISPLAY_LOGIN, value})
export const getUser = () => (dispatch) => dispatch({type: GET_USER})
export const logOut = () => {return {type: LOGOUT}}
export const logIn = (auth) => (dispatch) => {
    const form = Object.keys(auth).map(key => key + "=" + encodeURIComponent(auth[key])).join("&")
    dispatch({type: LOGIN, form})
}

