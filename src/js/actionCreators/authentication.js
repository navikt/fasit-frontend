
import {
    DISPLAY_LOGIN,
    GET_USER,
    LOGIN,
    LOGOUT
} from '../actionTypes/'

export function displayLogin(value) { return {type: DISPLAY_LOGIN, value} }
export function getUser() { return {type: GET_USER} }
export function logOut() { return {type: LOGOUT} }
export function logIn(auth) {
    const form = Object.keys(auth).map(key => key + "=" + encodeURIComponent(auth[key])).join("&")
    return {type: LOGIN, form}
}

