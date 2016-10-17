import { takeEvery } from 'redux-saga'
import { put, fork, call } from 'redux-saga/effects'
import { fetchUrl } from '../utils'
import {
    CONFIGURATION_REQUEST,
    RECEIVE_CONFIGURATION,
    RECEIVE_CONFIGURATION_FAILED
} from '../actionTypes'


export function* getConfiguration() {
    console.log("in fetchConfig")
    try {
        const value = yield fetchUrl(`config`)
        yield put({type: RECEIVE_CONFIGURATION, value})
    } catch( err ) {
        const value = err.message
        yield put({type: RECEIVE_CONFIGURATION_FAILED, value})
    }
}

export function* watchGetConfiguration() {
    yield call(takeEvery, CONFIGURATION_REQUEST, fetchConfiguration)
}