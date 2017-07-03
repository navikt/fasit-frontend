import {takeLatest} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    SUBMIT_SEARCH,
    SEARCH_RESULTS_RECEIVED,
    SEARCH_REQUEST_FAILED,
    SEARCH_RESULTS_FETCHING,
    SET_SEARCH_QUERY
} from '../actionTypes'

export function* submitSearch(action) {
    const url = yield select((state) => state.configuration.fasit_search)
    yield put({type: SEARCH_RESULTS_FETCHING})
    try {
        const payload = yield fetchUrl(url + "?q=" + action.query)
        yield put({type: SEARCH_RESULTS_RECEIVED, value: payload})
    } catch (err) {
        console.log("err", err)
        yield put({type: SEARCH_REQUEST_FAILED, value: err.message})
    }
}

export function* watchSearchQueries() {
    yield fork(takeLatest, SUBMIT_SEARCH, submitSearch)
}