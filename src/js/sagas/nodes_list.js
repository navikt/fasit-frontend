import {takeEvery} from 'redux-saga'
import {put, fork} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    NODES_LIST_REQUEST,
    NODES_LIST_FETCHING,
    NODES_LIST_RECEIVED,
    NODES_LIST_FAILED,
} from '../actionTypes'

export function* fetchNodesList(action) {
    yield put({type: NODES_LIST_FETCHING})
    try {
        const value = yield fetchUrl(action.url)
        yield put({type: NODES_LIST_RECEIVED, value})
    } catch (err) {
        const value = err.message
        yield put({type: NODES_LIST_FAILED, value})
    }
}


export function* watchNodesList() {
    yield fork(takeEvery, NODES_LIST_REQUEST, fetchNodesList)
}