import { takeEvery } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import { fetchUrl } from '../utils'
import {
    NODE_EVENTS_REQUEST,
    NODE_EVENTS_FETCHING,
    NODE_EVENTS_RECEIVED,
    NODE_EVENTS_REQUEST_FAILED,

} from '../actionTypes'


export function* fetchEvents(action) {
    yield put({type: NODE_EVENTS_FETCHING})
    try {
        const value = yield call(fetchUrl, action.url)
        yield put({type: NODE_EVENTS_RECEIVED, value})
    } catch(error) {
        yield put({type: NODE_EVENTS_REQUEST_FAILED, error})

    }
}

export function* watchNodeEvents() {
    yield fork(takeEvery, NODE_EVENTS_REQUEST, fetchEvents)
}