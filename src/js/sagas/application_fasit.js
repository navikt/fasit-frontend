import {takeEvery} from 'redux-saga'
import {select, put, fork, call} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    APPLICATION_FASIT_FETCHING,
    APPLICATION_FASIT_RECEIVED,
    APPLICATION_FASIT_REQUEST_FAILED,
    APPLICATION_FASIT_REQUEST
} from '../actionTypes'


export function* fetchFasit(action) {
    const applications_api = yield select((state) => state.configuration.fasit_applications)
    yield put({type: APPLICATION_FASIT_FETCHING})
    try {
        const value = yield call(fetchUrl, `${applications_api}/${action.application}`)
        yield put({type: APPLICATION_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: APPLICATION_FASIT_REQUEST_FAILED, error})

    }
}

export function* watchApplicationFasit() {
    yield fork(takeEvery, APPLICATION_FASIT_REQUEST, fetchFasit)
}