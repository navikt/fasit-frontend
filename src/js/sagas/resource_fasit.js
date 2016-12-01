import {takeEvery} from 'redux-saga'
import {select, put, fork, call} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    RESOURCE_FASIT_REQUEST,
    RESOURCE_FASIT_FETCHING,
    RESOURCE_FASIT_RECEIVED,
    RESOURCE_FASIT_REQUEST_FAILED
} from '../actionTypes'

export function* fetchFasit(action) {
    const resourcesConfig = yield select((state) => state.configuration.fasit_resources)
    yield put({type: RESOURCE_FASIT_FETCHING})
    try {
        const value = yield call(fetchUrl, `${resourcesConfig}/${action.id}`)
        yield put({type: RESOURCE_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: RESOURCE_FASIT_REQUEST_FAILED, error})

    }
}

export function* watchResourceFasit() {
    yield fork(takeEvery, RESOURCE_FASIT_REQUEST, fetchFasit)
}