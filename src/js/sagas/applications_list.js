import {takeEvery} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    APPLICATIONS_LIST_REQUEST,
    APPLICATIONS_LIST_FETCHING,
    APPLICATIONS_LIST_RECEIVED,
    APPLICATIONS_LIST_FAILED,
} from '../actionTypes'


export function* fetchApplicationsList(action) {
    yield put({type: APPLICATIONS_LIST_FETCHING})

    const applications = yield select((state) => state.configuration.fasit_applications)
    const url = `${applications}${action.filterString}`

    try {
        const value = yield fetchUrl(url)
        yield put({type: APPLICATIONS_LIST_RECEIVED, value})
    } catch (err) {
        const value = err.message
        yield put({type: APPLICATIONS_LIST_FAILED, value})
    }
}


export function* watchApplicationsList() {
    yield fork(takeEvery, APPLICATIONS_LIST_REQUEST, fetchApplicationsList)
}