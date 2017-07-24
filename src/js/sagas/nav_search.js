import {takeLatest} from "redux-saga";
import {fork, put, select} from "redux-saga/effects";
import {fetchUrl} from "../utils";
import {
    CLEAR_SEARCH_QUERY,
    NAVSEARCH_REQUEST_FAILED,
    NAVSEARCH_RESULTS_FETCHING,
    NAVSEARCH_RESULTS_RECEIVED,
    SET_NAVSEARCH_QUERY,
    SUBMIT_NAV_SEARCH
} from "../actionTypes";

export function* submitNavSearch(action) {
    const url = yield select((state) => state.configuration.fasit_navsearch)
    yield put({type: NAVSEARCH_RESULTS_FETCHING})
    try {
        yield put({type: SET_NAVSEARCH_QUERY, value: action.query})
        const payload = yield fetchUrl(url + "?q=" + action.query + "&maxCount=10")
        yield put({type: NAVSEARCH_RESULTS_RECEIVED, value: payload})
    } catch (err) {
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