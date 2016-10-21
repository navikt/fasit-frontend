import {takeEvery} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    NODE_TYPES_REQUEST,
    NODE_TYPES_RECEIVED
} from '../actionTypes'

// Selectore som henter data fra store

export function* fetchNodeTypes() {
    const nodes = yield select((state) => state.configuration.fasit_nodes)
    const url = `${nodes}/types`

    try {
        const value = yield fetchUrl(url)
        yield put({type: NODE_TYPES_RECEIVED, value})
    } catch (err) {
        console.log("Unable to fetch node types: ", err.message)
    }
}


export function* watchNodeTypes() {
    yield fork(takeEvery, NODE_TYPES_REQUEST, fetchNodeTypes)
}