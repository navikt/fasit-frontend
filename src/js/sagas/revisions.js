import { takeEvery } from 'redux-saga'
import { call, put, fork, select} from 'redux-saga/effects'
import { fetchUrl } from '../utils'
import {
    REVISIONS_REQUEST,
    REVISIONS_FETCHING,
    REVISIONS_RECEIVED,
    REVISIONS_REQUEST_FAILED,
    REVISION_REQUEST,
    REVISION_FETCHING,
    REVISION_RECEIVED,
    REVISION_REQUEST_FAILED
} from '../actionTypes'


// Fetching all revisions for the node
export function* fetchRevisions(action) {
    yield put({type: REVISIONS_FETCHING})
    try {
        const configuration = yield select((state) => state.configuration)
        const url = `${configuration.fasit_nodes}/${action.hostname}/revisions`
        const response = yield call(fetchUrl, url)
        const value = yield response.reverse()
        yield put({type: REVISIONS_RECEIVED, value})
    } catch(error) {
        yield put({type: REVISIONS_REQUEST_FAILED, error})

    }
}

// Fetching specific revision on a given node
export function* fetchRevision(action) {
    yield put({type: REVISION_FETCHING})
    try {
        const configuration = yield select((state) => state.configuration)
        const url = `${configuration.fasit_nodes}/${action.revision}`
        const value = yield call(fetchUrl, url)
        yield put({type: REVISION_RECEIVED, value})
    } catch(error) {
        yield put({type: REVISION_REQUEST_FAILED, error})

    }
}

export function* watchRevisions() {
    yield fork(takeEvery, REVISIONS_REQUEST, fetchRevisions)
    yield fork(takeEvery, REVISION_REQUEST, fetchRevision)
}