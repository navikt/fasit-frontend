import {takeEvery} from 'redux-saga'
import {select, put, fork, call} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    NODE_FASIT_REQUEST,
    NODE_FASIT_FETCHING,
    NODE_FASIT_RECEIVED,
    NODE_FASIT_REQUEST_FAILED,
    NODE_FASIT_PASSWORD_RECEIVED,
    NODE_FASIT_PASSWORD_REQUEST,
    NODE_FASIT_PASSWORD_REQUEST_FAILED,
    RESCUE_NODE
} from '../actionTypes'

// Selector som henter data fra store

export function* fetchFasitPassword() {
    const secret = yield select((state) => state.node_fasit.data.password.ref)
    try {
        const value = yield fetchUrl(secret)
        yield put({type: NODE_FASIT_PASSWORD_RECEIVED, value})
    } catch (err) {
        const value = err.message
        yield put({type: NODE_FASIT_PASSWORD_REQUEST_FAILED, value})
    }
}

export function* fetchFasit(action) {
    const nodes = yield select((state) => state.configuration.fasit_nodes)
    yield put({type: NODE_FASIT_FETCHING})
    try {
        const value = yield call(fetchUrl, `${nodes}/${action.hostname}`)
        yield put({type: NODE_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: NODE_FASIT_REQUEST_FAILED, error})

    }
}

export function* rescueNode(action){
    console.log("I'm in the 'node_fasit'-saga with this action: ", action)
}

export function* watchNodeFasit() {
    yield fork(takeEvery, NODE_FASIT_REQUEST, fetchFasit)
    yield fork(takeEvery, NODE_FASIT_PASSWORD_REQUEST, fetchFasitPassword)
    yield fork(takeEvery, RESCUE_NODE, rescueNode)
}