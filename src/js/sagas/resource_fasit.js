import {takeEvery} from "redux-saga";
import {select, put, fork, call} from "redux-saga/effects";
import {browserHistory} from "react-router";
import {validAuthorization, isEmptyObject, fetchUrl} from "../utils";
import {
    RESOURCE_FASIT_REQUEST,
    RESOURCE_FASIT_FETCHING,
    RESOURCE_FASIT_SECRET_REQUEST,
    RESOURCE_FASIT_RECEIVED,
    RESOURCE_FASIT_SECRET_RECEIVED,
    RESOURCE_FASIT_REQUEST_FAILED,
    RESOURCE_FASIT_URL_REQUEST,
    CLEAR_RESOURCE_SECRET,
    LOGIN_SUCCESS
} from "../actionTypes";

export function* fetchFasit(action) {
    const resourcesConfig = yield select((state) => state.configuration.fasit_resources)

    yield put({type: RESOURCE_FASIT_FETCHING})
    try {
        let value = {}
        yield put({type: CLEAR_RESOURCE_SECRET})
        if (action.revision) {
            value = yield call(fetchUrl, `${resourcesConfig}/${action.id}/revisions/${action.revision}`)
        } else {

            value = yield call(fetchUrl, `${resourcesConfig}/${action.id}`)
        }
        yield put({type: RESOURCE_FASIT_RECEIVED, value})
        yield put({type: RESOURCE_FASIT_SECRET_REQUEST})
    } catch (error) {
        yield put({type: RESOURCE_FASIT_REQUEST_FAILED, error})
    }
}

export function* fetchFasitUrl(action) {
    yield put({type: RESOURCE_FASIT_FETCHING})
    try {
        yield put({type: CLEAR_RESOURCE_SECRET})
        const value = yield call(fetchUrl, action.url)
        yield browserHistory.push(`/resources/${value.id}`)
        yield put({type: RESOURCE_FASIT_RECEIVED, value})
        yield put({type: RESOURCE_FASIT_SECRET_REQUEST})
    } catch (error) {
        yield put({type: RESOURCE_FASIT_REQUEST_FAILED, error})
    }
}


export function* fetchFasitResourceSecret() {
    try {
        const user = yield select((state) => state.user)
        const resource = yield select((state) => state.resource_fasit)

        if (!isEmptyObject(resource) && validAuthorization(user, resource.data.accesscontrol)) {
            const secretRefs = yield select((state) => state.resource_fasit.data.secrets)
            const keys = Object.keys(secretRefs)

            let secrets = {}
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i]
                const secret = yield call(fetchUrl, secretRefs[key].ref)
                secrets[key] = secret
                yield put({type: RESOURCE_FASIT_SECRET_RECEIVED, secrets})
            }
        }
    }
    catch (error) {
        console.log("Error getting secret", error)
    }
}

export function* watchResourceFasit() {
    yield fork(takeEvery, RESOURCE_FASIT_URL_REQUEST, fetchFasitUrl)
    yield fork(takeEvery, RESOURCE_FASIT_REQUEST, fetchFasit)
    yield fork(takeEvery, RESOURCE_FASIT_SECRET_REQUEST, fetchFasitResourceSecret)
    yield fork(takeEvery, LOGIN_SUCCESS, fetchFasitResourceSecret)
}
