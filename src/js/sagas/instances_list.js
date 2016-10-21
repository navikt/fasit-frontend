import {takeEvery} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    INSTANCES_LIST_REQUEST,
    INSTANCES_LIST_FETCHING,
    INSTANCES_LIST_RECEIVED,
    INSTANCES_LIST_FAILED,
} from '../actionTypes'


export function* fetchInstancesList(action) {
    yield put({type: INSTANCES_LIST_FETCHING})

    const instances = yield select((state) => state.configuration.fasit_applicationinstances)
    const url = `${instances}${action.filterString}`

    try {
        const value = yield fetchUrl(url)
        yield put({type: INSTANCES_LIST_RECEIVED, value})
    } catch (err) {
        const value = err.message
        yield put({type: INSTANCES_LIST_FAILED, value})
    }
}


export function* watchInstancesList() {
    yield fork(takeEvery, INSTANCES_LIST_REQUEST, fetchInstancesList)
}