import {takeEvery} from 'redux-saga'
import {select, put, fork, call} from 'redux-saga/effects'
import {fetchUrl} from '../utils'
import {
    INSTANCE_FASIT_REQUEST,
    INSTANCE_FASIT_FETCHING,
    INSTANCE_FASIT_RECEIVED,
    INSTANCE_FASIT_REQUEST_FAILED,
    INSTANCE_MANIFEST_FASIT_REQUEST,
    INSTANCE_MANIFEST_FASIT_FETCHING,
    INSTANCE_MANIFEST_FASIT_RECEIVED,
    INSTANCE_MANIFEST_FASIT_REQUEST_FAILED

} from '../actionTypes'

export function* fetchInstance(action) {
    const instancesApi = yield select((state) => state.configuration.fasit_applicationinstances)
    yield put({type: INSTANCE_FASIT_FETCHING})
    try {
        const value = yield call(fetchUrl, `${instancesApi}/${action.id}`)
        yield put({type: INSTANCE_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: INSTANCE_FASIT_REQUEST_FAILED, error})
    }
}

export function* fetchManifest() {
    const instancesApi = yield select((state) => state.configuration.fasit_applicationinstances)
     const instanceId = yield select((state) => state.instance_fasit.data.id)
     const instanceRevision = yield select((state) => state.instance_fasit.data.revision)

    console.log("id", instanceId);
    console.log("revision", instanceRevision);

    yield put({type: INSTANCE_MANIFEST_FASIT_FETCHING})
    try {
        const value = yield call(fetchUrl, `${instancesApi}/${instanceId}/revisions/${instanceRevision}/appconfig`)
        yield put({type: INSTANCE_MANIFEST_FASIT_RECEIVED, value})
    } catch (error) {
        yield put({type: INSTANCE_MANIFEST_FASIT_REQUEST_FAILED, error})
    }
}

export function* watchInstanceFasit() {
    yield fork(takeEvery, INSTANCE_FASIT_REQUEST, fetchInstance)
    yield fork(takeEvery, INSTANCE_MANIFEST_FASIT_REQUEST, fetchManifest)
}