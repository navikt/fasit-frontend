import {takeEvery} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {fetchPage} from '../utils'
import {
    NODES_LIST_REQUEST,
    NODES_LIST_FETCHING,
    NODES_LIST_RECEIVED,
    NODES_LIST_FAILED,
} from '../actionTypes'


export function* fetchNodesList(action) {
    yield put({type: NODES_LIST_FETCHING})

    const nodes = yield select((state) => state.configuration.fasit_nodes)
    const url = `${nodes}${action.filterString}`

    try {
        const page = yield fetchPage(url)
        yield put({type: NODES_LIST_RECEIVED, page})
    } catch (err) {
        const value = err.message
        yield put({type: NODES_LIST_FAILED, value})
    }
}


export function* watchElementsList() {
    yield fork(takeEvery, NODES_LIST_REQUEST, fetchNodesList)
}