import { takeEvery } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import { fetchUrl } from '../utils'
import {
    NODE_SERA_REQUEST,
    NODE_SERA_FETCHING,
    NODE_SERA_RECEIVED,
    NODE_SERA_REQUEST_FAILED,

} from '../actionTypes'


export function* fetchSera(action) {
    yield put({type: NODE_SERA_FETCHING})
    try {
        const value = yield call(fetchUrl, action.url)
        yield put({type: NODE_SERA_RECEIVED, value})
    } catch(error) {
        yield put({type: NODE_SERA_REQUEST_FAILED, error})

    }
}

export function* watchNodeSera() {
    yield fork(takeEvery, NODE_SERA_REQUEST, fetchSera)
}