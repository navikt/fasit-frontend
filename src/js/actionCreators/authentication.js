import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'

import {
    FAILED_LOGIN,
    SET_USER
} from '../actionTypes/'

export const login = (auth) => {
    let authstring = ""
    for (let key in auth) {
        authstring += key + "=" + auth[key] + "&"
    }
    return (dispatch) => {
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

    }
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
        return fetch('/api/v2/currentuser', {
            credentials: 'same-origin'
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
