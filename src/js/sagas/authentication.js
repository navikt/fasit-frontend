import {takeEvery} from 'redux-saga'
import {put, fork, select, cancel} from 'redux-saga/effects'
import {postForm, fetchUrl, oldSchool} from '../utils'
import {
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT
} from '../actionTypes'


export function* login(action) {
    const configuration = yield select((state) => state.configuration)

    // Sender skjemaet til login-siden
    try {
        const url = `${configuration.fasit_baseurl}/api/login`
        yield oldSchool(url, action.form)
    } catch (error) {
        yield put({type: LOGIN_FAILED, error})
    }

    // Henter currentuser dersom login var vellykket.
    try {
        const url = `${configuration.fasit_baseurl}/api/v2/currentuser`
        const currentuser = yield fetchUrl(url)
        yield put({type: LOGIN_SUCCESS, currentuser})
    } catch(error) {
        console.log("Unable to fetch current user object:",error )
    }
}


export function* watchAuthentication() {
    yield fork(takeEvery, LOGIN, login)
    //yield fork(takeEvery, LOGOUT, logout)
}