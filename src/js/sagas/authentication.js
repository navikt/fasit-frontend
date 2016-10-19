import {browserHistory} from 'react-router'
import {takeEvery} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {postForm, fetchUrl} from '../utils'
import {
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUBMITTED,
    LOGIN_SUCCESS,
    LOGOUT
} from '../actionTypes'


export function* login(action) {
    const configuration = yield select((state) => state.configuration)

    yield put({type: LOGIN_SUBMITTED})

    // Sender skjemaet til login-siden
    try {
        const url = `${configuration.fasit_baseurl}/api/login`
        yield postForm(url, action.form)
        // Henter currentuser dersom login var vellykket.
        try {
            const url = `${configuration.fasit_baseurl}/api/v2/currentuser`
            const currentuser = yield fetchUrl(url)
            yield put({type: LOGIN_SUCCESS, currentuser})
            browserHistory.goBack()
        } catch(error) {
            console.log("Unable to fetch current user object:",error )
        }
    } catch (err) {
        const error = err.message
        yield put({type: LOGIN_FAILED, error})
    }


}


export function* watchAuthentication() {
    yield fork(takeEvery, LOGIN, login)
    //yield fork(takeEvery, LOGOUT, logout)
}