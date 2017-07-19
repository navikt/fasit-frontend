import {takeEvery} from "redux-saga";
import {select, put, fork, call} from "redux-saga/effects";
import {fetchUrl} from "../utils";
import {
    INSTANCE_FASIT_REQUEST,
    INSTANCE_FASIT_FETCHING,
    INSTANCE_FASIT_RECEIVED,
    INSTANCE_FASIT_REQUEST_FAILED,
    INSTANCE_MANIFEST_FASIT_REQUEST,
    INSTANCE_MANIFEST_FASIT_FETCHING,
    INSTANCE_MANIFEST_FASIT_RECEIVED,
    INSTANCE_MANIFEST_FASIT_REQUEST_FAILED
} from "../actionTypes";

export function* fetchInstance(action) {
    const instancesApi = yield select((state) => state.configuration.fasit_applicationinstances)
    let value = {}
    yield put({type: INSTANCE_FASIT_FETCHING})
    try {
        if (action.revision){
            value = yield call(fetchUrl, `${instancesApi}/${action.id}/revisions/${action.revision}`)
        } else {
            value = yield call(fetchUrl, `${instancesApi}/${action.id}`)
        }
        yield put({type: INSTANCE_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: INSTANCE_FASIT_REQUEST_FAILED, error})
    }
}

export function* fetchManifest() {
    const appconfigRef = yield select((state) => state.instance_fasit.data.appconfig.ref)

    yield put({type: INSTANCE_MANIFEST_FASIT_FETCHING})
    try {
        const value = yield call(fetchUrl, appconfigRef)
        yield put({type: INSTANCE_MANIFEST_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: INSTANCE_MANIFEST_FASIT_REQUEST_FAILED, error})
    }
}

export function* watchInstanceFasit() {
    yield fork(takeEvery, INSTANCE_FASIT_REQUEST, fetchInstance)
    yield fork(takeEvery, INSTANCE_MANIFEST_FASIT_REQUEST, fetchManifest)
}