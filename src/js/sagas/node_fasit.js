import { takeEvery } from 'redux-saga'
import { select, put, fork, call } from 'redux-saga/effects'
import { fetchUrl } from '../utils'
import {
    NODE_FASIT_REQUEST,
    NODE_FASIT_FETCHING,
    NODE_FASIT_RECEIVED,
    NODE_FASIT_REQUEST_FAILED,
    NODE_FASIT_PASSWORD_RECEIVED,
    NODE_FASIT_PASSWORD_REQUEST,
    NODE_FASIT_PASSWORD_REQUEST_FAILED,
} from '../actionTypes'

// Selector som henter data fra store
export const getFasitDataFromStore = state => state.node_fasit.data

export function* fetchFasitPassword() {
    const fasitData = yield select(getFasitDataFromStore)
    const passwordUri = fasitData.password.ref.split('/api/v2/')[1]
    try {
        const value = yield fetchUrl(`/api/v2/${passwordUri}`)
        yield put({type: NODE_FASIT_PASSWORD_RECEIVED, value})
    } catch( err ) {
        const value = err.message
        yield put({type: NODE_FASIT_PASSWORD_REQUEST_FAILED, value})
    }
}

export function* fetchFasit(action) {
    yield put({type: NODE_FASIT_FETCHING})
    try {
        const value = yield call(fetchUrl, action.url)
        yield put({type: NODE_FASIT_RECEIVED, value})
    } catch(error) {
        yield put({type: NODE_FASIT_REQUEST_FAILED, error})

    }
}

export function* watchNodeFasit() {
    yield fork(takeEvery, NODE_FASIT_REQUEST, fetchFasit)
    yield fork(takeEvery, NODE_FASIT_PASSWORD_REQUEST, fetchFasitPassword)
}