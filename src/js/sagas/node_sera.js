import {takeEvery} from 'redux-saga'
import {call, put, fork, select} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    NODE_SERA_REQUEST,
    NODE_SERA_FETCHING,
    NODE_SERA_RECEIVED,
    NODE_SERA_REQUEST_FAILED
} from '../actionTypes'

export function* fetchSera(hostname) {
    yield put({type: NODE_SERA_FETCHING})

    const configuration = yield select((state) => state.configuration)
    const url = `${configuration.sera_servers}?hostname=${hostname}`

    try {
        const value = yield fetchUrl(url, true)
        yield put({type: NODE_SERA_RECEIVED, value})
    } catch (error) {
        yield put({type: NODE_SERA_REQUEST_FAILED, error})

    }
}

export function* watchNodeSera() {
    yield fork(takeEvery, NODE_SERA_REQUEST, fetchSera)
}