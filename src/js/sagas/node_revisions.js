import { takeEvery } from 'redux-saga'
import { call, put, fork, select} from 'redux-saga/effects'
import { fetchUrl } from '../utils'
import {
    NODE_REVISIONS_REQUEST,
    NODE_REVISIONS_FETCHING,
    NODE_REVISIONS_RECEIVED,
    NODE_REVISIONS_REQUEST_FAILED,
    NODE_REVISION_REQUEST,
    NODE_REVISION_FETCHING,
    NODE_REVISION_RECEIVED,
    NODE_REVISION_REQUEST_FAILED
} from '../actionTypes'

export const configurationSelector = state => state.configuration

// Fetching all revisions for the node
export function* fetchRevisions(action) {
    yield put({type: NODE_REVISIONS_FETCHING})
    const configuration = yield select(configurationSelector)

    try {
        const response = yield call(fetchUrl, `${configuration.apiHost + action.url}`)
        const value = yield response.reverse()
        yield put({type: NODE_REVISIONS_RECEIVED, value})
    } catch(error) {
        yield put({type: NODE_REVISIONS_REQUEST_FAILED, error})

    }
}

// Fetching specific revision on a given node
export function* fetchRevision(action) {
    yield put({type: NODE_REVISION_FETCHING})
    try {
        const value = yield call(fetchUrl, action.url)
        yield put({type: NODE_REVISION_RECEIVED, value})
    } catch(error) {
        yield put({type: NODE_REVISION_REQUEST_FAILED, error})

    }
}

export function* watchNodeRevisions() {
    yield fork(takeEvery, NODE_REVISIONS_REQUEST, fetchRevisions)
    yield fork(takeEvery, NODE_REVISION_REQUEST, fetchRevision)
}