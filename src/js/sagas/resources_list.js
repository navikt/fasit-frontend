import {takeEvery} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    RESOURCES_LIST_REQUEST,
    RESOURCES_LIST_FETCHING,
    RESOURCES_LIST_RECEIVED,
    RESOURCES_LIST_FAILED,
} from '../actionTypes'


export function* fetchResourcesList(action) {
    yield put({type: RESOURCES_LIST_FETCHING})

    const resources = yield select((state) => state.configuration.fasit_resources)
    const url = `${resources}${action.filterString}`

    try {
        const value = yield fetchUrl(url)
        yield put({type: RESOURCES_LIST_RECEIVED, value})
    } catch (err) {
        const value = err.message
        yield put({type: RESOURCES_LIST_FAILED, value})
    }
}


export function* watchResourcesList() {
    yield fork(takeEvery, RESOURCES_LIST_REQUEST, fetchResourcesList)
}