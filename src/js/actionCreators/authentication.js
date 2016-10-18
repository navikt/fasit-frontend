import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'

import {
    LOGIN,
    FAILED_LOGIN,
    SET_USER
} from '../actionTypes/'

export const login = (auth) => (dispatch) => {
    let form = ""
    for (let key in auth) {
        form += key + "=" + auth[key] + "&"
    }
    dispatch({type: LOGIN, form})
    /*    return (dispatch) => {
     return fetch('/api/login', {
     headers: {"Content-Type": "application/x-www-form-urlencoded"},
     credentials: 'same-origin',
     method: 'POST',
     body: authstring
     })
     .then(response => handleLoginErrors(response, dispatch))
     .then(response => browserHistory.goBack())
     .then(() => dispatch(fetchUserData()))
     .catch(error => console.log(error))

     }*/
}

export const logOut = () => {
    return (dispatch) => {
        return fetch('/api/logout', {
            credentials: 'same-origin',
            method: 'POST',
        })
            .then(response => handleErrors(response))
            .then(response => dispatch(setUser(
                {
                    authenticated: false,
                    failedLogin: false
                }
            )))
            .catch(error => console.log(error))
    }
}

export const fetchUserData = () => {
    return (dispatch) => {
        return fetch('http://e34jbsl01655.devillo.no:8080/api/v2/currentuser', {
            credentials: 'include'
        })
            .then(response => handleErrors(response))
            .then(response => dispatch(setUser(JSON.parse(response))))
            .catch(error => console.log(error))
    }

}
const handleLoginErrors = (response, dispatch) => {
    if (!response.ok) {
        dispatch(failedLogin())
        throw Error(response.statusText)
    }
    return response.text()
}
const handleErrors = (response) => {
    if (!response.ok)
        throw Error(response.statusText)
    return response.text()
}
const setUser = (value) => {
    return {
        type: SET_USER,
        value: value
    }
}
const failedLogin = () => {
    return {
        type: FAILED_LOGIN,
    }
}
