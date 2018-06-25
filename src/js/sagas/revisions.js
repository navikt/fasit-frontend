import {takeEvery} from "redux-saga";
import {call, put, fork, select} from "redux-saga/effects";
import {fetchUrl} from "../utils";
import {REVISIONS_REQUEST, REVISIONS_FETCHING, REVISIONS_RECEIVED, REVISIONS_REQUEST_FAILED} from "../actionTypes";


export function* fetchRevisions(action) {
    const configuration = yield select((state) => state.configuration)
    let url = ""
    yield put({type: REVISIONS_FETCHING})
    try {
        switch (action.component) {
            case "node":
                url = `${configuration.fasit_nodes}/${action.key}/revisions`
                break
            case "application":
                url = `${configuration.fasit_applications}/${action.key}/revisions`
                break
            case "instance":
                url = `${configuration.fasit_applicationinstances}/${action.key}/revisions`
                break
            case "resource":
                url = `${configuration.fasit_resources}/${action.key}/revisions`
                break
            case "environment":
                url = `${configuration.fasit_environments}/${action.key}/revisions`
                break
            case "cluster":
                url = `${configuration.fasit_clusters}/${action.key}/revisions/`
                break
            default:
                throw new Error("Revisions Saga has no clue where you want to go, specify which component you're coming from")
        }
        const response = yield call(fetchUrl, url)
        const value = yield response.reverse()
        yield put({type: REVISIONS_RECEIVED, value})
    } catch (error) {
        yield put({type: REVISIONS_REQUEST_FAILED, error})

    }
}

export function* watchRevisions() {
    yield fork(takeEvery, REVISIONS_REQUEST, fetchRevisions)
}