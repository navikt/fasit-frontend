import {takeEvery} from 'redux-saga'
import {select, put, fork, call} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    ENVIRONMENT_FASIT_REQUEST,
    ENVIRONMENT_FASIT_FETCHING,
    ENVIRONMENT_FASIT_RECEIVED,
    ENVIRONMENT_FASIT_REQUEST_FAILED

} from '../actionTypes'

export function* fetchEnvironment(action) {
    const environmentsApi = yield select((state) => state.configuration.fasit_environments)
    yield put({type: ENVIRONMENT_FASIT_FETCHING})
    try {
        const value = yield call(fetchUrl, `${environmentsApi}/${action.name}`)
        yield put({type: ENVIRONMENT_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: ENVIRONMENT_FASIT_REQUEST_FAILED, error})
    }
}

export function* watchEnvironmentFasit() {
    yield fork(takeEvery, ENVIRONMENT_FASIT_REQUEST, fetchEnvironment)
}