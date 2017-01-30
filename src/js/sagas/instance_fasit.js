import {takeEvery} from 'redux-saga'
import {select, put, fork, call} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    INSTANCE_FASIT_REQUEST,
    INSTANCE_FASIT_FETCHING,
    INSTANCE_FASIT_RECEIVED,
    INSTANCE_FASIT_REQUEST_FAILED
} from '../actionTypes'

export function* fetchFasit(action) {
    const instances = yield select((state) => state.configuration.fasit_applicationinstances)
    yield put({type: INSTANCE_FASIT_FETCHING})
    try {
        const value = yield call(fetchUrl, `${instances}/${action.id}`)
        yield put({type: INSTANCE_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: INSTANCE_FASIT_REQUEST_FAILED, error})
    }
}

export function* watchInstanceFasit() {
    yield fork(takeEvery, INSTANCE_FASIT_REQUEST, fetchFasit)
}