import {takeEvery} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    ENVIRONMENTS_LIST_REQUEST,
    ENVIRONMENTS_LIST_FETCHING,
    ENVIRONMENTS_LIST_RECEIVED,
    ENVIRONMENTS_LIST_FAILED,
} from '../actionTypes'


export function* fetchEnvironmentsList(action) {
    yield put({type: ENVIRONMENTS_LIST_FETCHING})

    const environments = yield select((state) => state.configuration.fasit_environments)
    const url = `${environments}${action.filterString}`

    try {
        const value = yield fetchUrl(url)
        yield put({type: ENVIRONMENTS_LIST_RECEIVED, value})
    } catch (err) {
        const value = err.message
        yield put({type: ENVIRONMENTS_LIST_FAILED, value})
    }
}


export function* watchEnvironmentsList() {
    yield fork(takeEvery, ENVIRONMENTS_LIST_REQUEST, fetchEnvironmentsList)
}