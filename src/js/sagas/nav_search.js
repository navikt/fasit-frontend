import {takeLatest} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    SUBMIT_NAV_SEARCH,
    NAVSEARCH_RESULTS_RECEIVED,
    NAVSEARCH_REQUEST_FAILED,
    NAVSEARCH_RESULTS_FETCHING,
    SET_NAVSEARCH_QUERY,
    CLEAR_SEARCH_QUERY
} from '../actionTypes'

export function* submitNavSearch(action) {
    const url = yield select((state) => state.configuration.fasit_navsearch)
    yield put({type: NAVSEARCH_RESULTS_FETCHING})
    try {
        yield put({type: SET_NAVSEARCH_QUERY, value: action.query})
        const payload = yield fetchUrl(url + "?q=" + action.query + "&maxCount=10")
        yield put({type: NAVSEARCH_RESULTS_RECEIVED, value: payload})
    } catch (err) {
        console.log(err.message)
        yield put({type: NAVSEARCH_REQUEST_FAILED, value: err.message})
    }
}

export function* clearSearchQuery() {
    yield put({type: SET_NAVSEARCH_QUERY, value: ""})
}

export function* watchNavSearchQueries() {
    yield fork(takeLatest, SUBMIT_NAV_SEARCH, submitNavSearch)
    yield fork(takeLatest, CLEAR_SEARCH_QUERY, clearSearchQuery)
}