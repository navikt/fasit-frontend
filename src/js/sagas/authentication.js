import {takeEvery} from 'redux-saga'
import {put, fork, select, call} from 'redux-saga/effects'
import {postForm, fetchUrl} from '../utils'
import {
    DISPLAY_LOGIN,
    GET_USER,
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUBMITTED,
    LOGIN_SUCCESS,
    LOGOUT
} from '../actionTypes'

export function* getUser() {
    const configuration = yield select((state) => state.configuration)
    const url = `${configuration.fasit_baseurl}/api/v2/currentuser`
    try {
        const currentuser = yield fetchUrl(url)
        yield put({type: LOGIN_SUCCESS, currentuser})
    } catch (err) {
        const error = err.message
        console.log("Unable to fetch current user object:", error)
    }
}

export function* logIn(action) {
    const configuration = yield select((state) => state.configuration)

    yield put({type: LOGIN_SUBMITTED})

    // Sender skjemaet til login-siden
    try {
        const url = `${configuration.fasit_baseurl}/api/login`
        yield postForm(url, action.form)
        yield call(getUser)
        yield put({type: DISPLAY_LOGIN, value:false})
    } catch (err) {
        const error = err.message
        yield put({type: LOGIN_FAILED, error})
    }
}

export function* logOut() {
    const configuration = yield select((state) => state.configuration)

    try {
        const url = `${configuration.fasit_baseurl}/api/logout`
        yield postForm(url)
        yield call(getUser)
    } catch (err) {
        console.log("Logging out failed with the following message", err.message)
    }
}



export function* watchAuthentication() {
    yield fork(takeEvery, LOGIN, logIn)
    yield fork(takeEvery, GET_USER, getUser)
    yield fork(takeEvery, LOGOUT, logOut)
}