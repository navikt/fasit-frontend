import {takeLatest} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    SUBMIT_NAV_SEARCH,
    NAVSEARCH_RESULTS_RECEIVED,
    NAVSEARCH_REQUEST_FAILED,
    SET_NAVSEARCH_QUERY
} from '../actionTypes'

export function* submitNavSearch(action) {
    const url = yield select((state) => state.configuration.fasit_navsearch)

    try {
        yield put({type: SET_NAVSEARCH_QUERY, value: action.query})
        const payload = yield fetchUrl(url + "?q=" + action.query)

        yield put({type: NAVSEARCH_RESULTS_RECEIVED, value: payload})
    } catch (err) {
        yield put({type: NAVSEARCH_REQUEST_FAILED, value: err.message})
    }
}

export function* watchSearchQueries() {
    yield fork(takeLatest, SUBMIT_NAV_SEARCH, submitNavSearch)
}